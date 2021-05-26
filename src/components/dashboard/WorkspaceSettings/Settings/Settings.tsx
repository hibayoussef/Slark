import React, {FC} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Avatar, TextField , Container, Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

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
        resize:{
            fontSize:24,
            color: '#828588',
            borderBottom: '1px solid #e4e4e4',
            borderBottomColor: '#384047'
        }
    }),
);

const Settings: FC = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/*<Container maxWidth="lg" style={{backgroundColor: 'red'}}>*/}
            <Grid container  direction="row" xs={12} md={12}>
                <Grid item xs={1} md={1}  >
                        <Avatar style={{width: '6.4rem', height: '6.4rem'}} alt="Remy Sharp"
                                src="https://thumbs.dreamstime.com/b/c-converted-174454105.jpg"/>

                </Grid>
                <Grid item xs={11} md={11} >
                        <TextField
                            fullWidth
                            name="workspaceName"
                            placeholder="Workspace Name"
                            variant="standard"
                            style={{
                                paddingTop:'2.3rem',
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
                            defaultValue="nameeeee"
                        />
                </Grid>

            </Grid>
            <Grid container spacing={5} direction="row"  mt={14}>
                <Grid item xs>

                    <Button style={{
                        minWidth: '10rem',
                        fontSize: '1.5rem',
                        height: '44px',
                        fontWeight: 400,
                        textShadow: 'none',
                        color: '#fd71af',
                        border: 0,
                        background: 'none'

                    }}>Delete Workspace</Button>

                </Grid>
                <Grid item >
                    <Button
                        color="primary"
                        component={RouterLink}
                        to="/dashboard/workspaces/1"
                        variant="contained"
                        style={{
                            minWidth: '13rem',
                            minHeight: '4.3rem',
                            fontSize: '1.4rem',
                            backgroundColor: '#7b68ee',
                            borderRadius: 6,
                            marginLeft:'60rem'

                        }}
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
