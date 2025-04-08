let maze = [];
let start = { x: 1, y: 1 };
let end = { x: 9, y: 9 };
let mazeSize = 10; // Default maze size
const queue = [];

const mazeContainer = document.getElementById('maze-container');
const generateMazeBtn = document.getElementById('generate-maze');
const solveMazeBtn = document.getElementById('solve-maze');
const clearMazeBtn = document.getElementById('clear-maze');
const mazeSizeInput = document.getElementById('maze-size');

// Helper: Get valid neighbors (up/down/left/right)
function getNeighbors(x, y) {
    const neighbors = [];
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (let [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < mazeSize && ny < mazeSize) {
            neighbors.push([nx, ny]);
        }
    }
    return neighbors;
}

// Helper: Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate maze using Iterative DFS + animation
async function generateMaze() {
    mazeSize = parseInt(mazeSizeInput.value);

    if (mazeSize % 2 === 0) mazeSize--; // Prefer odd-sized grids

    maze = Array.from({ length: mazeSize }, () => Array(mazeSize).fill(1));
    start = { x: 1, y: 1 };
    end = { x: mazeSize - 2, y: mazeSize - 2 };

    renderMaze();

    await carveMazeIterative(start.x, start.y);

    maze[start.x][start.y] = 0;
    maze[end.x][end.y] = 0;

    renderMaze();
}

// Iterative DFS with animation to carve maze
async function carveMazeIterative(startX, startY) {
    const stack = [[startX, startY]];
    maze[startX][startY] = 0;

    while (stack.length > 0) {
        const [x, y] = stack.pop();
        renderMaze();
        await new Promise(resolve => setTimeout(resolve, 15)); // Small delay for animation

        const directions = shuffle([
            [0, -2], [0, 2], [-2, 0], [2, 0]
        ]);

        for (let [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx > 0 && ny > 0 && nx < mazeSize - 1 && ny < mazeSize - 1 && maze[nx][ny] === 1) {
                maze[nx][ny] = 0;
                maze[x + dx / 2][y + dy / 2] = 0; // Remove wall
                stack.push([nx, ny]);
            }
        }
    }
}

// Render the maze to the DOM
function renderMaze() {
    mazeContainer.innerHTML = '';
    mazeContainer.style.gridTemplateColumns = `repeat(${mazeSize}, 30px)`;

    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('maze-cell');

            if (maze[i][j] === 1) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('path');
            }

            if (i === start.x && j === start.y) {
                cell.classList.add('start');
            }
            if (i === end.x && j === end.y) {
                cell.classList.add('end');
            }

            if (maze[i][j] === 2) {
                cell.classList.add('user-path');
            }

            cell.addEventListener('click', () => {
                if (maze[i][j] !== 1) {
                    maze[i][j] = maze[i][j] === 0 ? 2 : 0;
                    queue.push({ x: i, y: j });
                    renderMaze();
                }
            });

            mazeContainer.appendChild(cell);
        }
    }
}

// DFS solve function
function dfs(x, y, visited, path) {
    if (x === end.x && y === end.y) {
        path.push([x, y]);
        return true;
    }

    visited[x][y] = true;

    for (let [nx, ny] of getNeighbors(x, y)) {
        if (!visited[nx][ny] && maze[nx][ny] !== 1) {
            path.push([x, y]);
            if (dfs(nx, ny, visited, path)) {
                return true;
            }
            path.pop();
        }
    }

    return false;
}

// Solve the maze
function solveMaze() {
    const visited = Array.from({ length: mazeSize }, () => Array(mazeSize).fill(false));
    const path = [];

    if (dfs(start.x, start.y, visited, path)) {
        path.forEach(([px, py]) => {
            if (!(px === start.x && py === start.y) && !(px === end.x && py === end.y)) {
                maze[px][py] = 2;
            }
        });
        renderMaze();
    } else {
        alert("No solution found!");
    }
}

// Clear = regenerate
function clearMaze() {
    generateMaze();
}

// Button event listeners
generateMazeBtn.addEventListener('click', generateMaze);
solveMazeBtn.addEventListener('click', solveMaze);
clearMazeBtn.addEventListener('click', clearMaze);

// Initial render
generateMaze();
