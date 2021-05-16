import type {FC} from 'react';
import {
    Card,
    List,
    ListItem,
    Avatar,
    CardActions,
    ListItemAvatar,
    ListItemText,
    Grid
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme)=>({

    driver:{
        // borderRight:1px solid black
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
}));


const WorkspacesInviteUser: FC = (props) => {

    const classes = useStyles();
    const navigation =  useNavigate();

    const onMySettings=() =>{
        console.log('Clicked on My settings');
        navigation('/settings/mysettings');
    }
    return (<>
        <Card style={{maxWidth: '35rem',minWidth: '35rem', borderRadius: '0.6rem', background: 'rgb(0 0 0 / 50%)' }}>
            <CardActions  id ="customized-dialog-title" >
                <IconButton  aria-label="close" className={classes.closeButton} >
                    <CloseIcon />
                </IconButton>
            </CardActions >

            <Grid
                container

                xs={12}
                md={12}

            >
                {/*first Column*/}
                <Grid container item xs={2}  borderRight={0.05} borderColor="#424242" style={{ paddingBottom:'5rem'}}>
                    {/*                 Avatar*/}
                    <List  component="nav" aria-label="main mailbox folders" style={{ paddingLeft: '1rem' , fontSize: '14px' , color: '#BDBDBD', lineHeight: 1}}>
                        <ListItem button style = {{
                            fontWeight: 500,
                            fontSize: '11px',
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                           textOverflow: 'ellipsis',
                            color: '#BDBDBD'
                        }}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>

                        </ListItem>
                    </List>

                </Grid>
                <Divider orientation="horizontal" variant="fullWidth" className={classes.driver}/>

                {/*second Column*/}
                <Grid container item xs={5} borderRight={0.05} borderColor="#424242" style={{ paddingBottom:'5rem' }}>
                    <List component="nav" aria-label="main mailbox folders" style={{ paddingLeft: '1rem' , fontSize: '14px' , color: '#BDBDBD', lineHeight: 1}}>
                        <ListItem button style = {{
                            paddingBottom:'1rem',
                            fontWeight: 500,
                           fontSize: '11px',
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#BDBDBD'
                        }}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText>Ali Baba {/*Workspaces*/}</ListItemText>
                        </ListItem>

                        <ListItem button>
                            <ListItemText primary="Settings"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Import/Export"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="People"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Spaces"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Integrations"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Template Center"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Trash"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Security & Permissions"/>
                        </ListItem>
                    </List>

                </Grid>
                {/*Third Column*/}
                <Grid container item xs={5} style={{ paddingBottom:'5rem'}}>
                    <List component="nav" aria-label="main mailbox folders" style={{paddingLeft: '1rem' , fontSize: '14px' ,  color: '#BDBDBD', lineHeight: 1}}>
                        <ListItem button  style ={{paddingBottom: '1rem'}}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText>Ali Baba</ListItemText>
                        </ListItem>

                        <ListItem button>
                            <ListItemText primary="My Settings" onClick={onMySettings}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Notifications"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Layout size & style"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Rewards"/>
                        </ListItem>

                    </List>

                    <Divider  variant="middle"/>

                    <List component="nav" aria-label="main mailbox folders" style={{paddingLeft: '1rem' , fontSize: '14px' , color: '#BDBDBD', lineHeight: 1}}>
                        <ListItem button divider>
                            <ListItemText primary="Log out"/>
                        </ListItem>


                        <ListItem button>
                            <ListItemText primary="Help"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Hotkeys"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Dark mode"/>
                        </ListItem>

                    </List>

                </Grid>

            </Grid>
        </Card>
    </>)
};

export default WorkspacesInviteUser;

