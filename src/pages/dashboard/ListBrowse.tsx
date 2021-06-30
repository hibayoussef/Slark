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
import ChevronRightIcon from '../../icons/ChevronRight';
import {useAuthModule} from "../../modules/authentication/zustand";


const SpaceComponent:FC = () => {

    const space = useAuthModule((state) => state.user)


    console.log('user workspace: ', space)

    return (
        <>
            <Helmet>
                <title>Dashboard: Space Component</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    mt: 3,
                    pt: 3,
                    pl: 4,
                    pr: 5
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
                                See Spaces
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
                                    Spaces
                                </Link>
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="/lists"
                                    variant="subtitle2"
                                >
                                    Lists
                                </Link>

                            </Breadcrumbs>
                        </Grid>
                        <Grid item>

                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3  }}>

                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default SpaceComponent;
