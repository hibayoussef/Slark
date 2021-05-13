import type {FC} from 'react';
import {
    Box,
    Grid,
    Pagination,
    Typography
} from '@material-ui/core';
import WorkspaceCard from '../../workspaces/pages/WorkspaceCard';
import {useAuthModule} from "../../authentication/zustand";

const WorkspaceBrowseResults: FC = () => {

    const user = useAuthModule((state) => state.user);


    console.log('user workspace: ', user)

    return (
        <div>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    mb: 2
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
                    {user._workspaces.length}
                    {' '}
                    workspaces
                </Typography>

            </Box>
            <Grid
                container
                spacing={3}
            >
                {user._workspaces.map(workspace => (
                    <Grid
                        item
                        key={workspace.id}
                        md={4}
                        // sm={mode === 'grid' ? 6 : 12}
                        xs={12}
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
                <Pagination count={3}/>
            </Box>
        </div>
    );
};

export default WorkspaceBrowseResults;
