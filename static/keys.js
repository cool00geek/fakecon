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

    MINUS: '.', // "."
    CAPTURE: ',', // ","

    ZR: 'u', // "u"
    R: 'o', // "o"

    RIGHT_STICK_L: '4', // "4"
    RIGHT_STICK_R: '6', // "6"
    RIGHT_STICK_U: '8', // "8"
    RIGHT_STICK_D: '2', // "2"

    Y: 'j', // "j"
    A: 'l', // "l"
    X: 'i', // "i"
    B: 'k', // "k"
    PLUS: '\'', // "'"
    HOME: 'Control', // "ctrl"
};

var curr_capture = '';

/*
// Load the store
const Store = require('electron-store');
const store = new Store();
*/

var CURR_MAPPINGS = {};
var TEMP_MAPPINGS = {}

function keyup(e){
    console.log(e.key + " Has been released")
    if (e.key  == CURR_MAPPINGS.ZL){
        releaseBtn('zl')
    } else if (e.key  == CURR_MAPPINGS.L) {
        releaseBtn('l')
    } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_L) {
        setStick('l', 'hcenter');
        //resetStick('l')
    } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_R) {
        setStick('l', 'hcenter');
        //resetStick('l');
    } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_U) {
        setStick('l', 'vcenter');
        //resetStick('l');
    } else if (e.key  == CURR_MAPPINGS.LEFT_STICK_D) {
        setStick('l', 'vcenter');
        //resetStick('l');
    }  else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_L) {
        releaseBtn('left')
    } else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_R) {
        releaseBtn('right')
    } else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_U) {
        releaseBtn('up')
    } else if (e.key  == CURR_MAPPINGS.LEFT_DPAD_D) {
        releaseBtn('down')
    } else if (e.key  == CURR_MAPPINGS.MINUS) {
        releaseBtn('minus')
    } else if (e.key  == CURR_MAPPINGS.CAPTURE) {
        releaseBtn('capture')
    } else if (e.key  == CURR_MAPPINGS.ZR) {
        releaseBtn('zr')
    } else if (e.key  == CURR_MAPPINGS.R) {
        releaseBtn('r')
    } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_L) {
        setStick('r', 'hcenter');
        //resetStick('r');
    } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_R) {
        setStick('r', 'hcenter');
        //resetStick('r');
    } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_U) {
        setStick('r', 'vcenter');
        //resetStick('r');
    } else if (e.key  == CURR_MAPPINGS.RIGHT_STICK_D) {
        setStick('r', 'vcenter');
        //resetStick('r');
    } else if (e.key  == CURR_MAPPINGS.Y) {
        releaseBtn('y')
    } else if (e.key  == CURR_MAPPINGS.A) {
        releaseBtn('a')
    } else if (e.key  == CURR_MAPPINGS.X) {
        releaseBtn('x')
    } else if (e.key  == CURR_MAPPINGS.B) {
        releaseBtn('b')
    } else if (e.key  == CURR_MAPPINGS.PLUS) {
        releaseBtn('plus')
    } else if (e.key  == CURR_MAPPINGS.HOME) {
        releaseBtn('home')
    }
}

function keydn(e){
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
}

function setStick(stick, direction) {
    appendOutput("Setting stick: " + stick + " to " + direction);

    if (direction == 'left'){
        var data = { stick: stick,
                direction: 'h',
                magnitude: 0
        };
    } else if (direction == 'right'){
        var data = { stick: stick,
            direction: 'h',
            magnitude: 4095
        };
    } else if (direction == 'hcenter'){
        var data = { stick: stick,
            direction: 'h',
            magnitude: 2048
        };
    } else if (direction == 'down'){
        var data = { stick: stick,
            direction: 'v',
            magnitude: 0
        };
    } else if (direction == 'up'){
        var data = { stick: stick,
            direction: 'v',
            magnitude: 4095
        };
    } else if (direction == 'vcenter'){
        var data = { stick: stick,
            direction: 'v',
            magnitude: 2048
        };
    }
    var headers = {'Content-Type': 'application/json'};


    axios.post('/stick', data, {headers: headers}).then((result) => {
        getCommandOutput().className = "textarea is-success";
    }).catch(() => {
        getCommandOutput().className = "textarea is-danger";
        console.log(error);
    });
}

function pushBtn(btn) {
    appendOutput("Pushing button: " + btn);
    axios.get('/btn/' + btn).then((result) => {
        getCommandOutput().className = "textarea is-success";
    }).catch(() => {
        getCommandOutput().className = "textarea is-danger";
    });
};

function releaseBtn(btn) {
    appendOutput("Pushing button: " + btn);
    axios.get('/unbtn/' + btn).then((result) => {
        getCommandOutput().className = "textarea is-success";
    }).catch(() => {
        getCommandOutput().className = "textarea is-danger";
    });
};


function listeners() {
    // https://stackoverflow.com/questions/13640061/get-a-list-of-all-currently-pressed-keys-in-javascript
    window.addEventListener("keydown", keydn, false);
    window.addEventListener('keyup', keyup, false);

}

function removeListeners(){
    window.removeEventListener('keyup', keyup, false);
    window.removeEventListener('keydown', keydn, false);
}

var init = function() {
    /*
    // Load mappings to what we want to use
    storedMappings = store.get('mappings');
    if (storedMappings == null){
        CURR_MAPPINGS = DEFAULT_MAPPINGS;
    } else {
        CURR_MAPPINGS = storedMappings
    }*/
    CURR_MAPPINGS = DEFAULT_MAPPINGS;
    updateMappingOutput();
    appendOutput("Loaded mappings");
    listeners()
}

function updateMappingOutput() {
    getMappingOutput().value = JSON.stringify(CURR_MAPPINGS, null, " ");
}

function saveMappings() {
    store.set('mappings', CURR_MAPPINGS)
    updateMappingOutput();
    alert("Mappings have been saved!");
}

function remapUp(e){
    console.log(e.key + " Has been released")
    window.removeEventListener("keyup", remapUp, false);
    TEMP_MAPPINGS[curr_capture] = e.key;
    console.log(curr_capture, " is now ", e.key);
    curr_capture = '';
    generateModal();
}

function capture(key){
    console.log("Capture called!")
    curr_capture = key;
    window.addEventListener("keyup", remapUp, false)
}

function remap(){
    TEMP_MAPPINGS = CURR_MAPPINGS;
    generateModal()
}

function saveMap(){
    CURR_MAPPINGS = TEMP_MAPPINGS;
    TEMP_MAPPINGS = {};
    updateMappingOutput();
    cancelRemap();
}

function generateModal(){
    removeListeners()
    tableBody = document.getElementById("mTable");
    while (tableBody.firstChild) {
        tableBody.firstChild.remove();
    }
    for (var key in TEMP_MAPPINGS){
        nextElem = document.createElement('tr');
        leftCell = document.createElement('td');
        rightCell = document.createElement('td');
        btnCell = document.createElement('td');
        btn = document.createElement('button')

        leftCell.innerHTML = key;
        rightCell.innerHTML = TEMP_MAPPINGS[key];

        btn.className = "button is-primary"
        btn.innerHTML = "<i class=\"fa fa-pencil\"></i>"
        btn.onclick = (function(key){
            return function(){
                capture(key);
            }
        })(key);

        nextElem.appendChild(leftCell);
        nextElem.appendChild(rightCell);
        btnCell.appendChild(btn);
        nextElem.appendChild(btnCell);
        tableBody.appendChild(nextElem)
    }
    modal = document.getElementById("m");
    modal.className = "modal is-active"
}

function cancelRemap(){
    modal = document.getElementById("m");
    modal.className = "modal"
    listeners();
}

function waitSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  }

async function checkLatency() {
    var best = 999
    var worst = 0
    var avg = 0
    appendOutput("Testing latency...");

    for (var i = 0; i < 10; i++){
        var n = +new Date();
        await axios.get('/latency').then((response) => {
            var newN = response.data.time;
            var currN = (newN - n);
            if (currN < best){
                best = currN;
            }
            if (currN > worst){
                worst = currN
            }
            avg += currN 
        });
        await waitSecond();
        
    }
    avg /= 10;
    appendOutput("Latency: Best/Worst/Avg: " + best + "/" + worst + "/" + avg);
    
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

/*
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
*/

function appendOutput(msg) { getCommandOutput().value = (msg+'\n') + getCommandOutput().value; };

function clearCmd() { 
    getCommandOutput().value = ''; 
    getCommandOutput().className = "textarea";
}

function toggle(){
    var debugSect = document.getElementById('output_section')
    debugSect.classList.toggle("is-hidden-desktop");	
}
