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
import {useWorkspaceModule} from '../zustand';
import useIsMountedRef from "../../../hooks/useIsMountedRef";


const WorkspaceCreateComp: FC = () => {

    const isMountedRef = useIsMountedRef();
    const workspaceData = useWorkspaceModule((state) => state.workspace)

    console.log("inside component 1: ", workspaceData);

    const createWorkspace = useWorkspaceModule(
        (state) => state.createWorkspace
    );

    return (


        <Formik
            initialValues={{
                workspaceName: '',
                submit: null
            }}
            validationSchema={
                Yup
                    .object()
                    .shape({
                        workspaceName: Yup
                            .string()
                            .min(3, 'Must be at least 3 characters')
                            .max(255)
                            .required('Required'),
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
                    ).then(() => {
                        console.log('inside Component 2:');
                    })
                    // console.log("The Values that i want to display them: ",values.email,values.password , values.name)
                    if (isMountedRef.current) {
                        setStatus({success: true});
                        setSubmitting(false);
                    }

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
                  touched,
                  values
              }): JSX.Element => (
                <form
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
                                    md={6}
                                    xs={12}
                                >
                                    <Typography sx={{mt: 3}}
                                                color="textSecondary"
                                        // variant="overline"
                                    >
                                        Name your Workspace:
                                    </Typography>


                                    <Box sx={{mt: 2}}>
                                        <TextField
                                            error={Boolean(touched.workspaceName && errors.workspaceName)}
                                            helperText={touched.workspaceName && errors.workspaceName}
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.workspaceName}
                                            name="workspaceName"
                                            variant="outlined"
                                            placeholder="Workspace Name"
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


export default WorkspaceCreateComp;

