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
import ChevronRightIcon from '../../../icons/ChevronRight';
import PlusIcon from '../../../icons/Plus';
import WorkspaceBrowseResults from "./WorkspaceBrowse";
import WorkspaceBrowseFilter from '../components/WorkspaceFilter'
import {useAuthModule} from "../../authentication/zustand";

const WorkspaceBrowseHeader: FC = () => {
    const workspaces = useAuthModule((state) => state.user);
    console.log('user workspace: ', workspaces)


    return (
        <>
            <Helmet>
                <title>Dashboard: Workspace Browse</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    // py: 8
                    pl:4,
                    pr:3
                }}
            >
                <Container  maxWidth={ 'xl' }>
                    <Grid
                        alignItems="center"
                        container
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Grid item>
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                See WorkSpaces
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
                                    to="/dashboard/workspaces"
                                    variant="subtitle2"
                                >
                                    Workspaces
                                </Link>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Browse
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item>
                            <Box sx={{ m: -1 }}>
                                <Button
                                    color="primary"
                                    component={RouterLink}
                                    startIcon={<PlusIcon fontSize="small" />}
                                    sx={{ m: 1 }}
                                    to="/dashboard/workspaces/new"
                                    variant="contained"
                                >
                                    New Workspace
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <WorkspaceBrowseFilter />
                    </Box>
                    <Box sx={{ mt: 6 }}>
                        <WorkspaceBrowseResults />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default WorkspaceBrowseHeader;
