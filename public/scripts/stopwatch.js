// DOM
// const subModuleName = require('./lender_dashboard');
const timeDisplay = document.querySelector('#time-display');
const playPauseCheckbox = document.querySelector('#playPauseCheckbox');
const resetbtn = document.querySelector('#resetbtn');
const savebtn = document.querySelector('#savetimebtn');
const moduleLender = document.querySelector('#moduleLender');

// variables to hold time
let seconds = 0;
let minutes = 0;
let hours = 0;

// add zero variables
let displaySecs = 0;
let displayMins = 0;
let displayHours = 0;

// var holds intervals
let interval = null;
let status = 'stopped';

// stop watch logic

function stopWatch(){
    seconds++;

    // logic is determines when increament next value

    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;
        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

       
    } 

    // seconds/hours/minutes dispaly
    if(displaySecs<10){
        displaySecs = "0"+seconds.toString();
    }else{
        displaySecs = seconds;
    }
    if(displayMins<10){
        displayMins = "0"+minutes.toString();
    }else{
        displayMins = minutes;
    }
    if(displayHours<10){
        displayHours= "0"+hours.toString();
    }else{
        displayHours = hours;
    }

 // display updates time 

 timeDisplay.innerHTML = `${displayHours} : ${displayMins} :   ${displaySecs}`;

}

// total time 

function totalTimeSpent(){
    // let totalTime = (Math.floor(hours*60+minutes+seconds/60));
    let totalTime = hours*60+minutes+seconds/60;
    console.log(totalTime);
    if(subModuleName === null){
        prompt('select submodule');
    }else{
        const send = {
            name: subModuleName,
            mainModelName: moduleLender.innerText,
            time: totalTime
        }
        console.log(send);
       saveTime(send).then(()=>{
           console.log(totalTime);
           console.log('saved');
       });

    }
   
    reset();
};


// --------- post request -----

async function saveTime(tTime) {
    await $.post('http://0.0.0.0:4000/timebox/saveme', tTime);
};

// --------------- start pose ----


function startStop(){
    if(status === 'stopped'){
        // start stop watch interval
        interval = window.setInterval(stopWatch, 1000.7);
        status = 'started'

    }else{
        window.clearInterval(interval);
        status = 'stopped';
    };
};


// start stop timer

    playPauseCheckbox.addEventListener('click', ()=>{
        startStop();
       
    });


// reset btn ...
function reset(){
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timeDisplay.innerHTML = '00 : 00 : 00';
    playPauseCheckbox.checked = true;
    
    if(status === 'started'){
        status = 'stopped';
    }

    
}

resetbtn.addEventListener('click', () => {
    reset();
});

