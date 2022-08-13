// Sudoku solver.
//
// Will need a few functions for the solver to work. 
// Need to make it so each cell knows what row, col and subgrid they belong to. Then need to be able to check valid numbers that fulfill the row, col and subgrid functions.
// If multiple possible numbers, store them in the cell or somewhere. Otherwise if there is only
// one possible number fill in that cell with the number.
//
// Solving loop
// go through each cell, and set numbers, if at the end of the current loop the puzzle is still unsolved
// loop through the cells again. For future loops you will only need to check the numbers that hasnt been set and only check each cell against the possible numbers for that cell.
//
// The end condition is a solved puzzle.
/*
function isValidNum(puzzle) {

    return validRow(row) && validCol(col) && validSubGrid(subGrid);
}
*/
function validRow(row) {
    return possibleNums(row);
}
function validCol(grid, c) {
    var col = [];
    for (var i = 0; i < 9; i++) {
        col.push(grid[i][c]);
    }
    return possibleNums(col);
}
function getSubGridNum(grid, row, col) {
    col = col > 5 ? 6 : col > 2 ? 3 : 0;
    row = row > 5 ? 6 : row > 2 ? 3 : 0;
    var subgrid = [];
    for (var i = row; i < row + 3; i++) {
        for (var j = col; j < col + 3; j++) {
            subgrid.push(grid[i][j]);
        }
    }
    return possibleNums(subgrid);
}
function possibleNums(arr) {
    var possible = [];
    for (var i = 1; i < 10; i++) {
        if (arr.includes(i)) {
            continue;
        }
        possible.push(i);
    }
    return possible;
}
function getPossible(row, col, subGrid) {
    return row.filter(function (n) { return col.includes(n) && subGrid.includes(n); });
}
var sudoku = [
    [0, 0, 0, 6, 0, 0, 1, 0, 7],
    [3, 0, 0, 0, 1, 0, 0, 0, 8],
    [0, 5, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 6],
    [0, 4, 5, 0, 6, 8, 0, 1, 3],
    [0, 6, 0, 3, 0, 5, 0, 0, 0],
    [8, 2, 3, 5, 4, 0, 0, 0, 0],
    [0, 0, 7, 1, 0, 0, 6, 0, 0],
    [4, 0, 0, 8, 0, 9, 2, 3, 5]
];
var unsolved = true;
while (unsolved) {
    unsolved = false;
    for (var i = 0; i < 9; i++) {
        var currentRow = i;
        for (var j = 0; j < 9; j++) {
            var currentCol = j;
            if (sudoku[currentRow][currentCol] !== 0) {
                continue;
            }
            var rowPoss = validRow(sudoku[currentRow]);
            var colPoss = validCol(sudoku, currentCol);
            var subGridPoss = getSubGridNum(sudoku, currentRow, currentCol);
            var nums = getPossible(rowPoss, colPoss, subGridPoss);
            if (nums.length === 1) {
                unsolved = true;
                sudoku[currentRow][currentCol] = nums[0];
            }
        }
    }
}
console.log(sudoku.join('\n'));
