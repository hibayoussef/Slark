import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box
} from '@material-ui/core';


const MySettings: FC = () => {

    return (
        <>
            <Helmet>
                <title>Settings: My Settings</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >

                Hello I'm in MySettings Page

            </Box>
        </>
    );
};

export default MySettings;
