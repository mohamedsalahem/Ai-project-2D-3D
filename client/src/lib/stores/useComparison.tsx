import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Algorithm, MazeCell, Position, AlgorithmStats } from "./useMaze";
import { runAlgorithm } from "../pathfinding";

export interface ComparisonResult {
  algorithm: Algorithm;
  stats: AlgorithmStats;
  path: Position[];
  visited: Position[];
}

interface ComparisonState {
  isComparing: boolean;
  selectedAlgorithms: Algorithm[];
  results: ComparisonResult[];
  
  toggleAlgorithm: (algo: Algorithm) => void;
  startComparison: (maze: MazeCell[][], start: Position, end: Position) => void;
  clearComparison: () => void;
}

export const useComparison = create<ComparisonState>()(
  subscribeWithSelector((set, get) => ({
    isComparing: false,
    selectedAlgorithms: [],
    results: [],
    
    toggleAlgorithm: (algo) => {
      const { selectedAlgorithms } = get();
      if (selectedAlgorithms.includes(algo)) {
        set({ selectedAlgorithms: selectedAlgorithms.filter(a => a !== algo) });
      } else {
        set({ selectedAlgorithms: [...selectedAlgorithms, algo] });
      }
    },
    
    startComparison: (maze, start, end) => {
      const { selectedAlgorithms } = get();
      if (selectedAlgorithms.length < 2) return;
      
      set({ isComparing: true });
      
      const results: ComparisonResult[] = [];
      
      for (const algo of selectedAlgorithms) {
        const mazeCopy = maze.map(row => row.map(cell => ({ ...cell })));
        const result = runAlgorithm(algo, mazeCopy, start, end);
        results.push({
          algorithm: algo,
          stats: result.stats,
          path: result.path,
          visited: result.visited,
        });
      }
      
      results.sort((a, b) => a.stats.solveTimeMs - b.stats.solveTimeMs);
      
      set({ results });
    },
    
    clearComparison: () => {
      set({ 
        isComparing: false, 
        selectedAlgorithms: [],
        results: [] 
      });
    },
  }))
);
