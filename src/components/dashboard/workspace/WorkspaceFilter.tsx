
import type {
    FC
} from 'react';
import {
    Box,
    Card,
    Input
} from '@material-ui/core';
import SearchIcon from '../../../icons/Search';


const WorkspaceBrowseFilter: FC = (props) => {


    return (
        <Card {...props}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    p: 2
                }}
            >
                <SearchIcon fontSize="small" />
                <Box
                    sx={{
                        flexGrow: 1,
                        ml: 3
                    }}
                >
                    <Input
                        disableUnderline
                        fullWidth
                        // onChange={handleInputChange}
                        // onKeyUp={handleInputKeyup}
                        placeholder="Search for workspace"
                        // value={inputValue}
                    />
                </Box>
            </Box>

        </Card>
    );
};

export default WorkspaceBrowseFilter;
