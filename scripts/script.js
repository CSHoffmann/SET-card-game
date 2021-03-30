window.onload = function() {

    /* GLOBAL SCOPE VARIABLES */
    const menuView = document.getElementById("menu-view");  // main menu screen
    const gameView = document.getElementById("game-view");  // game screen
    const menuBtn = document.getElementById("back");        // back to main menu button
    const startBtn = document.getElementById("start");      // start button
    const displayTime = document.getElementById("time");    // display for time in game view
    const gameBoard = document.getElementById("game");      // game board

    /* EVENT LISTENERS */
    startBtn.addEventListener("click", function() {
        startTimer();
        game();
        toggleView();
    })

    menuBtn.addEventListener("click", function() {
        menu();
        toggleView();
    })

    /* FUNCTION DEFINITIONS */
    /** Chooses which timer to start depending on user input */
    function startTimer() { 
       let userTime = document.getElementById("dropdown").value;

       if (userTime == "none") {
           countUpTimer(userTime, displayTime);
       } else {
           countDownTimer(userTime, displayTime);
       }
    }

    /** Initalizes timer that starts at an inputted time and increments by -1. Stops when it reaches 00:00 */
    function countDownTimer(duration, display) { // timer starts from given time and counts down to 0
        duration = parseInt(duration);
        const timer = setInterval(() => {
            let seconds = duration % 60;
            let minutes = Math.floor(duration / 60);

            seconds = seconds < 10 ? "0"+seconds : seconds; 
            display.textContent = "0"+minutes+":"+seconds; 
            
            if(--duration < 0) { // interval ends once total time falls to 0
                clearInterval(timer);
            }
            if(menuBtn.addEventListener("click", function() { clearInterval(timer) })); // clears timer
        }, 1000);
    }

    /** Initializes timer, starts at 00:00 and increments by one second indefinately */
    function countUpTimer(duration, display) { // timer starts at 0 and increments up indefinitely
        duration = 0;
        let timer = setInterval(() => {
            let seconds = duration % 60;
            let minutes = Math.floor(duration / 60);

            seconds = seconds < 10 ? "0"+seconds : seconds;
            minutes = minutes < 10 ? "0"+minutes : minutes;

            display.textContent = minutes+":"+seconds;
            ++duration; // time increments by 1

            if(menuBtn.addEventListener("click", function() {clearInterval(timer)})); // clears timer
        }, 1000);
    }

    /**
        * Function that generates cards on the board
        * 1. Creat a new Card object with random properties
        * 2. Create a new div element (card) and give it class .card and add event listener
        * 3. Create a new img element (img) and give it class .card-img
        * 4. Assign img.src to Card.imgPath()
        * 5. Append img to card
        * 6. Append card to gameBoard
        */
    function game() {
        const STYLES = ["outline", "striped", "solid"]   // array of possible card STYLES
        const SHAPES = ["diamond", "oval", "squiggle"]   // array of possible card SHAPES
        const COLORS = ["green", "purple", "red"]        // array of possible card COLORS
        const COUNT = [1, 2, 3]                          // array of possible card COUNTS (or amoung of cards)  

        /** Returns an array of random Card objects */
        function getRandomCards() {
            let temp = [] // empty array

            for(let i = 0; i < 12; i++) {
                // three int variables with value randomly selected from range [1, 3]
                let randomStyle = parseInt(3 * Math.random());  
                let randomShape = parseInt(3 * Math.random());
                let randomColor = parseInt(3 * Math.random());
    
                // create new Card object and assign random properties
                let newCard = new Card(STYLES[randomStyle], SHAPES[randomShape], COLORS[randomColor]);
                temp.push(newCard); // add Card object to cardArray
            }
            return temp;
        }
        const cardArray = getRandomCards(); // cardArray is now an array of Card objects w/ random properties
        
        /** Creates DOM Elements and appends them to the gameBoard */
        for(let i = 0; i < 12; i++) {

            let card = document.createElement("div"); // create new div element
            card.classList.add("card"); // give div element (card) class .card

            let img = document.createElement("img"); // create new img element
            img.classList.add("card-image") // give element (img) class .card-image
            img.src = cardArray[i].imgPath(); // add image source to my card object
            
            card.appendChild(img); // append img to card
            gameBoard.appendChild(card); // append card to gameBoards
        }

        /* let cardsArray = document.querySelectorAll(".card");
        console.log(cardsArray)

        cardsArray.forEach(element => {
            element.addEventListener("click", function() {
                element.classList.toggle("selected");
            })
        }); */

        /** Adds event listeners to each card */
        /* for(i = 0; i < 12; i++) { // creates 12 divs with class "card" and appends them to game board
            var card = document.createElement("div"); 
            card.classList.add("card"); 
            gameBoard.appendChild(card);  */
        
    }

    /** Removes all cards from the game board */
    function menu() {   
        gameBoard.textContent = ""; // hack that removes all child elements, probably not the best solution but will serve as temp solution
    }

    /** Toggles between game view (the board with cards) and menu view (instructions, setting up time) */
    function toggleView() {
        menuView.classList.toggle("hidden");
        gameView.classList.toggle("hidden");
    }

    /** CLASS CARD - Constructor for Card objects */
    class Card {
        constructor(style, shape, color, count) {
            this.style = style;
            this.shape = shape;
            this.color = color;
            this.count = count;
        }
        imgPath() {
            return "img/"+this.style+"-"+this.shape+"-"+this.color+".png"; // returns image path of Card
        }
    }
}