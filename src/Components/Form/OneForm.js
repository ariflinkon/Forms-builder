import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Moment from 'react-moment';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
}));

const StyledCardMedia = styled(CardMedia)({
  height: 140,
});

export default function OneForm(props) {
  const [form, setForm] = React.useState({});

  React.useEffect(() => {
    setForm(props.formData);
  }, [props.formData]);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <StyledCard>
        <CardActionArea href={`/form/${form._id}`}>
          <StyledCardMedia
            image="https://static.makeuseof.com/wp-content/uploads/2019/06/AutoGradingQuizResults-GoogleForms.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {form.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {form.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Opened: <Moment fromNow>{form.updatedAt}</Moment>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </StyledCard>
    </Grid>
  );
}