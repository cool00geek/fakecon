# Fakecon

A bash tool that allows emulating a Nintendo Switch pro controller using mart1nro/joycontrol

## Usage

Follow the instructions at [the joycontrol repo](https://github.com/mart1nro/joycontrol) to setup
joycontrol. I tested this on a Manjaro system, and it worked fine.

Then, install tmux, run tmux, setting the window name to 'sw' (Ctrl+B, $, sw, enter).

Then, run joycontrol as specified inside the Tmux window

Finally, open a new terminal window, and run `controller.sh`. You may modify any of the variables to any key that enters a character - modifiers and special keys WILL NOT WORK!

Now, if you press any of the keys you have configured in the new terminal window, it will be sent to your switch!

Note this is a proof of concept only! There are many bugs!
