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
    const _INTRO = $(`<div id="slide">
                        <h1 class="text-center white">
                            Yo, I Heard You Like <span class="this">this</span>!
                        </h1>
                        <p>
                              Oh, wait, you don't? You think <span class="this">this</span> is frustrating? Has too many rules? Struggling to remember them all? Or, think you're a master? Think you've got it down pat? That you're hot #@%&amp;? Well step up, ya smug so-and-so, SHOW ME WHAT YOU GOT! <img src="assets/img/cromulon.png" alt="Cromulon" width=15>
                        </p>
                      </div>`);

    // _QUESTIONS will store all of the questions as HTML Elements
    const _QUESTIONS = [ $(`<div id="slide">
                            <h1 class="text-center">Question 1</h1>
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
                        </div>`),
                        $(`<div id="slide">
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
    const _TIMEUP = $(`<div id="slide">
                            <h1 class="text-center wrong">Time's Up!</h1>
                            <p class="text-center">You ran out of time... On to the next question!</p>
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

    /* function runQuiz runs the quiz!*/
    function runQuiz () {

        // function nextQuestion is a helper function that runs to streamline question handling
        // Display's next question and handles timer starting
        function nextQuestion (questionElement, timerExecution) {
            // Transition in new question (old question is current #questionWrapper)

            // Start the timer
        }
        // Declare currentQuestion to store question Element, initialize to first question
        // _QUESTIONS[0]
        let currentQuestion = _QUESTIONS[0];

        // Declare wasCorrect, an array that tracks whether the user was correct, incorrect, or
        // missed the question due to time. Values expected are true (user was correct), 

        // Change Start Quiz button to Submit Answer button

        // Submit Answer handler

        // Quiz Loop
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
        questionSwitch($(`#slide`), div);
        counter++;
    });

    $(`#timesUp`).on(`click`, function () {
        let div = _TIMEUP;
        questionSwitch($(`#slide`), div);
    })

});