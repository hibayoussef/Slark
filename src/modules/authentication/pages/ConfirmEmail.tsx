import {FC} from "react";
import { Helmet } from 'react-helmet-async';
import {
    Card,
    CardContent,
    Button,
    Typography, Box, Container, Divider
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import {useAuthModule} from "../zustand";

const ConfirmEmail: FC = () => {
    // const userEmail = useAuthModule((state) => state.user);
    // console.log("confirm email 1: ", userEmail);
    //
    // const user = useAuthModule((state) => state.user);
    // const confirmEmail = useAuthModule(
    //     (state) => state.confirmEmail
    // );

    // const onClickEmail = ()=>{
    //     confirmEmail(user);
    //     console.log('here is the user: ', user)
    // };


    console.log('hI')
    return(
        <>
            <Helmet>
                <title>Confirm Email</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    minWidth: 275,
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
                                    <Button variant="outlined" style = {{  marginLeft: "13rem" }}>
                                        <EmailIcon fontSize="large" style={{ color:'#0D47A1' }}/>
                                    </Button>


                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                        style={{ textAlign:"center" , paddingLeft: "8rem" , paddingTop: "2rem"}}
                                    >
                                        <h4 style={{ minWidth:254}}>Please Verify email</h4>
                                    </Typography>

                                </div>


                            </Box>
                            <Divider sx={{ my: 0 }} />
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    mt: 3
                                }}
                            >
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h4"
                                    style={{ fontSize: "1.3rem" , paddingTop:"1rem"}}
                                >
                                    We sent you an email to verify the email. Please check the email
                                    to activate your account.

                                </Typography>

                                <Typography style={{ paddingTop:"3rem" }}>
                                    If you do not receive any message on your email, press the
                                    button to resend the message again.
                                </Typography>

                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    style={{
                                        marginTop: "1rem",
                                        maxHeight: "3.4rem",
                                        minHeight: "3.4rem",
                                        marginBottom: "2.6rem",
                                        fontSize: "1rem"
                                    }}
                                    // onClick={onClickEmail}
                                    color="primary"
                                    // disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Resend Activation Link
                                </Button>

                            </Box>

                            {/*<Divider sx={{ my: 3 }} />*/}
                            {/*<Link*/}
                            {/*    color="textSecondary"*/}
                            {/*    component={RouterLink}*/}
                            {/*    to="/authentication/signupfinal"*/}
                            {/*    variant="body2"*/}
                            {/*>*/}
                            {/*    Didn't receive a message? Resend Activate Link*/}
                            {/*</Link>*/}

                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

export default ConfirmEmail;