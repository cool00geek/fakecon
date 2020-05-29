# Fakecon

A webapp that allows emulating a Nintendo Switch pro controller using [mart1nro/joycontrol](https://github.com/mart1nro/joycontrol)

## Usage

1. Follow the instructions at [the joycontrol repo](https://github.com/mart1nro/joycontrol) to setup joycontrol. I tested this on a Manjaro system, and it worked fine.
1. Verify that joycontrol works fine, and is able to pair with your Switch. Then, exit joycontrol
1. Run `fakecon.py` in the same way as `joycontrol`. For example, if you use the joycontrol with `-r [MAC ADDRESS] PRO_CONTROLLER`, please do the same with `fakecon.py`!
1. Fakecon will then start on `localhost:5000`. Visit [the site](http://localhost:5000) from any browser (Chrome-based browsers seem to work best)
1. Your input in the site will be captured, and if it corresponds to any of the controller keys, it will be sent to the switch!

## Installation and Setup

### Installation

> TODO

### Setup

Running it is pretty standard. You may remap buttons with the `remap` button in the site. Find the controller button you wish to remap, and press the edit button, then hit the button you want mapped to the given controller button.

Pressing the clear button will clear the output log on the top of the screen.

The currently loaded key bindings will be printed on the bottom of the screen.

## TODO

- Create an easy_install package
- Allow importing an exported JSON
- Save controller mappings in the browser storage
- Use the Gamepad API so other controllers can be used (Such as an xbox one controller)
- Allow multi-directional joystick input
