import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {Theme} from "@emotion/react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {useNavigate} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme)=>({
        dialogPaper: {

        },
        border: {
            borderBottom: '10rem'
        }, paper: {
            position: "absolute",
            left: 0,
            bottom: 0,
            maxWidth: '36rem',

            height: '33rem',
        },
        dividerColor: {
            backgroundColor: '#000000',
        },
        resize: {
            fontSize: 24,
            color: '#BDBDBD'
        },
        oneEdgeShadow: {
            background: '#384047',
            boxShadow: '0 0 0 4px #384047, 0 4px 4px black',
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
            marginBottom:'10rem'
        }
    })
);

export default function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const navigation =  useNavigate();

    const onMySettings=() =>{
        console.log('Clicked on My settings');
        navigation('/workspace-sidebar');
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

                <Button color="primary"  onClick={handleClickOpen}>
                    <ArrowDropDownIcon />
                </Button>

            <Dialog classes={{paper: classes.paper}}  open={open} onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <Button>
                    <IconButton  aria-label="close" className={classes.closeButton} >
                        <CloseIcon />
                    </IconButton>
                </Button>

                <Grid container xs={12} style={{paddingTop:'0.4rem'}}>
                    <Grid item xs={2}>

                        <List component="nav" aria-label="main mailbox folders"
                              style={{paddingLeft: '1rem', fontSize: '14px', color: '#BDBDBD', lineHeight: 1}}>
                            <ListItem button style={{
                                fontWeight: 500,
                                fontSize: '11px',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: '#BDBDBD'
                            }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                </ListItemAvatar>

                            </ListItem>
                        </List>

                    </Grid>
                    <Divider  classes={{root: classes.dividerColor}}  orientation="vertical" flexItem/>
                    <Grid item xs={5}>
                        <List component="nav" aria-label="main mailbox folders"
                              style={{paddingLeft: '1rem', fontSize: '10px', color: '#BDBDBD', lineHeight: 1}}>
                            <ListItem button style={{
                                paddingBottom: '1rem',
                                fontWeight: 500,
                                fontSize: '10px',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: '#BDBDBD'
                            }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
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

                                <Button onClick={handleClose} startIcon={<PersonAddIcon />} style={{   borderRadius: 2,background:'linear-gradient(90deg,#8930fd,#49ccf9)'}} variant="contained">
                                    Invite
                                </Button>
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
                    <Divider classes={{root: classes.dividerColor}}  orientation="vertical" flexItem/>
                    <Grid item xs>
                        <List component="nav" aria-label="main mailbox folders"
                              style={{paddingLeft: '1rem', fontSize: '14px', color: '#BDBDBD', lineHeight: 1}}>
                            <ListItem button style={{paddingBottom: '1rem'}}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                </ListItemAvatar>
                                <ListItemText>Ali Baba</ListItemText>
                            </ListItem>

                            <ListItem button onClick={onMySettings}>
                                <ListItemText primary="My Settings"/>
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



                        <List component="nav" aria-label="main mailbox folders"
                              style={{paddingLeft: '1rem', fontSize: '14px', color: '#BDBDBD', lineHeight: 1}}>
                            <ListItem button>
                                <ListItemText primary="Log out"/>
                            </ListItem>

                            <Divider classes={{root: classes.dividerColor}} variant="middle" />
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
                {/*</DialogContent>*/}
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Cancel*/}
                {/*    </Button>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Subscribe*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}