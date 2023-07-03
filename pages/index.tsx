import React from 'react';
import ReactFlow from 'reactflow';
import CreateSongPresenter from "@/app/Presenter/CreateSongPresenter"
import 'reactflow/dist/style.css';
import { InnerBox, OuterBox } from '@/app/Util/BaseStyles';
import Flow from '@/app/Util/Flow';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  return (
    <OuterBox>
      <InnerBox>
        <Flow></Flow>
      </InnerBox>
      <InnerBox>
        <CreateSongPresenter></CreateSongPresenter>
        </InnerBox>
    </OuterBox>
  );
}



