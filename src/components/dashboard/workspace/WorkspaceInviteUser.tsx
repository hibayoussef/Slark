import type {FC} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Box, Button,
    Card,
    CardContent,
    CardHeader, FormHelperText,
    Grid,
    TextField
} from '@material-ui/core';
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import {useWorkspaceModule} from '../workspace/zustand';


const WorkspacesInviteUser: FC = (props) => {
    const isMountedRef = useIsMountedRef();
    const inviteUserByEmail = useWorkspaceModule(
        (state) => state.inviteUsersByEmail
    );

    return (<>
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
                    )

                    if (isMountedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }


                    // navigate('/dashboard/products');
                } catch (err) {
                    if (isMountedRef.current) {
                        console.error(err);
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
                                <Button
                                    color="primary"
                                    // onClick={onNext}
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                   invite
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                </form>
            )}
        </Formik>
    </>)
};

export default WorkspacesInviteUser;

