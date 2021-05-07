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


// Authentication pages
const LogIn = Loadable(lazy(() => import('./modules/authentication/pages/Login-Pag')));
const SignUp = Loadable(lazy(() => import('./modules/authentication/pages/Register-Pag')));

// Dashboard pages
const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const Kanban = Loadable(lazy(() => import('./modules/kanban/Kanban')));


// Error pages

const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));


// const Workspace = Loadable(lazy(() => import('../src/modules/workspaces/components/workspace')));
// Other pages

const Contact = Loadable(lazy(() => import('./pages/Contact')));

const routes: PartialRouteObject[] = [
    {
        path:'/setting',
        children: [
            {
                path: 'Workspace',
                element: (
                    <GuestGuard>
                        {/* <Workspace></Workspace> */}
                    </GuestGuard>
                )
            }
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
                        <LogIn />
                    </GuestGuard>
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
       
    }
];

export default routes;
