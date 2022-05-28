import React from "react";
import InputForm from "./components/Form";

import { checkText } from "./api";

function App() {
  const handleSubmit = (comment: string) => {
    console.log(comment);
    checkText(comment);
  };

  return (
    <div className="App">
      <InputForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
