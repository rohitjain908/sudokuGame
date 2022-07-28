import { React, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import  sudokuGenerator  from './sudoku_generator'


function Solveable(arr){
  console.log(arr)
  return true
}

//each cell of grid will be a object
// cell object {
//   type-> auto,manually,hint,
//   color-> black,blue,yellow,
//   value-> 1 to 9

// }

class Solver extends Component {

  constructor(props) {
    super(props);

    var temp = new Array(9);
    for(let i = 0; i < 9; i++){
      temp[i] = new Array(9);
      for(let j = 0;  j < 9; j++)
        {
          if(i%2 === 0){
            temp[i][j]={
              type: 'manual',
              color: 'black',
              value: '0'
            };
          }
          else{
            temp[i][j]={
              type: 'hint',
              color: 'black',
              value: '3'
            };
          }
         
        }
        
    }
    this.state = {
      arr : temp,
      choice : '0'
    }
  }

 

  

  onSolve = (event) => {
    let arr = this.state.arr;
    if(Solveable(arr)){
      let solved = arr;
      for(let i=0;i<9;i++){
        for(let j=0;j<9;j++)
        solved[i][j]=i*9+j+1;
      }

      this.setState({
        arr : solved
      })
    }
    else{
      //have to print some message
    }
  }

  handleCellClick = (value , event) => {
    //console.log("Value at this row and col", value)
    let arr = sudokuGenerator(9,2);
    console.log(arr)
    const row = Math.floor(value/9);
    const col = Math.floor(value%9);

    let temp = this.state.arr;

    if(temp[row][col].type === 'manual'){
      // console.log("Row ",row);
      // console.log("Col ",col)
      // console.log("Choice ",this.state.choice)
      temp[row][col].value = this.state.choice
    }
    else{
      return;
    }
    //console.log(this.state.choice)
    this.setState({
      arr : temp
    })
  }


  handleChoiceClick = (event) =>{
    let value = event.target.innerHTML
    //console.log(event.target.innerHTML)
    if(value === 'Eraser'){
      this.setState({
        choice: '0'
      })
    }
    else{
      this.setState({
        choice: value
      })
    }
  }
  


  render() {  

    let board = []
    let arr = this.state.arr
    for(let p=0;p<9;p++){
      let row = []


      for(let q=0;q<9;q++){
        let i = p*9+q;
        let className = "puzzle_input"
        if(q%3 === 2){
          className = className + " border_right";
        }
        if(p%3 === 2){
          className = className + " border_bottom"
        }
        if(p === 0 ){
          className = className + " border_up"
        }
        if( q === 0 ){
          className = className + " border_left" ;
        }

        if( arr[p][q].type === 'manual'){
          className = className + " pointer_cursor";
          if( arr[p][q].value != '0'){
            className = className + " Dark_Blue_color";
          }
        }

        if( arr[p][q].type === 'auto'){
          className = className + " Dark_black_color";
        }


        if( arr[p][q].type === 'hint'){
          className = className + " Light_orange_color";
        }

        
       

        row.push(<p  className = {className}
        onClick = { (event) => this.handleCellClick(i,event)} 
        key = {i} 
        >{ arr[p][q].value === '0' ? '': arr[p][q].value}</p>)

      }

      board.push(row)
     
    }


    let choices_button = [];

    for(let i = 0; i<=9; i++){
      choices_button.push(
        <button key = {i} onClick = {this.handleChoiceClick}>{ i === 0 ? "Eraser" : i}</button>
      )
    }

    return (
      <>
        <div id="puzzle">
          {board}
          {choices_button}

        </div>


       
      </>
     
      
    )
  }
}

export default Solver;
