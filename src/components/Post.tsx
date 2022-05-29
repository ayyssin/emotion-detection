import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

interface Props {
  username?: string;
  content: string;
  analysis: string;
}

const PostCard = ({ username, content, analysis }: Props) => {
  return (
    <Card variant="outlined" sx={{ width: 500, my: 4 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {username}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
