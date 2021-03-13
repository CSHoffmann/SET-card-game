window.onload = function() {

    /* GLOBAL SCOPE VARIABLES */
    const menuView = document.getElementById("menu-view");  // main menu screen
    const gameView = document.getElementById("game-view");  // game screen
    const menuBtn = document.getElementById("back");        // back to main menu button
    const startBtn = document.getElementById("start");      // start button
    const displayTime = document.getElementById("time");    // display for time in game view


    /* FUNCTION DEFINITIONS */
    function game() {   //swapping visibility from menu to game by adding and removing a hidden class
        menuView.classList.add("hidden");
        gameView.classList.remove("hidden");
    }

    function menu() {   // swapping visibility from game to menu by adding and removing a hidden class
        gameView.classList.add("hidden");
        menuView.classList.remove("hidden");
    }

    function startTimer() {
        /* 
            get the user selected value of time (in seconds) from the dropdown
            track two variables, the minutes place and seconds place
            minute [0, 5] and seconds [0, 59]
            Special case: if user selectes "unlimited" then the timer starts at 0:00 and increments each second
        */
       let userTime = document.getElementById("dropdown").value; // user selected time as type string

       if (userTime == "none") { // case when user selects unlimted time 
           countUpTimer();
       } else { // all other cases (user selects a finite time)
           countDownTimer(userTime, displayTime);
       }
    }

    function countDownTimer(duration, display) {
        duration = parseInt(duration);
        let timer = setInterval(() => {
            let seconds = duration % 60;
            let minutes = Math.floor(duration / 60);

            seconds = seconds < 10 ? "0"+seconds : seconds; // conditional operation for seconds
            display.textContent = "0"+minutes+":"+seconds; // updating visual timer
            
            if(--duration < 0) { // interval ends once total time falls to 0
                clearInterval(timer);
            }
        }, 1000);
    }

    function countUpTimer() {
        // function for timer that increments until game ends
    }

    /* MAIN FUNCTION - Beginning of Program */
    function main() {
        startBtn.addEventListener("click", function() {
            /* 
            - when the start button is pressed, the set counter should equal 0, the timer should 
            start based on the time selected and the view should change to game view
            - set count is 0
            - call timer function
             */
            startTimer();
            game();
        })

        menuBtn.addEventListener("click", function() {
            menu();
        })
    }
    
    main();
}