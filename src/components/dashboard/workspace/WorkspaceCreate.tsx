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
import {useWorkspaceModule} from './zustand';
import WorkspaceUploadImage from './WorkspaceUploadImage'
import useIsMountedRef from "../../../hooks/useIsMountedRef";

const WorkspacesCreateForm: FC = (props) => {
    const isMountedRef = useIsMountedRef();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();


    const workspaceData = useWorkspaceModule((state) => state.workspace)

    console.log("inside component 1: ", workspaceData);
    const createWorkspace = useWorkspaceModule(
        (state) => state.createWorkspace
    );

    const inviteUserByEmail = useWorkspaceModule(
        (state) => state.inviteUsersByEmail
    );

    return (
        <Formik
            initialValues={{
                // images: [],
                name: '',
                userEmail:'',
                submit: null
            }}
            validationSchema={
                Yup
                    .object()
                    .shape({
                        // images: Yup.array(),
                        name: Yup.string().max(255).required(),
                        userEmail: Yup.string()
                            .email("Must be a valid email")
                            .max(255)
                    })
            }
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }): Promise<void> => {
                try {
                    // NOTE: Make API request
                    await createWorkspace(
                        values
                    )

                    await inviteUserByEmail(
                        values
                    )


                    if (isMountedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }

                    enqueueSnackbar('Workspaces Created', {
                        anchorOrigin: {
                            horizontal: 'right',
                            vertical: 'top'
                        },
                        variant: 'success'
                    });
                    navigate('/dashboard/workspaces/header');
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
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Card>
                                <CardHeader title="Name your Workspace:"/>
                                <CardContent>

                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        variant="outlined"
                                        placeholder="Workspace Name"
                                    />

                                </CardContent>
                            </Card>

                            {/*Upload Image*/}
                            <Box sx={{mt: 3}}>
                                <WorkspaceUploadImage/>
                            </Box>

                            {/*invite User*/}
                            <Box sx={{mt: 3}}>

                                <Card>
                                    <CardHeader title="  Invite people to your Workspace"/>
                                    <CardContent>

                                        <TextField
                                            error={Boolean(touched.userEmail && errors.userEmail)}
                                            fullWidth
                                            helperText={touched.userEmail && errors.userEmail}
                                            name="userEmail"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.userEmail}
                                            variant="outlined"
                                            placeholder="Enter email addresses (or past multiple)"
                                        />

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                mt: 3
                                            }}
                                        >

                                            {/*{errors.submit && (*/}
                                            {/*    <Box sx={{mt: 3}}>*/}
                                            {/*        <FormHelperText error>*/}
                                            {/*            {errors.submit}*/}
                                            {/*        </FormHelperText>*/}
                                            {/*    </Box>*/}
                                            {/*)}*/}
                                            <Box sx={{flexGrow: 1}}/>
                                            {/*<Button*/}
                                            {/*    color="primary"*/}
                                            {/*    onClick={onNext}*/}
                                            {/*    disabled={isSubmitting}*/}
                                            {/*    type="submit"*/}
                                            {/*    variant="contained"*/}
                                            {/*>*/}
                                            {/*    invite*/}
                                            {/*</Button>*/}
                                        </Box>
                                    </CardContent>
                                </Card>

                            </Box>

                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
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
                                    color="primary"
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                    Create Workspace
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
