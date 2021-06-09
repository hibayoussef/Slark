import React, {FC} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Container, Divider} from "@material-ui/core";
import Scrollbar from '../Scrollbar';
import WorkspaceNavItem from './WorkspaceNavItem';


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

interface WorkspaceSidebarProps {
    className?: string
    link?: string | null // because the InferProps props allows alows null value
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    window?: () => Window;
    onMobileClose: () => void;
    openMobile: boolean;
}

const sections = [
    {
        title: 'Settings',
        path: '/workspace-settings/settings'
    },
    {
        title: 'People',
        path: '/workspace-settings/people'
    },
    {
        title: 'Teams',
        path: '/workspace-settings/teams'
    },
    {
        title: 'Spaces',
        path: '/workspace-settings/spaces'
    },

    {
        title: 'Import/Export',
        path: '/workspace-settings/ie'
    },
    {
        title: 'Security & Permission',
        path: '/workspace-settings/security-permission'
    }
]


const Items = [

    {
        title: 'My Settings',
        path: '/workspace-settings/my-Settings'
    },

    {
        title: 'Workspaces',
        path: '/workspace-settings/workspaces'
    },

    {
        title: 'Notifications',
        path: '/workspace-settings/notifications'
    },
    {
        title: 'Rewards',
        path: '/workspace-settings/rewards'
    },
    {
        title: 'Log out',
        path: '/workspace-settings/log-out'
    },

];

const WorkspaceSidebar: FC<WorkspaceSidebarProps> = (props) => {

    const location = useLocation();
    const {window, onMobileClose, openMobile} = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >

                <Scrollbar options={{suppressScrollX: true}}>
                <Box sx={{p: 6}}>
                    <Button startIcon={<ArrowBackIosIcon/>}
                            style={{borderRadius: 24,marginLeft: '0.4rem', marginBottom: '2.4rem', background: '#7b68ee', fontSize: '1.4rem'}}
                            variant="contained">
                        Back
                    </Button>
                    <h2 style={{marginLeft: '0.4rem', marginBottom: '1.7rem', fontSize: '1.5rem',color: '#d5d6d7'}}>Settings</h2>

                    {/*workspace Name*/}
                    <Typography style={{
                        marginLeft: '0.4rem',
                        fontSize: '1.5rem',
                        color: '#7b68ee',
                        fontWeight: 600
                    }}>Slark</Typography>

                    <List>
                        {sections.map((section) => (
                            <WorkspaceNavItem
                                title={section.title}
                                path={section.path}
                                key={section.title}
                            />
                        ))}
                    </List>
                    <Divider style={{marginBottom:'2rem', marginTop: '1.5rem' }} />
                    <Typography style={{
                        marginLeft: '0.5rem',
                        fontSize: '1.5rem',
                        color: '#7b68ee',
                        fontWeight: 500
                    }}>Hiba </Typography>

                    <List>
                        {Items.map((item) => (
                            <WorkspaceNavItem
                                title={item.title}
                                path={item.path}
                                key={item.title}
                            />
                        ))}
                    </List>
                </Box>
                </Scrollbar>
            </Box>
        </>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>

            {/*<nav className={classes.drawer} aria-label="mailbox folders">*/}
            <Hidden lgUp>
                {/*<Hidden smUp implementation="css">*/}
                <Drawer
                    container={container}
                    variant="temporary"
                    onClose={onMobileClose}
                    open={openMobile}
                    // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    // open={mobileOpen}
                    // onClose={handleDrawerToggle}
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
            {/*</nav>*/}
        </div>
    );
}

WorkspaceSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

export default WorkspaceSidebar;

