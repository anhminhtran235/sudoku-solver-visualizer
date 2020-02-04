// START Dropdown menu (Speed)
const speedDropDown = document.querySelector("span.selected");
const speedOptions = document.querySelectorAll('.speed-options');
speedOptions.forEach(e => {
    e.addEventListener("click", () => {
        let value = e.innerHTML;
        speedDropDown.innerHTML = value;
    });
});
// DONE Dropdown menu (Speed)

// START Dropdown menu (Algorithms)
const algorithmsDropDown = document.querySelector("span.algo-selected");
const algorithmsOptions = document.querySelectorAll('.algo-options');
algorithmsOptions.forEach(e => {
    e.addEventListener("click", () => {
        let value = e.innerHTML;
        algorithmsDropDown.innerHTML = value;
    });
});
// DONE Dropdown menu (Algorithms)

// Get some element from html
const subMenu = document.querySelector("#nav-bar").children[4].children[1];         
const speedButton = document.querySelector("#nav-bar").children[4].children[0];
const liAroundSpeedDropdownMenu = document.querySelector("#nav-bar").children[4];
const liAroundAlgoDropdownMenu = document.querySelector("#nav-bar").children[5];
const solve = document.querySelector("#solve");
const clear = document.querySelector("#clear");
const randomlyFill = document.querySelector("#randomly-fill");
const grid = document.querySelector("#grid");
const inputs = document.getElementsByTagName('input');

// CONSTANT SPEED (The lower the faster. It's actually is the time lapse between 2 animation)
const FAST_SPEED = 1;
const MEDIUM_SPEED = 10;
const SLOW_SPEED = 50;

// Add eventListener
clear.addEventListener('click', clickedClear);
randomlyFill.addEventListener('click', clickedRandomlyFill);
solve.addEventListener('click', clickedSolve);

//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------

// This function clears all timeouts, animation colors and allow to press Solve and Speed again
function clickedClear(e)
{
    clearAllTimeOuts();
    clearAllColors();
    setAllowSolveSpeedAndAlgorithms();
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            grid.rows[i].cells[j].firstChild.value = "";
        }
    }
}

// This function delete all timeOut (animations)
function clearAllTimeOuts()
{
    while(timeOutIDSameForAnyAnimation >= 0)
    {
        clearTimeout(timeOutIDSameForAnyAnimation);
        timeOutIDSameForAnyAnimation--;
    }
}

// Clear all colors from animations
function clearAllColors()
{
    for(let i = 0; i < inputs.length; i++)
    {
        inputs[i].classList.remove('active');
        inputs[i].classList.remove('succeeded');
    }
}

// Allow to click solve, choose speed and algorithms again
function setAllowSolveSpeedAndAlgorithms()
{
    solve.setAttribute("style", "cursor: pointer"); // Allow to click solve button

    solve.addEventListener('click', clickedSolve);  // Add back eventListener for solve button

    liAroundSpeedDropdownMenu.setAttribute("style", "cursor: pointer"); // enable dropdown (pointerEvent)
    liAroundAlgoDropdownMenu.setAttribute("style", "cursor: pointer"); // enable dropdown (pointerEvent)
}

// Not allow to click solve, choose speed and algorithms
function setNotAllowSolveSpeedAndAlgorithms()
{
    solve.style.backgroundColor = "red";    // Turn solve button to red
    solve.style.cursor = "not-allowed";     // Change cursor mode
    solve.removeEventListener('click', clickedSolve);   // Remove any function when click

    liAroundSpeedDropdownMenu.setAttribute("style", "pointer-events: none"); // Cannot click Speed menu
    liAroundAlgoDropdownMenu.setAttribute("style", "pointer-events: none"); // Cannot click Algorithms menu
}


//-------------------------------------------------DONE ClickedClear-------------------------------------------------
//-------------------------------------------------DONE ClickedClear-------------------------------------------------
//-------------------------------------------------DONE ClickedClear-------------------------------------------------

//---------------------------------------------START clickedRandomlyFill----------------------------------------------
//---------------------------------------------START clickedRandomlyFill----------------------------------------------
//---------------------------------------------START clickedRandomlyFill----------------------------------------------

// This function is called when we click the "Randomly-fill" button
function clickedRandomlyFill(e)
{
    clickedClear()  // Clear the board first
    fill80Succeed20NotSure();
}

// Fill the board with 80% probability that we will have a solution and 20% truly random
function fill80Succeed20NotSure()
{
    if(Math.random() < 0.8) // 80% guaranttee solution
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
        newSudokuQuiz = mixSudokuQuiz(hasSolutionMatrix);   
        printBoardOnWeb(newSudokuQuiz);
    }
    else // The rest 20% Just randomly fill
    {
        matrix = generateRandomBoard(); // This is random
        printBoardOnWeb(matrix);
    }
}

// This function randomly swaps rows and columns of a sudoku board with a specific rule
// Rule: If a sudoku board has a solution, if we swap 2 rows (or 2 columns)  within the same
// 3x9 (or 9x3) "rectangle", our sudoku will preserve its solvability
function mixSudokuQuiz(matrix)
{
    let numEntries = 20 + Math.floor((Math.random() * 8));  // Number of entries to be kept
    mixRowsAndColumns(matrix);  // Mix board
    keepSomeEntries(matrix, numEntries);    // Keep some random Entries
    return matrix;
}

// This function randomly swaps different rows (or columns) with the "appropriate" rows(or columns)
function mixRowsAndColumns(matrix)
{
    let numSwap = Math.floor(Math.random() * 15) + 1; // Swap 1-10 times
    while(numSwap > 0)
    {
        let num1 = Math.floor(Math.random() * 9);   // Pick a row (or column) from 0 to 8
        let num2 = Math.floor(num1 / 3) * 3 + Math.floor(Math.random() * 3); // Pick another row (column) in the right range
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

// Randomly keep some entries out of a full sudoku board
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

// Swap 2 row
function swapRow(matrix, row1, row2)
{
    for(let i = 0; i < 9; i++)
    {
        let temp = matrix[row1][i];
        matrix[row1][i] = matrix[row2][i];
        matrix[row2][i] = temp;
    }
}

// Swap 2 col
function swapCol(matrix, col1, col2)
{
    for(let i = 0; i < 9; i++)
    {
        let temp = matrix[i][col1];
        matrix[i][col1] = matrix[i][col2];
        matrix[i][col2] = temp;
    }
}

// This function actually generate a random board
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
//---------------------------------------------DONE clickedRandomlyFill----------------------------------------------
//---------------------------------------------DONE clickedRandomlyFill----------------------------------------------
//---------------------------------------------DONE clickedRandomlyFill----------------------------------------------

//------------------------------------------------START clickedSolve-------------------------------------------------
//------------------------------------------------START clickedSolve-------------------------------------------------
//------------------------------------------------START clickedSolve-------------------------------------------------

// This function is called when we click the "Solve" button
// It will call the proper algorithms, and using the proper speed
// By default, it will use Backtracking at Medium Speed
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
        solveByBacktracking(e);
    else if(currentAlgo === "BFS")
        solveByBFS(e);
}

//------------------------------------------------START Backtracking-------------------------------------------------
//------------------------------------------------START Backtracking-------------------------------------------------
//------------------------------------------------START Backtracking-------------------------------------------------
function solveByBacktracking(e)
{
    backtrackingCountToPreventHanging = 0;
    setNotAllowSolveSpeedAndAlgorithms();   // Disable some buttons
    let matrix = readValue();               // Read values from web board

    backtracking(matrix);                    // Solving sudoku

    let timeAfterAllDone = (++backtrackingTimeCount) * backtrackingDuration;

    if(allBoardNonZero(matrix))             // If We actually have a solution
    {
        backtrackingSucceededAnimation(backtrackingTimeCount, backtrackingDuration);
    }
    else
    {
        timeOutIDSameForAnyAnimation = setTimeout(alertNoSolution, timeAfterAllDone);
        timeOutIDSameForAnyAnimation = setTimeout(setAllowSolveSpeedAndAlgorithms, timeAfterAllDone);
    }

}

var backtrackingCountToPreventHanging = 0;
var backtrackingDuration = 1;
var backtrackingTimeCount = 0;
var timeOutIDSameForAnyAnimation = 0;
function backtracking(matrix)
{
    // Setting Speed
    backtrackingDuration = MEDIUM_SPEED;
    if(speedDropDown.innerHTML === 'Fast') backtrackingDuration = FAST_SPEED;
    else if(speedDropDown.innerHTML === 'Medium') backtrackingDuration = MEDIUM_SPEED;
    else if(speedDropDown.innerHTML === 'Slow') backtrackingDuration = SLOW_SPEED;

    backtrackingTimeCount = 0;  // Time count for scheduling animation
    
    // Find out which entries are user input (isFixed===true), which are empty (isFixed===false)
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
    backtrackingHelper(matrix, isFixed, 0, 0, data);
}

function backtrackingHelper(matrix, isFixed, row, col, data)
{
    // If !data.cont or having our current entry at (row, col) lead to a clearly invalid sudoku board
    if(data.cont === false || !canBeCorrect(matrix, row, col))  // 1st stopping point
        return;

    // Backtracking is a naive solution.
    backtrackingCountToPreventHanging++;
    if(backtrackingCountToPreventHanging > 100000)  // Runs for too long without a solution
    {
        data.cont = false;  // Set the flag so that the rest of the recursive calls can stop at "stopping points"
        stopSolveSudokuBacktracking(); // Stop the program
        return;
    }

    if(row === 8 && col === 8)  // If reach the last entry
    {
        if(isFixed[row][col])   // The last entry is user input
        {
            if(canBeCorrect(matrix, row, col))  // And it doesn't create an invalid board
            {
                data.cont = false;  // Yesss!! Found the solution!
            }
            return;
        }
        else    // If it is not user input
        {
            for(let i = 1; i <= 9; i++) 
            {
                matrix[row][col] = i; // Try 1-9
                timeOutIDSameForAnyAnimation = setTimeout(fillCell, (backtrackingTimeCount++)*backtrackingDuration, row, col, i);
                if(canBeCorrect(matrix, row, col)) // If found the solution
                {
                    data.cont = false;
                    return;
                }
            }
            timeOutIDSameForAnyAnimation = setTimeout(emptyCell, (backtrackingTimeCount++)*backtrackingDuration, row, col);
            matrix[row][col] = 0;   // Otherwise, backtrack, reset the current entry to 0
        }
    }

    // Fill from left to right, from top to bottom
    let newRow = (col === 8) ? row + 1 : row;   
    let newCol = (col === 8) ? 0 : col + 1;
    
    // If this entry is user input and is valid
    if(isFixed[row][col] && canBeCorrect(matrix, row, col))
    {
        backtrackingHelper(matrix, isFixed, newRow, newCol, data); // Continue next entry
    }
    // If it is empty
    else    
    {
        for(let i = 1; i <= 9; i++) 
        {
            if(data.cont === false) // Stopping entry 2
                return;
            timeOutIDSameForAnyAnimation = setTimeout(fillCell, (backtrackingTimeCount++)*backtrackingDuration, row, col, i);
            matrix[row][col] = i; // Try 1-9

            if(canBeCorrect(matrix, row, col))  // If any of those values (1-9) can be valid
            {
                backtrackingHelper(matrix, isFixed, newRow, newCol, data); // recursively move on to the next cell
            }
        }
        if(data.cont === false) // Stopping entry 3
            return;
        timeOutIDSameForAnyAnimation = setTimeout(emptyCell, (backtrackingTimeCount++)*backtrackingDuration, row, col);
        matrix[row][col] = 0; // Backtrack, set entry to 0
    }
}

// This function is called when backtracking function is running for too long
// It will stop the function to prevent hanging
function stopSolveSudokuBacktracking()
{
    alert("Backtracking is a Naive Algorithm. This is taking too long due to exponential search. The program will terminate to prevent hanging.");
    clickedClear();
}

// Animation when we have found the solution using backtracking
function backtrackingSucceededAnimation(currentTimeCount, currentDuration)
{
    let currentTime = currentTimeCount * currentDuration;
    let succeededDuration = 20;
    let newCount = 0;
    for(let row = 0; row < 9; row++)
    {
        for(let col = 0; col < 9; col++)
        {
            timeOutIDSameForAnyAnimation = setTimeout(colorCell, 
                            currentTime + (newCount++)*succeededDuration, row, col);
        }
    }
    timeOutIDSameForAnyAnimation = setTimeout(setAllowSolveSpeedAndAlgorithms, currentTime + (newCount++)*succeededDuration);
}

//------------------------------------------------END Backtracking-------------------------------------------------
//------------------------------------------------END Backtracking-------------------------------------------------
//------------------------------------------------END Backtracking-------------------------------------------------

//--------------------------------------------START Best-First Search----------------------------------------------
//--------------------------------------------START Best-First Search----------------------------------------------
//--------------------------------------------START Best-First Search----------------------------------------------

class EntryData
{
    constructor(row, col, choices)
    {
        this.row = row;
        this.col = col;
        this.choices = choices;
    }

    setData(row, col, choices)
    {
        this.row = row;
        this.col = col;
        this.choices = choices;
    }
}

// This function is called by clickedSolve. It will call bfs() to solve sudoku by Best-First Search
// IDEA OF BEST-FIRST-SEARCH:
// - For each next move, pick the "Best" entry to try 1-9 by iterate through the whole board
// and find the entry with the least number of possibilities
function solveByBFS(e)
{
    setNotAllowSolveSpeedAndAlgorithms(); // Disable some buttons
    let matrix = readValue();

    if(noSolutionFromStart(matrix))   // If input is clearly unsolvable 
    {
        alertNoSolution();  // Alert no solution right away
        setAllowSolveSpeedAndAlgorithms();
        return;             // Return
    }

    bfs(matrix);    // Solve sudoku using Best-First Search

    let timeAfterAllDone = (++bfsTimeCount) * bfsDuration;
    
    if(allBoardNonZero(matrix))
    {
        bfsSolveSucceededAnimation();
    }
    else
    {
        timeOutIDSameForAnyAnimation = setTimeout(alertNoSolution, timeAfterAllDone);
        timeOutIDSameForAnyAnimation = setTimeout(setAllowSolveSpeedAndAlgorithms, timeAfterAllDone);
    }
}

var bfsCont = true;
var bfsDuration = 1;
var bfsTimeCount = 0;
// Set up variables
function bfs(matrix)
{
    bfsCont = true;

    bfsDuration = MEDIUM_SPEED;
    if(speedDropDown.innerHTML === 'Fast') bfsDuration = FAST_SPEED;
    else if(speedDropDown.innerHTML === 'Medium') bfsDuration = MEDIUM_SPEED;
    else if(speedDropDown.innerHTML === 'Slow') bfsDuration = SLOW_SPEED;

    bfsTimeCount = 0;

    solveSudokuBFSHelper(matrix);
}

// The heart of Best-First Search
function solveSudokuBFSHelper(matrix)
{
    if(!bfsCont)    // Stopping point 1
        return;

    // Find the best entry (The one with the least possibilities)
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

    // If don't find any
    if(bestCandidate.choices === 100)   // Has filled all board, Best-First Search done! Note, whether we have a solution or not depends on whether allBoardNonZero() returns true
    {
        bfsCont = false; // Set the flag so that the rest of the recursive calls can stop at "stopping points"
        return;
    }
   
    let row = bestCandidate.row;
    let col = bestCandidate.col;
    // If find the best candidate, fill 1-9
    for(let j = 1; j <= 9; j++)
    {
        if(!bfsCont)    // Stopping point 2
            return;

        matrix[row][col] = j;

        timeOutIDSameForAnyAnimation = setTimeout(fillCell, (bfsTimeCount++)*bfsDuration, row, col, j);

        if(canBeCorrect(matrix, row, col))
        {
            solveSudokuBFSHelper(matrix);
        }
    }
    if(!bfsCont)    // Stopping point 3
        return;
    matrix[row][col] = 0;
    timeOutIDSameForAnyAnimation = setTimeout(emptyCell, (bfsTimeCount++)*bfsDuration, row, col);
}

// Animation when we have successfully solved by Best-First Search
function bfsSolveSucceededAnimation()
{
    let currentDuration = bfsTimeCount * bfsDuration;
    let succeededDuration = 20;
    let newCount = 0;
    for(let row = 0; row < 9; row++)
    {
        for(let col = 0; col < 9; col++)
        {
            timeOutIDSameForAnyAnimation = setTimeout(colorCell, 
                        currentDuration + (newCount++)*succeededDuration, row, col);
        }
    }
    timeOutIDSameForAnyAnimation = setTimeout(setAllowSolveSpeedAndAlgorithms, currentDuration + (newCount++)*succeededDuration);
}

// Count possibilities for an entry
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

function noSolutionFromStart(matrix)
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

//----------------------------------------------END Best-First Search------------------------------------------------
//----------------------------------------------END Best-First Search------------------------------------------------
//----------------------------------------------END Best-First Search------------------------------------------------

//-------------------------------------------------END clickedSolve--------------------------------------------------
//-------------------------------------------------END clickedSolve--------------------------------------------------
//-------------------------------------------------END clickedSolve--------------------------------------------------

//-----------------------------------------------START HelperFunction------------------------------------------------
//-----------------------------------------------START HelperFunction------------------------------------------------
//-----------------------------------------------START HelperFunction------------------------------------------------
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

// Read value from web board to 2d array
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

// Get the current Algorithm from Algorithms dropdown menu
function getCurrentAlgorithm()
{
    let currentAlgo = "Backtracking";   // Default is Backtracking

    if(algorithmsDropDown.html === "Backtracking") currentAlgo = "Backtracking";
    else if(algorithmsDropDown.innerHTML === "Best First Search") currentAlgo = "BFS";

    return currentAlgo;
}

function alertNoSolution()
{
    alert("No Solution!");
}

function printBoardOnWeb(matrix)
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
//-----------------------------------------------END HelperFunction------------------------------------------------
//-----------------------------------------------END HelperFunction------------------------------------------------
//-----------------------------------------------END HelperFunction------------------------------------------------