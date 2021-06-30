import type {FC} from 'react';
import {
    Box,
    Grid,
    Pagination,
    Typography
} from '@material-ui/core';
import WorkspaceCard from '../../components/dashboard/workspace/WorkspaceCard';
import {useAuthModule} from "../../modules/authentication/zustand";
import {useEffect, useState} from "react";


const WorkspaceBrowseResults: FC = () => {

    const workspace = useAuthModule((state) => state.user.user._workspaces);
    const [mode, setMode] = useState<string>('grid');

    console.log('user workspace: ', workspace)

    // useEffect(() => {
    //     workspace
    // }, [workspace]);

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
                    {workspace.length}

                    {' '}
                    workspaces
                </Typography>

            </Box>
            <Grid
                container
                spacing={1}
                md={12}
                xs={12}
                style={{ marginTop:6}}
            >
                {workspace.map(workspace => (
                    <Grid
                        item
                        key={workspace.id}
                        xs={mode === 'grid' ? 10 : 12}
                        sm={mode === 'grid' ? 6 : 12}
                        md={mode === 'grid' ? 4 : 12}
                        lg={mode === 'grid' ? 3 : 12}
                        // xs={12}
                    >
                        <WorkspaceCard workspace={workspace}/>
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