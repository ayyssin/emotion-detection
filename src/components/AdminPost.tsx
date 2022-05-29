import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

interface Props {
  username?: string;
  content: string;
  analysis: string;
}

const AdminPost = ({ username, content, analysis }: Props) => {
  const color =
    analysis === "flag" ? "red" : analysis === "warning" ? "#7534FE" : "black";
  return (
    <Card
      variant="outlined"
      sx={{ width: 250, mx: 5, my: 2, border: "2px solid " + color }}
    >
      {analysis === "flag" && (
        <CardMedia
          component="img"
          image={require("../icons/flag.jpg")}
          alt="flag"
          sx={{
            width: 30,
            height: 30,
          }}
        />
      )}
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {username}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {content}
        </Typography>
      </CardContent>
      {analysis === "flag" && (
        <CardActions sx={{ display: "flex", justifyContent: "right" }}>
          <Button size="small" sx={{ color: "red" }}>
            report
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default AdminPost;
