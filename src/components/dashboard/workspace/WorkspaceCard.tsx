import type {FC} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Container,
    Avatar,
    Box,
    Card,
    Divider,
    Link,
    Typography
} from '@material-ui/core';
import UsersIcon from '../../../icons/Users';
import type { Workspace } from '../workspace/types/workspace';
import ViewComfyRoundedIcon from '@material-ui/icons/ViewComfyRounded';
import {useAuthModule} from "../../../modules/authentication/zustand";


interface WorkspaceCardProps {
    workspace: Workspace;
}

const WorkspaceCard: FC<WorkspaceCardProps> = (props) => {

    const { workspace } = props;

    const user = useAuthModule((state) => state.user.user);
    console.log('user' , user.name)
    const fileSelectedHandler = event => {
        console.log(event)
    }

    const fileUploadHandler = ()=>{

    }

    return (

        <Container
            style={{maxWidth: "24rem"}}
            sx={{py: '80px'}}
        >
            <Card>
                <Box sx={{p: 3}}>

                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            mt: 2
                        }}
                    >
                        <Avatar
                            // sx={{
                            //     alignItems: 'center',
                            //     display: 'flex',
                            //     justifyContent: 'center',
                            //     mb: 3
                            // }}
                            onClick={fileUploadHandler}
                            onChange={fileSelectedHandler}
                            style={{height: "5.6rem", width: "5.6rem"}}
                            alt="Author"
                             src="https://t4.ftcdn.net/jpg/01/42/10/39/360_F_142103920_HX5XxEAHvaHG4uP7YfgHMM05A25Jjm2q.jpg"
                            //    src={workspace.author.avatar}
                        >
                            {/*{getInitials(workspace.author.name)}*/}
                            {/*hhhh*/}
                        </Avatar>

                        <Box sx={{ml: 2}}>

                            <Link
                                color="textPrimary"
                                component={RouterLink}
                                to="#"
                                variant="h6"
                                style={{textAlign: "center", fontSize: "1.9rem", paddingLeft: "0.8rem"}}
                            >
                                {workspace.name}
                                {/*Slark*/}
                            </Link>

                            <Typography
                                color="textSecondary"
                                variant="body2"
                                style={{textAlign: "center", paddingLeft: "0.8rem"}}
                            >
                                by
                                {'  '}
                                <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to="#"
                                    variant="subtitle2"
                                >
                                    {/*{workspace.author.name}*/}
                                    {/*hiba youssef*/}
                                    {user.name}
                                </Link>

                            </Typography>
                        </Box>
                    </Box>
                </Box>


                <Divider/>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pl: 2,
                        pr: 3,
                        py: 2
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >

                    </Box>
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

                        {/*<Link*/}
                        {/*    color="textSecondary"*/}
                        {/*    component={RouterLink}*/}
                        {/*    to="/authentication/loginfinal"*/}
                        {/*    variant="body2"*/}
                        {/*    style = {{ marginLeft:"9rem"}}*/}
                        {/*>*/}
                        <ViewComfyRoundedIcon style={{fontSize: 30}}/>
                        {/*</Link>*/}
                    </Box>

                </Box>
            </Card>
        </Container>
    );
};

WorkspaceCard.propTypes = {
    // @ts-ignore
    workspace: PropTypes.object.isRequired
};

export default WorkspaceCard;
