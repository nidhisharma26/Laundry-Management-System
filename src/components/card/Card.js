import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

export default function MediaCard({ head, body, image }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{ border: "1px solid #000", zIndex: "1", cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        height="190"
        image={image}
        alt={head}
        style={{ backgroundSize: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {head}
        </Typography>
        <hr />
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open</Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
