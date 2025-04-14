INTRODUCTION
Maze Pathfinding and Project Overview
 
A maze is a collection of interconnected paths separated by walls, often created as a puzzle to challenge navigation skills. This game utilizes pathfinding logic and algorithms to obtain a solution. Pathfinding algorithms are useful for finding efficient routes around barriers and adapting to changing environments in real time. It lets you calculate routes on the fly instead of hardcoding them, saving a considerable amount of space and processing time.
These algorithms have many real-life use cases in fields like procedural level generation to generate random maps and dungeons in games like Minecraft, robotics, AI navigation, escape room games, logic apps, brain training programs, etc. Thus, the objective of this mini project is to utilize data structures to design and implement a maze generator and solver using JavaScript and basic web technologies like HTML and CSS. It also explores data structures and algorithms in a visual and interactive way. It visualizes algorithmic steps in real time, helping in learning, understanding, and debugging.
It implements the DFS algorithm to find a path from start to end. Visual feedback is given by colouring the solution path.
Users can specify the maze size using an input field. The maze is interactive; clicking on any path cell selects it as part of a custom user path. Buttons are available to regenerate, clear, and solve the maze.





Tech used
1. HTML (HyperText Markup Language):
•	Used to define the structure of the web page.
•	Elements are created using HTML.

2. CSS (Cascading Style Sheets)
•	Controls the visual appearance and layout of the maze and UI.
•	Used to style the maze cells (.maze-cell, .wall, .path, .start, .end, etc.) and define the grid layout using CSS Grid.

3. JavaScript (Vanilla JS)
•	Implements the logic of the maze generation and solving.
•	Includes asynchronous functions for real-time animation (async/await and setTimeout via sleep()).











Data Structures
🔹 2D Arrays
•	Structure:  maze = Array.from({ length: size }, () => Array(size).fill(1));
•	The maze is represented as a 2D array:
o	1 is fo ra wall
o	0 is for a path
o	2 is for the user path or solution
•	This allows easy access and update of individual cells using maze[x][y].
🔹 Stack
•	Structure:  const stack = [[startA, startY]];
•	As DFS proceeds, new cells are added (pushed) and explored by popping the last added cell.
🔹 Array
•	Structure:  const queue = [];
•	While named queue, this array is used to store cells clicked by the user.
     🔹 Objects
•	Structure:  let start = { a: 1, y: 1 };
                 let end = { a: size - 2, y: size - 2 };
•	Used to track the starting and ending positions of the maze.
🔹 Visited Matrix
•	Structure:  let visited = [];
for (let i = 0; i < size; i++) {
    visited[i] = [];
    for (let j = 0; j < size; j++) {
        visited[i][j] = false;
    }
}
•	Prevents infinite loops and redundant traversal during the recursive search.


MAZE GENERATION ALGORITHM

To programmatically generate a solvable maze using the Depth-First Search (DFS) algorithm.
Logic:
•	The maze is initially filled with walls.
•	The algorithm starts at a defined start point and carves out paths.
•	DFS ensures that each path is explored before backtracking.
Pseudocode:
function walls(starta, startY):
    stack = [(starta, startY)]
    mark start cell as path
while stack is not empty:
        current = stack.pop()
        for each random direction (up, down, left, right):
            next = current + 2 in direction
            if next is within bounds and is wall:
                mark next as path
                remove wall between current and next
                stack.push(next).
Reasons to use D.F.S.:
•	Depth-First Search is ideal for generating mazes with only one unique path between any two points, resulting in a loop-free structure.
•	Stack-based DFS is easier to visualize and animate.
•	It creates only one path between any two points — ideal for solving.

Algorithm for Maze Solving
•	The algorithm starts at the start position and attempts to reach the end position. 
•	It avoids walls and tracks visited cells using a boolean matrix.
•	Upon reaching the goal, the path is backtracked and marked visually.
Pseudocode:
function dfs (a, y, visited, path):
    if current is end:
        add current to path
        return true
 mark current as visited
for each neighbour of current:
        if not visited and not wall:
            add current to path
            if dfs(neighbour):
                return true
            remove current from path
return false
Benefits of DFS for Solving:
•	Finds a valid path if one exists.
•	Easy to implement and visualize.
•	Supports backtracking logic natively.



User interaction and input handling
The user can interact in three ways:
1.	Generate Maze (with input size)
2.	Solve Maze (visual path finding)
3.	Clicking cells to mark or unmark custom paths.
Generating Maze:
•	A button (Generate Maze) triggers function generateMaze().
•	User input for size is validated and adjusted to be odd.
•	Code: mazebtn.addEventListener('click', () => {generateMaze();
});
Solving Maze:
•	The Solve Maze button triggers the DFS-based solver.
•	The solution path is displayed with a different color.
•	Code:   solveMazeBtn.addEventListener('click',()=>{solveMaze();
})
Clicking Cells:
•	The u
•	ser can manually click on path cells to mark them..
•	Code:  cell.addEventListener('click', () => {if (maze[i][j] !== 1) {
        maze[i][j] = maze[i][j] === 0 ? 2 : 0;
        queue.push({ a: i, y: j });
        renderMaze();
    }});



Real-World Applications in Games and Beyond
In Games:
1.	Random Dungeon Generation:
o	Roguelike games like The Binding of Isaac, Enter the Gungeon use similar maze generation for level design.
2.	Puzzle Games:
o	Games like Portal, The Witness, and Baba Is You  uses maze-solving logic.
3.	Pathfinding in Strategy Games:
o	Real-Time Strategy (RTS) and RPGs use similar algorithms to navigate units in maps like  StarCraft, Age of Empires. 

Other Applications:
1.	Robotics & AI Navigation: 
•	Robots use maze-solving strategies to plan their routes and avoid collisions in real-world environments.
2.	Network Routing:
o	Concepts like DFS/BFS are used in finding optimal data path.
 
Conclusion

Summary
•	This project demonstrates core programming concepts, especially data structures and algorithms.
•	DFS is used for both generating and solving mazes. 
•	A 2D array-based grid system is implemented alongside interactive, event-driven user input.
•	The project integrates algorithmic logic with front-end development  using HTML/CSS/JS.

 Key Learnings
•	Deepened understanding of stack-based DFS for maze generation and recursion-based DFS for solving.
•	Explored how data structures like 2D arrays, stacks, and path lists help solve real problems.
•	Strengthened concepts in user interface handling, logic design, and code debugging in JavaScript.








Challenges, Limitations, and Possible Enhancements
 Challenges Faced
•	Implementing real-time rendering and animation without slowing performance.
•	Avoiding stack overflow in recursive DFS for larger mazes.
Limitations
•	DFS may not always find the shortest path—only a path.
•	Maze generation and solving is single-threaded; complex mazes can lag the browser.
•	No error handling for invalid user input (like non-numeric sizes).
Other ways to make this:
•	Add Breadth-First Search (BFS)  algorithm for shortest pathfinding.
•	Introduce maze themes, animations, and music for gamification to improve user experience. 
•	Add difficulty levels, scoring, and timer for a full puzzle game experience.
Medical Imaging (MRI/CT scans):
o	Algorithms navigate complex vascular structures (e.g., vein tracing).
Logistics & Warehouse Optimization:
o	Algorithms like these are used to optimize pick paths for goods.
