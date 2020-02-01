// Dropdown menu (Speed)
// Dropdown menu (Speed)
// Dropdown menu (Speed)

const speedDropDown = document.querySelector("span.selected");
const speedOptions = document.querySelectorAll('.speed-options');
speedOptions.forEach(e => {
    e.addEventListener("click", () => {
        let value = e.innerHTML;
        speedDropDown.innerHTML = value;
        speedSelected = value;
    });
});

// Dropdown menu (Algorithms)
// Dropdown menu (Algorithms)
// Dropdown menu (Algorithms)

const algorithmsDropDown = document.querySelector("span.algo-selected");
const algorithmsOptions = document.querySelectorAll('.algo-options');
algorithmsOptions.forEach(e => {
    e.addEventListener("click", () => {
        let value = e.innerHTML;
        algorithmsDropDown.innerHTML = value;
        algorithmsSelected = value;
    });
});

// Dropdown menu (Algorithms)
// Dropdown menu (Algorithms)
// Dropdown menu (Algorithms)

const subMenu = document.querySelector("#nav-bar").children[4].children[1];
const speedButton = document.querySelector("#nav-bar").children[4].children[0];
const liAroundDropdownMenu = document.querySelector("#nav-bar").children[4];
const liAroundAlgoDropdownMenu = document.querySelector("#nav-bar").children[5];
const solve = document.querySelector("#solve");
const clear = document.querySelector("#clear");
const randomlyFill = document.querySelector("#randomly-fill");
const grid = document.querySelector("#grid");
let speedSelected = "fast";
let algorithmsSelected = "Backtracking";

solve.addEventListener('click', clickedSolve);
clear.addEventListener('click', clickedClear);
randomlyFill.addEventListener('click', clickedFill);

const inputs = document.getElementsByTagName('input');

// This function is called when we click the "Randomly-fill" button
function clickedFill(e)
{
    clickedClear()  // Clear the board first
    fill80Succeed20NotSure();
}

function fill80Succeed20NotSure()
{
    if(Math.random() < 0.8)
    {
        hasSolutionMatrix = [[8, 2, 5, 1, 9, 7, 3, 4, 6],
                        [6, 1, 7, 3, 4, 2, 9, 5, 8],
                        [4, 3, 9, 6, 8, 5, 7, 1, 2],
                        [1, 9, 6, 5, 3, 8, 2, 7, 4],
                        [2, 8, 3, 7, 6, 4, 5, 9, 1],
                        [5, 7, 4, 9, 2, 1, 8, 6, 3],
                        [7, 6, 1, 2, 5, 3, 4, 8, 9],
                        [9, 4, 2, 8, 7, 6, 1, 3, 5],
                        [3, 5, 8, 4, 1, 9, 6, 2, 7]];
        mixSudokuQuiz(hasSolutionMatrix);
    }
    else // Just randomly fill
    {
        matrix = generateRandomBoard();
        for(let i = 0; i < 9; i++)
        {
            for(let j = 0; j < 9; j++)
            {
                if(matrix[i][j] == 0)
                    grid.rows[i].cells[j].firstChild.value = "";
                else
                    grid.rows[i].cells[j].firstChild.value = matrix[i][j];
            }
        }
    }
}

function mixSudokuQuiz(matrix)
{
    let numEntries = 20 + Math.floor((Math.random() * 8));
    mixRowsAndColumns(matrix);
    keepSomeEntries(matrix, numEntries);

    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(matrix[i][j] == 0)
                grid.rows[i].cells[j].firstChild.value = "";
            else
                grid.rows[i].cells[j].firstChild.value = matrix[i][j];
        }
    }
}

function mixRowsAndColumns(matrix)
{
    let numSwap = Math.floor(Math.random() * 15) + 1; // Swap 1-10 times
    while(numSwap > 0)
    {
        let num1 = Math.floor(Math.random() * 9);   // Pick a row (or column) from 0 to 8
        let num2 = Math.floor(num1 / 3) * 3 + Math.floor(Math.random() * 3);
        if(Math.random() < 0.5)
        {
            swapRow(matrix, num1, num2);
        }
        else
        {
            swapCol(matrix, num1, num2);
        }
        numSwap--;
    }
}

function keepSomeEntries(matrix, numEntriesKeep)
{
    let numEntriesDelete = 81 - numEntriesKeep;
    for(let i = 0; i < numEntriesDelete; i++)
    {
        while(true)
        {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if(matrix[row][col] != 0)
            {
                matrix[row][col] = 0;
                break;
            }
        }
    }
}

function swapRow(matrix, row1, row2)
{
    for(let i = 0; i < 9; i++)
    {
        let temp = matrix[row1][i];
        matrix[row1][i] = matrix[row2][i];
        matrix[row2][i] = temp;
    }
}

function swapCol(matrix, col1, col2)
{
    for(let i = 0; i < 9; i++)
    {
        let temp = matrix[i][col1];
        matrix[i][col1] = matrix[i][col2];
        matrix[i][col2] = temp;
    }
}


function generateRandomBoard()
{
    let numFill = 20 + Math.floor((Math.random() * 8));
    let matrix = new Array(9);

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
            break;
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
    return matrix;
}

// This function is called when we click the "Clear" button
function clickedClear(e)
{
    clearAllTimeOuts();
    clearAllColors();
    setAllowSolveAndSpeed();
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
    // Verify input first
    if(verifyInput() == false)
        return;

    if(speedDropDown.innerHTML === "Speed") // If haven't set speed
        speedDropDown.innerHTML = "Medium"; // Set to medium

    if(algorithmsDropDown.innerHTML === "Algorithms") // If haven't set Algorithms yet
        algorithmsDropDown.innerHTML = "Backtracking"; // Set to Backtracking
    
    currentAlgo = getCurrentAlgorithm();
    if(currentAlgo === "Backtracking")
        clickedSolveBacktracking(e);
    else if(currentAlgo === "BFS")
        clickedSolveBFS(e);
}

var timeAfterAllDone = 0;
function clickedSolveBacktracking(e)
{
    countToPreventHanging = 0;
    setNotAllowSolveAndSpeed();
    let matrix = readValue();
    
    solveSudoku(matrix);

    timeAfterAllDone = (++timeCount) * duration;

    if(allBoardNonZero(matrix))
    {
        solveSucceededAnimation();
    }
    else
    {
        timeOutID = setTimeout(alertNoSolution, timeAfterAllDone);
        timeOutID = setTimeout(setAllowSolveAndSpeed, timeAfterAllDone);
    }
}

var bfsTimeAfterAllDone = 0;
function clickedSolveBFS(e)
{
    setNotAllowSolveAndSpeed();
    let matrix = readValue();

    if(stopFromStart(matrix))   // If input is clearly unsolvable 
    {
        timeOutID = setTimeout(alertNoSolution, timeAfterAllDone);
        timeOutID = setTimeout(setAllowSolveAndSpeed, timeAfterAllDone);
        return;                 // Alert no solution right away
    }

    solveSudokuBFS(matrix);

    bfsTimeAfterAllDone = (++bfsTimeCount) * bfsDuration;
    
    if(allBoardNonZero(matrix))
    {
        bfsSolveSucceededAnimation();
    }
    else
    {
        // TODO
        timeOutID = setTimeout(alertNoSolution, bfsTimeAfterAllDone);
        timeOutID = setTimeout(setAllowSolveAndSpeed, bfsTimeAfterAllDone);
    }
}

// See if the input is valid
function verifyInput()
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            let val = grid.rows[i].cells[j].firstChild.value;

            if((val != "" && Number.isNaN(parseInt(val))) || 0 >= parseInt(val) || 9 < parseInt(val))
            {
                alert("Please enter numbers from 1 to 9");
                return false;
            }
        }
    }
    return true;
}

function alertNoSolution()
{
    alert("No Solution!");
}

function solveSucceededAnimation()
{
    let currentDuration = timeCount * duration;
    let succeededDuration = 20;
    let newCount = 0;
    for(let row = 0; row < 9; row++)
    {
        for(let col = 0; col < 9; col++)
        {
            timeOutID = setTimeout(colorCell, 
                        currentDuration + (newCount++)*succeededDuration, row, col);
        }
    }
    timeOutID = setTimeout(setAllowSolveAndSpeed, currentDuration + (newCount++)*succeededDuration);
}

function bfsSolveSucceededAnimation()
{
    let currentDuration = bfsTimeCount * bfsDuration;
    let succeededDuration = 20;
    let newCount = 0;
    for(let row = 0; row < 9; row++)
    {
        for(let col = 0; col < 9; col++)
        {
            bfstimeOutID = setTimeout(colorCell, 
                        currentDuration + (newCount++)*succeededDuration, row, col);
        }
    }
    timeOutID = setTimeout(setAllowSolveAndSpeed, currentDuration + (newCount++)*succeededDuration);
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
            
            // Check if input is valid
            if(typeof(parseInt(val)) != 'number' || 0 >= parseInt(val) || 9 < parseInt(val))
            {
                alert("Please enter numbers from 1 to 9");
                return;
            }

            matrix[i][j] = (val === "") ? 0 : parseInt(val);
        }
    }
    return matrix;
}

// Set speed
const FAST_SPEED = 1;
const MEDIUM_SPEED = 10;
const SLOW_SPEED = 50;
var countToPreventHanging = 0;
function solveSudoku(matrix)
{
    duration = MEDIUM_SPEED;
    if(speedDropDown.innerHTML === 'Fast') duration = FAST_SPEED;
    else if(speedDropDown.innerHTML === 'Medium') duration = MEDIUM_SPEED;
    else if(speedDropDown.innerHTML === 'Slow') duration = SLOW_SPEED;
    // Done setting speed

    timeCount = 0;
    let isFixed = new Array(9);
    for(let i = 0; i < isFixed.length; i++)
    {
        isFixed[i] = new Array(9);
        for(let j = 0; j < isFixed[i].length; j++)
        {
            if(matrix[i][j] !== 0)
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
    solveSudokuHelper(matrix, isFixed, 0, 0, data);
}

var duration = 1;
var timeCount = 0;
var timeOutID = 0;
function solveSudokuHelper(matrix, isFixed, row, col, data)
{
    if(data.cont === false || !canBeCorrect(matrix, row, col))
        return;

    countToPreventHanging++;
    if(countToPreventHanging > 100000)
    {
        data.cont = false;
        stopSolveSudokuBacktracking();
        return;
    }

    if(row === 8 && col === 8)
    {
        if(isFixed[row][col])
        {
            if(canBeCorrect(matrix, row, col))
            {
                data.cont = false;
            }
            return;
        }
        else
        {
            for(let i = 1; i <= 9; i++)
            {
                matrix[row][col] = i;
                timeOutID = setTimeout(fillCell, (timeCount++)*duration, row, col, i);
                if(canBeCorrect(matrix, row, col))
                {
                    data.cont = false;
                    return;
                }
            }
            timeOutID = setTimeout(emptyCell, (timeCount++)*duration, row, col);
            matrix[row][col] = 0;
        }
    }

    let newRow = (col === 8) ? row + 1 : row;
    let newCol = (col === 8) ? 0 : col + 1;
    
    if(isFixed[row][col] && canBeCorrect(matrix, row, col))
    {
        solveSudokuHelper(matrix, isFixed, newRow, newCol, data);
    }
    else    
    {
        for(let i = 1; i <= 9; i++)
        {
            if(data.cont === false)
                return;
            timeOutID = setTimeout(fillCell, (timeCount++)*duration, row, col, i);
            matrix[row][col] = i;

            if(canBeCorrect(matrix, row, col))
            {
                solveSudokuHelper(matrix, isFixed, newRow, newCol, data);
            }
        }
        if(data.cont === false)
            return;
        timeOutID = setTimeout(emptyCell, (timeCount++)*duration, row, col);
        matrix[row][col] = 0;
    }
}

function stopSolveSudokuBacktracking()
{
    alert("Backtracking is a Naive Algorithm. This is taking too long due to exponential search. The program will terminate to prevent hanging.");
    clickedClear();
}

function emptyCell(row, col)
{
    inputs[row*9+col].classList.remove('active');
    grid.rows[row].cells[col].firstChild.value = "";
}

function fillCell(row, col, val)
{
    inputs[row*9+col].classList.add('active');
    grid.rows[row].cells[col].firstChild.value = val;
}

function colorCell(row, col)
{
    inputs[row*9+col].classList.add('succeeded');
}

function canBeCorrect(matrix, row, col)
{
    
    // Check row
    for(let c = 0; c < 9; c++)
    {
        if(matrix[row][col] !== 0 && col !== c && matrix[row][col] === matrix[row][c])
            return false;
    }
    
    // Check column
    for(let r = 0; r < 9; r++)
    {
        if(matrix[row][col] !== 0 && row !== r && matrix[row][col] === matrix[r][col])
            return false;
    }
    
    // Check 3x3 square
    let r = Math.floor(row / 3);
    let c = Math.floor(col / 3);
    for(let i = r*3; i < r*3 + 3; i++)
    {
        for(let j = c * 3; j < c*3 + 3; j++)
        {
            if((row !== i || col !== j) && matrix[i][j] !== 0 && matrix[i][j] === matrix[row][col])
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


function clearAllTimeOuts()
{
    while(timeOutID >= 0)
    {
        clearTimeout(timeOutID);
        timeOutID--;
    }
}

function clearAllColors()
{
    for(let i = 0; i < inputs.length; i++)
    {
        inputs[i].classList.remove('active');
        inputs[i].classList.remove('succeeded');
    }
}

// Helper function
// Helper function
// Helper function

function setNotAllowSolveAndSpeed()
{
    solve.style.backgroundColor = "red"; 
    solve.style.cursor = "not-allowed";
    solve.removeEventListener('click', clickedSolve);

    liAroundDropdownMenu.setAttribute("style", "pointer-events: none");
    liAroundAlgoDropdownMenu.setAttribute("style", "pointer-events: none");

}

function setAllowSolveAndSpeed()
{
    solve.setAttribute("style", "cursor: pointer");

    solve.addEventListener('click', clickedSolve);

    liAroundDropdownMenu.setAttribute("style", "cursor: pointer"); // enable dropdown (pointerEvent)
    liAroundAlgoDropdownMenu.setAttribute("style", "cursor: pointer"); // enable dropdown (pointerEvent)

}

function getCurrentAlgorithm()
{
    let currentAlgo = "Backtracking";
    if(algorithmsDropDown.html === "Backtracking") currentAlgo = "Backtracking";
    else if(algorithmsDropDown.innerHTML === "Best First Search") currentAlgo = "BFS";

    return currentAlgo;
}


// BEST FIRST SEARCH
// BEST FIRST SEARCH
// BEST FIRST SEARCH

class EntryData
{
    constructor(row, col, choices)
    {
        this.row = row;
        this.col = col;
        this.choices = choices;
    }
    toString()
    {
        return "EntryData object, row: " + this.row + ", col: " + this.col + ", choices: " + this.choices;
    }
    setData(row, col, choices)
    {
        this.row = row;
        this.col = col;
        this.choices = choices;
    }
}

var bfsCont = true;
var bfsDuration = 1;
var bfsTimeCount = 0;
var bfsTimeOutID = 0;
function solveSudokuBFS(matrix)
{
    bfsCont = true;

    bfsDuration = MEDIUM_SPEED;
    if(speedDropDown.innerHTML === 'Fast') bfsDuration = FAST_SPEED;
    else if(speedDropDown.innerHTML === 'Medium') bfsDuration = MEDIUM_SPEED;
    else if(speedDropDown.innerHTML === 'Slow') bfsDuration = SLOW_SPEED;

    bfsTimeCount = 0;

    solveSudokuBFSHelper(matrix);
}

function solveSudokuBFSHelper(matrix)
{
    if(!bfsCont)
        return;
    let bestCandidate = new EntryData(-1,-1, 100);
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(matrix[i][j] === 0)  // If it is empty
            {
                let numChoices = countChoices(matrix, i, j);
                if(bestCandidate.choices > numChoices)
                {
                    bestCandidate.setData(i, j, numChoices);
                }
            }
        }
    }

    if(bestCandidate.choices === 100)   // Has fill all board
    {
        bfsCont = false;
        return;
    }
   
    let row = bestCandidate.row;
    let col = bestCandidate.col;
    for(let j = 1; j <= 9; j++)
    {
        if(!bfsCont)
            return;

        matrix[row][col] = j;

        bfsTimeOutID = setTimeout(fillCell, (bfsTimeCount++)*bfsDuration, row, col, j);

        if(canBeCorrect(matrix, row, col))
        {
            solveSudokuBFSHelper(matrix);
        }
    }
    if(!bfsCont)
        return;
    matrix[row][col] = 0;
    timeOutID = setTimeout(emptyCell, (bfsTimeCount++)*bfsDuration, row, col);
}

function countChoices(matrix, i , j)
{
    let canPick = [true,true,true,true,true,true,true,true,true,true]; // From 0 to 9 - drop 0
    
    // Check row
    for(let k = 0; k < 9; k++)
    {
        canPick[matrix[i][k]] = false;
    }

    // Check col
    for(let k = 0; k < 9; k++)
    {
        canPick[matrix[k][j]] = false;
    }

    // Check 3x3 square
    let r = Math.floor(i / 3);
    let c = Math.floor(j / 3);
    for(let row = r*3; row < r*3+3; row++)
    {
        for(let col = c*3; col < c*3+3; col++)
        {
            canPick[matrix[row][col]] = false;
        }
    }

    // Count
    let count = 0;
    for(let k = 1; k <= 9; k++)
    {
        if(canPick[k])
            count++;
    }

    return count;
}

function displayBoard(matrix)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(matrix[i][j] == 0)
                grid.rows[i].cells[j].firstChild.value = "";
            else
                grid.rows[i].cells[j].firstChild.value = matrix[i][j];
        }
    }
}

function stopFromStart(matrix)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(!canBeCorrect(matrix, i, j)) // If one entry cannot be correct right from the start
                return true;                // Stop solving
        }
    }
    return false;
}

// BEST FIRST SEARCH DONE
// BEST FIRST SEARCH DONE
// BEST FIRST SEARCH DONE