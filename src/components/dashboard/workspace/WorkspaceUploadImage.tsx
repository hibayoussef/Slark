import type {FC} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Box,
    Card,
    Button,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import BackupOutlinedIcon from '@material-ui/icons/Backup';
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import {useNavigate} from "react-router-dom";


const WorkspaceUploadImage: FC = () => {

    const isMountedRef = useIsMountedRef();

    const navigation = useNavigate();
    const onBack = () => {
        console.log('Create')
        navigation('/dashboard/workspaces/new');
    }

    const onNext = () =>{
        console.log('Create')
        navigation('/dashboard/workspaces/finish');
    }

    return (


        <Card>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        md={12}
                        xs={12}
                        sx={{mt: 1.6, ml: 1.8 , mr:1.6}}
                    >


                        <Typography sx={{mt: 3 /*, ml: 3*/}}
                                    color="textSecondary"
                            // variant="overline"
                        >
                            Customize your Workspace's avatar
                        </Typography>

                        <Box sx={{mt: 4 /*, ml: 3*/}}>
                            {/* Avatar*/}

                            <div style={{position: 'relative'}}>

                                <Card
                                    // variant="circular"
                                    style={{
                                        width: 350, height: 320,
                                        border: '1px dashed #cccdde',
                                        borderRadius: '6px',
                                        backgroundColor: '#222b36'
                                    }}
                                    // onChange={ UploadImageClick }
                                >
                                    <CardContent>
                                        <BackupOutlinedIcon
                                            style={{
                                                fontSize: '2.6rem',
                                                width: '100%',
                                                color: "#BDBDBD",
                                                marginTop: '3rem'

                                            }}
                                        />


                                        <Typography   style={{
                                            alignItems: 'center',
                                            fontSize: '1.1rem',
                                            color: '#777', paddingTop: '2rem',
                                            position: 'absolute',
                                            paddingRight: '1.6rem',
                                            paddingLeft: '1.6rem'
                                        }}>
                                            Drop an image or {' '}

                                            <input
                                                accept="image/*"

                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button  component="span" >
                                                    Upload
                                                </Button>
                                            </label>

                                            {/*<Link to="/" onClick={}>*/}
                                            {/*    Browse*/}
                                            {/*</Link>*/}
                                            {/*<Button onClick={imageSelectHandler}>Upload</Button>*/}
                                            {/*<input type='file' onChange={imageSelectHandler}/>*/}
                                        </Typography>


                                    </CardContent>


                                </Card>
                            </div>

                        </Box>


                        <Box
                            sx={{
                                display: 'flex',
                                mt: 3
                            }}
                        >
                            {/*onBack &&*/ (
                                <Button
                                    color="primary"
                                    onClick={onBack}
                                    size="large"
                                    variant="text"
                                >
                                    Previous
                                </Button>
                            )}
                            <Box sx={{flexGrow: 1}}/>
                            <Button
                                color="primary"
                                onClick={onNext}
                                // disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                            >
                                Next
                            </Button>
                        </Box>

                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
};


export default WorkspaceUploadImage;

