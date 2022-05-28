import React from "react";
import InputForm from "./components/Form";

import axios from "axios";

function App() {
  const handleSubmit = (comment: string) => {
    console.log(comment);
    // This is where we will add our
    // Perspective API call later on!
  };
  return (
    <div className="App">
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
