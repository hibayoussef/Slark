import type {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSnackbar} from 'notistack';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormHelperText,
    Grid,
    TextField,
} from '@material-ui/core';
import {useWorkspaceModule} from '../zustand';
import WorkspaceUploadImage from './WorkspaceUploadImage'
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import {useAuthModule} from "../../../modules/authentication/zustand";
import InviteUser from './WorkspaceInviteUser';
import React from "react";

const WorkspacesCreateForm: FC = (props) => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const isMountedRef = useIsMountedRef();



    const [workspaceName , setWorkspaceName] = React.useState('');
    const [email , setEmail] = React.useState('');

    //  1-  We define a var to store uploaded file
    const [file , setFile] = React.useState(null);

    const createWorkspace = useWorkspaceModule(
        (state) => state.createWorkspace
    );

    // const image = useWorkspaceModule(
    //     (state)=> state.
    // )
    return (
        <Formik
            initialValues={{
                // images: [],
                name: '',
                submit: null
            }}
            validationSchema={
                Yup
                    .object()
                    .shape({
                        // images: Yup.array(),
                        name: Yup.string().max(255).required(),
                    })
            }
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }): Promise<void> => {
                try {
                    // NOTE: Make API request
                    // await createWorkspace(
                    //     values
                    // )

                    console.log('values: ', values);

                    if (isMountedRef.current) {
                        setStatus({success: true});
                        setSubmitting(false);
                    }

                    enqueueSnackbar('Workspaces Created', {
                        anchorOrigin: {
                            horizontal: 'right',
                            vertical: 'top'
                        },
                        variant: 'success'
                    });
                    navigate('/workspace-settings/workspaces');
                } catch (err) {
                    console.error(err);
                    if (isMountedRef.current) {
                        setStatus({success: false});
                        setErrors({submit: err.message});
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  touched,
                  values
              }): JSX.Element => (
                <form
                    onSubmit={handleSubmit}
                    {...props}
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xs={12}
                        >
                            <Card>
                                <CardHeader title="Name your Space:"/>
                                <CardContent>

                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={($event) => {
                                            setWorkspaceName($event.target.value);
                                            handleChange($event);
                                        }}
                                        value={values.name}
                                        variant="outlined"
                                        placeholder="Space Name"
                                    />

                                </CardContent>
                            </Card>

                            <Box sx={{mt: 3}}>
                                // We provide a call back to the following component "onImageUploaded"
                                // Once this function invoked we call setFile(with response coming back)
                                <WorkspaceUploadImage onImageUploaded={(file) => {
                                    console.log({file})
                                    setFile(file);
                                }} />
                            </Box>

                            {/*<Box sx={{mt: 3}}>*/}
                            {/*    <InviteUser onEmailSend={(email) => {*/}
                            {/*        console.log({email})*/}
                            {/*        setEmail(email);*/}
                            {/*    }} />*/}
                            {/*</Box>*/}



                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xs={12}
                        >

                            {errors.submit && (
                                <Box sx={{mt: 3}}>
                                    <FormHelperText error>
                                        {errors.submit}
                                    </FormHelperText>
                                </Box>
                            )}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    mt: 3
                                }}
                            >
                                <Button
                                    onClick={()=> createWorkspace({'name':workspaceName,'image': file._id}) }
                                    color="primary"
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                    Create Space
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default WorkspacesCreateForm;
