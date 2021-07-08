import type {FC} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Container,
    Avatar,
    Box,
    Card,
    Divider,
    Link,
    Typography, Button
} from '@material-ui/core';
import UsersIcon from '../../../icons/Users';
import type { Workspace } from '../types/workspace';
import ViewComfyRoundedIcon from '@material-ui/icons/ViewComfyRounded';
import {useAuthModule} from "../../authentication/zustand";
import {useWorkspaceModule} from "../zustand";

interface WorkspaceCardProps {
    workspace: Workspace;
}

const WorkspaceCard: FC<WorkspaceCardProps> = (props) => {

    const { workspace } = props;

    const user = useAuthModule((state) => state.user);
    const setSelectedWorkspace = useWorkspaceModule(state => state.setSelectedWorkspace);
    // const workspace = useAuthModule((state) => state.user.user._workspaces
    // );
    console.log('user workspace: ', workspace)

    console.log('user' , user.name)
    const fileSelectedHandler = event => {
        console.log(event)
    }

    const navigate = useNavigate();
    const navigateToKanban = () => {
        setSelectedWorkspace(workspace);
        navigate('/workspace-settings/settings');
    }

    const fileUploadHandler = ()=>{

    }

    return (

        <Box
            maxWidth="24rem"
            minWidth="20rem"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
            }}

        >
            <Card
                // style={{maxWidth: "24rem"}}
                sx={{py: '20px'}}>
                <Box
                     sx={{
                         pl: 3,
                         pb:3,
                         pt:2
                     }}
                >

                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Avatar
                            onClick={fileUploadHandler}
                            onChange={fileSelectedHandler}
                            style={{height: "5.6rem", width: "5.6rem"}}
                            alt="Author"
                            src={workspace?.image?.url || "https://t4.ftcdn.net/jpg/01/42/10/39/360_F_142103920_HX5XxEAHvaHG4uP7YfgHMM05A25Jjm2q.jpg"}
                            //    src={workspace.author.avatar}
                        >

                        </Avatar>

                        <Box sx={{ml: 2 , pr: 4}}>
                            <Link
                                color="textPrimary"
                                component={RouterLink}
                                to="#"
                                variant="h6"
                                style={{
                                    textAlign: "center", fontSize: "1.4rem",
                                    paddingLeft: "0.8rem",
                                }}
                                noWrap
                            >
                                {workspace.name}
                            </Link>


                            <Typography
                                color="textSecondary"
                                variant="body2"
                                style={{textAlign: "center", paddingLeft: "0.7rem"}}
                            >
                                by
                                {'  '}
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="#"
                                    variant="subtitle2"
                                >
                                    {user.name}
                                </Link>

                            </Typography>
                        </Box>
                    </Box>
                </Box>


                <Divider />
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pl: 2,
                        pr: 3,
                        pt:2
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            ml: 2
                        }}
                    >
                        <UsersIcon fontSize="small"/>
                        <Typography
                            color="textSecondary"
                            sx={{ml: 1}}
                            variant="subtitle2"
                        >
                            {/*{workspace.membersCount}*/}
                            4
                        </Typography>


                    </Box>
                    <Box sx={{
                        ml: 2
                    }}
                    >

                        <Button>
                            {/*<a href={`/workspace-settings/settings/${workspace._id}`} >*/}
                            <ViewComfyRoundedIcon
                                onClick={ navigateToKanban }
                                style={{fontSize: 30}}/>
                        </Button>

                    </Box>

                </Box>
            </Card>
        </Box>
    );
};

WorkspaceCard.propTypes = {
    // @ts-ignore
    workspace: PropTypes.object.isRequired
};

export default WorkspaceCard;
