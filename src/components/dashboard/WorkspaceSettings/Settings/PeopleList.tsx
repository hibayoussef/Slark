import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {Typography, InputAdornment, TextField , Grid} from "@material-ui/core";
import SearchIcon from '../../../../icons/Search';
import ButtonGroup from './ButtonGroup';

const useStyles = makeStyles({
    table: {
        minWidth: 640
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 1
        },
        color: '#d5d6d7',
        background: '#1e272e',
        fontSize: '14px',
        lineHeight: 1,
        fontWeight: 400
    }
});

function createData(name: string, email: string, role: string, settings: number) {
    return {name, email, role, settings};
}

const rows = [
    createData('Frozen yoghurt', 'hhhhhh', 'kjhi', 24),
    createData('Frozen yoghurt', 'hhhhhh', 'kjhi', 24),
    createData('Frozen yoghurt', 'hhhhhh', 'kjhi', 24),
    createData('Frozen yoghurt', 'hhhhhh', 'kjhi', 24),
    createData('Frozen yoghurt', 'hhhhhh', 'kjhi', 24),
];

export default function BasicTable() {
    const classes = useStyles();

    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingTop: '1.3rem',
                    paddingBottom: '2.4rem'
                }}
            >
                <Typography
                    color="textPrimary"
                    sx={{
                        position: 'relative',
                        '&:after': {
                            backgroundColor: 'primary.main',
                            bottom: '-8px',
                            content: '" "',
                            height: '3px',
                            left: 0,
                            position: 'absolute',
                            width: '48px'
                        }
                    }}
                    variant="h6"
                >
                    Full members ( {/*{ user.length }*/} 4 )

                </Typography>
            </Box>
            <Card>
                <TableContainer component={Paper}>
                    <Box sx={{p: 5}}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: '1.1rem'}}>NAME</TableCell>
                                    <TableCell style={{fontSize: '1.1rem'}} align="left">EMAIL</TableCell>
                                    <TableCell style={{fontSize: '1.1rem'}} align="center">ROLE</TableCell>
                                    <TableCell style={{fontSize: '1.1rem'}} align="right">SETTINGS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow style={{fontSize: '4rem'}} key={row.name}>

                                        <TableCell align="left" component="th" scope="row">

                                            <CardHeader
                                                avatar={
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src="/static/images/avatar/1.jpg"
                                                    />
                                                }
                                                title={row.name}
                                            />
                                        </TableCell>


                                        {/*<TableCell align="right">{row.name}</TableCell>*/}
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="center">{row.role}</TableCell>
                                        <TableCell align="right">{row.settings}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>
            </Card>
        </>
    );
}