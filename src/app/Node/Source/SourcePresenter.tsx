//SourcePresenter.tsx
import React, { useState, useContext, useEffect } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";
import { SourceType } from "@/app/Util/modelTransformation";

function SourcePresenter () {
  const { nodeState, forceReload } = useContext(NodeContext);
  const nodeData = nodeState?.model.Data as SourceType;

  const [base, setBase] = useState<string>(
    (nodeState?.model.Data as SourceType).base ?? ""
  );
  
  useEffect(() => {
    forceReload();
  }, [nodeData.URL, nodeData.base]);
  

  //useEffect to load audioData etc from backend upon component load?

  return <SourceView base={base} />;
};

export default SourcePresenter;
