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
const algoInfo = document.querySelector("#algo-info-info");
const algoHeader = document.querySelector("#algo-info-header");
const algoInfoWraper = document.querySelector("#algo-info");

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
        setAlgoInfo(value);
    });
});
// DONE Dropdown menu (Algorithms)

// CONSTANT SPEED (The lower the faster. It actually is the time lapse between 2 animation)
const FAST_SPEED = 1;
const MEDIUM_SPEED = 10;
const SLOW_SPEED = 50;
const EXTRA_SLOW_SPEED = 150;

// Add eventListener
clear.addEventListener('click', clickedClear);
randomlyFill.addEventListener('click', clickedRandomlyFill);
solve.addEventListener('click', clickedSolve);

function setAlgoInfo(algoName)
{
    let description = "";

    if(algoName === "Backtracking")
    {
        description = "Sudoku Backtracking is a recursive algorithm which goes through each cells and sequentially assigns numbers from 1 to 9 if the cell is empty.<br/><br/>" +  

        "After each assignment, we check whether the current board is valid, and recursively go to the next cell if it is.<br/><br/>" + 
        
        "If we reach the last (bottom right corner) cell, and we have a valid assignment to that cell, we have a solution.<br/><br/>" +
        
        "If we have tried all possible values from 1 to 9 on a cell, and no values lead to a solution, we backtrack (go back to the previous cell) and continue where we left off (continue to assign the next number).";
    }
    else if(algoName === "Best First Search")
    {
        description = "Best first search algorithm is an optimized version of Backtracking, where the “next cell” is the cell which has the least number of possibilities.<br/><br/>"+

        "The 'number of possibilities' is calculated for each cell, by going through its corresponding row, column and 3x3 block and counting the number of have-not-chosen numbers.<br/><br/>"+
        
        "This greedy heuristic increase the efficiency of the program substantially, as it minimizes the branching factor.";
    }
    else if(algoName === "Dancing Links")
    {
        description = "Dancing Links (also known as Algorithm X) is a technique to find all solutions of the exact cover problem (A well known NP-complete problem) using depth first search in an efficient way (Although the time complexity is still exponential).<br/><br/>"+

        "Turns out, Sudoku can be represented as an exact cover problem, and therefore can be solved by Algorithm X efficiently.<br/><br/>"+
        
        "Dancing Links uses a 4-way linked list to enable efficient searching and removing along rows and columns. It also uses a greedy “best-first” heuristic, which makes the animation run similarly to Best – First Search.<br/><br/>"+
        
        "For more infomation, please check out the author's paper: <a href = 'http://www.ocf.berkeley.edu/~jchu/publicportal/sudoku/0011047.pdf'>http://www.ocf.berkeley.edu/~jchu/publicportal/sudoku/0011047.pdf</a>";
        
    }
    else if(algoName === "Reverse Backtracking")
    {
        description = "Reverse Backtracking is a modified version of the Backtracking algorithm. Instead of picking the next cell top to bottom and left to right, it picks the next cell bottom to top, right to left.<br/><br/>"+

        "The Algorithm tends to do well when the majority entries near the bottom are prefilled.<br/><br/>" +

        "In terms of the average time taken to solve a Sudoku puzzle, there is no substantial difference between Reverse Backtracking and normal Backtracking";
    }
    else if(algoName === "Spiral Backtracking")
    {
        description = "Spiral Backtracking is another modified version of the Backtracking algorithm. Instead of picking the next cell top to bottom and left to right, it picks the next cell in an inward spiral.<br/><br/>"+

        "The Algorithm tends to do well when the majority entries near 4 edges are prefilled.<br/><br/>" +

        "Interestingly, this Algorithm is significantly slower than normal Backtracking Algorithm in most cases. The reason for this might lie in the nature of Sudoku, which makes choosing next cells spirally a poor choice."
    }


    algoInfoWraper.classList.add('algo-info-class');

    algoHeader.innerHTML = "Algorithm Information";
    algoInfo.innerHTML = description;
}



//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------

// This function clears all timeouts, animation colors and allow to press Solve and Speed again
function clickedClear(e)
{
    clearAllTimeOuts();
    clearAllColors();
    clearAlgoInfo();
    setAllowSolveSpeedAndAlgorithms();
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            grid.rows[i].cells[j].firstChild.value = "";
        }
    }
}

function clickedClearExceptAlgoInfo()
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

// Clear Algo description   
function clearAlgoInfo()
{
    algoInfoWraper.classList.remove('algo-info-class');
    algoHeader.innerHTML = "";
    algoInfo.innerHTML = "";
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
    clickedClearExceptAlgoInfo();  // Clear the board first
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
    {
        algorithmsDropDown.innerHTML = "Backtracking"; // Set to Backtracking
        setAlgoInfo("Backtracking");                    // And turn on info
    }
    
    let currentAlgo = getCurrentAlgorithm();

    // Reverse Backtracking and Spiral Backtracking are just different variation of Backtracking
    if(currentAlgo === "Backtracking" || currentAlgo === "Reverse Backtracking" || currentAlgo === "Spiral Backtracking")
        solveByBacktracking(e, currentAlgo);
    else if(currentAlgo === "BFS")
        solveByBFS(e);
    else if(currentAlgo === "Dancing Links")
        solveByDancingLinks(e);
}

//------------------------------------------------START Backtracking-------------------------------------------------
//------------------------------------------------START Backtracking-------------------------------------------------
//------------------------------------------------START Backtracking-------------------------------------------------
function solveByBacktracking(e, currentAlgo)
{
    backtrackingCountToPreventHanging = 0;
    setNotAllowSolveSpeedAndAlgorithms();   // Disable some buttons
    let matrix = readValue();               // Read values from web board

    backtracking(matrix, currentAlgo);                    // Solving sudoku

    let timeAfterAllDone = (++backtrackingTimeCount) * backtrackingDuration;

    if(allBoardNonZero(matrix))             // If We actually have a solution
    {
        if(currentAlgo === "Backtracking" || currentAlgo === "Reverse Backtracking")
            succeededNormalAnimation(backtrackingTimeCount, backtrackingDuration);
        else if(currentAlgo === "Spiral Backtracking")
            succeededSpiralAnimation(backtrackingTimeCount, backtrackingDuration);
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
function backtracking(matrix, currentAlgo)
{
    // Setting Speed
    backtrackingDuration = MEDIUM_SPEED;
    if(speedDropDown.innerHTML === 'Fast') backtrackingDuration = FAST_SPEED;
    else if(speedDropDown.innerHTML === 'Medium') backtrackingDuration = MEDIUM_SPEED;
    else if(speedDropDown.innerHTML === 'Slow') backtrackingDuration = SLOW_SPEED;
    else if(speedDropDown.innerHTML === 'Extra Slow') backtrackingDuration = EXTRA_SLOW_SPEED;


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
    let startingRow = -1;
    let startingCol = -1;
    if(currentAlgo === "Backtracking")
    {
        startingRow = 0;
        startingCol = 0;
    }
    else if(currentAlgo === "Reverse Backtracking")
    {
        startingRow = matrix.length - 1;
        startingCol = matrix.length - 1;
    }
    else if(currentAlgo === "Spiral Backtracking")
    {
        startingRow = 0;
        startingCol = 0;
    }
    backtrackingHelper(matrix, isFixed, startingRow, startingCol, data, currentAlgo);
}

function backtrackingHelper(matrix, isFixed, row, col, data, currentAlgo)
{

    // If !data.cont or having our current entry at (row, col) lead to a clearly invalid sudoku board
    if(data.cont === false || !canBeCorrect(matrix, row, col))  // 1st stopping point
        return;

    // Backtracking is a naive solution.
    backtrackingCountToPreventHanging++;
    if(backtrackingCountToPreventHanging > 100000)  // Runs for too long without a solution
    {
        data.cont = false;  // Set the flag so that the rest of the recursive calls can stop at "stopping points"
        stopSolveSudokuBacktracking(currentAlgo); // Stop the program
        return;
    }

    if((currentAlgo === "Backtracking" && row === 8 && col === 8)
        || (currentAlgo === "Reverse Backtracking" && row === 0 && col === 0)
        || (currentAlgo === "Spiral Backtracking" && row === 4 && col === 4))  // If reach the last entry
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

    // Compute newRow and new Column coressponding to currentAlgo
    let newRow = -1;
    let newCol = -1;
    if(currentAlgo === "Backtracking")
    {
        // Fill from left to right, from top to bottom
        newRow = (col === 8) ? row + 1 : row;   
        newCol = (col === 8) ? 0 : col + 1;
    }
    else if(currentAlgo === "Reverse Backtracking")
    {
        // Fill from right to left, bottom to top
        newRow = (col === 0) ? row - 1 : row;
        newCol = (col === 0) ? 8 : col - 1;
    }
    else if(currentAlgo === "Spiral Backtracking")
    {

        // Initialize newRow to currentRow and newCol to currentColumn
        newRow = row;
        newCol = col;

        let center = Math.floor(matrix.length / 2);
        let size = Math.max((Math.abs(row-center)+1)*2-1, (Math.abs(col-center)+1)*2-1); // Current layer size
        let offset = Math.floor(size / 2);

        if((row === center - offset && col != center + offset)
            || row === center - offset+1 && col == center - offset)
        {
            newCol = col+1; // Go right
        }
        else if(col === center + offset && row != center + offset)
        {
            newRow = row + 1; // Go down
        }
        else if(row === center + offset && col != center - offset)
        {
            newCol = col-1; // Go left
        }
        else if(col === center - offset && row != center - offset+1)
        {
            newRow = row -1; // Go up
        }
    }
    
    // If this entry is user input and is valid
    if(isFixed[row][col] && canBeCorrect(matrix, row, col))
    {
        backtrackingHelper(matrix, isFixed, newRow, newCol, data, currentAlgo); // Continue next entry
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
                backtrackingHelper(matrix, isFixed, newRow, newCol, data, currentAlgo); // recursively move on to the next cell
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
function stopSolveSudokuBacktracking(currentAlgo)
{
    if(currentAlgo === "Backtracking")
    {
        alert("Backtracking is a Naive Algorithm. It tends to do well when the majority of entries near the top are prefilled.\nThe program is taking too long to find a solution. It will be terminated to prevent hanging.");
    }
    else if(currentAlgo === "Reverse Backtracking")
    {
        alert("Reverse Backtracking is a Naive Algorithm. It tends to do well when the majority of entries near the bottom are prefilled.\nThe program is taking too long to find a solution. It will be terminated to prevent hanging.");
    }
    else if(currentAlgo === "Spiral Backtracking")
    {
        alert("Spiral Backtracking is a Naive Algorithm. It tends to do well when the majority of entries near 4 edges are prefilled.\nThe program is taking too long to find a solution. It will be terminated to prevent hanging.")
    }
    clickedClear();
}

// Normal animation when we have found the solution 
function succeededNormalAnimation(currentTimeCount, currentDuration)
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
        succeededNormalAnimation(bfsTimeCount, bfsDuration);
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
    else if(speedDropDown.innerHTML === 'Extra Slow') bfsDuration = EXTRA_SLOW_SPEED;


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
            if (matrix[i][j] === 0)  // If it is unfilled
            {
                let numChoices = countChoices(matrix, i, j);
                if(bestCandidate.choices > numChoices)
                {
                    bestCandidate.setData(i, j, numChoices);
                }
            }
        }
    }

    // If don't find any choices
    if(bestCandidate.choices === 100)   // Has filled all board, Best-First Search done! Note, whether we have a solution or not depends on whether allBoardNonZero() returns true
    {
        bfsCont = false; // Set the flag so that the rest of the recursive calls can stop at "stopping points"
        return;
    }
   
    let row = bestCandidate.row;
    let col = bestCandidate.col;

    // If found the best candidate, fill 1-9
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
    matrix[row][col] = 0; // Backtrack, mark the current cell empty again
    timeOutIDSameForAnyAnimation = setTimeout(emptyCell, (bfsTimeCount++)*bfsDuration, row, col);
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

//--------------------------------------------START Dancing Links----------------------------------------------
//--------------------------------------------START Dancing Links----------------------------------------------
//--------------------------------------------START Dancing Links----------------------------------------------

class DLHeaderNode
{
    constructor(up, down, left, right, size)
    {
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.size = size;
    }
}

class DLNode
{
    constructor(up, down, left, right, header, rowNumber)
    {
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.header = header;
        this.rowNumber = rowNumber;
    }
}

function solveByDancingLinks(e)
{
    setNotAllowSolveSpeedAndAlgorithms();   // Disable some buttons
    let matrix = readValue();               // Read values from web board

    dancingLinks(matrix);

    let timeAfterAllDone = (++DancingLinksTimeCount) * DancingLinksDuration;

    if(allBoardNonZero(matrix))             // If We actually have a solution
    {
        succeededNormalAnimation(DancingLinksTimeCount, DancingLinksDuration);
    }
    else
    {
        timeOutIDSameForAnyAnimation = setTimeout(alertNoSolution, timeAfterAllDone);
        timeOutIDSameForAnyAnimation = setTimeout(setAllowSolveSpeedAndAlgorithms, timeAfterAllDone);
    }
}

var DancingLinksTimeCount = 0;
var DancingLinksDuration = 0;
function dancingLinks(matrix)
{
    // Init for animation

    // Setting Speed
    DancingLinksDuration = MEDIUM_SPEED;
    if(speedDropDown.innerHTML === 'Fast') DancingLinksDuration = FAST_SPEED;
    else if(speedDropDown.innerHTML === 'Medium') DancingLinksDuration = MEDIUM_SPEED;
    else if(speedDropDown.innerHTML === 'Slow') DancingLinksDuration = SLOW_SPEED;
    else if(speedDropDown.innerHTML === 'Extra Slow') DancingLinksDuration = EXTRA_SLOW_SPEED;

 
    DancingLinksTimeCount = 0;  // Time count for scheduling animation


    /* Initialize the whole doubly-linkedlist board */
    /* Initialize the whole doubly-linkedlist board */
    /* Initialize the whole doubly-linkedlist board */

    let numRows = 729;
    let numCols = 324;
    let masterNode = new DLHeaderNode(null, null, null, null, -1);
    let topColumnNodeList = []; // For easy access to topColumnNode (When init board only)
    let topRowNodeList = []; // For easy access to topRowNode (When using prefilled number from sudoku board)
    
    // Set up 324 columns, each column only has a top node 
    let prevCol = masterNode;
    for(let c = 0; c < numCols; c++)        // 324 columns
    {
        // Top node at each column. Initially, we'll have 0 nodes under each column.
        let currentCol = new DLHeaderNode(null, null, prevCol, null, 0);    
        topColumnNodeList.push(currentCol);     // Add it to the list
        prevCol.right = currentCol;
        prevCol = currentCol;
    }
    // Circular linkedlist
    topColumnNodeList[topColumnNodeList.length-1].right = masterNode;   
    masterNode.left = topColumnNodeList[topColumnNodeList.length-1];

    // Right now we have the "skeleton" of our linkedlist board: 1 master node connecting to a list of top nodes

    // Now iterating through each rows (729 in total), create 4 nodes in each rows and connect them in the right way
    for(let i = 0; i < numRows; i++)
    {
        // Row 1: 1 at (0,0), Row 2: 2 at (0,0), Row 3: 3 at (0,0),... Row 9: 9 at (0,0)
        // Row 10: 1 at (0,1), ... Row 80: 9 at (0,8), Row 81: 1 at (1,0)
        
        // You can write a simple program to print out all row, col and number with its corressponing i to double-check
        let r = Math.floor(i / 81); // Note that i starts from 0, so i = 80 when Row = 81
        let c = Math.floor((i % 81) / 9); 
        let num = i % 9 + 1;

        // We have 324 columns
        // Columns (Constraints) 0-80: We must have a number in every entry
        // Columns 81-161: We must have 1-9 in every row
        // Columns 162-242: We must have 1-9 in every column
        // Columns 243-323: We must have 1-9 in every 3x3 block
        
        // => If we have a number "num" at row "r" and column "c", we must connect 4 Nodes together
        // Node 1 in column 0-80, node 2 in column 81-161,...
        let node1Index = r*9 + c;   // Have a number in entry (r,c)
        let node2Index = 80 + 9*r + num; // Have num in row r
        let node3Index = 161 + 9*c + num; // Have num in col c
        let b = Math.floor(r/3) * 3 + Math.floor(c/3); // b means block
        let node4Index = 242 + 9*b + num; // Have num in block b

        // Now let's connect those nodes horizontally :))
        let node1 = new DLNode(null, null, null, null, topColumnNodeList[node1Index], i); // Note: i is row number
        let node2 = new DLNode(null, null, node1, null, topColumnNodeList[node2Index], i); // i starts from 0. Be careful!
        let node3 = new DLNode(null, null, node2, null, topColumnNodeList[node3Index], i);
        let node4 = new DLNode(null, null, node3, null, topColumnNodeList[node4Index], i);
        node1.right = node2;
        node2.right = node3;
        node3.right = node4;

        topRowNodeList.push(node1); // Add the first node to topRowNodeList for easy access when we start using prefilled number from Sudoku Board

        // Circular linkedlist
        node4.right = node1;
        node1.left = node4;
        
        // And put them in the right columns
        let topCol1 = topColumnNodeList[node1Index];
        let topCol2 = topColumnNodeList[node2Index];
        let topCol3 = topColumnNodeList[node3Index];
        let topCol4 = topColumnNodeList[node4Index];

        addNodeToBottomOfAColumn(node1, topCol1);
        addNodeToBottomOfAColumn(node2, topCol2);
        addNodeToBottomOfAColumn(node3, topCol3);
        addNodeToBottomOfAColumn(node4, topCol4);

        // Update topColumnNodeList.size
        topColumnNodeList[node1Index].size++;
        topColumnNodeList[node2Index].size++;
        topColumnNodeList[node3Index].size++;
        topColumnNodeList[node4Index].size++;
    }
    // Pheww :)) We're done setting up our linkedlist board

    /* DONE Initializing the whole doubly-linkedlist board */
    /* DONE Initializing the whole doubly-linkedlist board */
    /* DONE Initializing the whole doubly-linkedlist board */
    
    

    /* START using prefilled sudoku entries */
    /* START using prefilled sudoku entries */
    /* START using prefilled sudoku entries */

    for(let i = 0; i < matrix.length; i++)
    {
        for(let j = 0; j < matrix[i].length; j++)
        {
            if(matrix[i][j] != 0)
            {
                let num = matrix[i][j];
                let rowNumber = (num-1) + i*81 + j*9;   // Get row number

                // Cover the whole row!
                let headNodeFromARow = topRowNodeList[rowNumber];
                coverColumn(headNodeFromARow.header);   // Cover the first column
                let temp = headNodeFromARow.right;
                while(temp != headNodeFromARow)         // Cover the rest
                {
                    coverColumn(temp.header);
                    temp = temp.right;
                }
            }
        }
    }

    /* END using prefilled sudoku entries */
    /* END using prefilled sudoku entries */
    /* END using prefilled sudoku entries */
    
    // Solve
    DLCont = true;
    DLSearch(0, masterNode, matrix);
}

var DLCont = true;
function DLSearch(k, masterNode, matrix)
{
    // End 
    if(!DLCont)
        return;

    if(masterNode.right === masterNode)
    {
        DLCont = false;
        return;
    }

    // Pick a column (naively right now, will improve later)
    // let c = masterNode.right; 

    // Pick the best column (The column with the smallest size - aka possibilities)
    let tempC = masterNode.right;
    let c = tempC;  
    while(tempC != masterNode)
    {
        if(c.size > tempC.size)
        {
            c = tempC;
        }
        tempC = tempC.right;
    }
    
    coverColumn(c);

    let r = c.down;
    while(r != c)   // We're picking a row
    {
        
        if(!DLCont)
            return;

        // Set the corresponing number to the corresponding row and column
        let correspondingSudokuBoardRow = Math.floor(r.rowNumber/81);
        let correspondingSudokuBoardColumn = Math.floor((r.rowNumber%81) / 9);
        let correspondingSudokuBoardNumber = r.rowNumber % 9 + 1;
        matrix[correspondingSudokuBoardRow][correspondingSudokuBoardColumn] = correspondingSudokuBoardNumber;

        let row = correspondingSudokuBoardRow;
        let col = correspondingSudokuBoardColumn;
        let i = correspondingSudokuBoardNumber;
        timeOutIDSameForAnyAnimation = setTimeout(fillCell, (DancingLinksTimeCount++)*DancingLinksDuration, row, col, i);

        let j = r.right;
        while(j != r)
        {
            coverColumn(j.header);
            j = j.right;
        }
        
        DLSearch(k+1, masterNode, matrix);

        if(!DLCont)
            return;


        matrix[correspondingSudokuBoardRow][correspondingSudokuBoardColumn] = 0; // Backtrack

        timeOutIDSameForAnyAnimation = setTimeout(emptyCell, (DancingLinksTimeCount++)*DancingLinksDuration, row, col);

        j = r.left;
        while(j != r)
        {
            uncoverColumn(j.header);
            j = j.left;
        }
        
        r = r.down;
    }

    uncoverColumn(c);
}

function addNodeToBottomOfAColumn(nodeToAdd, columnTop)
{
    let temp = columnTop;
    while(temp.down !== null && temp.down != columnTop) // When temp reach the bottom, when column is empty, temp.down will be equal to null, when column has some element, temp.down will be equal to columnTop (Circular linkedlist)
    {
        temp = temp.down;
    }
    temp.down = nodeToAdd;
    nodeToAdd.up = temp;

    // Circular
    nodeToAdd.down = columnTop;
    columnTop.up = nodeToAdd;
}

function coverColumn(topColumnNode)
{
    // Please see Knuth's Paper for better understanding http://www-cs-faculty.stanford.edu/~uno/papers/dancing-color.ps.gz
    // (Page 6 - Covering a column)

    let c = topColumnNode; // For shorter writing

    c.right.left = c.left;
    c.left.right = c.right;

    let i = c.down;
    while(i != c)
    {
        let j = i.right;
        while(j != i)
        {
            j.down.up = j.up;
            j.up.down = j.down;

            j.header.size--;

            j = j.right;
        }
        i = i.down;
    }
}   

function uncoverColumn(topColumnNode)
{
    // Please see Knuth's Paper for better understanding http://www-cs-faculty.stanford.edu/~uno/papers/dancing-color.ps.gz
    // (Page 6 - Covering a column)

    let c = topColumnNode; // For shorter writing

    let i = c.up;
    while(i != c)
    {
        let j = i.left;
        while(j != i)
        {
            j.header.size++;

            j.down.up = j;
            j.up.down = j;

            j = j.left;
        }
        i = i.up;
    }
    c.right.left = c;
    c.left.right = c;
}

function succeededSpiralAnimation(currentTimeCount, currentDuration)
{
    let currentTime = currentTimeCount * currentDuration;
    let succeededDuration = 20;
    let newCount = 0;

    let size = 1;
    let row = 4;
    let col = 4;
    let center = 4;

    while(size <= 9)
    {

        // Animation for the left layer
        for(let i = row; i >= center - Math.floor(size/2); i--)
        {
            timeOutIDSameForAnyAnimation = setTimeout(colorCell, 
                currentTime + (newCount++)*succeededDuration, i, col);
        }

        // Animation for the top layer
        for(let j = col+1; j <= center + Math.floor(size/2); j++)
        {
            timeOutIDSameForAnyAnimation = setTimeout(colorCell, 
                currentTime + (newCount++)*succeededDuration, center-Math.floor(size/2), j);
        }

        // Animation for the right layer
        for(let i = center-Math.floor(size/2)+1; i <= center + Math.floor(size/2); i++)
        {
            timeOutIDSameForAnyAnimation = setTimeout(colorCell, 
                currentTime + (newCount++)*succeededDuration, i, center + Math.floor(size/2));
        }

        // Animation for the bottom layer
        for(let j = center + Math.floor(size/2)-1; j >= center - Math.floor(size/2); j--)
        {
            timeOutIDSameForAnyAnimation = setTimeout(colorCell, 
                currentTime + (newCount++)*succeededDuration, center+Math.floor(size/2), j);
        }

        // Update row, col and size
        size += 2;
        if(row === center && col === center) // If we're at the center
        {
            row = row;  // Row stays the same
            col--;      // Column decreases by 1
        }
        else
        {
            row++;
            col--;
        }
    }

    timeOutIDSameForAnyAnimation = setTimeout(setAllowSolveSpeedAndAlgorithms, currentTime + (newCount++)*succeededDuration);
}
//--------------------------------------------END Dancing Links----------------------------------------------
//--------------------------------------------END Dancing Links----------------------------------------------
//--------------------------------------------END Dancing Links----------------------------------------------

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
    else if(algorithmsDropDown.innerHTML === "Dancing Links") currentAlgo = "Dancing Links";
    else if(algorithmsDropDown.innerHTML === "Reverse Backtracking") currentAlgo = "Reverse Backtracking";
    else if(algorithmsDropDown.innerHTML === "Spiral Backtracking") currentAlgo = "Spiral Backtracking";

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