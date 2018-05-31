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

    function Question(number, question, answers, correctAnswerIndex, snippetID) {
        this.number = number;
        this.question = question,
        this.answers = answers,
        this.correctAnswerIndex = correctAnswerIndex,
        this.snippetID = snippetID,

        this.generateHTML = function () {
            let answerElement; // Will hold current <li> answer
            let element = $(`<div id="slide"></div>`); // Holder of div.slide wrapper

            // Append chain to create the answer slide frame
            element.append(`<h1 class="text-center">Question ` + this.number + `</h1>`)
                   .append(`<p>` + this.question + `</p>`)
                   .append($(this.snippetID))
                   .append(`<hr>`)
                   .append(`<ul id="answers"><ul>`);

            // Go through every answer in answers[] and 
            // - create an element and assign to answerElement
            // - if the current index is the same as the correctAnswerIndex, add class .correct
            // - append the new answer element to li#answers
            for (let i = 0; i < this.answers.length; i++) {
                answerElement = $(`<li class="answer">` + this.answers[i] + `</li>`);
                if (correctAnswerIndex === i) {
                    answerElement.addClass(`correct`);
                }
                element.find(`#answers`).append(answerElement);
            }
            return element;
        }

        // Using Fisher-Yates (aka Knuth) Shuffle from 
        // https://tinyurl.com/ybwsc79x (Stack Overflow tiny link)
        this.scrambleAnswers = function () {
            console.log(`===== PRE SHUFFLE =====`)
            console.log(this.answers)
            console.log(this.correctAnswerIndex);
            let currentIndex = this.answers.length, temporaryValue, randomIndex;
            
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
            
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // Track correctAnswerIndex
                if (currentIndex === this.correctAnswerIndex) {
                    this.correctAnswerIndex = randomIndex;
                }
            
                // And swap it with the current element.
                temporaryValue = answers[currentIndex];
                answers[currentIndex] = answers[randomIndex];
                answers[randomIndex] = temporaryValue;
            }
        }
        this.scrambleAnswers();
        console.log(`===== POST SHUFFLE =====`)
        console.log(this.answers)
        console.log(this.correctAnswerIndex);
        console.log(this.answers);
    }

    // Slides
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
    const _QUESTIONSold = [ $(`
                        <div id="slide">
                            <h1 class="text-center">Question 1</h1>
                            <p>
                                What will the following code snippet log to the console? 
                            </p>
                            <script src="https://gist.github.com/dvnnorth/8d831b5e32243b66595d0965a54e1baa.js"></script>
                            <hr>
                            <ul id="answers">
                                <li class="answer">
                                    <pre>false</pre><pre>false</pre>
                                </li>
                                <li class="answer correct">
                                    <pre>true</pre><pre>true</pre>
                                </li>
                                <li class="answer">
                                    <pre>true</pre><pre>false</pre>
                                </li>
                                <li class="answer">
                                    <pre>false</pre><pre>true</pre>
                                </li>
                            </ul>
                        </div>
                    `), $(`
                    <div id="slide">
                        <h1 class="text-center">Question 2</h1>
                        <p>
                            What will the following code snippet log to the console? 
                        </p>
                        <script src="https://gist.github.com/dvnnorth/ad149534cc2dd6d9c5f0f5b71606d923.js"></script>
                        <hr>
                        <ul id="answers">
                            <li class="answer correct">
                                <pre>true</pre>
                            </li>
                            <li class="answer">
                                <pre>false</pre>
                            </li>
                        </ul>
                    </div> 
                    `), $(`
                    <div id="slide">
                        <h1 class="text-center">Question 3</h1>
                        <p>
                            What will the following code snippet log to the console? 
                        </p>
                        <script src="https://gist.github.com/dvnnorth/9a9e69c55f2bd519dc9444ed52f783d6.js"></script>
                        <hr>
                        <ul id="answers">
                            <li class="answer">
                                <pre>true</pre>
                            </li>
                            <li class="answer correct">
                                <pre>false</pre>
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

    // snippetIDs collects the id for all of the Github Gist elements generated by their scripts
    // These IDs can be used to append the gists to the question slides
    let snippetIDs = (function () {
        let ids = [];
        $(`#snippets`).children(`div`).each(function (index, element) {
            // Element is raw JavaScript, not a jQuery obj
            // So, must use native JS getAttribute vs jQuery attr
            ids.push(element.getAttribute(`id`)); 
        });
        return ids;
    })();
    // Array that will hold our questions objects
    // Initialize questions
    // Remember, answers and correctIndex are scrambled when new Question is instantiated
    let questions = [
        /* Question 1 */ 
        new Question(1, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>false</pre>`,
                        `<pre>true</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`,
                        `<pre>false</pre><pre>true</pre>`
                     ], 
                    1, ``),
        /* Question 2 */ 
        new Question(2, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``),
        /* Question 3 */ 
        new Question(3, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>true</pre>`,
                        `<pre>false</pre>`
                     ], 
                    1, ``),
        /* Question 4 */ 
        new Question(4, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``),
        /* Question 5 */ 
        new Question(5, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``),
        /* Question 6 */ 
        new Question(6, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``),
        /* Question 7 */ 
        new Question(7, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``),
        /* Question 8 */ 
        new Question(8, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``),
        /* Question 9 */ 
        new Question(9, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``),
        /* Question 10 */
        new Question(10, `What will the following code snippet log to the console?`, 
                     [
                        `<pre>false</pre><pre>true</pre>`,
                        `<pre>true</pre><pre>false</pre>`
                     ], 
                    0, ``)
    ];
    // Then assign snippetIDs to questions
    for (let i = 0; i < questions.length; i++) {
        questions[i].snippetID = snippetIDs[i];
    }
    console.log(questions);
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
    function nextQuestion (questionObj) {
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
        $(`#timer`).collapse(`toggle`);

        // Transition in new question (old question is current #slide)
        questionSwitch($(`#slide`), questionObj.generateHTML());

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
            $(`#quizButton`).collapse(`toggle`);
            $(`#timer`).collapse(`toggle`);

            questionSwitch($(`#slide`), _CORRECT);
            setTimeout(function () {
                $(`#quizButton`).collapse(`toggle`);
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === questions.length) {
                    transition(_FINAL);
                }
                else {
                    nextQuestion(questions[questionNumber]);
                }
            }, 3 * 1000);
        }
        if (transitionSlide === _WRONG) {
            // Hide the quizButton and timer
            $(`#quizButton`).collapse(`toggle`);
            $(`#timer`).collapse(`toggle`);

            questionSwitch($(`#slide`), _WRONG);
            setTimeout(function () {
                $(`#quizButton`).collapse(`toggle`);
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === questions.length) {
                    transition(_FINAL);
                }
                else {
                    nextQuestion(questions[questionNumber]);
                }
            }, 3 * 1000);
        }
        if (transitionSlide === _TIMEUP) {
            // Hide the quizButton and timer
            $(`#quizButton`).collapse(`toggle`);
            $(`#timer`).collapse(`toggle`);

            questionSwitch($(`#slide`), _TIMEUP);
            setTimeout(function () {
                $(`#quizButton`).collapse(`toggle`);
                // questionNumber has been incremented at this point based on nextQuestion
                // check if all questions have appeared and go to next or _FINAL accordingly
                if (questionNumber === questions.length) {
                    transition(_FINAL);
                }
                else {
                    nextQuestion(questions[questionNumber]);
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
                $(`#quizButton`).collapse(`toggle`); // hiding again, will be revealed in nextQuestion
                nextQuestion(questions[questionNumber]);
            });
            $(`#quizButton`).collapse(`toggle`);

            // Grade and display
            grade();

        }
    }

    changeEvent(`#quizButton`, function () {
        nextQuestion(questions[questionNumber]);
    });
});