import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../Node/Unspecified/UnspecifiedPresenter";
import { NodeState, NodeType, NodeContext } from "../Node/NodeState";
import { NodeTypeToString } from "../Node/NodeState";
import { GraphContext } from "../Node/GraphContext";
import { Node } from "reactflow";

const proOptions = { hideAttribution: true };

const nodeTypes = {
  source: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeModel}>
      <SourcePresenter />
    </NodeContext.Provider>
  ),
  unspecified: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeModel}>
      <UnspecifiedPresenter />
    </NodeContext.Provider>
  ),
};

const Canvas: React.FC = () => {
  const initialNodes = [createNewNode(0, 0, NodeType.Source)];
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const graph = { nodes };

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  function onConnectEndHandler() {
    const { x, y } = mousePosition;
    addNewNode(x, y, NodeType.Unspecified);
  }

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  function createNewNode(x: number, y: number, nodeType: NodeType) {
    const newModel = new NodeState(x, y, [], [], nodeType);

    const newNode: Node = {
      // specify the type here
      id: newModel.getID().toString(),
      type: NodeTypeToString(nodeType),
      data: {
        label: NodeTypeToString(nodeType),
        nodeModel: newModel,
      },
      position: { x: x, y: y },
    };
    return newNode;
  }

  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    const newNode = createNewNode(x, y, nodeType);
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  /*
  useEffect(() => {
    addNewNode(0, 0, NodeType.Source);
  }, []); // Empty array as dependency, so the effect runs only on mount
*/

  return (
    <div
      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
    >
      <GraphContext.Provider value={graph}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          onConnectEnd={onConnectEndHandler}
          nodesDraggable={true}
          nodesConnectable={true}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <MiniMap></MiniMap>
        </ReactFlow>
      </GraphContext.Provider>
    </div>
  );
};

function Flow() {
  return (
    <ReactFlowProvider>
      <Canvas></Canvas>
    </ReactFlowProvider>
  );
}

export default Flow;
