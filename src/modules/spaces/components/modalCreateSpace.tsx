import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import PlusIcon from "../../../icons/Plus";
import {useWorkspaceModule} from '../../workspaces/zustand';
import {useAuthModule} from "../../../modules/authentication/zustand";
import {useSpaceModule} from "../zustand";
import {useNavigate} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
        dialogPaper: {
            minWidth: '50rem',
            // [theme.breakpoints.down('md')]: {
            //     minWidth: '40rem',
            // }

        },
        dialogContent: {
            width:'21rem',
            height:'14rem'
            // height:'10rem'
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
    }),
);


export default function FormDialog() {
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [spaceName, setSpaceName] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectedWorkspace = useWorkspaceModule(state => state.selectedWorkspace);
    const createSpace = useSpaceModule(
        (state) => state.createSpace
    );


    return (
        <div>
            <Button
                style={{borderRadius: 3}}
                color="primary"
                onClick={handleClickOpen}
                startIcon={<PlusIcon fontSize="small"/>}
                sx={{mt: 1}}
                variant="outlined"
            >
                New Space
            </Button>

            <Dialog
                // fullScreen={fullScreen}
                classes={{paper: classes.dialogPaper}} open={open} onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}

                >
                    <Box sx={{

                        display: 'flex',
                        p:5,
                        // width: 300,


                    }}
                         style={{backgroundColor: '#384047'}}
                         className={classes.oneEdgeShadow}
                    >
                       <Box sx={{
                           margin: ' 0 auto'
                       }}>
                           <DialogContent >
                               <img src="/static/images/globe-image.jpg"  className={classes.dialogContent} alt="Contemplative Reptile"/>
                           </DialogContent>
                       </Box>
                    </Box>

                    {/*<Divider/>*/}

                    <Box
                        sx={{
                            pt: 5,

                            // flexDirection: 'column'
                        }}

                    >
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
                                value={spaceName}
                                onChange={(e)=>setSpaceName(e.target.value)}
                                fullWidth
                                placeholder="Enter Space name"
                                variant="standard"
                            />
                        </DialogContent>
                    </Box>
                    <Box sx={{p: 5}} >

                        <DialogActions style={{paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem'}}>

                            <Button
                                onClick={()=> createSpace(spaceName, selectedWorkspace._id) }
                                style={{

                                    marginTop: "1rem",
                                    maxHeight: "4.1rem",
                                    minHeight: "4.1rem",
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
                                Create
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Dialog>
        </div>
    )
        ;
}