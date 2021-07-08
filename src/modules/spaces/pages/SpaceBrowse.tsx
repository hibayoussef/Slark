import type {FC} from 'react';
import {
    Box,
    Grid,
    Pagination,
    Typography
} from '@material-ui/core';
import SpaceCard from '../components/Space';
import {useAuthModule} from "../../../modules/authentication/zustand";
import {useSpaceModule} from "../zustand";
import {useEffect, useState} from "react";
import {useWorkspaceModule} from "../../workspaces/zustand";

const WorkspaceBrowseResults: FC = () => {

    const {getAllSpaces, addSpaceToState} = useSpaceModule((state) => state);
    const selectedWorkspace = useWorkspaceModule(state => state.selectedWorkspace);
    const spaces = useSpaceModule(state => state.spaces);
    useEffect(() => {
        getAllSpaces(selectedWorkspace['_id'])
    }, [])
    return (
        <div>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    color="textPrimary"
                    sx={{
                        position: 'relative',
                        '&:after': {
                            backgroundColor: 'primary.main',
                            bottom: '-8px',
                            content: '" "',
                            height: '3px',
                            left: 0,
                            position: 'absolute',
                            width: '48px'
                        }
                    }}
                    variant="h5"
                >
                    Showing
                    {' '}
                    {spaces && spaces.length}
                    {' '}
                    Spaces
                </Typography>

            </Box>
            <Grid
                container
                spacing={1}

                style={{ marginTop:6 }}
            >
                {spaces && spaces.map(space => (
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xs={12}
                        key={space.id}
                    >
                        <SpaceCard space={space}/>
                    </Grid>
                ))}
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 6
                }}
            >
                <Pagination count={4}/>
            </Box>
        </div>
    );
};

export default WorkspaceBrowseResults;
