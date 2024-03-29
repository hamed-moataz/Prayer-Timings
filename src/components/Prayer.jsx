import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function Prayer({ name, time, img }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia component="img" alt="green iguana" height="120" image={img} />
      <CardContent>
        <h2>{name}</h2>
        <h1>{time}</h1>
      </CardContent>
    </Card>
  );
}
