import { MazeCell, Position, Algorithm, AlgorithmStats } from "./stores/useMaze";

interface Node {
  pos: Position;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

export interface SearchResult {
  path: Position[];
  visited: Position[];
  stats: AlgorithmStats;
}

function heuristic(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
}

function getNeighbors(pos: Position, maze: MazeCell[][]): Position[] {
  const directions = [
    { x: 0, z: -1 },
    { x: 0, z: 1 },
    { x: -1, z: 0 },
    { x: 1, z: 0 },
  ];
  
  const neighbors: Position[] = [];
  for (const dir of directions) {
    const newX = pos.x + dir.x;
    const newZ = pos.z + dir.z;
    
    if (
      newZ >= 0 && newZ < maze.length &&
      newX >= 0 && newX < maze[0].length &&
      !maze[newZ][newX].isWall
    ) {
      neighbors.push({ x: newX, z: newZ });
    }
  }
  
  return neighbors;
}

function reconstructPath(node: Node): Position[] {
  const path: Position[] = [];
  let current: Node | null = node;
  while (current) {
    path.unshift(current.pos);
    current = current.parent;
  }
  return path;
}

function posKey(pos: Position): string {
  return `${pos.x},${pos.z}`;
}

export function astar(maze: MazeCell[][], start: Position, end: Position): SearchResult {
  const startTime = performance.now();
  const visited: Position[] = [];
  const openSet: Node[] = [];
  const closedSet = new Set<string>();
  
  const startNode: Node = {
    pos: start,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
    parent: null,
  };
  
  openSet.push(startNode);
  
  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;
    
    visited.push(current.pos);
    
    if (current.pos.x === end.x && current.pos.z === end.z) {
      const path = reconstructPath(current);
      return { 
        path, 
        visited,
        stats: {
          solveTimeMs: performance.now() - startTime,
          nodesExplored: visited.length,
          pathLength: path.length,
        }
      };
    }
    
    closedSet.add(posKey(current.pos));
    
    for (const neighborPos of getNeighbors(current.pos, maze)) {
      const key = posKey(neighborPos);
      if (closedSet.has(key)) continue;
      
      const g = current.g + 1;
      const h = heuristic(neighborPos, end);
      const f = g + h;
      
      const existingIdx = openSet.findIndex(n => posKey(n.pos) === key);
      if (existingIdx !== -1) {
        if (g < openSet[existingIdx].g) {
          openSet[existingIdx] = { pos: neighborPos, g, h, f, parent: current };
        }
      } else {
        openSet.push({ pos: neighborPos, g, h, f, parent: current });
      }
    }
  }
  
  return { 
    path: [], 
    visited,
    stats: {
      solveTimeMs: performance.now() - startTime,
      nodesExplored: visited.length,
      pathLength: 0,
    }
  };
}

export function bfs(maze: MazeCell[][], start: Position, end: Position): SearchResult {
  const startTime = performance.now();
  const visited: Position[] = [];
  const queue: Node[] = [];
  const visitedSet = new Set<string>();
  
  queue.push({ pos: start, g: 0, h: 0, f: 0, parent: null });
  visitedSet.add(posKey(start));
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    visited.push(current.pos);
    
    if (current.pos.x === end.x && current.pos.z === end.z) {
      const path = reconstructPath(current);
      return { 
        path, 
        visited,
        stats: {
          solveTimeMs: performance.now() - startTime,
          nodesExplored: visited.length,
          pathLength: path.length,
        }
      };
    }
    
    for (const neighborPos of getNeighbors(current.pos, maze)) {
      const key = posKey(neighborPos);
      if (!visitedSet.has(key)) {
        visitedSet.add(key);
        queue.push({ pos: neighborPos, g: current.g + 1, h: 0, f: 0, parent: current });
      }
    }
  }
  
  return { 
    path: [], 
    visited,
    stats: {
      solveTimeMs: performance.now() - startTime,
      nodesExplored: visited.length,
      pathLength: 0,
    }
  };
}

export function dfs(maze: MazeCell[][], start: Position, end: Position): SearchResult {
  const startTime = performance.now();
  const visited: Position[] = [];
  const stack: Node[] = [];
  const visitedSet = new Set<string>();
  
  stack.push({ pos: start, g: 0, h: 0, f: 0, parent: null });
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    const key = posKey(current.pos);
    
    if (visitedSet.has(key)) continue;
    visitedSet.add(key);
    visited.push(current.pos);
    
    if (current.pos.x === end.x && current.pos.z === end.z) {
      const path = reconstructPath(current);
      return { 
        path, 
        visited,
        stats: {
          solveTimeMs: performance.now() - startTime,
          nodesExplored: visited.length,
          pathLength: path.length,
        }
      };
    }
    
    for (const neighborPos of getNeighbors(current.pos, maze)) {
      if (!visitedSet.has(posKey(neighborPos))) {
        stack.push({ pos: neighborPos, g: current.g + 1, h: 0, f: 0, parent: current });
      }
    }
  }
  
  return { 
    path: [], 
    visited,
    stats: {
      solveTimeMs: performance.now() - startTime,
      nodesExplored: visited.length,
      pathLength: 0,
    }
  };
}

export function ucs(maze: MazeCell[][], start: Position, end: Position): SearchResult {
  const startTime = performance.now();
  const visited: Position[] = [];
  const openSet: Node[] = [];
  const closedSet = new Set<string>();
  
  openSet.push({ pos: start, g: 0, h: 0, f: 0, parent: null });
  
  while (openSet.length > 0) {
    openSet.sort((a, b) => a.g - b.g);
    const current = openSet.shift()!;
    const key = posKey(current.pos);
    
    if (closedSet.has(key)) continue;
    closedSet.add(key);
    visited.push(current.pos);
    
    if (current.pos.x === end.x && current.pos.z === end.z) {
      const path = reconstructPath(current);
      return { 
        path, 
        visited,
        stats: {
          solveTimeMs: performance.now() - startTime,
          nodesExplored: visited.length,
          pathLength: path.length,
        }
      };
    }
    
    for (const neighborPos of getNeighbors(current.pos, maze)) {
      const neighborKey = posKey(neighborPos);
      if (!closedSet.has(neighborKey)) {
        const g = current.g + 1;
        const existingIdx = openSet.findIndex(n => posKey(n.pos) === neighborKey);
        if (existingIdx !== -1) {
          if (g < openSet[existingIdx].g) {
            openSet[existingIdx] = { pos: neighborPos, g, h: 0, f: g, parent: current };
          }
        } else {
          openSet.push({ pos: neighborPos, g, h: 0, f: g, parent: current });
        }
      }
    }
  }
  
  return { 
    path: [], 
    visited,
    stats: {
      solveTimeMs: performance.now() - startTime,
      nodesExplored: visited.length,
      pathLength: 0,
    }
  };
}

export function ids(maze: MazeCell[][], start: Position, end: Position): SearchResult {
  const startTime = performance.now();
  const allVisited: Position[] = [];
  
  function dls(node: Node, depth: number, visitedSet: Set<string>): Node | null {
    allVisited.push(node.pos);
    
    if (node.pos.x === end.x && node.pos.z === end.z) {
      return node;
    }
    
    if (depth <= 0) return null;
    
    visitedSet.add(posKey(node.pos));
    
    for (const neighborPos of getNeighbors(node.pos, maze)) {
      if (!visitedSet.has(posKey(neighborPos))) {
        const childNode: Node = {
          pos: neighborPos,
          g: node.g + 1,
          h: 0,
          f: 0,
          parent: node,
        };
        const result = dls(childNode, depth - 1, new Set(visitedSet));
        if (result) return result;
      }
    }
    
    return null;
  }
  
  const maxDepth = maze.length * maze[0].length;
  
  for (let depth = 0; depth <= maxDepth; depth++) {
    const startNode: Node = { pos: start, g: 0, h: 0, f: 0, parent: null };
    const result = dls(startNode, depth, new Set());
    if (result) {
      const path = reconstructPath(result);
      return { 
        path, 
        visited: allVisited,
        stats: {
          solveTimeMs: performance.now() - startTime,
          nodesExplored: allVisited.length,
          pathLength: path.length,
        }
      };
    }
  }
  
  return { 
    path: [], 
    visited: allVisited,
    stats: {
      solveTimeMs: performance.now() - startTime,
      nodesExplored: allVisited.length,
      pathLength: 0,
    }
  };
}

export function runAlgorithm(algo: Algorithm, maze: MazeCell[][], start: Position, end: Position): SearchResult {
  switch (algo) {
    case "astar": return astar(maze, start, end);
    case "bfs": return bfs(maze, start, end);
    case "dfs": return dfs(maze, start, end);
    case "ucs": return ucs(maze, start, end);
    case "ids": return ids(maze, start, end);
  }
}
