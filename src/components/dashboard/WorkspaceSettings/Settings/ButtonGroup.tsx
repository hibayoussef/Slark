import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {InputAdornment, TextField} from "@material-ui/core";
import SearchIcon from "../../../../icons/Search";
import { makeStyles } from '@material-ui/core/styles';


const options = ['Member', 'Admin'];

const useStyles = makeStyles({
    textField: {
        [`& fieldset`]: {
            borderRadius: 1
        },

        color: '#d5d6d7',
        background: '#1e272e',
        fontSize: '14px',
        lineHeight: 1,
        fontWeight: 400
    },
    button: {
        width: 140,
        height:'3.5rem'
    }

});


const SplitButton: FC = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    // @ts-ignore
    return (

        <Grid container direction="row" alignItems="center">
            <Grid item xs={8} >

                <TextField
                    className={ classes.textField }
                    fullWidth
                    placeholder="Invite by Email"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={2}   className={ classes.textField }>
                <ButtonGroup

                    size="large"
                    style={{
                        border:'2rem',
                        borderLeft: 0,
                        borderRight: 0,
                        width:384,
                        height: 56,
                        borderRadius: 16
                    }} variant="contained" color="primary" ref={anchorRef}  aria-label="split button">



                    <Button className={classes.button} style={{ borderRadius: 1 }} onClick={handleClick}>{options[selectedIndex]}</Button>
                    <Button
                        style={{ borderRadius: 1 }}
                        color="primary"
                        size="large"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                    <Button className={classes.button} style={{ borderRadius: 1 }}>Invite</Button>


                </ButtonGroup>
                {/*<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>*/}
                {/*    {({ TransitionProps, placement }) => (*/}
                {/*        <Grow*/}
                {/*            {...TransitionProps}*/}
                {/*            style={{*/}
                {/*                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Paper>*/}
                {/*                <ClickAwayListener onClickAway={handleClose}>*/}
                {/*                    <MenuList id="split-button-menu">*/}
                {/*                        {options.map((option, index) => (*/}
                {/*                            <MenuItem*/}
                {/*                                key={option}*/}
                {/*                                disabled={index === 2}*/}
                {/*                                selected={index === selectedIndex}*/}
                {/*                                onClick={(event) => handleMenuItemClick(event, index)}*/}
                {/*                            >*/}
                {/*                                {option}*/}
                {/*                            </MenuItem>*/}
                {/*                        ))}*/}
                {/*                    </MenuList>*/}
                {/*                </ClickAwayListener>*/}
                {/*            </Paper>*/}
                {/*        </Grow>*/}
                {/*    )}*/}
                {/*</Popper>*/}
            </Grid>
        </Grid>
    );
}

export default SplitButton;