import React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ViewListIcon from '@mui/icons-material/ViewList';
import Paper from '@mui/material/Paper';
import Hidden from '@mui/material/Hidden';
import CardActionArea from '@mui/material/CardActionArea';

const Icon = styled(ViewListIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledCard = styled(Card)({
  display: 'flex',
});

const CardDetails = styled('div')({
  flex: 1,
});

const CardMediaStyled = styled(CardMedia)({
  width: 160,
});

const HeroContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0, 6),
}));

const HeroButtons = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: '#DAE0E2',
  padding: theme.spacing(2),
  position: 'relative',
  bottom: 0,
  right: 0,
  left: 0,
}));

const MainFeaturedPost = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
  backgroundImage: 'url(https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: 'rgba(0,0,0,.3)',
});

const MainFeaturedPostContent = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6),
    paddingRight: 0,
  },
}));

const Buttons = styled('div')(({ theme }) => ({
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const ButtonGG = styled(Button)({
  backgroundColor: 'teal',
});

const Root = styled('div')({
  flexGrow: 1,
});

const MenuButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)({
  flexGrow: 1,
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://www.stillthristy.in/">
        Rohit Saini
      </Link>
      {' © '}
      <Link color="inherit" href="https://github.com/rohitsaini1196">
        GitHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  function loginClick() {
    navigate('/login');
  }

  return (
    <div>
      <CssBaseline />
      <div style={{ display: 'flex', flexGrow: 1, textAlign: 'start' }}>
        <AppBar position="relative" style={{ backgroundColor: 'teal' }}>
          <Toolbar>
            <Icon />
            <Title variant="h6" color="inherit" noWrap>
              Velocity Forms
            </Title>
            <Button color="inherit" onClick={loginClick}>Login</Button>
          </Toolbar>
        </AppBar>
      </div>

      <main style={{ textAlign: 'start' }}>
        <div>
          <Container>
            <br /><br /><br />
            <MainFeaturedPost>
              {<img style={{ display: 'none' }} src="https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="gg" />}
              <Overlay />
              <Grid container>
                <Grid item md={6}>
                  <MainFeaturedPostContent>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                      Velocity Forms
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      Plan your next camping trip, manage event registrations, whip up a quick poll, create a pop quiz, and much more.
                    </Typography>
                    <Buttons>
                      <ButtonGG variant="contained" color="primary" onClick={loginClick}>
                        Signup Now
                      </ButtonGG>
                      <ButtonGG variant="contained" color="primary" onClick={loginClick}>
                        Login
                      </ButtonGG>
                    </Buttons>
                  </MainFeaturedPostContent>
                </Grid>
              </Grid>
            </MainFeaturedPost>
            <br /><br /><br />

            <div>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <CardActionArea component="a" href="/">
                    <StyledCard>
                      <CardDetails>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            Survey with style
                          </Typography>
                          <Typography variant="subtitle1" style={{ color: 'teal' }}>
                            Style
                          </Typography>
                          <Typography variant="subtitle1" paragraph>
                            Use your own photo or logo, and Forms will pick just the right colors to complete your own unique form, or choose from a set of curated themes to set the tone. We can store images for future.
                          </Typography>
                        </CardContent>
                      </CardDetails>
                      <Hidden xsDown>
                        <CardMediaStyled image="https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" title="" />
                      </Hidden>
                    </StyledCard>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardActionArea component="a" href="/">
                    <StyledCard>
                      <CardDetails>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            Organized & analyzed
                          </Typography>
                          <Typography variant="subtitle1" style={{ color: 'teal' }}>
                            organize
                          </Typography>
                          <Typography variant="subtitle1" paragraph>
                            Responses to your surveys are neatly and automatically collected in Forms, with real time response info and charts. Or, download a csv/json or load data in google sheets.
                          </Typography>
                        </CardContent>
                      </CardDetails>
                      <Hidden xsDown>
                        <CardMediaStyled image="https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" title="" />
                      </Hidden>
                    </StyledCard>
                  </CardActionArea>
                </Grid>
              </Grid>
            </div>
          </Container>

          <br /><br /><br /><br />
        </div>
      </main>

      <Footer>
        <Typography variant="h6" align="center" gutterBottom>
          Velocity Forms <small>(An Open source clone of google forms)</small>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          No Copyright issue. This project is <Link color="inherit" href="https://github.com/rohitsaini1196/google-forms">open source</Link>{'. '}
          Feel free to use anything that you find helpful, Give credit if you want.
        </Typography>
        <Copyright />
      </Footer>
    </div>
  );
}

var gg = `
<Typography variant="h5" align="center" color="textSecondary" paragraph>
  Plan your next camping trip, manage event registrations, whip up a quick poll, create a pop quiz, and much more.

  Fast and easy solution for collecting data, conducting quizzes, getting something reviewed within seconds. With user-friendly interface and smart features you can even conduct exams.
</Typography>
`;