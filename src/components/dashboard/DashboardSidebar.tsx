import {useEffect} from 'react';
import type {FC} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    Link,
    Typography
} from '@material-ui/core';
import ClipboardListIcon from '../../icons/ClipboardList';
import UserIcon from '../../icons/User';
import BriefcaseIcon from '../../icons/Briefcase';
import Logo from '../Logo';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import {useAuthModule} from "../../modules/authentication/zustand";
import WorkspaceGroup from '../../components/dashboard/WorkspaceSettings/WorkspacesGroup'

interface DashboardSidebarProps {
    onMobileClose: () => void;
    openMobile: boolean;
}

const sections = [
        {
            title: 'General',
            items: [
                {
                    title: 'Account',
                    path: '/dashboard/account',
                    icon: <UserIcon fontSize="small"/>
                }
            ]
        },
        {
            title: 'Apps',
            items: [
                {
                    title: 'Kanban',
                    path: '/dashboard/kanban',
                    icon: <ClipboardListIcon fontSize="small"/>
                },
            ]
        },
        {
            title: 'Settings',
            items: [
                {
                    title: 'Settings',
                    path: '/dashboard/settings-sidebar/oneLineSettings'
                },
                {
                    title: 'People',
                    path: '/dashboard/settings-sidebar/twoLineSettings'
                },
                {
                    title: 'Space',
                    path: '/dashboard/settings-sidebar/space'
                },
                {
                    title: 'List',
                    path: '/dashboard/settings-sidebar/list'
                }
                // {
                //     title: 'My Settings',
                //     path: '/workspaces/workspace-sidebar',
                //     icon: <UserIcon fontSize="small"/>
                // }
            ]
        },
        {
            title: 'Platforms',
            items: [
                {
                    title: 'Workspaces',
                    path: '/dashboard/workspaces',
                    icon: <BriefcaseIcon fontSize="small"/>,
                    children: [


                        {
                            title: 'Create',
                            path: '/dashboard/workspaces/new'
                        },


                        {
                            title: 'Browse',
                            path: '/dashboard/workspaces/header'
                        }
                        ,

                ]
        },


    ],
    },
    // {
    //     title: '',
    //     items: [{
    //         title: '',
    //         path: 'modal',
    //         icon: <BriefcaseIcon fontSize="small"/>,
    //
    //     }]
    // },


]

const DashboardSidebar
    :
    FC<DashboardSidebarProps> = (props) => {
    const {onMobileClose, openMobile} = props;
    const location = useLocation();
    const user = useAuthModule(state => state.user);

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Scrollbar options={{suppressScrollX: true}}>
                <Hidden lgUp>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: 2
                        }}
                    >
                        <RouterLink to="/">
                            <Logo
                                sx={{
                                    height: 40,
                                    width: 40
                                }}
                            />
                        </RouterLink>
                    </Box>
                </Hidden>
                <Box sx={{p: 2}}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'background.default',
                            borderRadius: 1,
                            display: 'flex',
                            overflow: 'hidden',
                            p: 2
                        }}
                    >
                        <RouterLink to="/dashboard/account">
                            <Avatar
                                src={user.avatar}
                                sx={{
                                    cursor: 'pointer',
                                    height: 48,
                                    width: 48
                                }}
                            />
                        </RouterLink>
                        <Box sx={{ml: 2}}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                {user.name}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                Your plan:
                                {' '}
                                <Link
                                    color="primary"
                                    component={RouterLink}
                                    to="/pricing"
                                >
                                    {user.plan}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <Box sx={{p: 2}}>
                    {sections.map((section) => (
                        <NavSection
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
                </Box>
                <Divider/>
                <Box sx={{p: 2}} style={{ marginTop: '12rem'}}>
                    <Divider/>
                    <WorkspaceGroup />
                </Box>
            </Scrollbar>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'background.paper',
                            width: 280
                        }
                    }}
                    variant="temporary"
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden lgDown>
                <Drawer
                    anchor="left"
                    open
                    PaperProps={{
                        sx: {
                            backgroundColor: 'background.paper',
                            height: 'calc(100% - 64px) !important',
                            top: '64px !Important',
                            width: 280
                        }
                    }}
                    variant="persistent"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

export default DashboardSidebar;
