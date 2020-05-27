#! /bin/bash

SESSION='sw'

ZL='q'
L='e'

LEFT_STICK_L="a"
LEFT_STICK_R="d"
LEFT_STICK_U="w"
LEFT_STICK_D="s"

LEFT_DPAD_L="undef"
LEFT_DPAD_R="undef"
LEFT_DPAD_U="undef"
LEFT_DPAD_D="undef"

MINUS="\\"
CAPTURE="."

ZR='i'
R='p'

RIGHT_STICK_L="4"
RIGHT_STICK_R="6"
RIGHT_STICK_U="8"
RIGHT_STICK_D="2"

RIGHT_DPAD_L="j"
RIGHT_DPAD_R="l"
RIGHT_DPAD_U="i"
RIGHT_DPAD_D="k"

PLUS="'"
HOME="/"


while true; do
read -rsn1 input
if [ "$input" = ZL ]; then
    echo "hello world"
elif [ "$input" = $ZL ]; then
    tmux send-keys -t $SESSION "'zl'" ENTER
elif [ "$input" = $L ]; then
    tmux send-keys -t $SESSION "'l'" ENTER
elif [ "$input" = $LEFT_STICK_L ]; then
    tmux send-keys -t $SESSION "'stick' l left" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick l center" ENTER
elif [ "$input" = $LEFT_STICK_U ]; then
    tmux send-keys -t $SESSION "'stick' l up" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick l center" ENTER
elif [ "$input" = $LEFT_STICK_D ]; then
    tmux send-keys -t $SESSION "'stick' l down" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick l center" ENTER
elif [ "$input" = $LEFT_STICK_R ]; then
    tmux send-keys -t $SESSION "'stick' l right" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick l center" ENTER
elif [ "$input" = $LEFT_DPAD_L ]; then
    tmux send-keys -t $SESSION "'left'" ENTER
elif [ "$input" = $LEFT_DPAD_R ]; then
    tmux send-keys -t $SESSION "'right'" ENTER
elif [ "$input" = $LEFT_DPAD_U ]; then
    tmux send-keys -t $SESSION "'up'" ENTER
elif [ "$input" = $LEFT_DPAD_D ]; then
    tmux send-keys -t $SESSION "'down'" ENTER
elif [ "$input" = $MINUS ]; then
    tmux send-keys -t $SESSION "'minus'" ENTER
elif [ "$input" = $CAPTURE ]; then
    tmux send-keys -t $SESSION "'capture'" ENTER
elif [ "$input" = $ZR ]; then
    tmux send-keys -t $SESSION "'zr'" ENTER
elif [ "$input" = $R ]; then
    tmux send-keys -t $SESSION "'r'" ENTER
elif [ "$input" = $RIGHT_STICK_L ]; then
    tmux send-keys -t $SESSION "'stick' r left" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick r center" ENTER
elif [ "$input" = $RIGHT_STICK_R ]; then
    tmux send-keys -t $SESSION "'stick' r right" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick r center" ENTER
elif [ "$input" = $RIGHT_STICK_U ]; then
    tmux send-keys -t $SESSION "'stick' r up" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick r center" ENTER
elif [ "$input" = $RIGHT_STICK_D ]; then
    tmux send-keys -t $SESSION "'stick' r down" ENTER
    sleep 0.1
    tmux send-keys -t $SESSION "stick r center" ENTER
elif [ "$input" = $RIGHT_DPAD_L ]; then
    tmux send-keys -t $SESSION "'y'" ENTER
elif [ "$input" = $RIGHT_DPAD_R ]; then
    tmux send-keys -t $SESSION "'a'" ENTER
elif [ "$input" = $RIGHT_DPAD_U ]; then
    tmux send-keys -t $SESSION "'x'" ENTER
elif [ "$input" = $RIGHT_DPAD_D ]; then
    tmux send-keys -t $SESSION "'b'" ENTER
elif [ "$input" = $PLUS ]; then
    tmux send-keys -t $SESSION "'plus'" ENTER
elif [ "$input" = $HOME ]; then
    tmux send-keys -t $SESSION "'home'" ENTER
fi
done