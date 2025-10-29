import React, { ReactNode } from 'react';
import ReactFlow, { Node, Background, Controls, Edge, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";



type NodeData = { label: ReactNode };

const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    data: {
      label: (
        <img
          src="https://img.icons8.com/color/96/whatsapp--v1.png"
          alt="WhatsApp"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    position: { x: 0, y: 0 },
    style: {
      width: 50,
      height: 50,
      padding: 0,
      border: "none",
      background: "none",
    },
  },
  {
    id: "2",
    data: {
      label: (
        <img
          src="https://img.icons8.com/color/96/telegram-app--v1.png"

          alt="Telegram"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    position: { x: 100, y: 50 },
    style: {
      width: 50,
      height: 50,
      padding: 0,
      border: "none",
      background: "none",
    },
  },
  {
    id: "3",
    data: {
      label: (
        <img
          src="https://img.icons8.com/color/96/gmail--v1.png"
          alt="Gmail"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    position: { x: 0, y: 100 },
    style: {
      width: 50,
      height: 50,
      padding: 0,
      border: "none",
      background: "none",
    },
  }
];

const initialEdges: Edge[]  = [{
    id: "1-2",
    source: "1",
    target: "2",
    animated: true
},
{
  id: "2-3",
  source: "2",
  target: "3",
  animated: true
}
]
export const Workflow = () => {

    const [nodes, setNodes, onNodesChanges]  = useNodesState<NodeData>(initialNodes);
    const [edges, setEdges, onEdgesChanges]  = useEdgesState(initialEdges);
  return (
    <Box height="100vh" width="100vw" border="1px solid black" background={"black"}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChanges} onEdgesChange={onEdgesChanges} fitView style={{ width: "50%", height: "50%" }}>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};