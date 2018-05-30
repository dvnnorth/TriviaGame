/* From the specification: 
    
    * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

    * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

    * The scenario is similar for wrong answers and time-outs.

            - If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
            
            - If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

    * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page). */

/* Flow:
 * 
 * Each collection of HTML elements displayed on each transition will be considered a "slide"
 * const slides for intro, time's up, question correct, question incorrect, and final display
 * const array of slides for questions. Answers will have class answer and correct or wrong
 * 
 *  
 * Display intro slide with start quiz button. User clicks "Start Quiz" button
 * 
 * Timer displays, button turns to "Submit Answer" button
 * 
 * Loop this for all questions:
 * 
 *      Question displays. One of three possible outcomes:
 * 
 *           User selects and answer and clicks submit. They're either incorrect or correct
 * 
 *              Outcome 1) If correct, they get correct slide and results array gets true pushed to it
 * 
 *              Outcome 2) If incorrect, they get incorrect slide and results array gets false pushed to it
 * 
 *           Or, Outcome 3) The user doesn't select and submit an answer in time in which case the timeout
 *           slide is displayed and false is pushed to results array
 * 
 *      Few seconds pass, then on to next question unless there are no more question slides left, in which case
 * 
 * Display the final slide and then insert totals. Then make button the Restart Quiz button which resets 
 * the variables and starts the quiz over again.
 */ 

// document on load wrapper
$(function () {

    // Slides
    // _INTRO is the slide that will display the page introduction
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
    // _QUESTIONS is an array of slides that each represent a question.
    // Would like this massive block in a separate file,
    // but AJAX requests can't be made to local files...
    // I guess it would work after being deployed?
    // Also wish I could move this to bottom, but wont
    // be hoisted...
    // Now that I think of it, using classes to determine
    // whether an answer is right or wrong enables
    // cheating quite easily with the dev tools...
    // Would be nice to obfuscate this. Could have
    // answer bank and have a scramble answer that pushes
    // answers randomly to question list then pushes
    // which index is correct to an answer_key array

    const _QUESTIONS = [ $(`
                        <div id="slide">
                            <h1 class="text-center">Question 1</h1>
                            <ul id="answers">
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
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 2</h1>
                            <ul id="answers">
                                <li class="answer wrong" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer wrong" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer correct" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 3</h1>
                            <ul id="answers">
                                <li class="answer correct" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer wrong" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer wrong" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 4</h1>
                            <ul id="answers">
                                <li class="answer wrong" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer correct" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer wrong" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer wrong" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 5</h1>
                            <ul id="answers">
                                <li class="answer correct" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer wrong" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer wrong" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 6</h1>
                            <ul id="answers">
                                <li class="answer correct" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer wrong" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer wrong" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 7</h1>
                            <ul id="answers">
                                <li class="answer wrong" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer correct" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer wrong" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 8</h1>
                            <ul id="answers">
                                <li class="answer wrong" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer wrong" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer correct" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 9</h1>
                            <ul id="answers">
                                <li class="answer wrong" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer correct" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer wrong" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 10</h1>
                            <ul id="answers">
                                <li class="answer wrong" id="answer1">
                                    Answer 1
                                </li>
                                <li class="answer wrong" id="answer2">
                                    Answer 2
                                </li>
                                <li class="answer correct" id="answer3">
                                    Answer 3
                                </li>
                                <li class="answer wrong" id="answer4">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `)
    ];
    const _TIMEUP = $(`
        <div id="slide">
            <h1 class="text-center gotItWrong">Time's Up!</h1>
            <p class="text-center">You failed to answer the question on time...</p>
        </div>
    `);
    const _CORRECT = $(`
        <div id="slide">
            <h1 class="text-center gotIt">Correct!</h1>
            <p class="text-center">Great job!</p>
        </div>
    `);
    const _WRONG = $(`
        <div id="slide">
            <h1 class="text-center gotItWrong">Wrong Answer</h1>
            <p class="text-center">You got it wrong...</p>
        </div>
    `);
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
        </div>
    `);

    let questionNumber = 0;
    let results = [];
    let answer;

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

    function showHide (id) {
        if ($(id).hasClass(`show`)) {
            $(id).removeClass(`show`);
        }
        else {
            $(id).addClass(`show`)
        }
    }

    function changeEvent (id, onClickFunction, selector) {
        if (typeof selector != `undefined`) {
            $(document).off(`click`, (id + `>` + selector));
            $(document).on(`click`, (id + `>` + selector), onClickFunction);
        }
        else {
            $(document).off(`click`, id);
            $(document).on(`click`, id, onClickFunction);
        }
    }

    function nextQuestion (questionElement) {
        let counter = 30; // Will count seconds;
        let intervalID, timerID; // Interval ID and Timer ID to be stored so they can be killed

        questionNumber++; // Increment questionNumber

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
                transition(_TIMEUP);
            };
        }
        // Transition in new question (old question is current #slide)
        questionSwitch($(`#slide`), questionElement);

        changeEvent(`#answers`, function () {
            console.log($(this));
        }, `.answer`);

        // Start the timers
        timerID = setTimeout(startInterval(), 30 * 1000);

        // When the quiz button, now submit answer, is pressed, kill the timers, check the answer, and start transition with the
        // _CORRECT or _WRONG slide based on selected answer

    }

    /* function transition moves slide to given slide (expects _TIMEUP, _CORRECT, _WRONG, or _FINAL) 
    for 5 seconds, appends result to results based on given slide, then progresses to the next question */
    function transition (transitionSlide) {
        if (transitionSlide === _CORRECT) {
            // Hide the quizButton
            showHide(`#buttonDisplay`);
            results.push(true);
            questionSwitch($(`#slide`), _CORRECT);
            setTimeout(function () {
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === _QUESTIONS.length) {
                    transition(_FINAL);
                }
                else {
                    showHide(`#buttonDisplay`)
                    nextQuestion(_QUESTIONS[questionNumber]);
                }
            }, 5 * 1000);
        }
        if (transitionSlide === _WRONG) {
            // Hide the quizButton
            showHide(`#buttonDisplay`);
            results.push(false);
            questionSwitch($(`#slide`), _WRONG);
            setTimeout(function () {
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === _QUESTIONS.length) {
                    transition(_FINAL);
                }
                else {
                    showHide(`#buttonDisplay`);
                    nextQuestion(_QUESTIONS[questionNumber]);
                }
            }, 5 * 1000);
        }
        if (transitionSlide === _TIMEUP) {
            // Hide the quizButton
            showHide(`#buttonDisplay`);
            results.push(false);
            questionSwitch($(`#slide`), _TIMEUP);
            setTimeout(function () {
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === _QUESTIONS.length) {
                    transition(_FINAL);
                }
                else {
                    showHide(`#buttonDisplay`)
                    nextQuestion(_QUESTIONS[questionNumber]);
                }
            }, 5 * 1000);
        }
        if (transitionSlide === _FINAL) {
            // Display final, tally score, display, change quizButton to restart
            questionSwitch($(`#slide`), _FINAL);

            // Hide timer
            showHide(`#timer`);

            //tally score and display
            // Did good / did bad based on score

            $(`#quizButton`).text(`Restart Quiz!`);
            changeEvent(`#quizButton`, function () {
                questionNumber = 0;
                results = [];
                // Show timer again
                showHide(`#timer`);
                nextQuestion(_QUESTIONS[questionNumber]);
            });
            showHide(`#buttonDisplay`);

        }
    }

    // Make it happen
    questionSwitch($(`#slide`), _INTRO);

    changeEvent(`#quizButton`, function () {
        showHide(`#timer`);
        nextQuestion(_QUESTIONS[questionNumber]);
    });
});