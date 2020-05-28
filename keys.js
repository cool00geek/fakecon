var session = 'sw';

var DEFAULT_MAPPINGS = {
    ZL: 'q', // 'q'
    L: 'e', // 'e'

    LEFT_STICK_L: 'a', // 'a'
    LEFT_STICK_R: 'd', // 'd'
    LEFT_STICK_U: 'w', // 'w'
    LEFT_STICK_D: 's', // 's'

    LEFT_DPAD_L: '', //
    LEFT_DPAD_R: '', //
    LEFT_DPAD_U: '', //
    LEFT_DPAD_D: '', //

    MINUS: '\\', // "\"
    CAPTURE: '.', // "."

    ZR: 'i', // "i"
    R: 'p', // "p"

    RIGHT_STICK_L: '4', // "4"
    RIGHT_STICK_R: '6', // "6"
    RIGHT_STICK_U: '8', // "8"
    RIGHT_STICK_D: '2', // "2"

    Y: 'j', // "j"
    A: 'l', // "l"
    X: 'i', // "i"
    B: 'k', // "k"
    PLUS: '\'', // "'"
    HOME: '/', // "/"
};

// Load the store
const Store = require('electron-store');
const store = new Store();

var CURR_MAPPINGS = {};

var init = function() {
    // Load mappings to what we want to use
    storedMappings = store.get('mappings');
    if (storedMappings == null){
        CURR_MAPPINGS = DEFAULT_MAPPINGS;
    } else {
        CURR_MAPPINGS = storedMappings
    }
    updateMappingOutput();
    appendOutput("Loaded mappings");
}

function updateMappingOutput() {
    getMappingOutput().value = JSON.stringify(CURR_MAPPINGS, null, " ");
}

function saveMappings() {
    store.set('mappings', CURR_MAPPINGS)
    updateMappingOutput();
    alert("Mappings have been saved!");
}

// https://stackoverflow.com/a/30800715
function download() {
    // Download the mappings as a JSON
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(CURR_MAPPINGS));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "mappings.json");
    dlAnchorElem.click();
}

function openFile() {
    const {remote} = require('electron'); 
    const fs = require('fs');
    var dialog = remote.dialog;
    var win = remote.getCurrentWindow()

    let options = {
        title: "Select JSON",
        buttonLabel: "Load",
        filters: [
            {name: 'JSON', extensions: ['json']},
        ],
        properties: ['openFile']
    };
    

    filepath = dialog.showOpenDialog(win, options).then((data) => {
        fs.readFile(data.filePaths[0], 'utf-8', (err, data) => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
    
            // Change how to handle the file content
            var jsobj = JSON.parse(data)
            CURR_MAPPINGS = jsobj
            //alert("Imported configuration!");
            saveMappings();
        });
    });
}

// https://stackoverflow.com/questions/13640061/get-a-list-of-all-currently-pressed-keys-in-javascript
var is = require("electron-is");
window.addEventListener("keydown",
    function(e){
        console.log(e.key + " Has been pressed")
        if (e.key  == CURR_MAPPINGS.ZL){
            pushBtn('zl')
        } else if (e.key  == CURR_MAPPINGS.L) {
            pushBtn('l')
        } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_L) {
            setStick('l', 'left')
        } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_R) {
            setStick('l', 'right')
        } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_U) {
            setStick('l', 'up')
        } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_D) {
            setStick('l', 'down')
        } else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_L) {
            pushBtn('left')
        } else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_R) {
            pushBtn('right')
        } else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_U) {
            pushBtn('up')
        } else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_D) {
            pushBtn('down')
        } else if (e.key  == CURR_MAPPINGS.MINUS) {
            pushBtn('minus')
        } else if (e.key  == CURR_MAPPINGS.CAPTURE) {
            pushBtn('capture')
        } else if (e.key  == CURR_MAPPINGS.ZR) {
            pushBtn('zr')
        } else if (e.key  == CURR_MAPPINGS.R) {
            pushBtn('r')
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_L) {
            setStick('r', 'left')
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_R) {
            setStick('r', 'right')
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_U) {
            setStick('r', 'up')
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_D) {
            setStick('r', 'down')
        } else if (e.key  == CURR_MAPPINGS.Y) {
            pushBtn('y')
        } else if (e.key  == CURR_MAPPINGS.A) {
            pushBtn('a')
        } else if (e.key  == CURR_MAPPINGS.X) {
            pushBtn('x')
        } else if (e.key  == CURR_MAPPINGS.B) {
            pushBtn('b')
        } else if (e.key  == CURR_MAPPINGS.PLUS) {
            pushBtn('plus')
        } else if (e.key  == CURR_MAPPINGS.HOME) {
            pushBtn('home')
        }
    },
false);

window.addEventListener('keyup',
    function(e){
        console.log(e.key + " Has been released")
        if (e.key  == CURR_MAPPINGS.LEFT_STICK_L) {
            reset('l')
        } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_R) {
            reset('l');
        } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_U) {
            reset('l');
        } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_D) {
            reset('l');
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_L) {
            reset('r');
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_R) {
            reset('r');
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_U) {
            reset('r');
        } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_D) {
            reset('r');
        }
    },
false);

function appendOutput(msg) { getCommandOutput().value = (msg+'\n') + getCommandOutput().value; };

function clearCmd() { 
    getCommandOutput().value = ''; 
    getCommandOutput().className = "textarea";
}

function runCommand(arr){
    const process = require('child_process');   // The power of Node.JS

    // https://github.com/martinjackson/electron-run-shell-example/blob/master/gui-funct.js
    // https://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js
    var child = process.spawn('tmux', arr);
    getCommandOutput().className = "textarea is-primary"
   
    child.stdout.on('data', function (data) {
        appendOutput(data);
    });
    
    child.stderr.on('data', function (data) {
        if (data.includes('error connecting to') || data.includes('no server running')){
            appendOutput('Error: Main process not running');
        } else {
            appendOutput('stderr:' +data );
            getCommandOutput().className = "textarea is-danger"
        }   
    });
    
    child.on('close', function (code) {
        if (code == 0){
            //console.log("Child process done")
        }
        else{
            console.log("Child process fail: " + code)
            getCommandOutput().className = "textarea is-danger"
        }
    });
}

function setStick(stick, direction) {
    let chain = 'stick ' + stick + ' ' + direction + '';
    appendOutput("Setting stick: " + stick + " to " + direction);

    runCommand(["send-keys", "-t", session, chain, "ENTER"]);
}

function reset(stick) {
    appendOutput("Resetting stick: " + stick);
    
    runCommand(["send-keys", "-t", session, 'stick ' + stick + ' center', "ENTER"]);
}

function pushBtn(btn) {
    appendOutput("Pushing button: " + btn);
    
    runCommand(["send-keys", "-t", session, "'" + btn + "'", "ENTER"]);
};