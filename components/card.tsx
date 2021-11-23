import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function BasicCard(props: any) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          { props.title }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        { props.subtitle }
        </Typography>
        <Typography variant="body2">
          { props.content }
        </Typography>
      </CardContent>
    </Card>
  );
}