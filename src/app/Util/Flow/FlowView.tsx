//FlowView.tsx

import ReactFlow, {
  MiniMap,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  OnSelectionChangeParams,
  Viewport,
} from "reactflow";
import { OuterBox, GraphNameInput } from "../BaseStyles";
import styled from "styled-components";
import OptionsView from "./OptionsView/OptionsView";

interface Props {
  flowKey: number;
  nodes: Node[];
  edges: Edge[];
  nodeTypes: any;
  proOptions: any;
  onConnectStart: (
    event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
    params: any
  ) => void;
  onConnectEnd: (event: MouseEvent | TouchEvent) => void;
  onNodesChange: (change: NodeChange[]) => void;
  onEdgesChange: (change: EdgeChange[]) => void;
  onConnect: (connection: any) => void;
  onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => void;
  openNodeView: () => JSX.Element | null;
  openSelectedNode: boolean;
  showSelected: () => void;
  onSelectionChange: (params: OnSelectionChangeParams) => void;
  hideSelected: () => void;
  handlePaneClick: () => void;
  onNodesDelete: (nodes: Node[]) => void;
  onEdgesDelete: (edges: Edge[]) => void;
  deleteSelectedNode: () => void;
  deleteSelectedEdge: () => void;
  addButtonHandler: () => void;
  loadFromGraph: ()=>void;
  onMove:(event: MouseEvent | TouchEvent, viewport: Viewport)=>void;
}

/**
 * The view for the Flow component.
 * @returns A ReactFlow component.
 * */
function FlowView(props: Props) {
  return (
    <OuterBox width="95vw" height="95vh">
      <GraphNameInput defaultValue={"violet-york-mayflower"} />
      <StyledMiniMap
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      />
      <OptionsView
        toggle={props.showSelected}
        deleteSelectedNode={props.deleteSelectedNode}
        deleteSelectedEdge={props.deleteSelectedEdge}
        addButtonHandler={props.addButtonHandler}
        loadFromGraph={props.loadFromGraph}
        
      />
      <Overlay
        show={props.openSelectedNode ? true : undefined}
        onClick={props.hideSelected}
      />
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
        onPaneClick={props.handlePaneClick}
        onMove={props.onMove}
      >
        <Background color="#ccc" variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </OuterBox>
  );
}

export default FlowView;

interface OverLayProps {
  show: boolean | undefined;
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

const StyledMiniMap = styled(MiniMap)`
  position: absolute;
  border-radius: 10px;
  border: 1px solid black;
  transform: scale(0.625);
  margin: auto;
  width: 200px; // You can replace with any fixed width you want
  height: 150px; // You can replace with any fixed height you want

  @media (max-width: 768px) {
    left: 0;
  }
`;
