/*import React, { useState, useContext } from "react";
import ReactFlow, { removeElements, addEdge, useStoreActions, useUpdateNodeInternals } from "react-flow-renderer";
import NodeContext from './NodeContext';  // your node context file

const initialElements = [
  // your initial nodes and edges
];

const MyFlow = () => {
  const [nodes, setNodes] = useState(initialElements);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const setInternals = useUpdateNodeInternals();
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

  const onNodeClick = (_: any, element: any) => {
    setSelectedNode(element);
  };

  const onNodeRemove = (elementsToRemove: any) => {
    setNodes((els) => removeElements(elementsToRemove, els));
  };

  const onAddNode = () => {
    const newNode = {
      id: `${Date.now()}`,
      type: 'unspecified',
      position: { x: 0, y: 0 },
    };

    setNodes((els) => els.concat(newNode));
  };

  const onEditNode = () => {
    setIsEditing(true);
  };

  const onSaveNode = () => {
    // Do your saving logic here
    setIsEditing(false);
    if (selectedNode) {
      setInternals(selectedNode.id);
    }
  };

  return (
    <div>
      <button onClick={onAddNode}>Add Node</button>
      {selectedNode && (
        <button onClick={onEditNode}>Edit Node</button>
      )}
      {isEditing && (
        <div>
          {/* Your OpenNodePresenter component */ /*}
          <OpenNodePresenter onSave={onSaveNode} />
        </div>
      )}
      <ReactFlow
        elements={nodes}
        onElementClick={onNodeClick}
        onElementsRemove={onNodeRemove}
        nodeTypes={nodeTypes}  // your nodeTypes
      />
    </div>
  );
};

export default MyFlow;
*/
