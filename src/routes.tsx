import {Suspense, lazy} from 'react';
import type {PartialRouteObject} from 'react-router';
import {Navigate} from 'react-router-dom';
import AuthGuard from './modules/authentication/components/guards/auth-guard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import GuestGuard from './modules/authentication/components/guards/guest-guard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';
import React from 'react';

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen/>}>
        <Component {...props} />
    </Suspense>
);

const Modal = Loadable(lazy(() => import('./components/dashboard/WorkspaceSettings/WorkspacesGroup')));
const WorkspaceSideBar = Loadable(lazy(() => import('./components/dashboard/WorkspaceSettings/Settings/WorkspaceSidebar')));
const Settings = Loadable(lazy(() => import('./components/dashboard/WorkspaceSettings/Settings/WorkspaceSettings')))
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
            {
                path: 'modal',
                element: (
                    <Modal/>
                )
            }

        ]
    },

    {
        path: 'contact',
        element: <Contact/>
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
            // {
            //     path: 'workspaces',
            //     children: [
            //         // {
            //         //     path: '/',
            //         //     element: <ProductList />
            //         // },
            //         {
            //             path: 'new',
            //             element: <WorkspaceCreate />
            //         }
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
                        path: 'header',
                        element: <WorkspaceBrowseHeader/>
                    },
                    {
                        path: 'invite-user',
                        element: <WorkspaceInviteUser/>
                    },


                ]
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
    {
        path: 'Settings',
        children: [{
            path: 'mySettings',
            element: <WorkspaceSideBar/>
        },
            {
                path: 'workspaceSettings',
                element: <Settings/>
            }
        ]

    }
];

export default routes;
