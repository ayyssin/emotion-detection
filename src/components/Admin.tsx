import { Box, Typography } from "@mui/material";
import React from "react";
import { Post } from "../types";
import AdminPost from "./AdminPost";

const meta: Post[] = [
  {
    username: "anne",
    content: "you bitch",
    analysis: "flag",
  },
  {
    username: "ben",
    content: "you are beautiful",
    analysis: "neutral",
  },
  {
    username: "janne",
    content: "you are dumb",
    analysis: "flag",
  },
  {
    username: "ben",
    content: "bye",
    analysis: "neutral",
  },
  {
    username: "janne",
    content: "dumbsa",
    analysis: "flag",
  },
];

const Admin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Emotion Detection Admin Panel</Typography>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
          mt: 5,
        }}
      >
        {meta.map((obj: Post) => {
          return (
            <AdminPost
              username={obj.username}
              content={obj.content}
              analysis={obj.analysis}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Admin;
