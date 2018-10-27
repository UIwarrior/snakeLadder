import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  index = 100;
  boardArray:Array<any> = [];
  diceNumber:number;
  playerMarker1:number = 1;
  playerMarker2:number = 1;
  snackArray:Array<{boardNumber:number,destinationNum:number}> =[]
  ladderArray:Array<{boardNumber:number,destinationNum:number}> =[]
  currentPlayer:any;
  playersArray:Array<any> = [{
    name:'Player1',
    currentPos:1
  },
  {
    name:'Player2',
    currentPos:1
  }]

  ngOnInit(){
    while(this.index > 0)
    {
      //console.log(this.index);
      this.boardArray.push({
        number:this.index,
        snake:{
          destination:0,
          flag:false
        },
        ladder:{
          destination:0,
          flag:false
        }
      });
      --this.index;
    }
  }

  generateSnake(){
  
  }

  getRandomInt(min, max) {
   console.log(Math.floor(Math.random() * max + min));
}



  rolledDice;
  rollDice(){
    this.diceNumber =Math.floor(Math.random() * 6 + 1);
    //console.log(this.diceNumber);

    if(this.currentPlayer.toLowerCase() === 'player1')
    {
      this.playerMarker1 = this.playerMarker1 + this.diceNumber;
    }
   else if(this.currentPlayer.toLowerCase() === 'player2')
   {
    this.playerMarker2 = this.playerMarker2 + this.diceNumber;
   }

  }

  selectPlayer(_param){
    if(_param == 1)
    {
      this.currentPlayer = 'Player1'
    }
    else
    {
      this.currentPlayer = 'Player2'
    }
    
  }


}
