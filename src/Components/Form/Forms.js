import React from 'react';
import auth from '../../services/authService';
import formService from '../../services/formService';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import OneForm from './OneForm';

const CardGrid = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

function Forms(props) {
  const [user, setUser] = React.useState({});
  const [forms, setForms] = React.useState([]);
  const [loadingForms, setLoadingForms] = React.useState(true);

  React.useEffect(() => {
    setUser(auth.getCurrentUser);
  }, []);

  React.useEffect(() => {
    if (props.userId === undefined) {
      console.log("props.userId is undefined");
    } else {
      formService.getForms(props.userId).then(
        (forms2) => {
          // Check if the response is an array; if not, log the unexpected response for debugging
          if (Array.isArray(forms2)) {
            setForms(forms2);
          } else {
            console.error("Expected an array but got:", forms2);
            console.log("Response structure: ", JSON.stringify(forms2, null, 2)); // Log the full structure
            setForms([]);  // Set forms to an empty array to prevent further issues
          }
          setLoadingForms(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
          setLoadingForms(false);
        }
      );
    }
  }, [props.userId]);

  return (
    <div>
      <div>
        <CssBaseline />
        {loadingForms ? <CircularProgress /> : ''}
        <CardGrid maxWidth="lg">
          <Grid container spacing={6}>
            {Array.isArray(forms) && forms.map((form, i) => (
              <OneForm formData={form} key={i} />
            ))}
          </Grid>
        </CardGrid>
      </div>
      <div></div>
    </div>
  );
}

export default Forms;
