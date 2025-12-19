import { useState } from "react";
import { useMaze, Algorithm } from "@/lib/stores/useMaze";
import { useComparison } from "@/lib/stores/useComparison";

const algorithmNames: Record<Algorithm, string> = {
  astar: "A*",
  bfs: "BFS",
  dfs: "DFS",
  ucs: "UCS",
  ids: "IDS",
};

const algorithmColors: Record<Algorithm, string> = {
  astar: "bg-blue-500",
  bfs: "bg-green-500",
  dfs: "bg-purple-500",
  ucs: "bg-orange-500",
  ids: "bg-pink-500",
};

const allAlgorithms: Algorithm[] = ["astar", "bfs", "dfs", "ucs", "ids"];

export function ComparisonMode() {
  const [showComparison, setShowComparison] = useState(false);
  const { phase, maze, startPos, endPos } = useMaze();
  const { 
    selectedAlgorithms, 
    toggleAlgorithm, 
    startComparison, 
    results, 
    isComparing,
    clearComparison 
  } = useComparison();
  
  if (phase !== "menu") return null;
  
  return (
    <>
      <button
        onClick={() => setShowComparison(true)}
        className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg z-10 font-semibold transition-all"
      >
        Compare Algorithms
      </button>
      
      {showComparison && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Algorithm Comparison</h2>
              <button
                onClick={() => {
                  setShowComparison(false);
                  clearComparison();
                }}
                className="text-gray-400 hover:text-white text-2xl"
              >
                x
              </button>
            </div>
            
            {!isComparing ? (
              <>
                <p className="text-gray-400 mb-4 text-sm">
                  Select 2 or more algorithms to compare their performance on the current maze
                </p>
                
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {allAlgorithms.map((algo) => (
                    <button
                      key={algo}
                      onClick={() => toggleAlgorithm(algo)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedAlgorithms.includes(algo)
                          ? `${algorithmColors[algo]} border-2 border-white`
                          : "bg-gray-800 border-2 border-transparent hover:border-gray-600"
                      }`}
                    >
                      <div className="font-bold text-white">{algorithmNames[algo]}</div>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => startComparison(maze, startPos, endPos)}
                  disabled={selectedAlgorithms.length < 2}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    selectedAlgorithms.length >= 2
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {selectedAlgorithms.length < 2 
                    ? `Select ${2 - selectedAlgorithms.length} more algorithm${selectedAlgorithms.length === 1 ? '' : 's'}`
                    : `Compare ${selectedAlgorithms.length} Algorithms`
                  }
                </button>
              </>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-gray-400 font-semibold">Rank</th>
                        <th className="py-3 px-4 text-gray-400 font-semibold">Algorithm</th>
                        <th className="py-3 px-4 text-gray-400 font-semibold">Solve Time</th>
                        <th className="py-3 px-4 text-gray-400 font-semibold">Nodes Explored</th>
                        <th className="py-3 px-4 text-gray-400 font-semibold">Path Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, idx) => (
                        <tr key={result.algorithm} className="border-b border-gray-800">
                          <td className="py-3 px-4">
                            <span className={`font-bold ${
                              idx === 0 ? 'text-yellow-400' : 
                              idx === 1 ? 'text-gray-300' : 
                              idx === 2 ? 'text-orange-400' : 'text-gray-500'
                            }`}>
                              #{idx + 1}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block w-3 h-3 rounded-full ${algorithmColors[result.algorithm]} mr-2`}></span>
                            <span className="text-white font-semibold">{algorithmNames[result.algorithm]}</span>
                          </td>
                          <td className="py-3 px-4 text-cyan-400">
                            {result.stats.solveTimeMs.toFixed(3)}ms
                          </td>
                          <td className="py-3 px-4 text-red-400">
                            {result.stats.nodesExplored}
                          </td>
                          <td className="py-3 px-4 text-green-400">
                            {result.stats.pathLength}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Fastest Algorithm</h3>
                    <p className="text-cyan-400 text-xl font-bold">
                      {results[0] && algorithmNames[results[0].algorithm]}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {results[0] && `${results[0].stats.solveTimeMs.toFixed(3)}ms`}
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Most Efficient Path</h3>
                    <p className="text-green-400 text-xl font-bold">
                      {results.length > 0 && algorithmNames[
                        results.reduce((a, b) => 
                          a.stats.pathLength < b.stats.pathLength ? a : b
                        ).algorithm
                      ]}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {results.length > 0 && `${
                        results.reduce((a, b) => 
                          a.stats.pathLength < b.stats.pathLength ? a : b
                        ).stats.pathLength
                      } steps`}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={clearComparison}
                  className="w-full mt-4 py-3 rounded-lg font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all"
                >
                  Compare Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
