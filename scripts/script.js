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
       let userTime = document.getElementById("dropdown").value; // user selected time as type string

       if (userTime == "none") { // case when user selects unlimted time 
           countUpTimer(userTime, displayTime);
       } else { // all other cases (user selects a finite time)
           countDownTimer(userTime, displayTime);
       }
    }

    function countDownTimer(duration, display) {
        duration = parseInt(duration);
        let timer = setInterval(() => {
            let seconds = duration % 60;
            let minutes = Math.floor(duration / 60);

            seconds = seconds < 10 ? "0"+seconds : seconds; 
            display.textContent = "0"+minutes+":"+seconds; 
            
            if(--duration < 0) { // interval ends once total time falls to 0
                clearInterval(timer);
            }
            if(menuBtn.addEventListener("click", () => clearTimer(timer))); // clears timer
        }, 1000);
    }

    function countUpTimer(duration, display) { // function for timer that increments until game ends
        duration = 0;
        let timer = setInterval(() => {
            let seconds = duration % 60;
            let minutes = Math.floor(duration / 60);

            seconds = seconds < 10 ? "0"+seconds : seconds;
            minutes = minutes < 10 ? "0"+minutes : minutes;

            display.textContent = minutes+":"+seconds;
            ++duration; // time increments by 1

            if(menuBtn.addEventListener("click", () => clearInterval(timer))); // clears timer
        }, 1000);
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