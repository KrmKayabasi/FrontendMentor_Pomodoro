let progressBar = document.querySelector(".progress-bar");
let inner = document.querySelector(".inner");
let time = document.getElementById('time');
var alarm = new Audio('assets/Alarm06.wav');
let start_stop_button = document.getElementById("startstop");
const root = document.querySelector(':root');
let fullscreen = document.getElementById('fullscreen')


let temporary_pomodoro = 50
let temporary_short = 10
let temporary_long = 20
let interval;
let progressValue = 0;
let progressEndValue = 360;
let pomodoro= 50
let short_break = 10
let long_break = 20
let modes = document.querySelectorAll(".mode-selection");
let selected_mode = modes[0]
let modes_list = [[modes[0],pomodoro],[modes[1],short_break],[modes[2],long_break]]
let setting_button = document.getElementById('setting-button')
let close_button = document.getElementById('setting-close')
let settings = document.querySelector(".setting-popup")
let pomodoro_up = document.getElementById('pomodoro-up')
let pomodoro_down = document.getElementById('pomodoro-down')
let short_up = document.getElementById('short-up')
let short_down = document.getElementById('short-down')
let long_up = document.getElementById('long-up')
let long_down = document.getElementById('long-down')
let apply_button= document.getElementById('apply')
pomodoro_up.addEventListener('click',function (){
    set_timer('pomodoro-up','pomodoro-value')
})
pomodoro_down.addEventListener('click',function (){
    set_timer('pomodoro-down','pomodoro-value')
})
short_up.addEventListener('click',function (){
    set_timer('short-up','short-value')
})
short_down.addEventListener('click',function (){
    set_timer('short-down','short-value')
})
long_up.addEventListener('click',function (){
    set_timer('long-up','long-value')
})
long_down.addEventListener('click',function (){
    set_timer('long-down','long-value')
})

apply_button.addEventListener('click',function (){
    apply()

})


setting_button.addEventListener('click',open_settings)
close_button.addEventListener('click',close_settings)

mode_selection();
reset();



start_stop_button.addEventListener('click',start_stop)



function mode_selection(){
    modes.forEach(element => {
        element.addEventListener('click',() => {
            
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
    console.log(inner.offsetWidth,inner.offsetHeight)
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
    
    let deg = progressValue * (360/(progressEndValue*40))
    progressBar.style.background = `conic-gradient(
        var(--theme-color) ${deg}deg,
        var(--primary-dark) ${deg}deg
    )`;
    
    
    if (progressValue % 40 == 0){
        
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
        
    }
    else if(start_stop_button.textContent == 'Stop'){
        start_stop_button.textContent = 'Start';
        clearInterval(interval)
        
    }
    else if(start_stop_button.textContent == 'Restart'){
        start_stop_button.textContent = 'Stop'
        progressValue = 0;
        
        interval = setInterval(timer,25);
        
        
    }


}

function open_settings(){

    settings.classList.remove("hidden")
}

function close_settings(){

    settings.classList.add("hidden")
}

function set_timer(a,type){
    let text = document.getElementById(type)
    let temporary_text = text.innerHTML
    if (a.includes('up')){
        
        if (parseInt(text.textContent) == 60){
            let temporary_text ="60"
            text.innerHTML = temporary_text
        }
        else{
            
            let temporary_text = (parseInt(text.textContent) + 1).toString()
            text.innerHTML = temporary_text
        }


        
        


        if (a.includes('pomodoro')){
            temporary_pomodoro = parseInt(temporary_text) + 1
            console.log(temporary_text)
        }
        if (a.includes('short')){
            temporary_short = parseInt(temporary_text) +1
            console.log(temporary_text)
        }
        if(a.includes('long')){
            temporary_long = parseInt(temporary_text) + 1
            console.log(temporary_text)
        }

    }
    else{
        let text = document.getElementById(type)
        if (parseInt(text.textContent) == 1){
            temporary_text="1"
            text.innerHTML = temporary_text
            if (a.includes('pomodoro')){
                temporary_pomodoro = parseInt(temporary_text)
            }
            if (a.includes('short')){
                temporary_short = parseInt(temporary_text)
            }
            if (a.includes('long')){
                temporary_long = parseInt(temporary_text)
            }
        }
        else{
            
            let temporary_text = (parseInt(text.textContent) - 1).toString()
            text.innerHTML = temporary_text
            if (a.includes('pomodoro')){
                temporary_pomodoro = parseInt(temporary_text)
            }
            if (a.includes('short')){
                temporary_short = parseInt(temporary_text)
            }
            if (a.includes('long')){
                temporary_long = parseInt(temporary_text)
            }
        }


  
        

    }
    
    



}


function apply(){
    getSelectedRadio_Font()
    getSelectedRadio_Color()
    root.style.setProperty('--font', `var(--font-${getSelectedRadio_Font()}')`)
    root.style.setProperty('--theme-color', `var(--theme-${getSelectedRadio_Color()}')`)
    pomodoro = temporary_pomodoro
    console.log(temporary_pomodoro,temporary_short,temporary_long)
    short_break = temporary_short
    long_break = temporary_long
    close_settings()
    console.log('kapadim')
    start_stop_button.textContent = 'Start';
    root.style.setProperty('--font', `var(--font-${getSelectedRadio_Font()})`)
    root.style.setProperty('--theme-color', `var(--theme-${getSelectedRadio_Color()})`)
    reset()

}

function getSelectedRadio_Font() {
    let radioButtons = document.getElementsByName('foo');
    for (let radio of radioButtons) {
       if (radio.checked) {
          let font = radio.getAttribute('id')
          root.style.setProperty('--font', `var(--font-${font}')`)
          
          return font
       }
    }
 }

 function getSelectedRadio_Color() {
    let radioButtons = document.getElementsByName('foo2');
    for (let radio of radioButtons) {
       if (radio.checked) {
          let color = radio.getAttribute('id')
         
          return color
       }
    }
 }

 function fullscreen_open(){
    document.documentElement.requestFullscreen();
    fullscreen.querySelector('img').src = 'assets/fullscreen_close.svg'
 }

 function fullscreen_close(){
    document.exitFullscreen();

    fullscreen.querySelector('img').src = 'assets/fullscreen_open.svg'

 }

 function fullscreen_manager(){
    if (document.fullscreenElement){
        fullscreen_close();
    }
    if (!document.fullscreenElement){
        fullscreen_open();
    }

 }

 fullscreen.addEventListener('click',fullscreen_manager);


 document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ){
        console.log('space basidsfd')
        start_stop();
        alarm.pause();

    }
    if (e.key == "r" || e.key == "R" || e.keyCode == 82 || e.keyCode == 114){
        console.log('R basildi')
        reset();
        start_stop_button.textContent = 'Start';
        alarm.pause();
    }
    if (e.key == "f" || e.key == "F" || e.keyCode == 70 || e.keyCode == 102){
        console.log('F basildi')
        fullscreen_manager();
    }
 }
