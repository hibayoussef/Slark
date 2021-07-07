import type {FC} from 'react';
import {Helmet} from 'react-helmet-async';
import {
    Box, Container, Grid, Typography
} from '@material-ui/core';
import WorkspaceSettingsCom from "../../components/dashboard/WorkspaceSettings/Settings/Settings";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useWorkspaceModule} from "../../components/dashboard/workspace/zustand";
import {useEffect} from "react";
//import {useRouteMatch} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        text: {
            [theme.breakpoints.down('sm')]: {
                color: '#d5d6d7',
                fontWeight: 400,
                fontSize: '0.9rem'
            },
            [theme.breakpoints.between('sm', 'md')]: {
                color: '#d5d6d7',
                fontWeight: 400,
                fontSize: '1rem'
            },
            [theme.breakpoints.between('md', 'lg')]: {
                color: '#d5d6d7',
                fontWeight: 400,
                fontSize: '1.3rem'
            },
            [theme.breakpoints.between('lg', 'xl')]: {
                color: '#d5d6d7',
                fontWeight: 500,
                fontSize: '1.7rem'
            }
        }
    }),
);


const Settings: FC = () => {
//    let match=useRouteMatch();
//    console.log(match);
    const selectedWorkspace = useWorkspaceModule(state => state.selectedWorkspace)
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
                    py: 2
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
                                className={classes.text}
                            >
                                Workspace Settings
                                {/*Edit Space*/}
                            </Typography>

                        </Grid>
                    </Grid>


                    <Box sx={{p: 4}}>
                        <WorkspaceSettingsCom workspace={selectedWorkspace}/>
                    </Box>

                </Container>
            </Box>
        </>
    );
};

export default Settings;
