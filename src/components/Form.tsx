import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { checkText } from "../api";
import { Post } from "../types";
import PostCard from "./Post";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 1,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const InputForm = () => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  const [post, setPost] = useState<Post>();
  const [sentPost, setSentPost] = useState<Post>();
  const [feed, setFeed] = useState<Post[]>([]);

  const handleCheck = async (comment: string) => {
    const analysis = await checkText(comment);

    if (analysis!!) {
      analysis.attributeScores.TOXICITY.summaryScore.value <= 0.1
        ? setPost({ content: comment, analysis: "neutral" })
        : analysis!.attributeScores.TOXICITY.summaryScore.value >= 0.5
        ? setPost({ content: comment, analysis: "flag" })
        : setPost({ content: comment, analysis: "warning" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const username = data.get("username")?.toString();
    const text = data.get("text")?.toString();

    if (username!! && text!!) {
      handleCheck(text);

      //loader
      const submittedPost: Post = {
        username: username,
        content: text,
        analysis: post!.analysis,
      };

      setSentPost(submittedPost);

      setFeed([...feed, submittedPost]);

      setUsername("");
      setComment("");
    }
  };

  return (
    <div>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              Wonder Women
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button color="inherit" sx={{ ml: 1 }}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "primary", mt: 3 }}>
            Привет! Напиши свой первый пост :)
          </Typography>
          <TextField
            name="username"
            label="Имя пользователя"
            sx={{ mt: 4, mb: 2, width: 500 }}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
            value={username}
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
              comment !== ""
                ? post?.analysis === "warning"
                  ? "secondary"
                  : post?.analysis === "flag"
                  ? "error"
                  : "primary"
                : "primary"
            }
            required
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {comment !== "" && post?.analysis === "warning" ? (
            <Box sx={{ mx: 2 }}>
              <Tooltip title="Ваш текст может ранить чьи-то чувства, попробуйте перефразировать">
                <img
                  src={require("../icons/warning.png")}
                  width={50}
                  height={50}
                />
              </Tooltip>
            </Box>
          ) : post?.analysis === "flag" ? (
            <Box sx={{ mx: 2 }}>
              <Tooltip title="Ваш тон выглядит оскорбительно, настоятельно рекомендуем избегать данных высказываний.">
                <img
                  src={require("../icons/flag.jpg")}
                  width={50}
                  height={50}
                />
              </Tooltip>
            </Box>
          ) : (
            <></>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor:
                comment !== ""
                  ? post?.analysis === "warning"
                    ? "#7534FE"
                    : post?.analysis === "flag"
                    ? "red"
                    : "primary"
                  : "#D3BCE2",
            }}
          >
            Отправить пост
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {feed.map((obj: Post) => {
            return (
              <PostCard
                username={obj.username!}
                content={obj.content}
                analysis={obj.analysis}
              />
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default InputForm;
