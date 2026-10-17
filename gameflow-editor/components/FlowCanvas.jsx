import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";

import { useCallback } from "react";

import CustomNode from "./CustomNode";

const nodeTypes = {
  gameNode: CustomNode,
};

export default function FlowCanvas({
  nodes,
  setNodes,
  edges,
  setEdges,
}) {
  const [rfNodes, onNodesChange] =
    useNodesState(nodes);

  const [rfEdges, onEdgesChange] =
    useEdgesState(edges);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(params, eds)
      );
    },
    [setEdges]
  );

  return (
    <ReactFlow
      fitView
      nodes={rfNodes}
      edges={rfEdges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}
