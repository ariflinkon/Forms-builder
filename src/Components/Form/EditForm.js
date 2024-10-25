import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Paper, Typography, Tabs, Tab, Box, AppBar, Toolbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ViewListIcon from '@mui/icons-material/ViewList';

import QuestionsTab from './QuestionsTab';
import ResponseTab from '../Response/ResponseTab';
import formService from '../../services/formService';
import auth from '../../services/authService';
import { useParams } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      minHeight: 128,
      alignItems: 'flex-start',
      paddingTop: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      alignSelf: 'flex-end',
      justifySelf: 'center'
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      display: 'flex',
      alignContent: 'space-between',
      alignItems: 'center'
  }
}));

function EditForm() {
  const classes = useStyles();
  const { formId } = useParams(); // Use useParams to get formId
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [formID, setFormID] = React.useState("");
  const [formDeatils, setFormDetails] = React.useState({});
  const [openOfAlert, setOpenOfAlert] = React.useState(false);

  React.useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  React.useEffect(() => {
    if (formId) {
      setFormID(formId);
      formService.getForm(formId)
        .then((data) => {
          setFormDetails(data);
        })
        .catch((error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        });
    }
  }, [formId]);

  const clipToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + "/s/" + formDeatils._id);
    handleClickOfAlert();
    handleClose();
  };

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenOfAlert(false);
  };

  const sendForm = () => {
    handleClickOpen();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {formDeatils.createdBy === user.id ? (
        <div>
          <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: 'white' }} elevation={2}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  aria-label="Rohit Saini's form"
                  style={{ color: '#140078' }}
                >
                  <ViewListIcon />
                </IconButton>
                <Typography variant="h6" noWrap style={{ marginTop: '8.5px', color: 'black' }}>
                  {formDeatils.name}
                </Typography>

                <IconButton aria-label="Rohit Saini's form">
                  <StarBorderIcon />
                </IconButton>

                <Tabs
                  className={classes.title}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Questions" />
                  <Tab label="Responses" />
                </Tabs>
                <IconButton aria-label="search" onClick={sendForm}>
                  <SendIcon />
                </IconButton>

                <IconButton aria-label="search">
                  <PaletteIcon />
                </IconButton>
                <IconButton aria-label="search">
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="search">
                  <SettingsIcon />
                </IconButton>

                <IconButton aria-label="display more actions" edge="end">
                  <MoreIcon />
                </IconButton>
                <IconButton aria-label="display more actions" edge="end">
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Copy and share link."}</DialogTitle>
              <DialogContent>
                <Paper className={classes.paper}>
                  <Grid container alignContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="body1">{window.location.origin + "/s/" + formDeatils._id}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton className={classes.button} aria-label="Add" size="medium" onClick={clipToClipboard}>
                        <FilterNoneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>

                <DialogContentText id="alert-dialog-description">
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={openOfAlert}
              autoHideDuration={3000}
              onClose={handleCloseOfAlert}
              message="Copied to clipboard"
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseOfAlert}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>

          <div>
            <TabPanel value={value} index={0}>
              <QuestionsTab formData={formDeatils} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponseTab formData={formDeatils} formId={formID} />
            </TabPanel>
          </div>
        </div>
      ) : (
        <p>you're not the owner of the form</p>
      )}
    </div>
  );
}

export default EditForm;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};