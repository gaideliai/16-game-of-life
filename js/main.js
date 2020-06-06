"use strict";

const DOM = document.querySelector('#field');
const black = '#000';
const white = '#fff';
let color = '';
let grid;
let fieldSize = 20;
let iterationCount = 50;

function make2DArray (fieldSize) {
    let arr = new Array(fieldSize);
    for (let i=0; i<fieldSize; i++) {
        arr[i] = new Array(fieldSize);        
    }
    return arr;   
}

function setup () {
    let HTML = '';
    grid = make2DArray(fieldSize);
    for ( let y=0; y<fieldSize; y++ ) {        
        HTML += `<div class="row"
                      style="height: calc(100% / ${fieldSize});">`;
            for ( let x=0; x<fieldSize; x++ ) {
                if (Math.random() < 0.22) {
                    color = black;
                    grid[y][x] = 'X';
                } else {
                    color = white;
                    grid[y][x] = '.';
                }    
                HTML += `<div class="cell"
                              style="background-color: ${color};
                                     width: calc(100% / ${fieldSize});">
                        </div>`;
            }
        HTML += `</div>`;        
    }
    DOM.innerHTML = HTML;
    console.table(grid);  
}

function nextGeneration () {
    let HTML = '';
    let next = make2DArray(fieldSize);
    for (let y=0; y<fieldSize; y++) {
        HTML += `<div class="row"
                      style="height: calc(100% / ${fieldSize});">`;
        for (let x=0; x<fieldSize; x++) {
            let state = grid[y][x];
            
            //count live neighbours
            let neighbours = countNeighbours(grid, x, y);            

            if (state === '.' && neighbours === 3) {
                next[y][x] = 'X';
                color = black;
            } else
            if (state === 'X' && (neighbours < 2 || neighbours > 3)) {
                next[y][x] = '.';
                color = white;
            } else {
                next[y][x] = state;
                if (state === 'X') {
                    color = black;
                } else {
                    color = white;
                }
            }
            HTML += `<div class="cell"
                              style="background-color: ${color};
                                     width: calc(100% / ${fieldSize});">
                        </div>`;
        }
        HTML += `</div>`;
    }
    DOM.innerHTML = HTML;
    console.table(next);    
}

function countNeighbours (grid, x, y) {
    let sum = 0;
    for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
            //wrap around - x and y consider the other sides as neighbours
            let col = (x+i+fieldSize) % fieldSize;
            let row = (y+j+fieldSize) % fieldSize;
            if (grid[col][row] === 'X') {
                sum += 1;
            }
        }
    }
    if (grid[x][y] === 'X') {
        sum -= 1;
    }        
    return sum;
}

setup();
nextGeneration ();