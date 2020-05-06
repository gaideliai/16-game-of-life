"use strict";

function make2DArray (cols, rows) {
    let arr = new Array(cols);
    for (let i=0; i<arr.length; i++) {
        arr[i] = new Array (rows);        
    }
    return arr;
    //console.log(arr);    
}

let grid;
let cols = 20;
let rows = 20;


function setup () {
    grid = make2DArray(cols, rows);

    for (let i=0; i<cols; i++) {
        for (let j=0; j<rows; j++) {            
            //grid[i][j] = floor(random(2));
            if (Math.random() < 0.22) {
                grid[i][j] = 'X';
            } else {
                grid[i][j] = '.';
            }
        }        
    }
    console.table(grid);  
}

function nextGeneration () {
    let next = make2DArray(cols, rows);
    for (let i=0; i<cols; i++) {
        for (let j=0; j<rows; j++) {
            let state = grid[i][j];

            //edges
            if (i===0 || i===cols-1 || j===0 || j===rows-1){
                next[i][j] = state;
            } else {
                //count live neighbours
                let neighbours = countNeighbours(grid, i, j);            

                if (state === '.' && neighbours === 3) {
                    next[i][j] = 'X';
                } else
                if (state === 'X' && (neighbours < 2 || neighbours > 3)) {
                    next[i][j] = '.';
                } else {
                    next[i][j] = state;
                }
            }
        }
    }
    console.table(next);    
}

function countNeighbours (grid, x, y) {
    let sum = 0;
    for (let i=-1; i<2; i++) {
        for (let j=-1; j<2; j++) {
            if (grid[x+i][y+j] === 'X') {
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