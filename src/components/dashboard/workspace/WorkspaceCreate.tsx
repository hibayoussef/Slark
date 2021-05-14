import type {FC} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Box,
    Card,
    Button,
    CardContent,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import {useWorkspaceModule} from './zustand';
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import {useNavigate} from "react-router-dom";


const WorkspaceCreate: FC = () => {

    const isMountedRef = useIsMountedRef();
    const workspaceData = useWorkspaceModule((state) => state.workspace)
    const userEmail = useWorkspaceModule((state) => state.userEmail)
    console.log('userEmail:', userEmail);


    console.log("inside component 1: ", workspaceData);

    const createWorkspace = useWorkspaceModule(
        (state) => state.createWorkspace
    );
    const inviteUserByEmail = useWorkspaceModule(
        (state) => state.inviteUsersByEmail
    );

    const navigation =  useNavigate();
    const onNext = () =>{
        console.log('Create')
        navigation('/dashboard/workspaces/upload');
    }

    return (


        <Formik
            initialValues={{
                name: '',
                userEmail: ''
            }}
            validationSchema={
                Yup
                    .object()
                    .shape({
                        name: Yup
                            .string()
                            .min(3, 'Must be at least 3 characters')
                            .max(255)
                            .required('Required'),
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
                    await createWorkspace(
                        values
                    )

                    await inviteUserByEmail(
                        values
                    ).then(() => {
                        console.log('inside Component 2:');
                    })

                    console.log('values' , values)
                    if (isMountedRef.current) {
                        setStatus({success: true});
                        setSubmitting(false);
                    }

                } catch (err) {
                    console.error(err);
                    if (isMountedRef.current) {
                        setStatus({success: false});
                        // setErrors({submit: err.message});
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
                  touched,
                  values
              }): JSX.Element => (
                <form
                    noValidate
                    onSubmit={handleSubmit}

                >
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
                                    sx={{ mt:1.6 ,  ml: 1.8 , mr: 1.6}}

                                >
                                    <h3>Workspaces details</h3>
                                    <Typography sx={{mt: 3}}
                                                color="textSecondary"
                                                // variant="overline"
                                    >
                                        Name your Workspace:
                                    </Typography>


                                    <Box sx={{mt: 2}}>
                                        <TextField
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            name="name"
                                            variant="outlined"
                                            placeholder="Workspace Name"
                                        />
                                    </Box>

                                    <Typography sx={{mt: 3}}
                                                color="textSecondary"
                                        // variant="overline"
                                    >
                                        Invite people to your Workspace:
                                    </Typography>

                                    <Box sx={{mt: 2}}>
                                        <TextField
                                            error={Boolean(touched.userEmail && errors.userEmail)}
                                            helperText={touched.userEmail && errors.userEmail}
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.userEmail}
                                            name="userEmail"
                                            variant="outlined"
                                            placeholder="Enter email addresses (or past multiple)"
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3
                                        }}
                                    >

                                        <Box sx={{flexGrow: 1}}/>
                                        <Button
                                            color="primary"
                                            // onClick={onNext}
                                            disabled={isSubmitting}
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
                </form>
            )}
        </Formik>
    );
};


export default WorkspaceCreate;

