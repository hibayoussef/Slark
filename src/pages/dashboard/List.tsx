import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Globe from '../../../public/static/globe.jpg';
import InputAdornment from "@material-ui/core/InputAdornment";
import {useWorkspaceModule} from "../../components/dashboard/workspace/zustand";

const useStyles = makeStyles({
    dialogPaper: {
        minWidth: '49rem',

        // height: '43rem',
    },

    resize:{
        fontSize:18,
        color: '#BDBDBD',
        borderRadius: "50px 50px 0 0"
    },
    oneEdgeShadow: {
        background: '#384047',
        boxShadow: '0 0 0 4px #384047, 0 4px 4px black',
    }
});

export default function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    //----------------------------------------
    const [listName, setListName] = React.useState('');

    const listData = useWorkspaceModule((state) => state.list)

    console.log("inside component 1: ", listData);
    const createList = useWorkspaceModule(
        (state) => state.createList
    );

    //----------------------------------
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
                    p: 1
                }}
                     style={{backgroundColor: '#384047'}}
                     className={classes.oneEdgeShadow}
                >
                    <DialogContent>

                        <DialogContentText

                            style={{ fontFamily: 'Arial, Helvetica, sans-serif' , color: '#d5d6d7' , fontSize:33}}>
                            Create List
                        </DialogContentText>

                    </DialogContent>
                </Box>

                {/*<Divider/>*/}


                    <DialogContent  style={{paddingLeft:'2.6rem' , paddingRight: '2.6rem' , paddingTop:'3rem'}}>
                        <label style={{ fontFamily: 'Arial, Helvetica, sans-serif' , color: '#d5d6d7' , fontSize:18}}>List name</label>
                        <TextField
                            value={listName}
                            onChange={(e)=>setListName(e.target.value)}
                            style ={{ paddingTop:'1rem' ,

                                // borderColor: 'red',
                                // backgroundColor: '#2b343b'
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            id="name"
                            type="text"
                            fullWidth
                            placeholder="List"
                            variant="outlined"
                        />
                    </DialogContent>

                    <DialogActions style={{  paddingLeft:'4rem', paddingRight:'2.6rem',  paddingBottom:'2.4rem'}}>

                        <Button
                            style={{

                                background: '#e9ebf0',
                                color: '#7c828d',
                                marginTop: "1rem",
                                maxHeight: "4rem",
                                minHeight: "4rem",
                                maxWidth: '14rem',
                                borderRadius: 3,
                                fontSize: '1.3rem',

                            }}
                            color="primary"

                            // disabled={isSubmitting}
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Cancel
                        </Button>

                        <Button
                            style={{

                                color: '#fff',
                                marginTop: "1rem",
                                maxHeight: "4rem",
                                minHeight: "4rem",
                                maxWidth: '18rem',
                                borderRadius: 3,
                                fontSize: '1.3rem',
                                backgroundColor: '#7b68ee'
                            }}

                            onClick={()=> createList({'name':listName,'_list':'60cf00454c3c59001c620bfe'}) }
                           color="primary"
                            // disabled={isSubmitting}
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                           Create List
                        </Button>


                    </DialogActions>

            </Dialog>
        </div>
    )
        ;
}