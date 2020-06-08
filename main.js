const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(map) {
        this.map = map;
    }
    //prints 2D array map
    print() {
        let mapString = '';
        const rows = this.map.length;
        const cols = this.map[0].length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                mapString += this.map[i][j];
            }
            console.log(mapString);
            mapString = '';
        }
    }


}
//generates 5 x 5 map 
function generateField() {
    const options = [hole, fieldCharacter];
    let field = [];
    let row = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const choice = options[Math.floor(Math.random() * 2)];
            row.push(choice);
        }
        field.push(row);
        row = [];
    }
    field[0][0] = pathCharacter;
    field[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 5)] = hat;
    return field;
}

//returns true if current position is on the hat
function containsHat(array, row, col) {
    if (array[row][col] === hat) {
        console.log(`Congratulations! You found the hat!`);
        return true;
    }
    return false;
}

function outOfBounds(array, row, col) {
    const maxRows = array.length;
    const maxCols = array[0].length;
    if (row < 0 || col < 0 || row >= maxRows || col >= maxCols) {
        console.log(`Sorry! Out of bounds. Game over :(`);
        return true;
    }
    return false;
}

function crossedBarrier(array, row, col) {
    if (array[row][col] === hole) {
        console.log(`You fell into a hole! Game over :(`);
        return true;
    }
    return false;
}


//Game
console.log('Welcome to FIND YOUR HAT!');
const field = new Field(generateField());

let currRow = 0;
let currCol = 0;

let foundHat = false;
while (!foundHat) {
    field.print();
    const direction = prompt('What move would you like to make (l, u, d, r)?');
    
    if (direction === 'l') {
        currCol -= 1;
    }
    else if (direction === 'r') {
        currCol += 1;
    }
    else if (direction === 'd') {
        currRow += 1;
    }
    else if (direction === 'u') {
        currRow -= 1;
    }
    else {
        console.log('Not a valid direction.');
    }

    if (outOfBounds(field.map, currRow, currCol)) {
        break;
    }
    if (crossedBarrier(field.map, currRow, currCol)) {
        break;
    }
    if (containsHat(field.map, currRow, currCol)) {
        break;
    }

    if (direction === 'l') {
        field.map[currRow][currCol + 1] = fieldCharacter
        field.map[currRow][currCol] = pathCharacter;
    }
    else if (direction === 'r') {
        field.map[currRow][currCol - 1] = fieldCharacter
        field.map[currRow][currCol] = pathCharacter;
    }
    else if (direction === 'u') {
        field.map[currRow + 1][currCol] = fieldCharacter
        field.map[currRow][currCol] = pathCharacter;
    }
    else if (direction === 'd') {
        field.map[currRow - 1][currCol] = fieldCharacter
        field.map[currRow][currCol] = pathCharacter;
    }

}
