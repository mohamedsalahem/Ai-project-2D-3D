# 🧩 Maze Pathfinding Visualization (2D)

## 📌 Project Overview
This project is a **2D maze simulation and visualization** that demonstrates how different **AI search algorithms** solve a maze pathfinding problem.  
Each algorithm searches for a path from a **start point** to a **goal point**, while visualizing the agent’s movement step by step.

The project is implemented in **Python** and uses **Matplotlib animations** to clearly show how each algorithm explores the maze.

---

## 🧠 Implemented Search Algorithms
The following five algorithms are implemented and compared:

- **BFS (Breadth-First Search)**
- **DFS (Depth-First Search)**
- **UCS (Uniform Cost Search)**
- **IDS (Iterative Deepening Search)**
- **A\* (A-Star Search)**

Each algorithm returns the path (if found) and visualizes the agent’s movement inside the maze.

---

## 🗺️ Maze Representation
- `0` → Free cell (walkable)
- `1` → Wall (blocked)

The maze is represented as a 2D grid:
```python
maze = [
    [0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
]
