import { Component, OnInit } from '@angular/core';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

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
  playerRadio;
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

    //generating the borad numbers
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

    //generating snacks and ladder array randomely but make sure snake ladder does not override 
    for(let i=0; i<=15;i++)
    {
      //generating position of the snake number after 20
      let _boardNumber = Math.floor(Math.random() * 100 + 20);

      //generating snake destination 
      let _snakeDest = _boardNumber - (i +10);
      
      //generating position of the ladder 
      let _ladderNumber =  _boardNumber - 5;

      
      let _ladderDest =  _boardNumber + (i + 1) 

      if(_boardNumber < 100)
      {
        if(_snakeDest > 1)
        {

          this.snackArray.push({
            boardNumber:_boardNumber,
            destinationNum:_snakeDest
          })
        }
      
       if(_ladderDest <=100 && _ladderDest != _boardNumber )
       {

        this.ladderArray.push({
          boardNumber:_ladderNumber,
          destinationNum:_ladderDest
        })
       }  

      }
    }


     //pushing snacks and ladders in the board
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
   this.checkIfGameComplete(this.playerMarker1,this.playerMarker2)
  }

  checkIfGameComplete(player1,player2)
  {
    if(player1 == 100)
    {
      alert('Player 1 won the match');
      this.playerMarker1 = 1;
      this.playerMarker2 = 1;      
    }


    if(player2 == 100)
    {
      alert('Player 2 won the match');
      this.playerMarker1 = 1;
      this.playerMarker2 = 1;      
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
