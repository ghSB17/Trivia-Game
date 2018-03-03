$("document").ready( function(){


const objQuestionsBank = [{qtext:"Which of these locations is a huge protected wilderness area in Southern New Jersey?", anschoice1:"Pinelands", anschoice2:"HighPoint",anschoice3:"Union",anschoice4:"Manasquan",anschoice5:"None of the above", correctchoice:"anschoice1"},
{qtext:"Which animal is featured on New Jersey's state seal", anschoice1:"Buffalo", anschoice2:"Lion", anschoice3:"Horse", anschoice4:"Eagle", anschoice5:"Panther", correctchoice:"anschoice3"}, 
{qtext:"New Jersey is the third highest harvester of what produce?", anschoice1:"cranberries", anschoice2:"blueberries", anschoice3:"strawberries", anschoice4:"apples", anschoice5:"broccoli", correctchoice:"anschoice1"},
{qtext:"Which is the third largest city in the Garden State?",anschoice1:"Jersey City", anschoice2:"Princeton", anschoice3:"Ocean City", anschoice4:"Paterson", anschoice5:"Cherry Hill", correctchoice:"anschoice4"},
{qtext:"Which NJ town is home of the first drive-in movie theatre?", anschoice1:"Keansburg", anschoice2:"Camden", anschoice3:"Englishtown", anschoice4:"Hamilton", anschoice5:"Asbury Park", correctchoice:"anschoice2"} ]

var counter = 2*60;
var ansValues=[];
var checkCounter;

function displayTimer() {
    if( counter > 0 ) {
        minutes=Math.floor(counter/60);
        seconds=counter%60;
        minutes=checkdisplay(minutes);
        seconds=checkdisplay(seconds);
        counter--;
        $("#idTimer").html("Time Remaining  -  "+minutes+":"+seconds)
    } else {
        clearInterval(checkCounter);
        checkAnswers();
    }
};

function checkdisplay(timeValue) {
    if( timeValue<10 )
        return "0"+timeValue;
    else
        return timeValue;
};


$("#idButton").on("click",function(){
    if( this.innerText==="Start") {
      $(".bigbox").css({"height":"100%"});
      $.each(objQuestionsBank, function(index) { 
          
        var htmlText="";
        var newElement = $("<div>");
        $.each(objQuestionsBank[index], function(key, value){

             if(key==="qtext") {
                htmlText+="<br><br><p>Q"+(index+1)+".) "+value+"</p>";
            } else if( key==="correctchoice") {
                ansValues.push(value);
            } else {
                htmlText+="<input type='radio' name="+index+" value="+key+" >"+value+"</input>";
            }
            
        });
        newElement.html(htmlText);
        $("#idTrivia").append(newElement);
        $('#idButton').text("Submit");
      });
      checkCounter=setInterval(displayTimer,1000);
    } else if(this.innerText==="Submit") {
        //alert("Submit Clicked");
        checkAnswers();
    }

});

    function checkAnswers() {
        var correctAns=0;
        var missedQuestions=0;
        var incorrectAns=0;
        console.log("here");
        var childrenDiv=$("#idTrivia").children();
        console.log(childrenDiv);
        for(var i=0;i<childrenDiv.length;i++){
            var checkedInput=$(childrenDiv[i]).children("input:checked");

            if(checkedInput.length===0) {
                incorrectAns++;
                missedQuestions++;
            }
            else if( checkedInput[0].value===ansValues[i]) {
                correctAns++;
            }
            else {    
                incorrectAns++;
            }   

        }
            
        console.log("Answered Correctly: "+correctAns);
        console.log("Missed Question "+missedQuestions);
        console.log("Incorrect Answers: "+incorrectAns);
        
        displayResults(correctAns,incorrectAns,missedQuestions);
    }

    function displayResults(cAns,incAns,MissedQ) {
        $("#idTrivia").remove();
        $("#idButton").remove();
        $("div p").remove();
        var htmlResult="<span>All Done!!</span><br>"+
                        "<span>Correct Answers: "+cAns+"</span><br>"+
                        "<span>Incorrect Answers: "+incAns+"</span><br>"+
                        "<span>Unanswered: "+MissedQ+"</span>";
        
        $(".bigbox").css({"height":"98vh"});
        $("#idResult").append( $("<p>").html(htmlResult) );
        
    }

});
