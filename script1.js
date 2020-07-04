var moveController= (function(){
    var userInputs= [];
    var systemInputs=[];
    var player1 = 'O';//Human
    var player2 = 'X';
    var possibleValues=[1,2,3,4,5,6,7,8,9];
    var winnerMoves=[[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,5,7],[3,6,9],[4,5,6],[7,8,9]];
    
    function checkWinner(playerList){
       var isMatchFound= false;
        for( var i=0; i< winnerMoves.length ; i++){
            var count=0;
            winnerMoves[i].forEach(elem => {
                if(playerList.includes(elem)){
                    count++;
                }   
            });
            if(count==3){
                 isMatchFound = true;
                // console.log('Winner found '+ playerList);
                 break;
                  
             }
        }
      
       return  isMatchFound;
    }
    function checkForTwoHits(playerList){
         var output= 0;
        for( var i=0; i< winnerMoves.length ; i++){
            var count=0, indexcount=0;
            var winMove= winnerMoves[i]; 
            for(var j =0; j< winMove.length ; j++){
                if(playerList.includes(winMove[j])){
                    indexcount=indexcount+j;
                    count++;
                }
            }
            if(count==2){
                
                if(possibleValues.includes(winMove[3-indexcount])){
                   output= winMove[3-indexcount];
                  break;
                }
             }
        }
      
       return  output;
    }
    function checkForOneHit(playerList){
        var output= 0;
        for( var i=0; i< winnerMoves.length ; i++){
            var count=0, index=0;
            var winMove= winnerMoves[i]; 
            for(var j =0; j< winMove.length ; j++){
                if(playerList.includes(winMove[j])){
                    if(possibleValues.includes(winMove[(j+1)%3])){
                        output= winMove[(j+1)%3];
                        break;
                    }else{
                        if(possibleValues.includes(winMove[(j+2)%3])){
                        output= winMove[(j+2)%3];
                        break;
                    }
                    }
                }
            }
            
        }
      
       return  output;
    }
     return{
         init : function(){
             userInputs=[];
             systemInputs=[];
             possibleValues=[1,2,3,4,5,6,7,8,9];
         },
         updatePlayersList : function(elem, playerId){
             if(playerId ==1){
                 userInputs.push(elem);
             }else{
                 systemInputs.push(elem);
             }
            var removeIndex= possibleValues.indexOf(elem);
             //console.log('index is '+ removeIndex +'of elem is'+ elem);
             possibleValues.splice(removeIndex, 1);
         },
         getSystemInput : function(){
             if(userInputs.length==1){
               var size= possibleValues.length -1;
               systemVal= possibleValues[Math.round(Math.random()* size)];
             }else{
                 systemVal= checkForTwoHits(systemInputs);
                // console.log('value returned for two hits for systemvalues search' + systemVal);
                 if(systemVal==0){
                     if(userInputs.length >=2){
                         console.log(userInputs);
                         systemVal =  checkForTwoHits(userInputs);
                         //console.log('value returned for two hits for uservalues search' + systemVal);
                     }
                     if(systemVal==0){
                         systemVal= checkForOneHit(systemInputs);
                         //console.log('value retured from one hit' + systemVal);
                     }
                 }
             }
             return systemVal;
         },
         checkIfplayerIsWinner : function(playerId){
         if(playerId ==1){
             return checkWinner(userInputs);
         }else{
             return checkWinner(systemInputs);
         }
     },
         checkIfMoveIsValid : function(elem){
          //   console.log(possibleValues + 'check is elem '+ elem +' is in array')
             return possibleValues.includes(elem);
         }
         
     }
})();

var UiController=(function(){
    
   return{
       init : function(){
           document.querySelectorAll('.box').forEach(item => item.textContent='');
            document.querySelector(".gameText").style.display = "none";
           document.querySelector('.gameText').textContent='';
       },
     updateWithMove : function(id, player){
         if(player==1){
             document.getElementById(id).textContent = 'O'; 
         }else{
             document.getElementById(id).textContent = 'X';
         }
    },
     updateUIWithWinner : function(playerId){
         document.querySelector(".gameText").style.display = "block";
         if(playerId ==1){
             /*document.querySelector('.gameText').innerHTML='<iframe src="https://giphy.com/embed/vmon3eAOp1WfK" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';*/
             document.querySelector('.gameText').textContent='USER WON';
         }else{
             document.querySelector('.gameText').textContent='SYSTEM WON';
         }
     },
     updateUIWithTie : function(playerId){
         document.querySelector(".gameText").style.display = "block";
          document.querySelector('.gameText').textContent='TIE';
     }
}
})();


var appController =(function(UiCntrl,moveCntrl){
    var USER=1;
    var SYSTEM=2;
    var count=0;
    function game(){
        init();
        document.querySelectorAll('.box').forEach(item => item.addEventListener('click', setPlayerMove));
        document.querySelector('.buttont').addEventListener('click', init);
    }
    function init(){
        UiCntrl.init();
        moveCntrl.init();
        count=0;
    }
    function setPlayerMove(event){
        var winnerFound =false;
        var id= parseInt(event.target.id);
        var ouptut= moveCntrl.checkIfMoveIsValid(id);
        if(ouptut){
            playerMove(id,USER);
            count++;
            winnerFound =moveCntrl.checkIfplayerIsWinner(USER);
           if(winnerFound){
                UiCntrl.updateUIWithWinner(USER);
           }else{
                 if(count <9){
                systemMove= moveCntrl.getSystemInput();
                playerMove(systemMove, SYSTEM);
                count++;
                 winnerFound =moveCntrl.checkIfplayerIsWinner(SYSTEM);
                 if(winnerFound){
                   UiCntrl.updateUIWithWinner(SYSTEM);
                 }
           }else{
                     UiCntrl.updateUIWithTie();
                 }
          }
        }
    }
    
    function playerMove(id, playerId){
         //2.update the UI with user move
         UiCntrl.updateWithMove(id,playerId);
        // 3 remove from possible values
        moveCntrl.updatePlayersList(id,playerId);
    }
    return {
       playGame : function(){
        game();
    } 
        
    } 
})(UiController,moveController);

appController.playGame();

