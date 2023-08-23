//SourcePresenter.tsx
import React, { useState, useContext, useEffect } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";
import { SourceType } from "@/app/Util/modelTransformation";

function SourcePresenter () {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const [base, setBase] = useState<string>(
    (node?.model.Data as SourceType).base ?? ""
  );

  //useEffect to load audioData etc from backend upon component load?

  return <SourceView base={base} />;
};

export default SourcePresenter;
