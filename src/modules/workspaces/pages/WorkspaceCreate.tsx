import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Link,
    Typography
} from '@material-ui/core';
import  WorkspaceCreateComp from '../../workspaces/components/WorkspaceCreate';
import ArrowLeftIcon from '../../../icons/ArrowLeft';
import ChevronRightIcon from '../../../icons/ChevronRight';

const WorkspaceCreate:FC = () => {


    return (
        <>
            <Helmet>
                <title>Dashboard: Workspace Create</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >
                <Container maxWidth= 'xl' >
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
                                Create a new workspace
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
                                    to="/workspaces"
                                    variant="subtitle2"
                                >
                                    Workspaces
                                </Link>

                            </Breadcrumbs>
                        </Grid>
                        <Grid item>
                            <Box sx={{ m: -1 }}>
                                <Button
                                    color="primary"
                                    component={RouterLink}
                                    startIcon={<ArrowLeftIcon fontSize="small" />}
                                    sx={{ mt: 1 }}
                                    to="/dashboard/products"
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <WorkspaceCreateComp />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default WorkspaceCreate;
