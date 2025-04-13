// maze configration and dom References
let maze = [];
let size = 12; 
let start = { a: 1, y: 1 };
let end = { a: 9, y: 9 };
const queue = [];

const mazekeeper = document.getElementById('maze-container');
const mazebtn = document.getElementById('generate-maze');
const solveMazeBtn = document.getElementById('solve-maze');
const clearMazeBtn = document.getElementById('clear-maze');
const input = document.getElementById('maze-size');

//core utility functions

// Returns neighboring cells within bounds
function side(a, y) {
    const directions = [
        [-1, 0], [1, 0], // up down
        [0, -1], [0, 1]  // sidewize
    ];
    return directions
        .map(([da, dy]) => [a + da, y + dy])
        .filter(([na, ny]) => na >= 0 && ny >= 0 && na < size && ny < size);
}

// randomize array order
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//maze making
// main 
async function generateMaze() {
    console.log(" Generating maze...");
    size = Math.max(5, parseInt(input.value) || 10); // input
    if (size % 2 === 0) size--; // odd sizes

    maze = Array.from({ length: size }, () => Array(size).fill(1));
    start = { a: 1, y: 1 };
    end = { a: size - 2, y: size - 2 };

    console.log( `Maze size set to ${size}x${size}`);
    renderMaze(); // Render initial all-walls grid
    console.log(" Initial wall grid rendered");

    await walls(start.a, start.y);

    // Ensure start and end are open
    maze[start.a][start.y] = 0;
    maze[end.a][end.y] = 0;

    console.log(" Start and end points cleared");
    renderMaze();
    console.log(" Maze generation complete!");
}


// iterative dfs
async function walls(starta, startY) {
    const stack = [[starta, startY]];
    maze[starta][startY] = 0;
    console.log(` Entering walls(): Starting from (${starta}, ${startY})`);

    while (stack.length > 0) {
        const [a, y] = stack.pop();
        console.log(` Popped cell (${a}, ${y}) from stack`);
        renderMaze();
        await sleep(15); // animation

        for (let [da, dy] of shuffle([[0, -2], [0, 2], [-2, 0], [2, 0]])) {
            const [na, ny] = [a + da, y + dy];

            if (withinMaze(na, ny) && maze[na][ny] === 1) {
                maze[na][ny] = 0;
                maze[a + da / 2][y + dy / 2] = 0; // remove wall
                stack.push([na, ny]);
                console.log(` makeing to (${na}, ${ny})`);
            }
        }
    }

    console.log(" Finished making maze paths");
}

function withinMaze(a, y) {
    return a > 0 && y > 0 && a < size - 1 && y < size - 1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Rendering

function renderMaze() {
    mazekeeper.innerHTML = '';
    mazekeeper.style.gridTemplateColumns = `repeat(${size}, 30px)`;
    console.log(" Cleared maze container for new render");

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = point(i, j);

            cell.addEventListener('click', () => {
                if (maze[i][j] !== 1) {
                    maze[i][j] = maze[i][j] === 0 ? 2 : 0;
                    queue.push({ a: i, y: j });
                    console.log(` Clicked cell (${i}, ${j}) — toggled path/user-path`);
                    renderMaze();
                }
            });

            mazekeeper.appendChild(cell);
        }
    }

    console.log(" Maze render complete");
}

function point(a, y) {
    const classes = ['maze-cell'];
    if (maze[a][y] === 1) classes.push('wall');
    else if (maze[a][y] === 0) classes.push('path');
    else if (maze[a][y] === 2) classes.push('user-path');

    if (a === start.a && y === start.y) classes.push('start');
    else if (a === end.a && y === end.y) classes.push('end');

    return classes.join(' ');
}

// Solving Logic

function solveMaze() {
    console.log("Starting maze solving...");
    let visited = [];
    for (let i = 0; i < size; i++) {
        visited[i] = [];
        for (let j = 0; j < size; j++) {
            visited[i][j] = false;
        }
    }

    const path = [];

    if (dfs(start.a, start.y, visited, path)) {
        console.log(" Path found!");
        path.forEach(([a, y]) => {
            if (!(a === start.a && y === start.y) && !(a === end.a && y === end.y)) {
            maze[a][y] = 2;
            }
        });
        renderMaze();
    } else {
        alert("No solution found.");
        console.log(" No path could be found by DFS");
    }
}

// recursive DFS
function dfs(a, y, visited, path) {
    if (a === end.a && y === end.y) {
        path.push([a, y]);
        return true;
    }

    visited[a][y] = true;
    console.log(` Visiting (${a}, ${y})`);

    for (let [na, ny] of side(a, y)) {
        if (!visited[na][ny] && maze[na][ny] !== 1) {
            path.push([a, y]);
            if (dfs(na, ny, visited, path)) return true;
            path.pop(); // Backtrack
            console.log(` Backtracking from (${na}, ${ny})`);
        }
    }
    return false;
}

mazebtn.addEventListener('click', () => {
    console.log(" Generate Maze button clicked");
    generateMaze();
});

solveMazeBtn.addEventListener('click', () => {
    console.log(" Solve Maze button clicked");
    solveMaze();
});

clearMazeBtn.addEventListener('click', () => {
    console.log(" Clear Maze (regenerate) button clicked");
    generateMaze();
});

generateMaze();

