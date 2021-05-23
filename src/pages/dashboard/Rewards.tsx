import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box
} from '@material-ui/core';


const Rewards: FC = () => {

    return (
        <>
            <Helmet>
                <title>Settings: Notifications</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >

                Hello I'm in Rewards Page

            </Box>
        </>
    );
};

export default Rewards;
