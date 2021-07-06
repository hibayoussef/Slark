import React, {FC} from 'react';
import {makeStyles, createStyles, Theme, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Avatar, TextField, Container, Button, AppBar, Toolbar, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {grey} from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        resize: {
            fontSize: 19,
            color: '#828588',
            borderBottom: '1px solid #e4e4e4',
            borderBottomColor: '#384047'
        },
        label: {
            color: '#d5d6d7',
            fontWeight: 560,
            fontSize: '1rem',
            fontFamily: 'Gotham Pro,Proxima Nova,arial,serif',
        },

        textField: {
            color: '#828588',
            background: 'transparent',
            paddingTop: '0.5rem'
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
                position: "fixed",
                bottom: 0,
                background: '#384047',
                height: '7rem'
            },
        },
        dot: {
            height: '25px',
            width: '25px',
            borderRadius: '50%',
            display: 'inline-block',
            transition: 'all .2s cubic-bezier(.785,.135,.15,.86) 0s'
        },
        bottomApp: {
            backgroundColor: 'deepPurple'
        }
    }),
);


const MySettings: FC = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/*<Container maxWidth="lg" style={{backgroundColor: 'red'}}>*/}
            <Grid container xs={12} md={12}>
                <Grid item xs={1} md={1}>
                    <Avatar style={{width: '5.4rem', height: '5.4rem'}} alt="Remy Sharp"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>

                </Grid>
                <Grid item xs={11} md={11} spacing={3}>
                    <Grid item xs={12} spacing={3}>
                        <label className={classes.label}>Full name</label>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            name="name"
                            placeholder="Enter UserName"
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
                                    input: classes.resize,
                                },
                            }}
                            defaultValue="Hiba Youssef"
                        />
                    </Grid>

                    <Grid item style={{marginTop: '2.4rem'}}>
                        <label className={classes.label}>Email</label>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            name="email"
                            placeholder="Enter Email"
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
                                    input: classes.resize,
                                },
                            }}
                            defaultValue="hibatallah69@gmail.com"
                        />
                    </Grid>

                    <Grid item style={{marginTop: '2.4rem'}}>
                        <label className={classes.label}>Password</label>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            name="password"
                            placeholder="Enter New Password"
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
                                    input: classes.resize,
                                },
                            }}
                            defaultValue="......"
                        />
                    </Grid>
                    <Grid item style={{marginTop: '5rem'}}>
                        <Typography style={{color: '#d5d6d7', fontWeight: 640, fontSize: '1.8rem'}}>
                            Your color theme
                        </Typography>
                        <Grid item spacing={8} container style={{marginTop: '0.6rem'}}>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(123, 104, 238)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(255, 161, 47)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(255, 87, 34)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(244, 44, 44)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(255, 0, 252)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(65, 105, 225)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(95, 129, 255)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(10, 180, 255)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(8, 199, 224)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(7, 160, 146)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(29, 185, 84)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(46, 165, 44)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'rgb(117, 115, 128)'}}></span>
                            </Grid>
                            <Grid item>
                                <span className={classes.dot} style={{backgroundColor: 'red'}}></span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>

                    </Grid>
                </Grid>
                <Grid container item >
                    <AppBar className={classes.appBar} style={{top: "auto", bottom: 0}}>
                            <Toolbar>
                                <Button
                                    color="primary"
                                    component={RouterLink}
                                    to="/dashboard/workspaces/1"
                                    variant="contained"
                                    style={{
                                        minWidth: '13rem',
                                        minHeight: '4.1rem',
                                        fontSize: '1.4rem',
                                        backgroundColor: '#7b68ee',
                                        borderRadius: 6,
                                        marginLeft: '80rem',
                                        marginTop:'1.5rem'
                                    }}
                                >
                                    Save changes
                                </Button>

                    </Toolbar>
            </AppBar>

        </Grid>


</Grid>
    {/*/!*<Grid container spacing={5} direction="row"  mt={14}>*!/*/
    }
    {/*/!*    <Grid item xs>*!/*/
    }
    {/*/!*        <Button style={{*!/*/
    }
    {/*/!*            minWidth: '10rem',*!/*/
    }
    {/*/!*            fontSize: '1.5rem',*!/*/
    }
    {/*/!*            height: '44px',*!/*/
    }
    {/*/!*            fontWeight: 400,*!/*/
    }
    {/*/!*            textShadow: 'none',*!/*/
    }
    {/*/!*            color: '#fd71af',*!/*/
    }
    {/*/!*            border: 0,*!/*/
    }
    {/*/!*            background: 'none'*!/*/
    }

    {/*/!*        }}>Delete Space</Button>*!/*/
    }

    {/*/!*    </Grid>*!/*/
    }
    {/*/!*    <Grid item >*!/*/
    }
    {/*/!*        <Button*!/*/
    }
    {/*/!*            color="primary"*!/*/
    }
    {/*/!*            component={RouterLink}*!/*/
    }
    {/*/!*            to="/dashboard/workspaces/1"*!/*/
    }
    {/*/!*            variant="contained"*!/*/
    }
    {/*/!*            style={{*!/*/
    }
    {/*/!*                minWidth: '13rem',*!/*/
    }
    {/*/!*                minHeight: '4.3rem',*!/*/
    }
    {/*/!*                fontSize: '1.4rem',*!/*/
    }
    {/*/!*                backgroundColor: '#7b68ee',*!/*/
    }
    {/*/!*                borderRadius: 6,*!/*/
    }
    {/*/!*                marginLeft:'60rem'*!/*/
    }

    {/*/!*            }}*!/*/
    }
    {/*/!*        >*!/*/
    }
    {/*/!*            Saved*!/*/
    }
    {/*/!*        </Button>*!/*/
    }


    {/*/!*    </Grid>*!/*/
    }

    {/*</Grid>*/
    }

</div>
);
}

export default MySettings;
