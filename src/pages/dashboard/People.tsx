import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Breadcrumbs,
    Container,
    Grid, InputAdornment,
    Link, TextField,
    Typography
} from '@material-ui/core';
import  PeopleList  from '../../components/dashboard/WorkspaceSettings/Settings/PeopleList';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import ChevronRightIcon from '../../icons/ChevronRight';
import SearchIcon from "../../icons/Search";
import ButtonGroup from "../../components/dashboard/WorkspaceSettings/Settings/ButtonGroup";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({

    textField: {
        [`& fieldset`]: {
            borderRadius: 1
        },
        marginLeft: '1.4rem',
        // color: '#d5d6d7',
        // background: '#1e272e',
        fontSize: '14px',
        lineHeight: 1,
        fontWeight: 400
    }
});


const MemberList: FC = () => {
    // const isMountedRef = useIsMountedRef();
    const classes = useStyles();


    return (
        <>
            <Helmet>
                <title>Dashboard: MemberList</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    // py: 8,
                    p:4
                }}
            >
                <Container maxWidth='xl'>
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item>
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                Manage people
                            </Typography>
                            <Breadcrumbs
                                aria-label="breadcrumb"
                                separator={<ChevronRightIcon fontSize="small" />}
                                sx={{ mt: 1 }}
                            >
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="/dashboard"
                                    variant="subtitle2"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="/dashboard/settings-sidebar/oneLineSettings"
                                    variant="subtitle2"
                                >
                                    Settings
                                </Link>

                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Members
                                </Typography>
                            </Breadcrumbs>

                        </Grid>

                        <Grid  container spacing={1} direction="row" style={{ paddingTop: '2rem' }}>

                            <Grid item xs={5}>
                                <TextField
                                    className = { classes.textField }
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small"/>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Search by name or email"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6} style={{paddingLeft: '3rem'}}>
                                <ButtonGroup />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Box sx={{ mt: 3 , p:1}}>
                        <PeopleList /*customers={customers}*/ />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default MemberList;
