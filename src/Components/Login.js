import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Button, CssBaseline, Toolbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';

import GoogleButton from 'react-google-button';
import authService from '../services/authService';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;


const StyledAppBar = styled(AppBar)({
    backgroundColor: 'teal',
});

const StyledMain = styled('main')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogined, setIsLogined] = useState(false);
    const { from } = location.state || { from: { pathname: '/' } };

    useEffect(() => {
        setIsLogined(authService.isAuthenticated());
    }, []);

    const loginGoogle = (response) => {
        authService.loginWithGoogle(response)
            .then(() => {
                navigate(from.pathname === '/login' ? '/' : from.pathname);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.error(resMessage);
            });
    };

    const loginAsGuest = () => {
        authService.loginAsGuest();
        navigate(from.pathname);
    };

    const handleLoginFailure = () => {
        console.error('Failed to log in');
    };

    const logout = () => {
        authService.logout();
        setIsLogined(false);
    };

    return (
        <div>
            <CssBaseline />
            <StyledAppBar position="relative">
                <StyledToolbar>
                    <ViewListIcon onClick={() => navigate('/')} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Velocity Forms
                    </Typography>
                </StyledToolbar>
            </StyledAppBar>
            <br />
            <StyledMain>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <br />
                <br />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {!isLogined ? (
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            onSuccess={loginGoogle}
                            onFailure={handleLoginFailure}
                            render={(renderProps) => (
                                <GoogleButton
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    style={{ alignSelf: 'center' }}
                                />
                            )}
                        />
                    ) : (
                        <div>
                            <p>Already logged in. Want to logout?</p>
                            <Button onClick={logout} variant="contained" color="primary">
                                Logout
                            </Button>
                        </div>
                    )}
                    <br />
                    <br />
                    {!isLogined && (
                        <Button
                            onClick={loginAsGuest}
                            variant="contained"
                            startIcon={<Avatar src="https://static.thenounproject.com/png/3244607-200.png" />}
                            style={{ textTransform: 'none' }}
                        >
                            Login as Guest (Anonymous)
                        </Button>
                    )}
                </div>
            </StyledMain>
        </div>
    );
}

export default Login;
