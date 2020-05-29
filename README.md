# Fakecon

A webapp that allows emulating a Nintendo Switch pro controller using [mart1nro/joycontrol](https://github.com/mart1nro/joycontrol)

## Usage

1. Follow the instructions at [the joycontrol repo](https://github.com/mart1nro/joycontrol) to setup joycontrol. I tested this on a Manjaro system, and it worked fine.
1. Verify that joycontrol works fine, and is able to pair with your Switch. Then, exit joycontrol
1. Run `fakecon.py` in the same way as `joycontrol`. For example, if you use the joycontrol with `-r [MAC ADDRESS] PRO_CONTROLLER`, please do the same with `fakecon.py`!
   1. Example, if your Switch has a bluetooth MAC address of AA:AA:AA:AA:AA:AA, then you may run `sudo python3 fakecon.py -r AA:AA:AA:AA:AA:AA PRO_CONTROLLER`
   2. Note that you _must_ run it as root.
1. Fakecon will then start on `localhost:5000`. Visit [the site](http://localhost:5000) from any browser (Chrome-based browsers seem to work best)
1. Your input in the site will be captured, and if it corresponds to any of the controller keys, it will be sent to the switch!

## Installation and Setup

### Installation

`sudo pip3 install -r requirements.txt`

Since the underlying joycontrol requires root access, the pip packages must be installed as root as well.

### Setup

Running it is pretty standard. You may remap buttons with the `remap` button in the site. Find the controller button you wish to remap, and press the edit button, then hit the button you want mapped to the given controller button.

Pressing the clear button will clear the output log on the top of the screen.

The currently loaded key bindings will be printed on the bottom of the screen.

## API

The webserver exposes an API that you can use to control the emulated switch controller, if you wish to automate it, or otherwise don't want to use the web UI.

There are currently 3 endpoints that use GET requests:

- `/btn/<btn>` where you can replace `<btn>` with one of the buttons on a switch controller (`ZL`, `L`, `a`, `b`, `down`, etc). This will press the button, and will NOT release it
- `/unbtn/<btn>` where you can replace `<btn>` with one of the buttons on a switch controller (`ZL`, `L`, `a`, `b`, `down`, etc). This will release the button that was previously pressed with `/bin/<btn>`. Both of these functions will return 200 regardless of the current state of the button
- `/stick/<s>/<direction>` to control the joysticks. `<s>` represents the stick, and `<direction>` represents the direction to which you want the stick to point to
  - Valid options for `<s>` are `l` for the left joystick, and `r` for the right joystick
  - Valid options for `<direction>` are `up`, `down`, `left`, `right`, and `center` to reset it to the central position

## TODO

- Create an easy_install package
- Allow importing an exported JSON
- Save controller mappings in the browser storage
- Use the Gamepad API so other controllers can be used (Such as an xbox one controller)
- Allow multi-directional joystick input
