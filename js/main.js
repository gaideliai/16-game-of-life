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
    //console.log(grid);
    console.table(grid);
    
}
setup();