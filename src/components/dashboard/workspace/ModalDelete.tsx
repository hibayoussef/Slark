import type {FC , useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Workspace} from "./types/workspace";
import React from "react";


interface DeleteModalProps {
    onCancel(): any;
    onConfirm(): any
}

const DeleteModal: FC<DeleteModalProps>  = (props) => {
    //we use it if the modal is open or not
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    function cancelHandler(){
        props.onCancel();
    }

    function confirmHandler(){
        props.onConfirm();
    }


    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button>
            <Dialog
                open={open}
                onClick={ cancelHandler }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete WorkSpace?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ cancelHandler } color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={ confirmHandler } color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


export default DeleteModal;

