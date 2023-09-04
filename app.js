let progressBar = document.querySelector(".progress-bar");
let time = document.getElementById('time');
var alarm = new Audio('assets/Alarm06.wav');
let start_stop_button = document.getElementById("startstop");
let interval;
let progressValue = 0;
let progressEndValue = 360;
let pomodoro= 50
let short_break = 10
let long_break = 30
let modes = document.querySelectorAll(".mode-selection");
let selected_mode = modes[0]
let modes_list = [[modes[0],pomodoro],[modes[1],short_break],[modes[2],long_break]]
console.log(modes)
mode_selection();
reset();

a();
function a(){
    start_stop_button.addEventListener('click',start_stop)
}


function mode_selection(){
    modes.forEach(element => {
        element.addEventListener('click',() => {
            console.log(element.textContent)
            element.classList.add('selected');
            selected_mode.classList.remove('selected');
            selected_mode = element;
            start_stop_button.textContent = 'Start';
            reset();


        })
    });

}

function reset(){
    progressBar.style.background = `conic-gradient(
        var(--theme-color) ${0}deg,
        var(--primary-dark) ${0}deg
    )`;
    progressValue = 0
    clearInterval(interval)
    if (selected_mode.textContent == 'pomodoro'){
        time.textContent = `${pomodoro}:00`

    }
    else if (selected_mode.textContent == 'short break'){
        time.textContent = `${short_break}:00`
        
    }
    else if (selected_mode.textContent == 'long break'){
        time.textContent = `${long_break}:00`
    }

    
}

function set_timer_text(){
    let array = time.textContent.split(':');
    let min =parseInt(array[0]);
    let sec = parseInt(array[1]);
    
    if(sec==0){
        sec = 59;
        min = min -1;

        min = min.toString();
        sec = sec.toString();
        time.textContent = min.concat(':',sec);
    }
    else{
        sec = sec-1;
    }
    
    if(sec < 10){
        sec = sec.toString();
        sec = "0".concat(sec);

    }
    if(min < 10){
        min = min.toString();
        min = "0".concat(min);
        
    }
    min = min.toString();
    sec = sec.toString();
    time.textContent = min.concat(':',sec);

}

function timer(){
    progressValue++;
    console.log(progressValue)
    let deg = progressValue * (360/(progressEndValue*40))
    progressBar.style.background = `conic-gradient(
        var(--theme-color) ${deg}deg,
        var(--primary-dark) ${deg}deg
    )`;
    console.log(deg)
    console.log(progressEndValue)
    if (progressValue % 40 == 0){
        console.log(time.textContent)
        set_timer_text();
        
    }





    if(progressValue == progressEndValue*40){
        start_stop_button.textContent = 'Restart';
        clearInterval(interval);
        alarm.play();
        reset();
    }



}

function start_stop(){
    if(start_stop_button.textContent == 'Start'){
        start_stop_button.textContent = 'Stop';
        if (selected_mode.textContent == 'pomodoro'){
            min = pomodoro
    
        }
        else if (selected_mode.textContent == 'short break'){
            min = short_break
            
        }
        else if (selected_mode.textContent == 'long break'){
            min = long_break
        }

        progressEndValue = min*60
        interval = setInterval(timer,25);
        console.log(progressValue)
    }
    else if(start_stop_button.textContent == 'Stop'){
        start_stop_button.textContent = 'Start';
        clearInterval(interval)
        console.log(progressValue)
    }
    else if(start_stop_button.textContent == 'Restart'){
        start_stop_button.textContent = 'Stop'
        progressValue = 0;
        console.log(progressValue)
        interval = setInterval(timer,25);
        
        
    }


}


