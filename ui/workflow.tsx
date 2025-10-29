import ReactFlow, { Node, Background, Controls, Edge, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@chakra-ui/react";



const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Start" },
    position: { x: 10, y: 10 },
  },
  {
    id: "2",
    data: { label: "Gmail" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Telegram" },
    position: { x: 100, y: 100 },
  }
];

const InitialEdges: Edge[]  = [{
    id: "1-2",
    source: "1",
    target: "2",
    animated: true
}]
export const Workflow = () => {

    const[nodes, setNodes, onNodesChanges]  = useNodesState(initialNodes);
    const[edges, setEdges, onEdgesChanges]  = useNodesState(initialNodes);
  return (
    <Box height="500px" width="500px" border="1px solid black">
      <ReactFlow nodes={initialNodes} edges={InitialEdges} onNodesChange={onNodesChanges} fitView style={{ width: "100%", height: "100%" }}>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};