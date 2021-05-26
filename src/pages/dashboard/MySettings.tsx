import type {FC} from 'react';
import {Helmet} from 'react-helmet-async';
import {
    Box, Container, Grid, Typography
} from '@material-ui/core';
import MySettingsCom from "../../components/dashboard/MySettings/my-settings";


const MySettings: FC = () => {

    console.log('Hi')
    return (
        <>
            <Helmet>
                <title>Dashboard:My Settings</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >
                <Container maxWidth='xl'>
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item style={{paddingLeft: '3rem'}}>
                            <Typography
                                color="textPrimary"
                                // variant="h4"
                                style={{ color: '#d5d6d7', fontWeight:600, fontSize: '2rem'}}
                            >
                                My Settings
                            </Typography>

                        </Grid>
                    </Grid>


                    <Box sx={{p: 4}}>
                        <MySettingsCom/>
                    </Box>

                </Container>
            </Box>
        </>
    );
};

export default MySettings;
