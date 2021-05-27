import React, {FC} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Container} from "@material-ui/core";
import WorkspaceNavSection from "./WorkspaceNavSection";

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

const sections = [
    {
        title: '',
        items: [
            {
                title: 'Settings',
                path: '/workspace-sidebar/settings'
            }
        ]
    },
    {
        title: '',
        items: [
            {
                title: 'People',
                path: '/dashboard/account'
            }
        ]
    },
    {
        title: '',
        items: [
            {
                title: 'Team',
                path: '/dashboard/account'
            }
        ]
    },
    {
        title: '',
        items: [
            {
                title: 'Spaces',
                path: '/dashboard/account'
            }
        ]
    },
    {
        title: '',
        items: [
            {
                title: 'Import/Export',
                path: '/dashboard/account'
            }
        ]
    },
    {
        title: '',
        items: [
            {
                title: 'Security & Permission',
                path: '/dashboard/account'
            }
        ]
    }
]



export default function ResponsiveDrawer(props: Props) {
    const location = useLocation();
    const {window, link} = props;
    const classes = useStyles();
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
                    {sections.map((section) => (
                        <WorkspaceNavSection
                            key={section.title}
                            pathname={location.pathname}
                            sx={{
                                '& + &': {
                                    mt: 3
                                }
                            }}
                            {...section}
                        />
                    ))}
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

