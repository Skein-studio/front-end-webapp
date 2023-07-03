import React, { useRef } from "react";
import styled from "styled-components";
import { OuterBox, Text, Button, InnerBox } from "../Util/BaseStyles";

interface RecordViewProps {
  onFileChange: (file: File | null) => void;
}

export default function RecordView({ onFileChange }: RecordViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    onFileChange(file);
  }

  return (
    <InnerBox>
      <Text>Record or upload a sound</Text>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button onClick={handleButtonClick}>🎶</Button>
    </InnerBox>
  );
}
