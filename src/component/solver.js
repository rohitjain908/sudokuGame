import { React, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';


function Solveable(arr){
  return true
}

class Solver extends Component {

  constructor(props) {
    super(props);

    var temp = new Array(9);
    for(let i = 0; i < 9; i++){
      temp[i] = new Array(9);
      for(let j = 0;  j < 9; j++)
        {
          temp[i][j]=0;
        }
        
    }
    this.state = {
      arr : temp,
      temp : temp
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
        let id = ""
        if( ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i < 21) ||
        ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i < 27) ||
        ((i % 9 === 3 || i % 9 === 4 || i % 9 === 5) && (i > 27 && i < 53)) ||
        ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i > 53) ||
        ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i > 53) ){
            id = "puzzle_input1"
        }
        else{
            id = "puzzle_input2"
        }

        row.push(<input type="number" id = {id} 
        min = '1' max ='9' onChange = { (event) => this.onChangeInput(i,event)} key = {i} value={arr[p][q] === 0 ? '': arr[p][q]}></input>)

      }
      board.push(row)
    }

    return (
      <>
     <Container id="puzzle">
        {board}
        <button onClick={this.onSolve}>Solve</button>
      </Container>
       {/* <Container id="puzzle">
          {this.state.temp.map((row)=>(
            row.map((i)=>
              <input 
              type="number" 
              id={ ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i < 21) ||
                ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i < 27) ||
                ((i % 9 === 3 || i % 9 === 4 || i % 9 === 5) && (i > 27 && i < 53)) ||
                ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i > 53) ||
                ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i > 53) ? "puzzle_input1":"puzzle_input2"}
                min = '1' max ='9' onChange = { (event) => this.onChangeInput(i,event)} key = {i}
                ></input>)
                        
            ))}

          <button id ="solve_button" onClick={this.onSolve}>Solve</button>
         </Container> 
         */}
      </>
      
      
    )
  }
}

export default Solver;
