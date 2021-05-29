import type {FC} from 'react';
import {Helmet} from 'react-helmet-async';
import {
    Box, Container, Grid, Typography
} from '@material-ui/core';
import WorkspaceSettingsCom from "../../components/dashboard/WorkspaceSettings/Settings/Settings";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    text:{
        [theme.breakpoints.down('sm')]: {
            color: '#d5d6d7',
            fontWeight:500,
            fontSize: '1rem'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            color: '#d5d6d7',
            fontWeight:500,
            fontSize: '2rem'
        },
        [theme.breakpoints.between('md', 'lg')]: {
            color: '#d5d6d7',
            fontWeight:500,
            fontSize: '2.6rem'
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            color: '#d5d6d7',
            fontWeight:500,
            fontSize: '2rem'
        }
    }
    }),
);


const Settings: FC = () => {

    const classes = useStyles();

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
                                // variant="h4"
                                className={ classes.text }
                            >
                                {/*Workspace Settings*/}
                                Edit Workspace
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
