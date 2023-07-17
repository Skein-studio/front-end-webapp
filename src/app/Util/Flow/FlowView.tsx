//FlowView.tsx

import React from "react";
import ReactFlow, {
  MiniMap,
  Background,
  BackgroundVariant,
  Node, Edge, Viewport, NodeChange, EdgeChange,
} from "reactflow";
import { OuterBox, GraphNameInput } from "../BaseStyles";

interface Props {
  flowKey: number;
  nodes: Node[];
  edges: Edge[];
  nodeTypes: any;
  proOptions: any;
  onConnectEndHandler: (event: MouseEvent | TouchEvent) => void;
  onNodesChange: (change: NodeChange[]) => void;
  onEdgesChange: (change: EdgeChange[]) => void;
  onConnect: (connection: any) => void;
  onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
  viewport: Viewport;
  onMove: (event: MouseEvent | TouchEvent, viewport: Viewport) => void;
  openNodeView: () => JSX.Element | null;
}

const FlowView: React.FC<Props> = (props) => {
  const {
    flowKey,
    nodes,
    edges,
    nodeTypes,
    proOptions,
    onConnectEndHandler,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
    viewport,
    onMove,
    openNodeView
  } = props;

  return (
    <OuterBox width="95vw" height="95vh">
      <GraphNameInput defaultValue={"violet-york-mayflower"} />
      {openNodeView()}
      <ReactFlow
        key={flowKey}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        onConnectEnd={onConnectEndHandler}
        nodesDraggable={true}
        nodesConnectable={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        defaultViewport={viewport}
        onMove={onMove}
      >
        <MiniMap></MiniMap>
        <Background color="#ccc" variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </OuterBox>
  );
};

export default FlowView;
