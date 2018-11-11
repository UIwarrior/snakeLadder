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

    this.generateSnake();
  }

  generateSnake(){
    for(let i=0; i<=10;i++)
    {
      let _boardNumber = Math.floor(Math.random() * 100 + 20);
      let  destNum = _boardNumber - (i +10);
      
      let _ladderNumber =  _boardNumber - 5;
      let _ladderDest =  _boardNumber + (i + 1) 

      if(_boardNumber < 100)
      {
        this.snackArray.push({
          boardNumber:_boardNumber,
          destinationNum:destNum
        })
        this.ladderArray.push({
          boardNumber:_ladderNumber,
          destinationNum:_ladderDest
        })  

      }
    }

    this.boardArray.forEach(element => {
        this.snackArray.forEach( element2 => {
          if(element.number === element2.boardNumber)
          {
           element.snake.flag = true;
           element.snake.destination = element2.destinationNum;   
          }
        })

        //ladder building
        this.ladderArray.forEach( element2 => {
          if(element.number === element2.boardNumber)
          {
           element.ladder.flag = true;
           element.ladder.destination = element2.destinationNum;   
          }
        })

        


    });


    console.log(this.snackArray);
    console.log(this.boardArray);
  }

  generateLadder(){

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
      this.boardArray.forEach((o,i) => {
        if(o.number == this.playerMarker1 && o.snake.flag == true)
        {
        
          alert('snake detected');
          this.playerMarker1 = o.snake.destination;
          console.log(this.playerMarker1);
        }

        if(o.number == this.playerMarker1 && o.ladder.flag == true)
        {
        
          alert('ladde detected');
          this.playerMarker1 = o.ladder.destination;
          console.log(this.playerMarker1);
        }



      })  
      
     
      
    }
   else if(this.currentPlayer.toLowerCase() === 'player2')
   {
    this.playerMarker2 = this.playerMarker2 + this.diceNumber;
    this.boardArray.forEach((o,i) => {
      if(o.number == this.playerMarker2 && o.snake.flag == true)
      {
      
        alert('snake detected');
        this.playerMarker2 = o.snake.destination;
      }

      if(o.number == this.playerMarker2 && o.ladder.flag == true)
      {
      
        alert('ladde detected');
        this.playerMarker2 = o.ladder.destination;
      }
    }) 

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
