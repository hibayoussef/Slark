import React, {FC} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Avatar, TextField,  Button } from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import ModalDelete from '../../../../components/dashboard/workspace/ModalDelete';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // minWidth: 450,
            // backgroundColor:'red',
            [theme.breakpoints.down('sm')]: {
                // Width: 300,
                // backgroundColor:'green',
            },
            [theme.breakpoints.up('md')]: {
                minWidth: 50,
                // backgroundColor:'red',
            },
        },
        button:{
            [theme.breakpoints.down('sm')]: {
                width: '6rem',
                fontSize: '0.9rem',
                height: '20px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                Width: '10rem',
                fontSize: '1.6rem',
                height: '44px',
            },
            [theme.breakpoints.up('md')]: {
                Width: '10rem',
                fontSize: '1.8rem',
                height: '44px',
            },
            [theme.breakpoints.between('md', 'lg')]: {
                Width: '10rem',
                fontSize: '1.7rem',
                height: '44px',

            },
            [theme.breakpoints.between('lg', 'xl')]: {
                Width: '10rem',
                fontSize: '1.7rem',
                height: '44px',
            }

        },
        textField:{
            [theme.breakpoints.down('sm')]: {
                fontSize:2,
                paddingTop:'1.3rem',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                fontSize:3,
                paddingTop:'1.3rem',
            },
            [theme.breakpoints.between('md', 'lg')]: {
                fontSize:4,
                paddingTop:'1.4rem',
            },
            [theme.breakpoints.between('lg', 'xl')]: {
                fontSize:4.5,
                paddingTop:'1.3rem',
            }
        },
        avatar:{
               //
               //  [theme.breakpoints.down('md')]: {
               //      width: '4rem',
               //      height: '4rem',
               // },
            [theme.breakpoints.down('sm')]: {
                minWidth: '3.6rem',
                height: '3.6rem',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                minWidth: '5.2rem',
                height: '5.2rem',
            },
            [theme.breakpoints.between('md', 'lg')]: {
                minWidth: '5.6rem',
                height: '5.6rem',
            },
            [theme.breakpoints.between('lg', 'xl')]: {
                minWidth: '5.9rem',
                height: '5.9rem',
            }

        },
        SaveButton:{

            backgroundColor: '#7b68ee',
            borderRadius: 6,

            '@media (min-width:280px)': {
                marginLeft: '0rem'
            },
            '@media (width:1024)': {
                marginLeft: '10rem'
            },
            '@media (min-width:411px)': {
                marginLeft: '3rem'
            },
            [theme.breakpoints.down('sm')]: {
                minWidth: '5rem',
                minHeight: '1.9rem',
                fontSize: '1.1rem',
                justify:"flex-right",
                // marginLeft: theme.spacing(4)
            },
            '@media (min-width:360px)': {
                marginLeft: '1.7rem'
            },
            [theme.breakpoints.between('sm', 'md')]: {
                minWidth: '13rem',
                minHeight: '4rem',
                fontSize: '1.4rem',
                justify: 'flex-end'
            },
            [theme.breakpoints.up('md')]: {
                minWidth: '13rem',
                minHeight: '4.3rem',
                fontSize: '1.4rem',
            },
            [theme.breakpoints.between('md', 'lg')]: {
                minWidth: '14rem',
                minHeight: '4.8rem',
                fontSize: '1.9rem',

            },
            [theme.breakpoints.between('lg', 'xl')]: {
                minWidth: '14rem',
                minHeight: '4.5rem',
                fontSize: '1.6rem',
                justify:'flex-end',
                marginLeft: theme.spacing(115),
            }
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        resize:{
            fontSize:24,
            color: '#828588',
            borderBottom: '1px solid #e4e4e4',
            borderBottomColor: '#384047'
        }
    }),
);

const Settings: FC = () => {
    const [open, setOpen] = React.useState(false);

    console.log('THIAN ABK ')
    const handleClickOpen = () => {
        console.log('Open the Dialog...')
        setOpen(true);
    };

    function cancelHandler(){
        console.log('Close');
        setOpen(false)
    }

    function confirmHandler(){
        console.log('Close');
        setOpen(false)
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/*<Container maxWidth="lg" style={{backgroundColor: 'red'}}>*/}
            <Grid container spacing={2} direction="row" xs={12} md={12}>
                <Grid item >
                    <Avatar className={classes.avatar}  alt="Remy Sharp"
                            src="https://thumbs.dreamstime.com/b/c-converted-174454105.jpg"/>

                </Grid>
                <Grid item xs>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        name="workspaceName"
                        placeholder="Workspace Name"
                        variant="standard"
                        style={{
                            // paddingTop:'2.3rem',
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 1,
                            position: 'relative',
                            color: '#828588',

                        }}
                        InputProps={{
                            classes: {
                                input: classes.button
                            },
                        }}
                        defaultValue="nameeeee"
                    />
                </Grid>

            </Grid>
            <Grid container spacing={5} direction="row"  mt={14}>
                <Grid item >

                    <Button
                        className={classes.button}
                        style={{
                        fontWeight: 400,
                        textShadow: 'none',
                        color: '#fd71af',
                        border: 0,
                        background: 'none'

                    }}
                        onClick={handleClickOpen}
                    >Delete Workspace
                    </Button>

                    { open && <ModalDelete onCancel={ cancelHandler } onConfirm={ confirmHandler } />  }


                </Grid>
                <Grid item
                      justifyItems="flex-end"
                      alignItems="center">
                    <Button
                        color="primary"
                        component={RouterLink}
                        to="/dashboard/workspaces/1"
                        variant="contained"
                      className={classes.SaveButton}
                    >
                        Saved
                    </Button>


                </Grid>

            </Grid>

            {/*</Container>*/}
        </div>
    );
}

export default Settings;