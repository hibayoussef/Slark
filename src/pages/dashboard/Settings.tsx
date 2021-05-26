import type {FC} from 'react';
import {Helmet} from 'react-helmet-async';
import {
    Box, Container, Grid, Typography
} from '@material-ui/core';
import WorkspaceSettingsCom from "../../components/dashboard/WorkspaceSettings/Settings/Settings";


const Settings: FC = () => {

    console.log('Hi')
    return (
        <>
            <Helmet>
                <title>Dashboard: Settings</title>
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
                                Workspace Settings
                            </Typography>

                        </Grid>
                    </Grid>


                            <Box sx={{p: 4}}>
                                <WorkspaceSettingsCom/>
                            </Box>

                </Container>
            </Box>
        </>
    );
};

export default Settings;
