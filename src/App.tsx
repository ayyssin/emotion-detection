import React, { useState } from "react";

import { checkText } from "./api";

import InputForm from "./components/Form";
import type { Post, PostAnalysis } from "./types";

function App() {
  const [post, setPost] = useState<Post>();
  const [analysis, setAnalysis] = useState<PostAnalysis>();
  const [status, setStatus] = useState("");

  const handleSubmit = (comment: string) => {
    checkText(comment)
      .then((res: any) => {
        setAnalysis(res.data);
      })
      .finally(() => {
        if (analysis) {
          analysis.attributeScores.TOXICITY.summaryScore.value <= 0.1
            ? setStatus("neutral")
            : analysis!.attributeScores.TOXICITY.summaryScore.value >= 0.5
            ? setStatus("flag")
            : setStatus("warning");
        }
        setPost({
          content: comment,
          analysis: status,
        });
        console.log(post);
      });
  };

  return (
    <div className="App">
      <InputForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
