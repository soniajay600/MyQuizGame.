class Quiz{
    constructor(){}
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
     
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
    async start(){
        if(gameState === 0){
            contestant = new Contestant();
            var contestantCountRef = await database.ref('contestantCount').once("value");
            if(contestantCountRef.exists()){
                contestantCount = contestantCountRef.val();
                contestant.getCount();
            }
            question = new Question();
            question.display();
        }
    }
    play(){
      question.hide();
      background("yellow");
      textSize(30);
      text("Result of the Quiz",340,50);
      Contestant.getContestantInfo()
      if(allContestant!==undefined){
        var displayAnswers=230
        fill("blue");
        textSize(20);
        text("Winner in green color",130,230);
        for(var plr in allContestant){
          var correctAns="2";
          if(correctAns===allContestant[plr].answer)
          fill("green");
          else 
          fill("red");
          displayAnswers+=30;
          textSize(20);
          text(allContestant[plr].name+":"+allContestant[plr].answer,250,displayAnswers);
        }
      }
    }
}