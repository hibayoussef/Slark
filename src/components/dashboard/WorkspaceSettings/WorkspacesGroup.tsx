import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import WorkspaceModal from './WorkspaceModal';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/*Arrow*/}
            <Button color="primary"  onClick={handleClickOpen}>
                <ArrowDropDownIcon />
            </Button>


            <Dialog onClose={handleClose}  style={{flex: '1 0 0'}} open={open}>
                {/*<DialogContent >*/}
                  <WorkspaceModal />
                {/*</DialogContent>*/}
            </Dialog>
        </div>
    );
}
