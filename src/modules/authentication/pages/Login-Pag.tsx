import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Link,
    Typography
} from '@material-ui/core';
import LoginCom from '../components/login/Login-Com';
import Logo from '../../../components/Logo';
import {useAuthModule} from "../zustand";

const Login: FC = () => {

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}
            >

                <Container
                    maxWidth="sm"
                    sx={{ py: '80px' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 8
                        }}
                    >
                        <RouterLink to="/">
                            <Logo
                                sx={{
                                    height: 40,
                                    width: 40
                                }}
                            />
                        </RouterLink>
                    </Box>
                    <Card>
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                p: 4
                            }}
                        >
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 3
                                }}
                            >
                                <div>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                        style={{ fontSize: "2.6rem" ,textAlign:"center" , paddingLeft: "5.8rem" , paddingTop: "2.6rem"}}
                                    >
                                        Welcome back!
                                    </Typography>

                                </div>

                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    mt: 2
                                }}
                            >
                                { <LoginCom />}
                            </Box>
                            <Divider sx={{ my: 3 }} />
                            <Link
                                color="textSecondary"
                                component={RouterLink}
                                to="/authentication/signupfinal"
                                variant="body2"
                            >
                                Create new account
                            </Link>
                                <Link
                                    color="textSecondary"
                                    component={RouterLink}
                                    sx={{ mt: 1 }}
                                    to="/authentication/password-recovery"
                                    variant="body2"
                                >
                                    Forgot password
                                </Link>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );


}

export default Login