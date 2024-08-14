"use client";
import { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Handle,
  Position,
} from "react-flow-renderer";
import "react-resizable/css/styles.css";

interface Card {
  id: number;
  text: string;
  fullText: string; // Full text for detailed view
}

interface CustomNodeProps {
  data: {
    label: string;
    fullText: string; // Full text for detailed view
    onShowMore: () => void; // Function to handle show more
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "3px",
        background: "#fff",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <button
        onClick={data.onShowMore}
        className="mt-2 p-1 bg-blue-500 text-white rounded"
      >
        Show More
      </button>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default function Home() {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      text: "This is a dummy text that is initially shown partially.",
      fullText:
        "This is a dummy text that is initially shown partially. Click 'Show More' to see the full text.", // Full text
    },
    {
      id: 2,
      text: "Another dummy text for the second card.",
      fullText:
        "Another dummy text for the second card. Click 'Show More' to see more details.",
    },
  ]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    cards.map((card) => ({
      id: card.id.toString(),
      type: "custom", // Custom node type
      data: {
        label: card.text.substring(0, 70) + "...", // Partial text
        fullText: card.fullText, // Full text
        onShowMore: () => handleShowMore(card.id), // Show more handler
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeId, setNodeId] = useState(cards.length + 1);

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const handleShowMore = (cardId: number) => {
    const card = cards.find((card) => card.id === cardId);
    if (card) {
      console.log("Selected card:", card); // Debugging
      setSelectedCard(card); // Show full text in popup
    }
  };

  const addNode = () => {
    const newNodeId = nodeId;
    setNodes((nds) => [
      ...nds,
      {
        id: newNodeId.toString(),
        type: "custom", // Custom node type
        data: {
          label: "New Card",
          fullText: "This is the full text of the new card.", // Full text
          onShowMore: () => handleShowMore(newNodeId), // Show more handler for new node
        },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      },
    ]);
    setNodeId(newNodeId + 1);
  };
  console.log(selectedCard);

  return (
    <div className="h-screen bg-gray-200">
      <button
        onClick={addNode}
        className="p-2 bg-blue-500 text-white rounded mt-4 ml-4"
      >
        Add Card
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={{ custom: CustomNode }} // Register custom node type
        style={{ width: "100%", height: "90vh" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      {selectedCard && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-8 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Card Details
          </h2>
          <p className="text-gray-700 mb-6">{selectedCard.fullText}</p>{" "}
          {/* Display full text */}
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => setSelectedCard(null)} // Close the popup
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
