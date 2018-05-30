$(function () {

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
                        </div>`),
                      $(`
                        <div id="slide">
                            <h1 class="text-center">Question 2</h1>
                            <ul id="answers">
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
        $(document).off(`click`, id);
        if (typeof selector != `undefined`) {
            $(document).on(`click`, (id + `>` + selector), onClickFunction);
        }
        else {
            $(document).on(`click`, id, onClickFunction);
        }
    }

    // Empty
    function checkAnswer (questionElement) {
        // logic to check questionElement and append result

        return resultsArray;
    }

    // Empty
    function grade () {
        // todo
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

        $(`#quizButton`).text("Submit Answer");
        changeEvent(`#quizButton`, function () {
            
        });

        // Start the timers
        timerID = setTimeout(startInterval(), 30 * 1000);

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