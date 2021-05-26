import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    dialogPaper: {
        minWidth: '54rem',

        // height: '43rem',
    },
    border: {
        borderRadius: 0,
        borderBottomLeftRadius: '10rem',
        borderBottomRightRadius: '10rem'
    },
    resize: {
        fontSize: 24,
        color: '#BDBDBD'
    },
    oneEdgeShadow: {
        background: '#384047',
        boxShadow: '0 0 0 4px #384047, 0 4px 4px black',
    }
});

export default function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog classes={{paper: classes.dialogPaper}} open={open} onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <Box sx={{
                    p: 8
                }}
                     style={{backgroundColor: '#384047'}}
                     className={classes.oneEdgeShadow}
                >
                    <DialogContent style={{paddingLeft: '12rem', paddingBottom: '2rem'}}>

                        <img src="/static/images/globe-image.jpg" width="320" height="220" alt="Contemplative Reptile"/>

                    </DialogContent>
                </Box>

                {/*<Divider/>*/}

                <Box>
                    <DialogContent style={{paddingLeft: '4.5rem', paddingRight: '4.5rem'}}>
                        <label style={{fontFamily: 'Arial, Helvetica, sans-serif', color: '#d5d6d7', fontSize: 19}}>Space
                            name</label>
                        <TextField
                            style={{width: '100%', paddingTop: '1rem'}}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            autoFocus
                            id="name"
                            type="text"
                            fullWidth
                            placeholder="Enter Space name"
                            variant="standard"
                        />
                    </DialogContent>
                </Box>
                <Box sx={{p: 5}}>

                    <DialogActions style={{paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem'}}>

                        <Button
                            style={{

                                marginTop: "1rem",
                                maxHeight: "4.8rem",
                                minHeight: "4.8rem",
                                borderRadius: 3,
                                fontSize: '1.5rem',
                                backgroundColor: '#7b68ee'
                            }}
                            color="primary"
                            // disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Next
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    )
        ;
}