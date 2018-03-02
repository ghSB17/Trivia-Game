$("document").ready( function(){


const objQuestionsBank = [{qtext:"Which of these locations is a huge protected wilderness area in Southern New Jersey?", anschoice1:"Pinelands", anschoice2:"HighPoint",anschoice3:"Union",anschoice4:"Manasquan",anschoice5:"NOne of the above", correctchoice:"anschoice1"},
{qtext:"Which animal is featured on New Jersey's state seal", anschoice1:"Buffalo", anschoice2:"Lion", anschoice3:"Horse", anschoice4:"Eagle", anschoice5:"Panther", correctchoice:"anschoice3"}, 
{qtext:"New Jersey is the third highest harvester of what produce?", anschoice1:"cranberries", anschoice2:"blueberries", anschoice3:"strawberries", anschoice4:"apples", anschoice5:"broccoli", correctchoice:"anschoice1"},
{qtext:"Which is the third largest city in the Garden State?",anschoice1:"Jersey City", anschoice2:"Princeton", anschoice3:"Ocean City", anschoice4:"Paterson", anschoice5:"Cherry Hill", correctchoice:"anschoice4"},
{qtext:"Which NJ town is home of the first drive-in movie theatre?", anschoice1:"Keansburg", anschoice2:"Camden", anschoice3:"Englishtown", anschoice4:"Hamilton", anschoice5:"Asbury Park", correctchoice:"anschoice2"} ]

var counter = 3*60;
var checkCounter;

function displayTimer() {
    if( counter > 0 ) {
        minutes=Math.floor(counter/60);
        seconds=counter%60;
        minutes=checkdisplay(minutes);
        seconds=checkdisplay(seconds);
        counter--;
        $("#idTimer").text("Time Left:"+minutes+":"+seconds)
    } else {
        $("#idTimer").text("Time Left:00:00");
        clearInterval(checkCounter);
        $(":input").attr("disabled",true);
        alert("Times Up!!!!");
        checkAnswers();
    }
};

function checkdisplay(timeValue) {
    if( timeValue<10 )
        return "0"+timeValue;
    else
        return timeValue;
};

var ansValues=[];
$("#idButton").on("click",function(){
    //alert(this.text);
    console.dir(this);
    
    if( this.innerText==="Start") {
      $.each(objQuestionsBank, function(index) {
       
        var htmlText="";
        var newElement = $("<div>");
        newElement.css({"margin-bottom":"5%"});
        $.each(objQuestionsBank[index], function(key, value){
            //console.log("KEY:"+key);
            //console.log("VALUE:"+value);
            if(key==="qtext") {
                htmlText+="<br><br><p>"+(index+1)+".) "+value +"</p>";
            } else if( key==="correctchoice") {
                ansValues.push(value);
            } else {
                htmlText+="<input type='radio' name="+index+" value="+key+" >"+value+"</input><br>";
            }
            
        });
        newElement.html(htmlText);
        $("#idTrivia").append(newElement);
        //$("#idTrivia").append($("<div>").html(htmlText));
        $('#idButton').text("Done");
      });
      checkCounter=setInterval(displayTimer,1000);
    } else if(this.innerText==="Done") {
        alert("Done Clicked");
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

            if(checkedInput.length===0)
                missedQuestions++;
            else if( checkedInput[0].value===ansValues[i]) {
                correctAns++;
            }
            else {    
                checkedInput.css("background-color","red");
                incorrectAns++;
            }   
        }
            
        console.log("Answered Correctly: "+correctAns);
        console.log("Missed Question "+missedQuestions);
        console.log("Incorrect Answers: "+incorrectAns);
        
        alert("You Answered "+correctAns+" questions correctly");
        displayResults(correctAns,incorrectAns,missedQuestions);
    }

    function displayResults(cAns,incAns,MissedQ) {
        $("#idTrivia").remove();
        $("#idButton").remove();
        $("div p").remove();
        var htmlResult="<span><h4> All Done!!</h4></span><br><br>"+
                        "<span>Correct Answers: "+cAns+"</span><br>"+
                        "<span>Incorrect Answers: "+incAns+"</span><br>"+
                        "<span>Unanswered: "+MissedQ+"</span>";
        $("#idResult").append( $("<p>").html(htmlResult) );
        
    }



});
