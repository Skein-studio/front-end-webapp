// RecordPresenter.tsx
import React from "react";
import RecordView from "../View/RecordView";

interface RecordPresenterProps {
  onFileChange: (file: File | null) => void;
}

export default function RecordPresenter({
  onFileChange,
}: RecordPresenterProps) {
  return <RecordView onFileChange={onFileChange} />;
}
