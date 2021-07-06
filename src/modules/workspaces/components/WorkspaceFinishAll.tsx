import type {FC} from 'react';
import {
    Box,
    Card,
    CardContent,
    Avatar,
    Grid,
    Container,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import {useNavigate} from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';

const WorkspaceFinishAll: FC = () => {

    const isMountedRef = useIsMountedRef();

    const navigation = useNavigate();


    const onBack = () => {
        console.log('Create')
        navigation('/dashboard/workspaces/upload');
    }


    return (


        <form>
            <Card>
                <CardContent>

                            <Box
                                sx={{
                                    maxWidth: 450,
                                    mx: 'auto'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            backgroundColor: 'primary.main',
                                            color: 'primary.contrastText'
                                        }}
                                    >
                                        <StarIcon fontSize="small"/>
                                    </Avatar>
                                </Box>
                                <Box sx={{mt: 2}}>
                                    <Typography
                                        align="center"
                                        color="textPrimary"
                                        variant="h3"
                                    >
                                        You are all done!
                                    </Typography>
                                </Box>
                                <Box sx={{mt: 2}}>
                                    <Typography
                                        align="center"
                                        color="textSecondary"
                                        variant="subtitle1"
                                    >
                                        That's it. Now go and change the world!
                                        And don't forget to have fun.
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 2
                                    }}
                                >
                                    <Button
                                        color="primary"
                                        component={RouterLink}
                                        to="/dashboard/workspaces/1"
                                        variant="contained"
                                    >
                                        View project
                                    </Button>
                                </Box>
                            </Box>
                </CardContent>
            </Card>
        </form>
    );
};


export default WorkspaceFinishAll;

