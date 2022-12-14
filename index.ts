function validRow(row: number[]): number[] {
    return possibleNums(row);
}

function validCol(grid: number[][], c: number): number[] {
    const col: number[] = [];

    for (let i = 0; i < 9; i++) {
        col.push(grid[i][c]);
    }
    
    return possibleNums(col);
}

function getSubGridNum(grid: number[][], row: number, col: number) {
    col = col > 5 ? 6 : col > 2 ? 3 : 0;
    row = row > 5 ? 6 : row > 2 ? 3 : 0;
    const subgrid: number[] = [];

    for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
            subgrid.push(grid[i][j]);
        }
    }

    return possibleNums(subgrid);
}

function possibleNums(arr: number[]): number[] {
    const possible: number[] = [];

    for (let i = 1; i < 10; i++) {
        if (arr.includes(i)) {
            continue;
        }
        possible.push(i);
    }
    return possible;
}


function getPossible(row: number[], col: number[], subGrid: number[]): number[] {
        return row.filter(n => col.includes(n) && subGrid.includes(n))
}


const sudoku = [
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

let unsolved = true;

while (unsolved) {
    unsolved = false;
    for (let i = 0; i < 9; i++) {
        let currentRow = i;
        for (let j = 0; j < 9; j++) {
            let currentCol = j;

            if (sudoku[currentRow][currentCol] !== 0) {
                continue;
            }

            let rowPoss = validRow(sudoku[currentRow]);
            let colPoss = validCol(sudoku, currentCol);
            let subGridPoss = getSubGridNum(sudoku, currentRow, currentCol);

            const nums = getPossible(rowPoss, colPoss, subGridPoss);
            if (nums.length === 1) {
                unsolved = true;
                sudoku[currentRow][currentCol] = nums[0];
            }
        }
    }
}

console.log(sudoku.join('\n'));
