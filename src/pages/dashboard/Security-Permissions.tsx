import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box
} from '@material-ui/core';


const SecurityPerm: FC = () => {

    return (
        <>
            <Helmet>
                <title>Settings: Security & Permissions</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >

                Hello I'm in SecurityPerm Page

            </Box>
        </>
    );
};

export default SecurityPerm;
