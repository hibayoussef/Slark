import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Link,
    Typography
} from '@material-ui/core';
import  WorkspaceFinishAllComp from '../../components/dashboard/workspace/WorkspaceFinishAll';
import ChevronRightIcon from '../../icons/ChevronRight';

const WorkspaceFinishAll: FC = () => {

    // useEffect(() => {
    //     gtm.push({ event: 'page_view' });
    // }, []);

    return (
        <>
            <Helmet>
                <title>Dashboard: Create Workspace</title>
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
                                Create Workspace
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
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                >
                                    Workspaces
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <WorkspaceFinishAllComp />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default WorkspaceFinishAll;
