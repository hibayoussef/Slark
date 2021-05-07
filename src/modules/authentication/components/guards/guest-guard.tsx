import type {FC, ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useAuthModule} from "../../zustand";

interface GuestGuardProps {
    children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({children}) => {
    const isAuthenticated = useAuthModule(state => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/dashboard/account"/>;
        // console.log('Hi')
    }

    return <>{children}</>;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
