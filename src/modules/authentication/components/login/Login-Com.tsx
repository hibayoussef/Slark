import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    FormHelperText,
    TextField
} from '@material-ui/core';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import {useAuthModule} from "../../zustand";
import InputAdornment from "@material-ui/core/InputAdornment";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginFirebase: FC = (props) => {
    const isMountedRef = useIsMountedRef();
    const {user, loginUserWithEmailAndPassword, loginError} = useAuthModule((state) => state);
    console.log("this is the user from the state 1 from Reg-Com: ", user);
    const navigation =  useNavigate();
    useEffect(() => {
        if(user) {
            console.log('logged in user: ', user);
            navigation('/dashboard');
        }
    } , [user])


    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >

            </Box>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    submit: null
                }}
                validationSchema={
                    Yup
                        .object()
                        .shape({
                            email: Yup
                                .string()
                                .email('Must be a valid email')
                                .max(255)
                                .required('Email is required'),
                            password: Yup
                                .string()
                                .max(255)
                                .required('Password is required')
                        })
                }
                onSubmit={async (values, {
                    setErrors,
                    setStatus,
                    setSubmitting
                }): Promise<void> => {
                    try {
                        await loginUserWithEmailAndPassword(values);

                        if (isMountedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (isMountedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
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
                        <TextField
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <DraftsOutlinedIcon />
                            //         </InputAdornment>
                            //     ),
                            // }}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            placeholder="Enter your email"
                            fullWidth
                            margin="normal"
                            name="email"
                            type="email"
                            variant="outlined"
                        />
                        <TextField
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <LockOutlinedIcon />
                            //         </InputAdornment>
                            //     ),
                            // }}
                            placeholder="Enter password"
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}

                            fullWidth
                            margin="normal"
                            name="password"
                            type="password"
                            variant="outlined"
                        />
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>
                                    {errors.submit}
                                </FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                style={{
                                    marginTop: "1rem",
                                    maxHeight: "3.4rem",
                                    minHeight: "3.4rem",
                                }}
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Log in
                            </Button>

                        </Box>
                        {loginError && <p>{loginError}</p> }
                        {/*<Box sx={{ mt: 2 }}>*/}
                        {/*    <Alert severity="info">*/}
                        {/*        <div>*/}
                        {/*            You can use*/}
                        {/*            {' '}*/}
                        {/*            <b>demo@devias.io</b>*/}
                        {/*            {' '}*/}
                        {/*            and password*/}
                        {/*            {' '}*/}
                        {/*            <b>Password123!</b>*/}
                        {/*        </div>*/}
                        {/*    </Alert>*/}
                        {/*</Box>*/}
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginFirebase;
