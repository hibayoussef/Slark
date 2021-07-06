import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box
} from '@material-ui/core';


const Workspaces: FC = () => {

    return (
        <>
            <Helmet>
                <title>Settings: Workspaces</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >

                Hello I'm in Workspaces Page

            </Box>
        </>
    );
};

export default Workspaces ;
