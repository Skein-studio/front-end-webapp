//FlowView.tsx

import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Viewport,
  NodeChange,
  EdgeChange,
  OnSelectionChangeParams,
} from "reactflow";
import { OuterBox, GraphNameInput } from "../BaseStyles";
import styled from "styled-components";
import OptionsView from "./OptionsView/OptionsView";
import { NodeState } from "@/app/Node/NodeState";

interface Props {
  flowKey: number;
  nodes: Node[];
  edges: Edge[];
  nodeTypes: any;
  proOptions: any;
  onConnectStart: (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>, params: any) => void;
  onConnectEnd: (event: MouseEvent | TouchEvent) => void;
  onMove: (event: MouseEvent | TouchEvent, viewport: Viewport) => void;
  onNodesChange: (change: NodeChange[]) => void;
  onEdgesChange: (change: EdgeChange[]) => void;
  onConnect: (connection: any) => void;
  onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
  viewport: Viewport;
  openNodeView: () => JSX.Element | null;
  openSelectedNode: boolean;
  showSelected: () => void;
  onSelectionChange: (params:OnSelectionChangeParams) => void;
  hideSelected: () => void;
  handlePaneClick: () => void;
  onNodesDelete: (nodes: Node[]) => void;
  onEdgesDelete: (edges: Edge[]) => void;
  deleteSelectedNode: () => void;
  deleteSelectedEdge: () => void;
  addButtonHandler: () => void;
}

/* This component is the main view for the flow editor. 
It contains the reactflow graph, the options view, and the overlay. */

function FlowView(props:Props) {

  return (
    <OuterBox width="95vw" height="95vh">
      <GraphNameInput defaultValue={"violet-york-mayflower"} />
      <OptionsView toggle={props.showSelected} deleteSelectedNode={props.deleteSelectedNode} deleteSelectedEdge={props.deleteSelectedEdge} addButtonHandler={props.addButtonHandler}/>
      <Overlay show={props.openSelectedNode ? true : undefined} />
      {props.openSelectedNode && props.openNodeView()}
      <ReactFlow
        key={props.flowKey}
        proOptions={props.proOptions}
        nodes={props.nodes}
        nodeTypes={props.nodeTypes}
        onNodesDelete={props.onNodesDelete}
        onNodesChange={props.onNodesChange}
        onNodeDragStop={props.onNodeDragStop}
        nodesDraggable={true}
        nodesConnectable={true}
        edges={props.edges}
        onEdgesDelete={props.onEdgesDelete}
        onEdgesChange={props.onEdgesChange}
        onSelectionChange={props.onSelectionChange}
        onConnect={props.onConnect}
        onConnectStart={props.onConnectStart}
        onConnectEnd={props.onConnectEnd}
        defaultViewport={props.viewport}
        onMove={props.onMove}
        onPaneClick={props.handlePaneClick}
      >
        <MiniMap
          style={{
            position: "absolute",
            bottom: "-25px",
            right: "-25px",
            borderRadius: "10px",
            border: "1px solid black",
            transform: "scale(0.625)",
          }}
        />
        <Background color="#ccc" variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </OuterBox>
  );
};

export default FlowView;

interface OverLayProps {
  show: boolean|undefined;
}

const Overlay = styled.div<OverLayProps>`
  background-color: rgba(255, 255, 255, 0.5); // half transparent white
  position: fixed; // to cover the whole screen
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; // higher than the content but lower than the openNodeView
  display: ${(props) => (props.show ? "block" : "none")};
`;
