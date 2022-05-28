import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { checkText } from "../api";
import { Post, PostAnalysis } from "../types";

export const InputForm = () => {
  const [comment, setComment] = useState("");

  const [post, setPost] = useState<Post>();

  const handleCheck = async (comment: string) => {
    const analysis = await checkText(comment);

    if (analysis!!) {
      analysis.attributeScores.TOXICITY.summaryScore.value <= 0.1
        ? setPost({ content: comment, analysis: "neutral" })
        : analysis!.attributeScores.TOXICITY.summaryScore.value >= 0.5
        ? setPost({ content: comment, analysis: "flag" })
        : setPost({ content: comment, analysis: "warning" });

      console.log(post);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //get post variable and send it to DB

    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const username = data.get("username")?.toString();

    const temp = post;

    setPost({
      username: username,
      content: temp!.content,
      analysis: temp!.analysis,
    });

    console.log("submit", post);
  };
  return (
    <div>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "primary" }}>
            Emotion Detection Algorithm
          </Typography>
          <TextField
            name="username"
            label="Имя пользователя"
            sx={{ my: 2, width: 500 }}
          />

          <TextField
            name="text"
            label="Текст"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setComment(e.target.value);
              if (
                comment.charAt(comment.length - 1) === " " ||
                comment.charAt(comment.length - 1) === "." ||
                comment.charAt(comment.length - 1) === "?" ||
                comment.charAt(comment.length - 1) === "!"
              ) {
                handleCheck(comment);
              }
            }}
            value={comment}
            multiline
            sx={{ my: 2, width: 500 }}
            rows={5}
            color={
              post?.analysis === "warning"
                ? "secondary"
                : post?.analysis === "flag"
                ? "error"
                : "primary"
            }
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            mr: 14,
          }}
        >
          {post?.analysis === "warning" ? (
            <>
              <Tooltip title="Ваш текст может ранить чьи-то чувства, попробуйте перефразировать">
                <img
                  src={require("../icons/warning.png")}
                  width={40}
                  height={40}
                />
              </Tooltip>
            </>
          ) : post?.analysis === "flag" ? (
            <>
              <Tooltip title="Ваш тон выглядит оскорбительно, настоятельно рекомендуем избегать данных высказываний.">
                <img
                  src={require("../icons/flag.jpg")}
                  width={40}
                  height={40}
                />
              </Tooltip>
            </>
          ) : (
            <></>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor:
                post?.analysis === "warning"
                  ? "#7534FE"
                  : post?.analysis === "flag"
                  ? "red"
                  : "primary",
              mx: 1,
            }}
          >
            Пост
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default InputForm;
