import type {FC} from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid, Typography
} from '@material-ui/core';
import {useWorkspaceModule} from './zustand';
import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'
import {deepOrange, deepPurple} from '@material-ui/core/colors';
import ChipToDo from './chipTodo';
import ChipComplete from './chipComplete';
import OpenInNewTwoToneIcon from '@material-ui/icons/OpenInNewTwoTone';
import type {Space} from '../workspace/types/workspace';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
        },
        text: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            minHeight: '38px'
        }
    }),
);

const defaultProps = {

    style: {height: '21rem'},
    borderColor: '#7b68ee',
    borderRadius: 1
};

interface SpaceCardProps {
    space: Space;
}

const SpaceForm: FC<SpaceCardProps> = (props) => {

    const classes = useStyles()
    const {space} = props;

    const spaceData = useWorkspaceModule((state) => state.spaceData)

    console.log("inside component 1: ", spaceData);

    // console.log('space', spaceData.name)

    const fileUploadHandler = () => {

    }


    return (
        <>
            <Grid
                container
                spacing={3}

            >
                <Grid
                    item
                    lg={12}
                    md={6}
                    xs={12}

                >
                    <Box
                        borderLeft={3} {...defaultProps}
                    >
                        <Card style={{borderRadius: 8, border: '1px solid #32393f'}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pl: 5, pt: 5, pb: 2,

                            }}


                                 style={{borderLeft: 1, borderColor: 'red'}}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Avatar
                                        onClick={fileUploadHandler}
                                        // onChange={fileSelectedHandler}
                                        src="https://t4.ftcdn.net/jpg/01/42/10/39/360_F_142103920_HX5XxEAHvaHG4uP7YfgHMM05A25Jjm2q.jpg"
                                        style={{
                                            width: '2.3rem',
                                            height: '2.3rem',
                                            borderRadius: 10,
                                            backgroundColor: 'red',
                                        }}
                                        className={classes.orange}>S</Avatar>
                                    <Typography style={{
                                        marginLeft: '1rem',
                                        marginTop: '0.2rem',
                                        color: '#d5d6d7',
                                        fontSize: '1.4rem',
                                        fontWeight: 500
                                    }}>Slark</Typography>

                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <OpenInNewTwoToneIcon
                                        style={{marginTop: '0.5rem', marginLeft: '1.4rem', color: '#7b68ee'}}/>
                                    <Typography style={{

                                        marginLeft: '0.5rem',
                                        marginTop: '0.8rem',
                                        color: '#7b68ee',
                                        lineHeight: '15px',
                                        display: 'block',
                                        fontSize: '1rem',
                                        fontWeight: 400
                                    }}>Go to Space</Typography>
                                </Box>

                            </Box>
                            <CardContent>

                                <Box display="flex">
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        pb: 5, pl: 4, pr: 4
                                    }}>
                                        <Typography style={{
                                            marginBottom: '2rem',
                                            marginLeft: '0.5rem',
                                            color: 'rgba(213,214,215,.4)'
                                        }}>
                                            ROLE
                                        </Typography>
                                        <Avatar style={{width: '3.4rem', height: '3.4rem', backgroundColor: 'blue',}}
                                                className={classes.orange}>N</Avatar>
                                    </Box>
                                    {/*llll*/}
                                    <Divider style={{borderRight: ' 1px solid rgba(213,214,215,.2)', height: '13rem'}}
                                             orientation="vertical" flexItem/>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            pb: 5, pl: 5, pr: 24
                                        }}>
                                        <Typography style={{marginBottom: '2rem', color: 'rgba(213,214,215,.4)'}}>
                                            SHARED WITH

                                        </Typography>
                                        <Typography style={{color: '#d5d6d7'}} className={classes.text}>
                                            Everyone.
                                            <span>
                                                Make private
                                            </span>
                                        </Typography>
                                    </Box>
                                    <Divider style={{borderRight: ' 1px solid rgba(213,214,215,.2)', height: '13rem'}}
                                             orientation="vertical" flexItem/>

                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        pb: 5, pl: 5, pr: 24
                                    }}
                                    >
                                        <Typography style={{marginBottom: '2rem', color: 'rgba(213,214,215,.4)'}}>
                                            STATUSES
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap'
                                        }}>
                                            <ChipToDo/>
                                            <ChipComplete/>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <MoreHorizIcon />
                                    </Box>
                                </Box>

                            </CardContent>
                        </Card>
                    </Box>

                </Grid>
            </Grid>
        </>
    );
};

export default SpaceForm;
