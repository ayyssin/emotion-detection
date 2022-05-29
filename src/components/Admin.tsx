import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Post } from "../types";
import AdminPost from "./AdminPost";
import MenuIcon from "@mui/icons-material/Menu";

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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#D3BCE2" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wonder Admin
            </Typography>
            <Button color="inherit">Log out</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          pt: 2,
        }}
      >
        <Typography variant="h4" sx={{ ml: 3, my: 2 }}>
          All posts
        </Typography>
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
    </>
  );
};

export default Admin;
