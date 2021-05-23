import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box
} from '@material-ui/core';


const ImportAndExport: FC = () => {

    return (
        <>
            <Helmet>
                <title>Settings: Import & Export</title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 8
                }}
            >

                Hello I'm in Import and Export Page

            </Box>
        </>
    );
};

export default ImportAndExport;
