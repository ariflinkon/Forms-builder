import React from 'react';
import auth from '../services/authService';
import formService from '../services/formService';

import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import Forms from './Form/Forms';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Styled components using MUI styled API
const Grow = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SectionDesktop = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

function Dashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [formTitle, setFormTitle] = React.useState('');
  const [formDescription, setFormDescription] = React.useState('');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    const logoutConfirmation = window.confirm('Really want to logout?');
    if (logoutConfirmation) {
      auth.logout();
      navigate('/login');
    }
  };

  const cancelAddForm = () => {
    handleClose();
    setFormTitle('');
    setFormDescription('');
  };

  const createForm = () => {
    if (!user || !user.id) {
      console.error('User is not logged in');
      return;
    }

    const data = {
      name: formTitle,
      description: formDescription,
      createdBy: user.id,
    };

    if (data.name !== '') {
      formService.createForm(data).then(
        (result) => {
          navigate(`/form/${result._id}`);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleClickOpen}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <AddIcon />
        </IconButton>
        <p>Create</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="account of current user" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Grow>
      <AppBar position="static" style={{ backgroundColor: 'teal' }}>
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="open drawer">
            <HomeIcon />
          </MenuButton>

          <Title variant="h6" noWrap>
            Velocity Forms
          </Title>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Grow />
          <SectionDesktop>
            <IconButton aria-label="Create new form" color="inherit" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>

            <IconButton edge="end" aria-label="account of current user" color="inherit" onClick={logout}>
              <AccountCircle />
            </IconButton>
          </SectionDesktop>

          <SectionMobile>
            <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </SectionMobile>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Creating a new empty form, just add form name and description if you want.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Form Name"
              type="text"
              fullWidth={false}
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Form description"
              type="text"
              fullWidth
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelAddForm} color="primary">
              Cancel
            </Button>
            <Button onClick={createForm} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <div style={{ marginTop: '10px' }}>
          <Forms userId={user ? user.id : ''} />
        </div>
      </div>
    </Grow>
  );
}

export default Dashboard;
