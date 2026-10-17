import { useState } from "react";

import FlowCanvas from "./components/FlowCanvas";
import PropertyPanel from "./components/PropertyPanel";

import { exportAI } from "./utils/exportAI";

export default function App() {
  const [nodes, setNodes] =
    useState([]);

  const [edges, setEdges] =
    useState([]);

  function addNode() {
    const id =
      "NODE_" +
      Date.now();

    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "gameNode",

        position: {
          x: 300,
          y: 200,
        },

        data: {
          id,
          label: "新步驟",

          type: "normal",

          status: "todo",

          color: "#ffffff",

          tags: [],

          note: "",

          showColor: true,

          showTag: true,

          showStatus: true,
        },
      },
    ]);
  }

  return (
    <div className="layout">
      <PropertyPanel />

      <div className="workspace">
        <div className="toolbar">
          <button onClick={addNode}>
            新增節點
          </button>

          <button
            onClick={() =>
              exportAI(
                nodes,
                edges
              )
            }
          >
            AI匯出
          </button>
        </div>

        <FlowCanvas
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </div>
    </div>
  );
}
