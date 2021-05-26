import React, {forwardRef} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SidebarItems from "../SidebarItems";
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom'
import { NavLink, NavLinkProps } from 'react-router-dom'
import {Container} from "@material-ui/core";
import SettingsPage from '../../../../pages/dashboard/Settings'

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        fontSize: {
            fontSize: 18
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

interface Props {
    className?: string
    link?: string | null // because the InferProps props allows alows null value
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    window?: () => Window;
}


export default function ResponsiveDrawer(props: Props) {
    const {window , link} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{/*boxShadow: 'inset 0 0 10px'*/  boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 25px 2.6px'}}>
            <div className={classes.toolbar}/>
            <Button startIcon={<ArrowBackIosIcon/>}
                    style={{marginLeft: '3.5rem', borderRadius: 24, background: '#7b68ee', fontSize: '1.4rem'}}
                    variant="contained">
                Back
            </Button>
            <Box sx={{p: 5}}>

                <h1 style={{paddingLeft: '1rem', fontSize: '2rem', color: '#d5d6d7'}}>Settings</h1>
                {/*workspace Name*/}
                <Typography style={{
                    paddingLeft: '1rem',
                    fontSize: '1.6rem',
                    color: '#7b68ee',
                    fontWeight: 700
                }}>Slark</Typography>
                <List>
                    <Link to='/setting/sidebar/oneLineSettings' style={{textDecoration: 'none', color: 'red'}}>
                    {/*<NavLink exact  to='/setting/sidebar/settings' component={SettingsPage} >*/}
                        <ListItem button >
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                  primary: classes.fontSize,
                                }} primary="Settings"/>
                        </ListItem>
                    {/*</NavLink>*/}
                    </Link>
                    <Link to='/setting/sidebar/people' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="People"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/teams' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Teams"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/spaces' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Spaces"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/IE' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Import/Export"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/securityPerm' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Security & Permissions"/>
                        </ListItem>
                    </Link>

                </List>
                <Divider/>
                <List>
                    <Link to='/setting/sidebar/my-settings' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="My Settings"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/Workspaces' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Workspaces"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/notifications' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Notifications"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/rewards' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Rewards"/>
                        </ListItem>
                    </Link>
                    <Link to='/setting/sidebar/log-out' style={{textDecoration: 'none', color: 'red'}}>
                        <ListItem button>
                            <ListItemText
                                style={{color: '#d5d6d7'}}
                                classes={{
                                    primary: classes.fontSize,
                                }} primary="Log out"/>
                        </ListItem>
                    </Link>
                </List>
            </Box>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>

                <Container maxWidth="lg">

                    {/*<Switch>*/}
                    {/*    <Route path="/setting/sidebar/my-settings" exact component={SettingsPage} />*/}
                    {/*</Switch>*/}

                </Container>
            </main>
        </div>
    );
}


const routes = [
    {
        path: "/first-comp",
        element: () => <div>First comp</div>
    },
    {
        path: "/second-comp",
        element: () => <div>Second comp</div>
    }
];