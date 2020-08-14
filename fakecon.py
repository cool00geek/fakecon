#!/usr/bin/env python3

import argparse
import asyncio
import logging
import os

import time

from aioconsole import ainput

from joycontrol import logging_default as log, utils
from joycontrol.command_line_interface import ControllerCLI
from joycontrol.controller import Controller
from joycontrol.controller_state import ControllerState, button_push
from joycontrol.memory import FlashMemory
from joycontrol.protocol import controller_protocol_factory
from joycontrol.server import create_hid_server

from flask import Flask, render_template, request
from flask import jsonify, make_response
from werkzeug.serving import WSGIRequestHandler
from waitress import serve

app = Flask(__name__)

logger = logging.getLogger(__name__)

class fakecon:

    async def setup(self, args):
        # parse the spi flash
        if args.spi_flash:
            with open(args.spi_flash, 'rb') as spi_flash_file:
                spi_flash = FlashMemory(spi_flash_file.read())
        else:
            # Create memory containing default controller stick calibration
            spi_flash = FlashMemory()

        # Get controller name to emulate from arguments
        controller = Controller.from_arg(args.controller)

        with utils.get_output(path=args.log, default=None) as capture_file:
            factory = controller_protocol_factory(controller, spi_flash=spi_flash)
            ctl_psm, itr_psm = 17, 19
            transport, protocol = await create_hid_server(factory, reconnect_bt_addr=args.reconnect_bt_addr,
                                                        ctl_psm=ctl_psm,
                                                        itr_psm=itr_psm, capture_file=capture_file,
                                                        device_id=args.device_id)

            controller_state = protocol.get_controller_state()
            self.controller_state = controller_state
            await self.controller_state.connect()

    def push_btn(self, btn):
        self.controller_state.button_state.set_button(btn)

    def release_btn(self, btn):
        self.controller_state.button_state.set_button(btn, pushed=False)

fc = fakecon()
loop = asyncio.get_event_loop()

@app.route('/btn/<btn>')
def btn(btn):
    fc.push_btn(btn)
    loop.run_until_complete(fc.controller_state.send())
    return "200\n"

@app.route('/unbtn/<btn>')
def unbtn(btn):
    fc.release_btn(btn)
    loop.run_until_complete(fc.controller_state.send())
    return "200\n"

@app.route('/stick', methods=['POST'])
def stick():
    req = request.json

    # Verify that the request was passed as JSON and the request has all keys
    if (req is None) or ('stick' not in req) or ('direction' not in req) or ('magnitude' not in req): 
        d = {'Error': "Request was not in the expected format"}
        return make_response(jsonify(d), 400)

    s = req['stick']
    direction = req['direction']
    magnitude = req['magnitude']

    # Convert the magnitude to an int
    try:
        magnitude_val = int(magnitude)
    except:
        d = {'Error': "Malformed magnitude"}
        return make_response(jsonify(d), 400)

    # Verify that the magnitude is in the range
    if magnitude_val > 4095 or magnitude_val < 0:
        d = {'Error': "Magnitude must be in range [0,4096)"}
        return make_response(jsonify(d), 400)

    # Get the desired stick
    if s == 'l' or s == 'left':
        stick = fc.controller_state.l_stick_state
    elif s == 'r' or s == 'right':
        stick = fc.controller_state.r_stick_state
    else:
        d = {'Error': "Unknown stick"}
        return make_response(jsonify(d), 404)

    # Set the stick to the desired direction
    if direction == 'h' or direction == 'horiz' or direction == 'horizontal':
        stick.set_h(magnitude_val)
    elif direction == 'v' or direction == 'vert' or direction == 'vertical':
        stick.set_v(magnitude_val)
    else:
        d = {'Error': "Unknown direction"}
        return make_response(jsonify(d), 404)
    loop.run_until_complete(fc.controller_state.send())
    d = {'Success': "Stick set"}
    return make_response(jsonify(d), 200)

@app.route('/latency')
def latency():
    millis = int(round(time.time() * 1000))
    return {'time': millis}

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # check if root
    if not os.geteuid() == 0:
        raise PermissionError('Script must be run as root!')

    # setup logging
    #log.configure(console_level=logging.ERROR)
    log.configure()

    parser = argparse.ArgumentParser()
    parser.add_argument('controller', help='JOYCON_R, JOYCON_L or PRO_CONTROLLER')
    parser.add_argument('-l', '--log')
    parser.add_argument('-d', '--device_id')
    parser.add_argument('--spi_flash')
    parser.add_argument('-r', '--reconnect_bt_addr', type=str, default=None,
                        help='The Switch console Bluetooth address, for reconnecting as an already paired controller')
    args = parser.parse_args()

    loop.run_until_complete(fc.setup(args))
    print("Setup complete!")
    WSGIRequestHandler.protocol_version = "HTTP/1.1"
    #app.run(host='0.0.0.0')
    serve(app,host='0.0.0.0', port=5000)
