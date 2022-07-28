import { React, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';


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
          if(i%2 ==0){
            temp[i][j]={
              type: 'manual',
              color: 'black',
              value: '0'
            };
          }
          else{
            temp[i][j]={
              type: 'auto',
              color: 'black',
              value: '0'
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

  onChangeInput = (value , event) => {
    console.log("Value at this row and col", value)
    const row = Math.floor(value/9);
    const col = Math.floor(value%9);

    let temp = this.state.arr;
    //console.log(temp)
    console.log(event.target.value)
    console.log("Row value ",row)
    console.log("Col value",col)
    temp[row][col] = event.target.value

    this.setState({
      arr : temp
    })
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
        }
       

        row.push(<p  className ={className}
        onClick = { (event) => this.onChangeInput(i,event)} 
        key = {i} 
        value={ arr[p][q].value === 0 ? '': arr[p][q]}
        ></p>)

      }

      board.push(row)
     
    }


    let choices_button = [];

    for(let i = 0; i<=9; i++){
      choices_button.push(
        <button value = {i}>{ i === 0 ? "Eraser" : i}</button>
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
