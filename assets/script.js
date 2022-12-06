$(document).ready(function () {
    // meant to unstick bottons on mobile devices
    $("button").on("touchstart", function(){ 
        $(this).removeClass("mobileHoverFix");
        });
    $("button").on("touchend", function(){ 
        $(this).addClass("mobileHoverFix");
    });
    
    // all my questions
        var allQuestions = [
        {
        question: "when a user views a page containing a javascript program, which machine actually executes the script?",
        answers: ["the user's machine running a web browser", "the web server", "your mom's iphone", "robots"],
        correctAnswer: 1,
        },
        {
        question: "which of the following syntax is correct to refer an external script called “formValidation.js”?",
        answers: ["script href = “formValidation.js”", "script source = “formValidation.js”", "script src = “formValidation.js”", "script refer to external computer thing = “formValidation.js”"],
        correctAnswer: 3,
        },
        {
        question: "what javascript keyword declares a variable?",
        answers: ["var", "if", "for", "declare.variable.please"],
        correctAnswer: 1,
        },
        {
        question: "how can you add a comment in javascript?",
        answers: ["//this is a comment", "!this here is a comment", "-- comments for everyone! --", "c.nope"],
        correctAnswer: 1,
        },
        {
        question: 'Which of the following rounds a number down to the nearest whole number?',
        answers: ["Math.floor", "Math.random", "3.math.floor", "4.Math.pow"],
        correctAnswer: 1,
        },
        {
        question: "how do you create a function in javascript?",
        answers: ["()function.myFunction", "function = myFunction", "function myFunction", "myFunction.whatever"],
        correctAnswer: 4,
        },
        ];
     
    // variables
        var currentQuestion = 0;
        var timeleft = 60;
        var timer;
        var highScores = [];
    
    // jq selectors and action
        $("#questionBox").hide();
        $("#inputName").hide();
    
        $("#startButton").on("click", function () {
            $("#instructions").hide();
            $("#questionBox").show();
            $("#questionText").html(allQuestions[currentQuestion].question);
            $("#button-1").html(allQuestions[currentQuestion].answers[0]);
            $("#button-2").html(allQuestions[currentQuestion].answers[1]);
            $("#button-3").html(allQuestions[currentQuestion].answers[2]);
            $("#button-4").html(allQuestions[currentQuestion].answers[3]);
            document.getElementById("timer").innerHTML = timeleft;
    
    // timer function
            timer = setInterval(function () {
            timeleft -= 1;
            document.getElementById("timer").innerHTML = timeleft;
                if (timeleft === 0) {
                endGame();
                return;
                }
            }, 1000);
            });
    
    // checks for correct or incorrect, and displays result on card footer
        function checkAnswer(event) {
            if (parseInt(event.target.value) === allQuestions[currentQuestion].correctAnswer) {
                $("#correctIncorrect").html("<hl />" + "correct");
            }
            else {
                $("#correctIncorrect").html("<hl />" + "incorrect");
                if (timeleft > 10) {
                    timeleft -= 10;
                }
                else {
                    timeleft = 0;
                    document.getElementById("timer").innerHTML = timeleft;
                    endGame();
                    return;
                }
            }
    
    // completes game when finished with 6 questions
            currentQuestion++;
            if (currentQuestion === 6) {
                endGame();
                return;
            }
     
    // places question text and questions
            $("#questionText").html(allQuestions[currentQuestion].question);
            $("#button-1").html(allQuestions[currentQuestion].answers[0]);
            $("#button-2").html(allQuestions[currentQuestion].answers[1]);
            $("#button-3").html(allQuestions[currentQuestion].answers[2]);
            $("#button-4").html(allQuestions[currentQuestion].answers[3]);
        }
        
        $(".yourAnswer").on("click", (event) => checkAnswer(event));
    
    // ends game and prompts for input and clears timer
        function endGame() {
            $("#questionBox").hide();
            $("#inputName").show();
            clearInterval(timer);
            $("#score").html(timeleft);
        }
    
        init();
        
    // generates score and presents with initials
        function renderScores() {
            $("#scoresList").html = "";
            for (var i = 0; i < highScores.length; i++) {
                var score = highScores[i];
                var li = document.createElement("li");
                li.innerHTML = "<span class='setScore'>" + score.name + " scored " + score.score + " points" + "</span>";
                $("#scoresList").append(li);
            }
        }
    // generates the first stored score
        function init() {
            var storedScores = JSON.parse(localStorage.getItem("scores"));
            if (storedScores !== null) {
                highScores = storedScores;
            }
            renderScores();
        }
    
    
    // executes function to store the score as a string in local storage
        function storeScores() {
            localStorage.setItem("scores", JSON.stringify(highScores));
        };
    
    // jq writes score to page
        $("#submit").on("click", function (event) {
            event.preventDefault();
            var initialsText = $("#initials").val().trim();
            if (initialsText === "") {
                return;
            }
            highScores.push({
                name: initialsText,
                score: timeleft
            });
            $("#initials").val("");
            storeScores();
            renderScores();
            window.location.href = "index.html";
        });
    
    // jq clears scores
        $("#clearScores").on("click", function () {
            $("#scoresList").empty();
            localStorage.clear();
        })
    
    });