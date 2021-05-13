import type {FC} from 'react';
import {
    Box,
    Grid,
    Pagination,
    Typography
} from '@material-ui/core';
import WorkspaceCard from '../../components/dashboard/workspace/WorkspaceCard';
import {useAuthModule} from "../../modules/authentication/zustand";

const WorkspaceBrowseResults: FC = () => {

    const workspace = useAuthModule((state) => state.user.user._workspaces);


    console.log('user workspace: ', workspace)

    return (
        <div>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
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
            >
                {workspace.map(workspace => (
                    <Grid
                        item
                        key={workspace.id}
                        md={3}
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
                <Pagination count={4}/>
            </Box>
        </div>
    );
};

export default WorkspaceBrowseResults;
