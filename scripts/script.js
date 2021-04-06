/** CLASS CARD DEFINITION - Class for Card objects. Card objects are constructed with 4 properties */
class Card {
    constructor(style, shape, color, count) {
        this.style = style;
        this.shape = shape;
        this.color = color;
        this.count = count;
        this.domElement;
    }
    imgPath() {
        return "img/"+this.style+"-"+this.shape+"-"+this.color+".png"; // returns image path of Card
    }
    domReference(element) {
        this.domElement = element;
    }
}

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
        gameBoard.textContent = ""; // removes all child elements, probably not the best solution but will serve as temp solution
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
    function countDownTimer(duration, display) {
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

            if(menuBtn.addEventListener("click", function() { clearInterval(timer) })); // clears timer
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
                // four variables <number> with a value randomly selected from range [1, 3]
                let randomStyle = parseInt(3 * Math.random());  
                let randomShape = parseInt(3 * Math.random());
                let randomColor = parseInt(3 * Math.random());
                let randomCount = parseInt(3 * Math.random());

                // create new Card object and assign random properties
                let newCard = new Card(STYLES[randomStyle], SHAPES[randomShape], COLORS[randomColor], COUNT[randomCount]);
                temp.push(newCard); // add Card object to the end of temp
                
                /** 
                 * Compares the newCard, which has just been pushed to the end of temp[] with the other
                 * Card objects in the temp array. If newCard is equivalent to any of the existing Card
                 * objects in the temp[] array, the it is poped out of the array and a newCard is generated
                 * by reducing the outer iterator by 1
                 * */
                for(let x = 1; x < temp.length; x++) {
                    if(JSON.stringify(newCard) == JSON.stringify(temp[x-1])) {
                        temp.pop(newCard)
                        i--;
                        break;
                    }
                }  
            }
            return temp;
        }
        const cardsArray = getRandomCards(); // cardsArray is now an array of Card objects w/ random properties
        console.log(cardsArray);

        /** 
         * Creates DOM Elements and appends them to the gameBoard
         * Also assigns each div DOM element (card) to the specific Card <object> .domElement property
         */
        for(let i = 0; i < 12; i++) {
            let currentCard = cardsArray[i]; // assigned to current Card <object> from the cardsArray

            let div = document.createElement("div"); // create new div element
            div.classList.add("card"); // give div element (card) class .card

            /** creating a number of <img> elements equal to the Card <object> count property */
            for(let u = 0; u < currentCard.count; u++) { 

                let img = document.createElement("img");    // create new img element
                img.classList.add("card-image")             // assign image with class .card-image
                img.src = currentCard.imgPath()             // assign image.src = currentCard.imgPath()
                div.appendChild(img);                       // append img to div
            }

            currentCard.domReference(div);  // assigns the div DOM element (div) to the Card <object> property .domElement
            gameBoard.appendChild(div);     // append card to gameBoards
        }

        /** Adds event listeners to each Card.domElement in the cardsArray */
        cardsArray.forEach(element => {
            element.domElement.addEventListener("click", function() {

                element.domElement.classList.toggle("selected"); // adds selected class to the card
                let selectedCards = document.querySelectorAll("div.card.selected"); // nodeList of div cards with class "selected"

                if(selectedCards.length > 3) { // checks if you have more than three cards with selected class and removes the selected class on that card
                    element.domElement.classList.toggle("selected"); 
                    alert("Can only have three set cards selected at once");
                }
                checkForSet(element); // will call checkForSet() and pass the Card object (stored in element) as an argument
            })
        }); 
    }

    // Function that checks for Set
    function checkForSet(cardObj) {
        console.log(cardObj);

    }

    /** Toggles between game view (the board with cards) and menu view (instructions, setting up time) */
    function toggleView() {
        menuView.classList.toggle("hidden");
        gameView.classList.toggle("hidden");
    }
}