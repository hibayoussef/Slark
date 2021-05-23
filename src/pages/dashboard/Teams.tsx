import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box
} from '@material-ui/core';


const Teams: FC = () => {

    return (
        <>
            <Helmet>
                <title>Settings: Teams</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >

                Hello I'm in Teams Page

            </Box>
        </>
    );
};

export default Teams ;
