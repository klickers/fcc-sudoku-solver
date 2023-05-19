class SudokuSolver {
    validate(puzzleString) {
        if (!/^[\d.]+$/.test(puzzleString))
            return "error: puzzle string contains invalid characters";
        if (puzzleString.length !== 81)
            return "error: puzzle string is not 81 characters long";
        return "Puzzle string is valid";
    }

    findRows(puzzleString) {
        return puzzleString.match(/.{1,9}/g);
    }

    checkRowPlacement(puzzleString, row, column, value) {
        let rows = this.findRows(puzzleString);
        if (rows[row].includes(value))
            return "error: row already includes value";
        return "Row placement is valid";
    }

    checkColPlacement(puzzleString, row, column, value) {
        for (let i = column; i < puzzleString.length; i += 9)
            if (puzzleString[i] == value)
                return "error: column already includes value";
        return "Column placement is valid";
    }

    checkRegionPlacement(puzzleString, row, column, value) {
        const BOUNDS = { 0: 0, 1: 0, 2: 0, 3: 3, 4: 3, 5: 3, 6: 6, 7: 6, 8: 6 };
        let rows = this.findRows(puzzleString),
            rowStart = BOUNDS[row],
            colStart = BOUNDS[column];

        for (let i = rowStart; i < rowStart + 3; i++)
            for (let j = colStart; j < colStart + 3; j++)
                if (rows[i][j] == value)
                    return "error: region already includes value";
        return "Region placement is valid";
    }

    solve(puzzleString) {}
}

module.exports = SudokuSolver;
