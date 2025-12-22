## 👥 Team Contributions

- Mohamed Salah: A*
- Eman Ali: UCS  
- Habiba Tamer: BFS  
- Shahenda Farag: DFS  
- Esraa Yehia: IDS  

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
python
maze = [
    [0, 0, 0, 0, 1],
    
    [1, 1, 0, 0, 1],
    
    [0, 0, 0, 1, 0],
    
    [0, 1, 0, 0, 0],
    
    [0, 0, 0, 1, 0]
    
]


# 🧠 3D AI Search Algorithms Simulation

## 📌 Overview
This project is a **3D simulation** designed to visualize and compare the behavior of several **classical AI search algorithms**.  
It provides an **interactive environment** where users can observe how different algorithms traverse a search space to find the **optimal path** from a start point to a goal.

The project is implemented in **TypeScript** and leverages **3D graphics** 
---

## 🔍 Algorithms Implemented
The following search algorithms are included in this simulation:

- **A\*** (A-Star)  
  Finds the shortest path using heuristics.

- **DFS** (Depth-First Search)  
  Explores as far as possible along each branch before backtracking.

- **BFS** (Breadth-First Search)  
  Explores all nodes at the current depth before moving deeper.

- **UCS** (Uniform Cost Search)  
  Finds the least-cost path in a weighted graph.

- **IDS** (Iterative Deepening Search)  
  Combines the depth-limited approach with iterative deepening.

---

## ✨ Features
- Interactive **3D visualization** of the search process  
- **Real-time updates** showing node exploration and path selection  
- Customizable **start and goal positions**  
- Adjustable **obstacles** and **search space size** for testing different scenarios  
- **Step-by-step simulation mode** for educational purposes  

---

## 🎯 Purpose
This project aims to:
- Understand how different AI search algorithms work
- Visually compare algorithm behaviors
- Improve intuition about pathfinding and search strategies

---

## ⚙️ Technologies Used
- **TypeScript**
- **3D Graphics Rendering**
- **AI Search Algorithms**
- **AI Search Algorithms**

