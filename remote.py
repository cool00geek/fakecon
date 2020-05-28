#!/usr/bin/env python3

import argparse
import asyncio
import logging
import os

from aioconsole import ainput

from joycontrol import logging_default as log, utils
from joycontrol.command_line_interface import ControllerCLI
from joycontrol.controller import Controller
from joycontrol.controller_state import ControllerState, button_push
from joycontrol.memory import FlashMemory
from joycontrol.protocol import controller_protocol_factory
from joycontrol.server import create_hid_server

from flask import Flask, render_template

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

@app.route('/stick/<s>/<direction>')
def stick(s, direction):
    if s == 'l':
        stick = fc.controller_state.l_stick_state
    else:
        stick = fc.controller_state.r_stick_state

    if direction == 'center':
        stick.set_center()
    elif direction == 'up':
        stick.set_up()
    elif direction == 'down':
        stick.set_down()
    elif direction == 'left':
        stick.set_left()
    elif direction == 'right':
        stick.set_right()
    loop.run_until_complete(fc.controller_state.send())
    return "200\n"

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
    print("First thing ran")
    #loop.run_until_complete(fc.push_btn('a'))
    fc.push_btn('a')
    #print("Second thing ran")
    app.run()