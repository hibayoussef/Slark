import * as Yup from "yup";
import { Formik } from "formik";
import { useEffect } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { useAuthModule } from "../../zustand";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Login from '../../../authentication/pages/Login-Pag';


 const RegisterCom = () => {

    const isMountedRef = useIsMountedRef();
    const user = useAuthModule((state) => state.user);
    console.log("this is the user from the state 1 from Reg-Com: ", user);

    const createUserWithNameAndEmailAndPassword = useAuthModule(
        (state) => state.createUserWithNameAndEmailAndPassword
    );

    const shouldNavigate = useAuthModule(
        (state) => state.shouldNavigate
    );


    useEffect(() =>{
        if(shouldNavigate){
           console.log('jjjjjjjjjj');
        }
    }, [shouldNavigate]);
  return(
      <>
      <Formik
          initialValues={{
              name: "",
              email: "",
              password: "",
              submit: null
          }}
          //to show an error message when the user fill inputs
          validationSchema={Yup.object().shape({
              name: Yup.string()
                  .min(3 , 'Must be 3 characters or more')
                  .required("Name is required"),
              email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
              password: Yup.string()
                  .min(6)
                  .max(255)
                  .required("Password is required"),
          })}

          //Values here is the value in initial values in useFormik

          onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
              try {
                  await createUserWithNameAndEmailAndPassword(
                       values
                  ).then(()=>{
                      console.log('inside it');
                      <Login />
                  })
                  // console.log("The Values that i want to display them: ",values.email,values.password , values.name)
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
                values,
            }): JSX.Element => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
              // InputProps={{
              //   startAdornment: (
              //       <InputAdornment position="start">
              //         <PersonOutlineOutlinedIcon />
              //       </InputAdornment>
              //   ),
              // }}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              fullWidth
              margin="normal"
              name="name"
              type="name"
              variant="outlined"
              placeholder="User Name"
          />
          <TextField
              // InputProps={{
              //   startAdornment: (
              //       <InputAdornment position="start">
              //         <DraftsOutlinedIcon />
              //       </InputAdornment>
              //   ),
              // }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              placeholder="example@site.com"
              fullWidth
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
          />
          <TextField
              // InputProps={{
              //   startAdornment: (
              //       <InputAdornment position="start">
              //         <LockOutlinedIcon />
              //       </InputAdornment>
              //   ),
              // }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              placeholder="password"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
          />
          <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
                mt: 2,
              }}
          >
            {/*<Checkbox*/}
            {/*    // checked={values.policy}*/}
            {/*    color="primary"*/}
            {/*    name="policy"*/}
            {/*/>*/}
            {/*<Typography color="textSecondary" variant="body2">*/}
            {/*  I have read the{" "}*/}
            {/*  <Link color="primary" component="a" href="#">*/}
            {/*    Terms and Conditions*/}
            {/*  </Link>*/}
            {/*</Typography>*/}
          </Box>
            <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
            <Box sx={{ mt: 2 }}>
            <Button
                style={{
                  marginTop: "1rem",
                  maxHeight: "3.4rem",
                  minHeight: "3.4rem",
                }}
                color="primary"
                // onClick={ signupClicked }
                disabled={isSubmitting}
                // onClick={() => signupClicked(values)}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
            >
              Register
            </Button>
          </Box>
        </form>
          )}
     </Formik>
      </>
  )
}

export default RegisterCom;