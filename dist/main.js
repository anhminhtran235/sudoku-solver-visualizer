const solve = document.querySelector("#solve");
const clear = document.querySelector("#clear");
const randomlyFill = document.querySelector("#randomly-fill");
const grid = document.querySelector("#grid");

solve.addEventListener('click', clickedSolve);
clear.addEventListener('click', clickedClear);
randomlyFill.addEventListener('click', clickedFill);

// This function is called when we click the "Randomly-fill" button
function clickedFill(e)
{
    let matrix = generateRandomBoard();
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            grid.rows[i].cells[j].firstChild.value = matrix[i][j];
        }
    }
}

function generateRandomBoard()
{
    let matrix = new Array(9);
    let numFill = 15;

    for(let i = 0; i < 9; i++)
    {
        matrix[i] = new Array(9);
        for(let j = 0; j < 9; j++)
        {
            matrix[i][j] = "";
        }
    }

    while(true)
    {
        if(numFill === 0)
            return matrix;
        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        if(matrix[i][j] == "")
        {
            matrix[i][j] = Math.floor(Math.random() * 9) + 1;
            if(canBeCorrect(matrix, i, j))
                numFill--;
            else
                matrix[i][j] = "";
        }
    }
}

// This function is called when we click the "Clear" button
function clickedClear(e)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            grid.rows[i].cells[j].firstChild.value = "";
        }
    }
}

// This function is called when we click the "Solve" button
function clickedSolve(e)
{
    matrix = readValue();
    solveSudoku(matrix);
    if(allBoardNonZero(matrix))
    {
        for(let i = 0; i < 9; i++)
        {
            for(let j = 0; j < 9; j++)
            {
                grid.rows[i].cells[j].firstChild.value = matrix[i][j];
            }
        }
    }
    else
    {
        alert("NO SOLUTION!");
    }
}

// Read value to 2d array
function readValue()
{
    let matrix = new Array(9);
    for(let i = 0; i < 9; i++)
    {
        matrix[i] = new Array(9);
        for(let j = 0; j < 9; j++)
        {
            val = grid.rows[i].cells[j].firstChild.value;
            matrix[i][j] = (val === "") ? 0 : parseInt(val);
        }
    }
    return matrix;
}

function solveSudoku(grid)
{
    let isFixed = new Array(9);
    for(let i = 0; i < isFixed.length; i++)
    {
        isFixed[i] = new Array(9);
        for(let j = 0; j < isFixed[i].length; j++)
        {
            if(grid[i][j] !== 0)
            {
                isFixed[i][j] = true;
            }
            else
            {
                isFixed[i][j] = false;
            }
        }
    }

    let data = {cont: true};
    solveSudokuHelper(grid, isFixed, 0, 0, data);
}

function solveSudokuHelper(grid, isFixed, row, col, data)
{
    if(data.cont === false || !canBeCorrect(grid, row, col))
        return;
    
    if(row === 8 && col === 8)
    {
        if(isFixed[row][col])
        {
            if(canBeCorrect(grid, row, col))
            {
                data.cont = false;
            }
            return;
        }
        else
        {
            for(let i = 1; i <= 9; i++)
            {
                grid[row][col] = i;
                if(canBeCorrect(grid, row, col))
                {
                    data.cont = false;
                    return;
                }
            }
            grid[row][col] = 0;
        }
    }

    let newRow = (col === 8) ? row + 1 : row;
    let newCol = (col === 8) ? 0 : col + 1;
    
    if(isFixed[row][col] && canBeCorrect(grid, row, col))
    {
        solveSudokuHelper(grid, isFixed, newRow, newCol, data);
    }
    else    
    {
        for(let i = 1; i <= 9; i++)
        {
            if(data.cont === false)
                return;
            grid[row][col] = i;

            if(canBeCorrect(grid, row, col))
            {
                solveSudokuHelper(grid, isFixed, newRow, newCol, data);
            }
        }
        if(data.cont === false)
            return;
        grid[row][col] = 0;
    }
}

function canBeCorrect(grid, row, col)
{
    
    // Check row
    for(let c = 0; c < 9; c++)
    {
        if(grid[row][col] !== 0 && col !== c && grid[row][col] === grid[row][c])
            return false;
    }
    
    // Check column
    for(let r = 0; r < 9; r++)
    {
        if(grid[row][col] !== 0 && row !== r && grid[row][col] === grid[r][col])
            return false;
    }
    
    // Check 3x3 square
    let r = Math.floor(row / 3);
    let c = Math.floor(col / 3);
    for(let i = r*3; i < r*3 + 3; i++)
    {
        for(let j = c * 3; j < c*3 + 3; j++)
        {
            if((row !== i || col !== j) && grid[i][j] !== 0 && grid[i][j] === grid[row][col])
                return false;
        }
    }

    return true;
}

function allBoardNonZero(grid)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(grid[i][j] === 0)
                return false;
        }
    }
    return true;
}