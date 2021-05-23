import type {FC} from 'react';
import React from "react";
import {
    Avatar,
    Box,
    TextField,
    Grid
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    resize:{
        fontSize:28
    },

});

const Settings: FC = () => {

    const classes = useStyles()

    return (
        <form>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={12}
                    xs={12}

                >

                    <Box style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>

                        <Avatar style={{width: '5rem', height: '5rem'}} alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"/>

                        <TextField
                            fullWidth
                            name="workspaceName"
                            placeholder="Workspace Name"
                            variant="standard"
                            style={{
                                paddingLeft: '1.4rem',
                                transition: ' all .2s cubic-bezier(.785,.135,.15,.86) 0s',
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

                    </Box>


                    <Box
                        sx={{

                            display: 'flex',
                            alignItems: 'center'
                        }}
                        style={{
                            marginTop: '13rem',
                        }}
                    >
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


                        <Button
                            color="primary"
                            component={RouterLink}
                            to="/dashboard/workspaces/1"
                            variant="contained"
                            style={{
                                minWidth: '17rem',
                                minHeight: '5.4rem',
                                marginLeft: '59rem',
                                fontSize: '1.8rem',
                                backgroundColor: '#7b68ee',
                                borderRadius: 6,

                            }}
                        >
                            Saved
                        </Button>

                    </Box>

                </Grid>
            </Grid>


        </form>

    );
}

export default Settings;