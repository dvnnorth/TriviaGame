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
                                <li class="answer">
                                    Answer 1
                                </li>
                                <li class="answer correct">
                                    Answer 2
                                </li>
                                <li class="answer">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 2</h1>
                            <ul id="answers">
                                <li class="answer">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer">
                                    Answer 3
                                </li>
                                <li class="answer correct">
                                    Answer 4
                                </li>
                            </ul>
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 3</h1>
                            <ul id="answers">
                                <li class="answer correct">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 4</h1>
                            <ul id="answers">
                                <li class="answer">
                                    Answer 1
                                </li>
                                <li class="answer correct">
                                    Answer 2
                                </li>
                                <li class="answer">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 5</h1>
                            <ul id="answers">
                                <li class="answer correct">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 6</h1>
                            <ul id="answers">
                                <li class="answer correct">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 7</h1>
                            <ul id="answers">
                                <li class="answer">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer correct">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 8</h1>
                            <ul id="answers">
                                <li class="answer">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer">
                                    Answer 3
                                </li>
                                <li class="answer correct">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 9</h1>
                            <ul id="answers">
                                <li class="answer">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer correct">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `), $(`
                        <div id="slide">
                            <h1 class="text-center">Question 10</h1>
                            <ul id="answers">
                                <li class="answer">
                                    Answer 1
                                </li>
                                <li class="answer">
                                    Answer 2
                                </li>
                                <li class="answer correct">
                                    Answer 3
                                </li>
                                <li class="answer">
                                    Answer 4
                                </li>
                            </ul>
                        </div>                    
                    `)
    ];
    const _TIMEUP = $(`
        <div id="slide">
            <h1 class="text-center gotItWrong">Time's Up!</h1>
            <p class="text-center">You failed to answer the question in time...</p>
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
            <p class="text-center">You got <span id="correct"></span> questions correct!</p>
            <p class="text-center">You got <span id="wrong"></span> questions wrong...</p>
            <h1 class="text-center">Your score: <span id="score"></span>%</h1>
            <p class="text-center" id="passFailText"></p>
        </div>
    `);

    let questionNumber = 0; // Tracks index of question array that we're on
    let results = []; // Holds the results of each answer being correct or not (true or false)
    let answer = ``; // Will hold the selected answer for grading
    let slideTransitionComplete = new Event(`transComplete`); // Special event to be triggered when slide transition completes

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
            nextQuestionElement.animate({opacity: 1}, 500, `swing`, function () {
                // Transition complete
                $(document).trigger(`transComplete`);
            });
        });
    }

    // Helper function to delete all text from #timeDisplay
    function clearTimeDisplay () {
        $(`#timeDisplay`).text(``);
    }

    // Helper function to toggle Bootstrap collapsables by adding or removing .show based on it existing or not
    function showHide (id) {
        if ($(id).hasClass(`show`)) {
            $(id).removeClass(`show`);
        }
        else {
            $(id).addClass(`show`)
        }
    }

    // Helper function to handle event listener setting and resetting
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

    // Helper function to display results after the _FINAL slide has been displayed
    function grade () {
        let correct, wrong, score; // Declare score variables
        correct = wrong = score = 0; // Set them all to zero

        // Tally correct and incorrect
        results.forEach(function (value) {
            if (value) {
                correct++;
            }
            else {
                wrong++;
            }
        });

        // Get score
        score = Math.round((correct / results.length) * 100);

        // Display results
        // This event handling ensures that the slide has completely displayed and the transaction is complete before displaying
        // the results. Otherwise, doesn't work.
        $(document).off(`transComplete`);
        $(document).on(`transComplete`, function () {
            $(`#correct`).text(correct.toString());
            $(`#wrong`).text(wrong.toString());
            $(`#score`).text(score.toString());
            if (parseInt(score) >= 70) {
                $(`#score`).addClass(`gotIt`);
                $(`#passFailText`).text(`Well hot shot, you passed! Great job!`);
            }
            else {
                $(`#score`).addClass(`gotItWrong`);
                $(`#passFailText`).text(`Yikes. Well, you failed. Hit the books and try the quiz again!`);
            }
        });
    }

    // function nextQuestion is all of the quiz logic that should run every time a new question slide is displayed
    // nextQuestion called every time a new question is to appear. Increments questionNumber to keep quiz moving
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

            // Return anonymous function that clears interval and timeout and transitions to _TIMEUP slide when the timer runs out
            return function () {
                results.push(false);
                clearTimeout(timerID);
                clearInterval(intervalID);
                clearTimeDisplay();
                answer = ``;
                transition(_TIMEUP);
            };
        }

        // Reveal the quizButton and timer
        showHide(`#buttonDisplay`);
        showHide(`#timer`);

        // Transition in new question (old question is current #slide)
        questionSwitch($(`#slide`), questionElement);

        // Reset event handler for clicking answers
        changeEvent(`#answers`, function () {
            // Clear all elements in #answers of .selected
            $(`#answers`).children().each(function() {
                $(this).removeClass(`selected`);
            });

            // add .selected to this element to make sure that selected answer is highlighted
            $(this).addClass(`selected`);

        }, `.answer`);

        // Start the timers
        timerID = setTimeout(startInterval(), 30 * 1000);

        // Make #quizButton display "Submit Answer"
        $(`#quizButton`).text(`Submit Answer`);
        // When the quiz button, now submit answer, is pressed, kill the timers, check the answer, and start transition with the
        // _CORRECT or _WRONG slide based on selected answer
        changeEvent(`#quizButton`, function () {
            // Handle answer selection
            $(`#answers`).children().each(function() {
                // if the current child of #answers has class selected
                if ($(this).hasClass(`selected`)) {
                    // set answer to this
                    answer = $(this);
                }
            });

            // If answer is blank, jiggle button (jQuery UI)
            if (answer === ``) {
                $(`#quizButton`).effect(`shake`);
            }
            // Else If answer has been selected and is correct
            else if (answer.hasClass(`correct`)) {
                results.push(true);
                clearTimeout(timerID);
                clearInterval(intervalID);
                clearTimeDisplay();
                answer.removeClass(`selected`);
                answer = ``;
                transition(_CORRECT);
            }
            // Else (is selected and wrong)
            else {
                results.push(false);
                clearTimeout(timerID);
                clearInterval(intervalID);
                clearTimeDisplay();
                answer.removeClass(`selected`);
                answer = ``;
                transition(_WRONG);
            }
        });

    }

    /* function transition moves slide to given slide (expects _TIMEUP, _CORRECT, _WRONG, or _FINAL) 
    for 5 seconds, appends result to results based on given slide, then progresses to the next question */
    function transition (transitionSlide) {
        if (transitionSlide === _CORRECT) {
            // Hide the quizButton and timer
            showHide(`#buttonDisplay`);
            showHide(`#timer`);

            questionSwitch($(`#slide`), _CORRECT);
            setTimeout(function () {
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === _QUESTIONS.length) {
                    transition(_FINAL);
                }
                else {
                    nextQuestion(_QUESTIONS[questionNumber]);
                }
            }, 3 * 1000);
        }
        if (transitionSlide === _WRONG) {
            // Hide the quizButton and timer
            showHide(`#buttonDisplay`);
            showHide(`#timer`);

            questionSwitch($(`#slide`), _WRONG);
            setTimeout(function () {
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === _QUESTIONS.length) {
                    transition(_FINAL);
                }
                else {
                    nextQuestion(_QUESTIONS[questionNumber]);
                }
            }, 3 * 1000);
        }
        if (transitionSlide === _TIMEUP) {
            // Hide the quizButton and timer
            showHide(`#buttonDisplay`);
            showHide(`#timer`);

            questionSwitch($(`#slide`), _TIMEUP);
            setTimeout(function () {
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === _QUESTIONS.length) {
                    transition(_FINAL);
                }
                else {
                    nextQuestion(_QUESTIONS[questionNumber]);
                }
            }, 3 * 1000);
        }
        if (transitionSlide === _FINAL) {
            // Display final, tally score, display, change quizButton to restart
            questionSwitch($(`#slide`), _FINAL);

            //tally score and display
            // Did good / did bad based on score

            $(`#quizButton`).text(`Restart Quiz!`);
            changeEvent(`#quizButton`, function () {
                questionNumber = 0;
                results = [];
                showHide(`#buttonDisplay`); // hiding again, will be revealed in nextQuestion
                nextQuestion(_QUESTIONS[questionNumber]);
            });
            showHide(`#buttonDisplay`);

            // Grade and display
            grade();

        }
    }

    // Make it happen
    questionSwitch($(`#slide`), _INTRO);

    changeEvent(`#quizButton`, function () {
        showHide(`#buttonDisplay`); // Needs to be hidden, will reappear in nextQuestion
        nextQuestion(_QUESTIONS[questionNumber]);
    });
});