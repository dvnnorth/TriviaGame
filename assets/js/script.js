$(function () {

    /* From the specification: 
    
    * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

    * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

    * The scenario is similar for wrong answers and time-outs.

            - If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
            
            - If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

    * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

    /* Quiz taker will click a "Start Quiz" button to begin the quiz
    
    The first question will appear (I'd like to animate the question appearance but will implement later)
    and the question timer will start.

    For each question:
        
            -The question will display at the top of the question div with four possible answers below
            -A timer will begin and will record an incorrect answer and move to the next question if it runs out
            -hover CSS will put a border or some indication around the answer that the user is selecting
            -A click event handler will take care of the question selection

        A collection (array or object) will store the correct answers (this will allow for question randomization)
        and the user's choices.

        After every question, there will be a brief screen that tells the user they got the question right or wrong
        for a few seconds, then moves to the next question

        When all questions have been answered, the final slide will give the user a score and the option to take the
        quiz again */

    // Variable Declarations

    // _INTRO is the element that will display the page introduction
    const _INTRO = $(`
        <div id="slide">
            <h1 class="text-center white">
                Yo, I Heard You Like <span class="this">this</span>!
            </h1>
            <p>
                Oh, wait, you don't? You think <span class="this">this</span> is frustrating? Has too many rules? Struggling to remember them all? Or, think you're a master? Think you've got it down pat? That you're hot #@%&amp;? Well step up, ya smug so-and-so, SHOW ME WHAT YOU GOT! <img src="assets/img/cromulon.png" alt="Cromulon" width=15>
            </p>
        </div>`
    );

    // _QUESTIONS will store all of the questions as HTML Elements
    const _QUESTIONS = [ $(`
                            <div id="slide">
                                <h1 class="text-center">Question 1</h1>
                                <ul>
                                    <li class="answer wrong">
                                        Answer 1
                                    </li>
                                    <li class="answer correct">
                                        Answer 2
                                    </li>
                                    <li class="answer wrong">
                                        Answer 3
                                    </li>
                                    <li class="answer wrong">
                                        Answer 4
                                    </li>
                                </ul>
                            </div>`),
                          $(`
                            <div id="slide">
                                <h1 class="text-center">Question 2</h1>
                                <ul>
                                    <li class="answer" id="answer1">
                                        Answer 1
                                    </li>
                                    <li class="answer" id="answer2">
                                        Answer 2
                                    </li>
                                    <li class="answer" id="answer3">
                                        Answer 3
                                    </li>
                                    <li class="answer" id="answer4">
                                        Answer 4
                                    </li>
                                </ul>
                            </div>`)
    ];

    // const _TIMEUP is an HTML element that will display when the user gets a question wrong
    // due to time elapsing
    const _TIMEUP = $(`
        <div id="slide">
            <h1 class="text-center timeUp">Time's Up!</h1>
            <p class="text-center">You failed to answer the question on time...</p>
        </div>`)

    // const _CORRECT is the slide displayed when the question was answered correctly
    const _CORRECT = $(`
    
    `);

    // const _WRONG is the slide displayed when the question was answered incorrectly

    // const _FINAL is the final slide to be displayed when quiz is over
    const _FINAL = $(`
        <div id="slide">
            <h1 class="text-center">Quiz Over!</h1>
            <p class="text-center">Alright, lets see how you did!</p>
            <ul id="results">
                <li style="list-style-type:none">You got <span id="correct"></span> questions correct!</li>
                <li style="list-style-type:none">You got <span id="wrong"></span> questions wrong...</li>
            </ul>
            <h1 class="text-center">Your score: <span id="score"></span></h1>
            <p class="passFailText"></p>
        </div>`)

    /* function questionSwitch will handle the animation between questions. 
    questionSwitch expects the previous slide as an element and the new slide as an element,
    both as parameters in that order */
    function questionSwitch (previousQuestionElement, nextQuestionElement) {

        // Fade the previous question to 0 opacity, then when it completes,
        // remove the current question, append the next question to the question 
        // display and fade it in
        previousQuestionElement.animate({opacity: 0}, 500, `swing`, function () {
            // remove previous question element from DOM
            previousQuestionElement.remove();
            // Set opacity of the next question element to 0
            nextQuestionElement.css({opacity: 0});
            // Append the next question element to the question display
            nextQuestionElement.appendTo(`#questionWrapper`);
            // Fade it in
            nextQuestionElement.animate({opacity: 1}, 500);
        });

    }

    /* function checkAnswer looks to see if a question is correct based on which answer
       is selected in a given questionElement, appends a result to the resultsArray 
       (will be true for correct or false for incorrect) and returns the array
       with the new result appended */
    function checkAnswer (questionElement, resultsArray) {
        // logic to check questionElement and append result

        return resultsArray;
    }

    /* function grade displays the user's score once _FINAL has been displayed */
    function grade () {

    }

    /* function runQuiz runs the quiz!*/
    function runQuiz () {

        // Function inits
        // function nextQuestion is a helper function that runs to streamline question handling
        // Display's next question and handles timer starting
        function nextQuestion (questionElement, timerExecution) {
            let counter = 0; // Will count seconds
            let intervalID, timerID; // Interval ID and Timer ID to be stored so they can be killed

            /* function startInterval starts the interval timer running which displays the time in seconds
               and returns an anonymous function to be executed when the timeout it is passed to ends,
               a function that kills the interval, gives a wrong result, and displays the timeout*/
            
            function startInterval () {
                // Start an interval that counts down the seconds and return the function to be 
                // executed with the timeout finishes
                intervalID = setInterval(function () {
                    // Use counter to count seconds then display counter
                    counter++;
                    $(`#timeDisplay`).text(counter);
                }, 1 * 1000);

                return function () {
                    clearTimeout(timerID);
                    clearInterval(intervalID);
                };
            }
            // Transition in new question (old question is current #slide)
                questionSwitch($(`#slide`), questionElement);
            // Start the timers
            timerID = setTimeout(startInterval(), 30 * 1000);
            
            
            // A button submission kills both the interval and the 
        }

        // Variable declarations, inits
        // Declare currentQuestion to store question Element, initialize to first question
        // _QUESTIONS[0]
        let currentQuestion = _QUESTIONS[0];
        // Declare results and init to be an empty array. 
        // Will push true or false to results depending on users selected answer
        let results = [];

        // Declare wasCorrect, an array that tracks whether the user was correct, incorrect, or
        // missed the question due to time. Values expected are true (user was correct), 

        // Change Start Quiz button to Submit Answer button

        // Submit Answer handler

        // Quiz Loop

        // When a question ends, display the results slide (_TIMEOUT, _CORRECT, or _WRONG) for 5 seconds
        setTimeout();
    }

    // ************ Quiz Start! **************
    
    // Display the intro slide
    questionSwitch($(`#slide`), _INTRO);

    /* Answers handler
    jQuery on click event handler for elements of #answers */


    /* Debug button functionality */
    var counter = 0;
    $(`#nextQuestion`).on(`click`, function () {
        let div = _QUESTIONS[counter];
        nextQuestionTest(div);
        counter++;
    });

    $(`#timesUp`).on(`click`, function () {
        let div = _TIMEUP;
        questionSwitch($(`#slide`), div);
    });

    $(`#showHideTimer`).on(`click`, function () {
        if ($(`#timer`).hasClass(`show`)) {
            $(`#timer`).removeClass(`show`);
        }
        else {
            $(`#timer`).addClass(`show`)
        }
    });

    $(`#showHideButtonDisplay`).on(`click`, function () {
        if ($(`#buttonDisplay`).hasClass(`show`)) {
            $(`#buttonDisplay`).removeClass(`show`);
        }
        else {
            $(`#buttonDisplay`).addClass(`show`)
        }
    });

    /* TEST METHOD, DELETE FOR PUBLISH */
    function nextQuestionTest (questionElement, timerExecution) {
        let counter = 30; // Will count seconds
        let intervalID, timerID; // Interval ID and Timer ID to be stored so they can be killed

        /* function startInterval starts the interval timer running which displays the time in seconds
           and returns an anonymous function to be executed when the timeout it is passed to ends,
           a function that kills the interval, gives a wrong result, and displays the timeout*/
        
        function startInterval () {
            // Start an interval that counts down the seconds and return the function to be 
            // executed with the timeout finishes
            intervalID = setInterval(function () {
                // Use counter to count seconds then display counter
                counter--;
                $(`#timeDisplay`).text(counter);
            }, 1 * 1000);

            return function () {
                clearTimeout(timerID);
                clearInterval(intervalID);
                questionSwitch($(`#slide`), _TIMEUP);
            };
        }
        // Transition in new question (old question is current #slide)
        questionSwitch($(`#slide`), questionElement);
        // Start the timers
        timerID = setTimeout(startInterval(), 30 * 1000);
    }

});