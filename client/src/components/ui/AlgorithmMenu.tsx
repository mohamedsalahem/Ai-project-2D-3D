import { useMaze, Algorithm, Difficulty, VisualizationMode } from "@/lib/stores/useMaze";

const algorithms: { id: Algorithm; name: string; description: string }[] = [
  { id: "astar", name: "A* Search", description: "Uses heuristic to find optimal path efficiently" },
  { id: "bfs", name: "BFS", description: "Breadth-First Search - explores level by level" },
  { id: "dfs", name: "DFS", description: "Depth-First Search - explores as far as possible first" },
  { id: "ucs", name: "UCS", description: "Uniform Cost Search - finds lowest cost path" },
  { id: "ids", name: "IDS", description: "Iterative Deepening Search - combines DFS and BFS" },
];

const difficulties: { id: Difficulty; name: string; size: string }[] = [
  { id: "easy", name: "Easy", size: "11x11" },
  { id: "medium", name: "Medium", size: "15x15" },
  { id: "hard", name: "Hard", size: "21x21" },
];

export function AlgorithmMenu() {
  const { 
    selectedAlgorithm, 
    setAlgorithm, 
    startGame, 
    phase,
    visualizationMode,
    setVisualizationMode,
    difficulty,
    setDifficulty,
    generateMaze,
    loadPresetMaze
  } = useMaze();
  
  if (phase !== "menu") return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 overflow-auto py-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-1 text-center">
          Maze Pathfinder
        </h1>
        <p className="text-gray-400 text-center mb-4 text-sm">
          Select an algorithm and watch the ball solve the maze
        </p>
        
        <div className="mb-4">
          <h3 className="text-white font-semibold mb-2 text-sm">Difficulty</h3>
          <div className="flex gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => {
                  setDifficulty(diff.id);
                  generateMaze();
                }}
                className={`flex-1 p-2 rounded-lg text-center transition-all text-sm ${
                  difficulty === diff.id
                    ? "bg-purple-600 border-2 border-purple-400"
                    : "bg-gray-800 border-2 border-transparent hover:border-gray-600"
                }`}
              >
                <div className="font-semibold text-white">{diff.name}</div>
                <div className="text-xs text-gray-300">{diff.size}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold text-sm">Maze</h3>
            <div className="flex gap-2">
              <button
                onClick={() => generateMaze()}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-all"
              >
                Random
              </button>
              <button
                onClick={() => loadPresetMaze(0)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-all"
              >
                Preset 1
              </button>
              <button
                onClick={() => loadPresetMaze(1)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-all"
              >
                Preset 2
              </button>
              <button
                onClick={() => loadPresetMaze(2)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-all"
              >
                Preset 3
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-white font-semibold mb-2 text-sm">Visualization Mode</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setVisualizationMode("instant")}
              className={`flex-1 p-2 rounded-lg text-center transition-all text-sm ${
                visualizationMode === "instant"
                  ? "bg-cyan-600 border-2 border-cyan-400"
                  : "bg-gray-800 border-2 border-transparent hover:border-gray-600"
              }`}
            >
              <div className="font-semibold text-white">Instant</div>
              <div className="text-xs text-gray-300">Show result immediately</div>
            </button>
            <button
              onClick={() => setVisualizationMode("step")}
              className={`flex-1 p-2 rounded-lg text-center transition-all text-sm ${
                visualizationMode === "step"
                  ? "bg-cyan-600 border-2 border-cyan-400"
                  : "bg-gray-800 border-2 border-transparent hover:border-gray-600"
              }`}
            >
              <div className="font-semibold text-white">Step-by-Step</div>
              <div className="text-xs text-gray-300">Watch algorithm explore</div>
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-white font-semibold mb-2 text-sm">Algorithm</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setAlgorithm(algo.id)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedAlgorithm === algo.id
                    ? "bg-blue-600 border-2 border-blue-400"
                    : "bg-gray-800 border-2 border-transparent hover:border-gray-600"
                }`}
              >
                <div className="font-semibold text-white text-sm">{algo.name}</div>
                <div className="text-xs text-gray-300">{algo.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={startGame}
          disabled={!selectedAlgorithm}
          className={`w-full py-3 rounded-lg font-bold text-base transition-all ${
            selectedAlgorithm
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Start Solving
        </button>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Start
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> End
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Ball
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
