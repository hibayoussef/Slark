import type {FC} from 'react';
import {
    Box,
    Grid,
    Pagination,
    Typography
} from '@material-ui/core';
import SpaceCard from '../../components/dashboard/workspace/Space';
import {useAuthModule} from "../../modules/authentication/zustand";

const WorkspaceBrowseResults: FC = () => {

    const space = useAuthModule((state) => state.user.user._workspaces._spaces);


    console.log('user workspace: ', space)

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
                    {space.length}

                    {' '}
                    Spaces
                </Typography>

            </Box>
            <Grid
                container
                spacing={1}
                md={12}
                xs={12}
                style={{ marginTop:6}}
            >
                {space.map(space => (
                    <Grid
                        item
                        key={space.id}
                        md={3}
                        // sm={mode === 'grid' ? 6 : 12}
                        xs={12}
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
