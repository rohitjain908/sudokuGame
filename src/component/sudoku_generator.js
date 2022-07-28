
const randomNumberGenerator = (minimum, maximum) => {
    const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomNumber
}


class Sudoku {

    Sudoku(N, K){
        let grid = [];
        for(let i =0; i < N; i++){
            let row = [];
            for(let j =0 ; j < N; j++){
                row.push(0);
            }
            grid.push(row);
        }
        console.log("In the constructor");
        console.log(grid)

        this.grid = grid;
        this.N = N;
        this.K = K;
    }

    usedInRow(row, value, N){
        for(let col = 0; col < N; col++){
            if(this.grid[row][col] === value){
                return true;
            } 
        }
        return false;
    }

    usedInColumn(col, value, N){
        for(let row = 0; row < N; row++){
            if(this.grid[row][col] === value){
                return true;
            } 
        }
        return false;
    }

    usedInBox(row, col, value, N){
        let row_low = (row/3)*3;
        let row_high = row_low + 2;

        let col_low = (col/3)*3;
        let col_high = col_low + 2;

        console.log("row low ",row_low)
        console.log("row high ",row_high)
        console.log("col low ",col_low)
        console.log("col high ",col_high)

        for(let i = row_low; i <= row_high; i++){
            for(let j = col_low; j <= col_high; j++){
                console.log("I value ", i)
                console.log("J value ", j)
                if(this.grid[i][j] === value){
                    return true;
                }

            }
        }
        return false;
    }

    is_valid(row, col, value, N){
        if(this.usedInRow(row, value, N))
        return false;

        if(this.usedInColumn(col, value, N))
        return false;

        if(this.usedInBox(row, col, value, N))
        return false;

        return true;
    }

    generateValidSudoku(row, col, N){
        if(col === N){
            return this.generateValidSudoku(row+1, col, N);
        }
        else if (row === N){
            return true;
        }

       while(1){
        let number = randomNumberGenerator(1, N);
        let valid = this.is_valid(row, col, number, N);
        if(valid){
            this.grid[row][col] = number;
            if(this.generateValidSudoku(row, col+1, N)){
                return true;
            }
            this.grid[row][col] = 0;
        }
       }

       return false;
    }

    generate(){
        var f = this.generateValidSudoku(0, 0, this.N);
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                console.log(this.grid[i][j]);
            }
        }
    }



};

const sudokuGenerator = (N,type) => {
    // console.log(N);
    // console.log(type);

    let K;



    if (type == "Easy"){
        let Minimum = Math.floor(N/3)
        let Maximum = Math.floor(N/2);
        K = randomNumberGenerator(Minimum, Maximum);
    }
    else if(type == "Medium"){
        let Minimum = Math.floor(N/3)
        let Maximum = Math.floor(N/2);
        K = randomNumberGenerator(Minimum, Maximum);
    }
    else if(type == "Hard"){
        let Minimum = Math.floor(N/3)
        let Maximum = Math.floor(N/2);
        K = randomNumberGenerator(Minimum, Maximum);
    }

    K = 50;
    //5 2 5

    let sudoku = new Sudoku(9,"Easy");
    sudoku.generate();


















    return N*5;
}


export default sudokuGenerator;