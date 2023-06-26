import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RecordPresenter from "./Presenter/RecordPresenter";
import CreateSongPresenter from "./Presenter/CreateSongPresenter";

function App() {
  return (
    <div className="App">
      <CreateSongPresenter />
    </div>
  );
}

export default App;
