import { React, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import  sudokuGenerator  from './sudoku_generator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import solver from './sudoku_solver';


function Solveable(arr){
  console.log(arr)
  return true
}


function getArray(g){
  //console.log("G", g);
  var grid = g.map((row)=>row.map((item)=>parseInt(item.value)));
  //console.log("Grid ",grid);
  return grid;
}

function shuffle(array){
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomUnfilledPosition(request){
  let arr = [];
  for(let i = 0 ; i < 9; i++){
    for(let j = 0; j < 9; j++){
      if(request[i][j] === 0){
        arr.push(i*9+j);
      }
    }
  }
  shuffle(arr);

  return arr[0];

}


function rowWrongFilled(grid,row){

  for(let col1 = 0; col1 < 9; col1++){
    for(let col2 = col1 + 1; col2 < 9; col2++){
      if(grid[row][col2] === 0||grid[row][col1] === 0){
        continue;
      }
      //console.log(row,col1,col2)
      if(grid[row][col1] ===  grid[row][col2]){
        console.log(row,col1,col2)
        return true;
      }
      
    }
  }
  return false;
}

function colWrongFilled(grid,col){

  for(let row1 = 0; row1 < 9; row1++){
    for(let row2 = row1 + 1; row2 < 9; row2++){
      if(grid[row1][col] === 0 || grid[row2][col] === 0){
        continue;
      }
      if(grid[row1][col] ===  grid[row2][col])
      return true;
    }
  }
  return false;
}


function boxWrongFilled(grid, row, col){
  let row_low = Math.floor(row/3)*3;
  let row_high = row_low + 2;

  let col_low = Math.floor(col/3)*3;
  let col_high = col_low + 2;

  let d = {};

  for(let i = row_low; i <= row_high; i++){
    for(let j = col_low; j <= col_high; j++){

        if(grid[i][j] === 0){
          continue;
        }
        if(grid[i][j] in d)
        return true;

        d[grid[i][j]] = 1;

    }
  }
  return false;
}





function IsWrongFilled(row,col,g){
  var grid = g.map((row)=>row.map((item)=>parseInt(item.value)));
  //console.log("row");
  if(rowWrongFilled(grid,row))
  return true;

 // console.log("col");
  if(colWrongFilled(grid,col))
  return true;
 // console.log("box");

  if(boxWrongFilled(grid,row,col))
  return true;

  

  return false;
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

    let randomSudoku =  sudokuGenerator(9,"Easy");

    var temp =  new Array(9);
    for(let i = 0; i < 9; i++){
      temp[i] = new Array(9);
      for(let j = 0;  j < 9; j++){
        if(randomSudoku[i][j] === 0){
          temp[i][j] = {
            type: 'manual',
            value: '0'
          }
        }
        else{
          temp[i][j] = {
            type: 'auto',
            value: randomSudoku[i][j]
          }
        }
      }
        
    }
    this.state = {
      arr : temp,
      choice : '0',
      notSolved: false
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
    // let arr = sudokuGenerator(9,2);
    // console.log(arr)
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

  handleNewgame = (event) =>{
    //console.log("New Game")
    let randomSudoku =  sudokuGenerator(9,"Easy");
    //console.log(randomSudoku)
    var temp =  new Array(9);
    for(let i = 0; i < 9; i++){
      temp[i] = new Array(9);
      for(let j = 0;  j < 9; j++){
        if(randomSudoku[i][j] === 0){
          temp[i][j] = {
            type: 'manual',
            value: '0'
          }
        }
        else{
          temp[i][j] = {
            type: 'auto',
            value: randomSudoku[i][j]
          }
        }
      }
        
    }

    this.setState({
      arr: temp
    })
  }


    handleSolve = (event) => {

      let request = getArray(this.state.arr);
      console.log("Reuquest",request)
      let response = solver(request);
      console.log("request",request)
      //let response = {"message": "sdjsd","arr":"dsfkj"}
      console.log("Response", response)
      if(response['message'] === "Solved"){
        // console.log("Response", response['arr'])
        var temp =  new Array(9);
        for(let i = 0; i < 9; i++){
          temp[i] = new Array(9);
          for(let j = 0;  j < 9; j++){
           if(this.state.arr[i][j].value === '0'){
            temp[i][j] = {
              type : 'hint',
              value : response['arr'][i][j]
            }
           }
           else{
            temp[i][j] = this.state.arr[i][j];
           }
          }
        }

        //console.log(temp)

        this.setState({
          arr : temp
        })
      }
      else{
        this.setState({
          notSolved: true
        })
      }
      

  }


  handleClear = (event) => {
    var temp =  new Array(9);
    for(let i = 0; i < 9; i++){
      temp[i] = new Array(9);
      for(let j = 0;  j < 9; j++){
        if(this.state.arr[i][j].type != 'auto'){
          temp[i][j] = {
            type: 'manual',
            value: '0'
          }
        }
        else{
          temp[i][j]=this.state.arr[i][j];
        }
      }
        
    }

    this.setState({
      arr: temp
    })
  }



  handleHint = (event) => {
    let request = getArray(this.state.arr);
    let response = solver(request);
    if(response['message'] === "Solved"){
      let value = getRandomUnfilledPosition(request);
      let row = Math.floor(value/9);
      let col = Math.floor(value%9);  
      this.state.arr[row][col] =  {type:'hint',value:response['arr'][row][col]}
      this.setState({
        arr:this.state.arr
      })

      
    }
  }
  


  render() {  

//     if (this.state.notSolved === true ){
//       return(
//         <>
          
// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
//   Launch demo modal
// </button>


// <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//   <div class="modal-dialog modal-dialog-centered" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
//         </>
//       )
//     }

    let board = [];
    let arr = this.state.arr;
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

        var inValid = IsWrongFilled(p,q,this.state.arr);

        if(inValid === true){
          className = className + " wrong_filled";
        }
        
       

        row.push(<p  className = {className}
        onClick = { (event) => this.handleCellClick(i,event)} 
        key = {i} 
        >{ arr[p][q].value === '0' ? '': arr[p][q].value}</p>)

      }

      board.push(row)
     
    }


    let choices_button1 = [];
    let choices_button2 = [];
    

    for(let i = 0; i<=4; i++){
      var className = "choice_button";
      if(i === parseInt(this.state.choice)){
        className = className + " current_choice"
      }
      choices_button1.push(
        <Col>
          <button key = {i*1000} className ={className} onClick = {this.handleChoiceClick}>{ i === 0 ? "Eraser" : i}</button>
        </Col>
      )
    }

    for(let i = 5; i<=9; i++){
      var className = "choice_button";
      if(i === parseInt(this.state.choice)){
        className = className + " current_choice"
      }
      choices_button2.push(
        <Col>
          <button key = {i*1000} className ={className} onClick = {this.handleChoiceClick}>{ i === 0 ? "Eraser" : i}</button>
        </Col>
      )
    }

    return (
      <>
        
        

        <div >
          <div id="puzzle">
            {board}
          </div>
          <div >
            <Row>
              {choices_button1}
            </Row>
            <Row>
              {choices_button2}
            </Row>
          </div>
          <div>
            <button type="button" className="btn btn-primary" onClick={this.handleClear}>Clear</button>
            <button type="button" className="btn btn-warning" onClick={this.handleHint}>Hint</button>
            <button type="button" className="btn btn-success" onClick={this.handleSolve}>Solve</button>
            <button type="button" className="btn btn-danger" onClick={this.handleNewgame}>New Game</button>
          </div>
        </div>


       
      </>
     
      
    )
  }
}

export default Solver;
