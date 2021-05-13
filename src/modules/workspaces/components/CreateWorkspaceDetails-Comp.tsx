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
import PropTypes from "prop-types";


interface WorkspaceDetailsProps {
    onBack?: () => void;
    onNext?: () => void;
}

const WorkspaceCreateDetailsComp: FC<WorkspaceDetailsProps> = (props) => {

    const isMountedRef = useIsMountedRef();
    const {onBack, onNext} = props;

    const userEmail = useWorkspaceModule((state) => state.userEmail)
    console.log('userEmail:', userEmail);
    const inviteUserByEmail = useWorkspaceModule(
        (state) => state.inviteUsersByEmail
    );

    return (
        <Formik
            initialValues={{
                userEmail: '',
                submit: null
            }}
            validationSchema={
                Yup
                    .object()
                    .shape({
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
                    await inviteUserByEmail(
                        values
                    ).then(() => {
                        console.log('inside Component 2:');
                    })
                    // console.log("The Values that i want to display them: ",values.email,values.password , values.name)
                    if (isMountedRef.current) {
                        setStatus({success: true});
                        setSubmitting(false);
                        if (onNext) {
                            onNext();
                        }
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
}


WorkspaceCreateDetailsComp.propTypes = {
    onBack: PropTypes.func,
    onNext: PropTypes.func
};

export default WorkspaceCreateDetailsComp;