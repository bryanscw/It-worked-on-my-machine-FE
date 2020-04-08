import generator from 'generate-maze';

import { TILE_MAPPING, MAP_HEIGHT, MAP_WIDTH } from './constants';

export const EMPTY = 0;
export const WALL = 1;
export const GOAL = 2;
export const QUESTION = 3;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// Generates a maze of size 29 by 15
export function generateMaze(numQuestions) {
    let originalMaze = generator((MAP_WIDTH + 1) / 2, (MAP_HEIGHT + 1) / 2);
    let mazeWithWalls = [];

    for (let i = 0; i < originalMaze.length; i++) {
        let originalRow = originalMaze[i];
        let rowWithWalls = [];
        let rowBeneath = [];

        for (let j = 0; j < originalRow.length; j++) {
            rowWithWalls.push(EMPTY);
            rowWithWalls.push(originalRow[j].right ? WALL : EMPTY);
        }

        rowWithWalls.pop()

        for (let j = 0; j < originalRow.length; j++) {
            rowBeneath.push(originalRow[j].bottom ? WALL : EMPTY);
            rowBeneath.push(WALL);
        }

        rowBeneath.pop()

        mazeWithWalls.push(rowWithWalls);
        mazeWithWalls.push(rowBeneath);
    }
    
    mazeWithWalls.pop();

    let lastRow = mazeWithWalls[mazeWithWalls.length - 1];
    mazeWithWalls[mazeWithWalls.length - 1][lastRow.length - 1] = GOAL;

    let freeCoordinates = [];

    for (let i = 0; i < mazeWithWalls.length; i++) {
        let row = mazeWithWalls[i];

        for (let j = 0; j < row.length; j++) {
            if (row[j] === EMPTY && !(i === 0 && j === 0))
                freeCoordinates.push([j, i]);
        }
    }

    freeCoordinates = shuffle(freeCoordinates);
    const questionCoordinates = freeCoordinates.splice(0, numQuestions);
    let mapDescriptor = JSON.stringify(mazeWithWalls);

    return {
        mapDescriptor,
        questionCoordinates,
    };
}

export function generateTiles(mapDescriptor, questions) {
    let mazeWithWalls = JSON.parse(mapDescriptor);
    for (let i = 0; i < questions.length; i++) {
        const {
            x,
            y,
        } = questions[i].coordinates;
        mazeWithWalls[y][x] = QUESTION;
    }

    let tiles = [];
    for (let i = 0; i < mazeWithWalls.length; i++) {
        let row = mazeWithWalls[i];
        let tileRow = [];

        for (let j = 0; j < row.length; j++) {
            let tile = null;

            switch (row[j]) {
                case EMPTY:
                    tile = TILE_MAPPING.grass;
                    break;

                case WALL:
                    tile = Math.random() <= 0.75 ? TILE_MAPPING.tree: TILE_MAPPING.rock;
                    break;

                case GOAL:
                    tile = TILE_MAPPING.house;
                    break;

                case QUESTION:
                    tile = Math.floor(Math.random() * 9) + 7;
                    break;
                
                default:
                    tile = TILE_MAPPING.grass;
                    break;
            }

            tileRow.push(tile);
        }

        tiles.push(tileRow);
    }

    return tiles;
}