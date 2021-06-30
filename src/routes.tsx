import {Suspense, lazy} from 'react';
import type {PartialRouteObject} from 'react-router';
import {Navigate} from 'react-router-dom';
import AuthGuard from './modules/authentication/components/guards/auth-guard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import WorkspaceSideBarLayout from './components/dashboard/WorkspaceSidebarLayout'
import GuestGuard from './modules/authentication/components/guards/guest-guard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';
import React from 'react';
import WorkspaceSideBarNav from "./components/dashboard/WorkspaceSideBarNav";
import {Outlet} from "@material-ui/icons";

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen/>}>
        <Component {...props} />
    </Suspense>
);


// const WorkspaceSideBar = Loadable(lazy(() => import('./components/dashboard/WorkspaceSettings/Settings/WorkspaceSidebar')));
// const WorkspaceSideBarLayout = Loadable(lazy(() => import('./components/dashboard/WorkspaceSidebarLayout')));
const IE = Loadable(lazy(() => import('./pages/dashboard/IE')));
const Notifications = Loadable(lazy(() => import('./pages/dashboard/Notifications')));

const Rewards = Loadable(lazy(() => import('./pages/dashboard/Rewards')));
const SecurityPermissions = Loadable(lazy(() => import('./pages/dashboard/Security-Permissions')));

const Teams = Loadable(lazy(() => import('./pages/dashboard/Teams')));

// Authentication pages
const LogIn = Loadable(lazy(() => import('./modules/authentication/pages/Login-Pag')));
const SignUp = Loadable(lazy(() => import('./modules/authentication/pages/Register-Pag')));
const ConfirmEmail = Loadable(lazy(() => import('./modules/authentication/pages/ConfirmEmail')));

const WorkspacePlayWithSlark = Loadable(lazy(() => import('./modules/workspaces/pages/playWithSlark')));

// Dashboard pages
const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const Kanban = Loadable(lazy(() => import('./modules/kanban/Kanban')));

const WorkspaceCreate = Loadable(lazy(() => import('./pages/dashboard/WorkspaceCreate')));
// const WorkspaceUploadImage = Loadable(lazy(() => import('./pages/dashboard/WorkspaceUploadImage')));
const WorkspaceFinishAll = Loadable(lazy(() => import('./pages/dashboard/WorkspaceFinishAll')));
const WorkspaceCard = Loadable(lazy(() => import('./components/dashboard/workspace/WorkspaceCard')));
const WorkspaceBrowseHeader = Loadable(lazy(() => import('./pages/dashboard/WorkspaceBrowseHeader')));
const WorkspaceInviteUser = Loadable(lazy(() => import('./components/dashboard/workspace/WorkspaceInviteUser')));

const WorkspacePage = Loadable(lazy(() => import('./modules/workspaces/pages/WorkspaceCreate-Page')));
const WorkspaceBrowse = Loadable(lazy(() => import('./pages/dashboard/WorkspaceBrowse')));
const WorkspaceDetails = Loadable(lazy(() => import('./modules/workspaces/pages/CreateWorkspaceDetails-Page')));
//settings
const WorkspaceSettings = Loadable(lazy(() => import('./pages/dashboard/Settings')));
const People = Loadable(lazy(() => import('./pages/dashboard/People')));
const Space = Loadable(lazy(() => import('./pages/dashboard/Spaces')));
const MySettings = Loadable(lazy(() => import('./pages/dashboard/MySettings')));
const List = Loadable(lazy(() => import('./pages/dashboard/List')));
const ListBrowse = Loadable(lazy(() => import('./pages/dashboard/ListBrowse')));
const WorkspaceSideBar = Loadable(lazy(() => import('./components/dashboard/WorkspaceSideBarNav')));
// Error pages

const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));


// Other pages

const Contact = Loadable(lazy(() => import('./pages/Contact')));

const routes: PartialRouteObject[] = [
    {
        path: '/setting',
        children: [
            {
                path: 'Workspace',
                element: (
                    <WorkspacePage/>
                )
            },
            {
                path: 'WorkspaceCard',
                element: (
                    <WorkspaceCard/>
                )
            },

            // {
            //     path: 'settings-sidebar/oneLineSettings',
            //     element: <WorkspaceSettings/>
            // },
            {
                path: 'WorkspaceBrowse',
                element: (
                    <WorkspaceBrowse/>
                )
            }
            ,
            {
                path: 'WorkspaceDetails',
                element: (
                    <WorkspaceDetails/>
                )
            },


            {
                path: 'WorkspacePlayWithSlark',
                element: (
                    <WorkspacePlayWithSlark/>
                )
            },

        ]
    },
    {
        path: 'authentication',
        children: [

            {
                path: 'signupfinal',
                element: (
                    <GuestGuard>
                        <SignUp/>
                    </GuestGuard>
                )
            },
            {
                path: 'loginfinal',
                element: (
                    <GuestGuard>
                        <LogIn/>
                    </GuestGuard>
                )
            },
            {
                path: 'confirmemail',
                element: (
                    <ConfirmEmail/>
                )
            },

        ]
    },


    {
        path: 'contact',
        element: <Contact/>
    },
    // {
    //    path:'workspace-sidebar',
    //     element:(
    //
    //             <WorkspaceSideBar/>
    //     ),
    //     children: [
    //         {
    //             path: 'settings',
    //             element: <WorkspaceSettings/>
    //         },
    //         {
    //             path: 'people',
    //             element: <People/>
    //         }
    //     ]
    //
    //
    // },
    {
        path: 'workspace-settings',
        element: (
            <WorkspaceSideBarLayout />
        ),
        children: [
            {
                path: 'settings',
                element: <WorkspaceSettings />
            },
            {
                path: 'people',
                element: <People />
            },
            {
                path: 'teams',
                element: <Teams/>
            },
            {
                path: 'spaces',
                element: <Space/>
            },
            {
                path: 'ie',
                element: <IE/>
            },
            {
                path: 'security-permission',
                element: <SecurityPermissions/>
            },
            {
                path: 'my-Settings',
                element: <MySettings/>
            },
            {
                path: 'workspaces',
                element: <WorkspaceBrowseHeader/>
            },
            {
                path: 'notifications',
                element: <Notifications />
            },
            {
                path: 'rewards',
                element: <Rewards />
            },
            {
                path: 'log-out',
                element: <></>
            }
        ]
    },
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <DashboardLayout/>
            </AuthGuard>
        ),
        children: [
            {
                path: '/',
                element: <Kanban/>
            },
            {
                path: 'account',
                element: <Account/>
            },
            {
                path: 'kanban',
                element: <Kanban/>
            },
            {
                path: 'list',
                element: <List/>
            },
            {
                path:'listBrowse',
                element:<ListBrowse />
            },
            //
            // {
            //     path: 'settings-sidebar/twoLineSettings',
            //     element: <People/>
            // },
            // {
            //     path: 'settings-sidebar/space',
            //     element: <Space/>
            // },
            // {
            //     path: 'workspaces',
            //     children: [
            //         {
            //             path: '/',
            //             element: <ProductList />
            //         },
            //
            //     ]
            // },


            {
                path: 'workspaces',
                children: [
                    {
                        path: 'new',
                        element: <WorkspaceCreate/>
                    },
                    // {
                    //     path:'upload',
                    //     element: <WorkspaceUploadImage />
                    // },
                    {
                        path: 'finish',
                        element: <WorkspaceFinishAll/>
                    },
                    {
                        path: 'browse',
                        element: <WorkspaceBrowse/>
                    },
                    {
                        path: 'card',
                        element: <WorkspaceCard/>
                    },

                    {
                        path: 'invite-user',
                        element: <WorkspaceInviteUser/>
                    },

                ],

            },

        ]
    },
    {
        path: '*',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: (
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                )
            },
            {
                path: '401',
                element: <AuthorizationRequired/>
            },
            {
                path: '404',
                element: <NotFound/>
            },
            {
                path: '500',
                element: <ServerError/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ],

    },


];

export default routes;
