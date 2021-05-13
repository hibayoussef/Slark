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
                workspaceName: '',
                userEmail: '',
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
                    ).then(() => {
                        console.log('inside Component 2:');
                    })

                    await inviteUserByEmail(
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
                                    md={12}
                                    xs={12}
                                    sx={{ mt:1.6 ,  ml: 1.8 , mr: 1.6}}

                                >
                                    <h3>Project details</h3>
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


                                    {/*<Typography sx={{mt: 3}}*/}
                                    {/*            color="textSecondary"*/}
                                    {/*    // variant="overline"*/}
                                    {/*>*/}
                                    {/*    Customize your Workspace's avatar:*/}
                                    {/*</Typography>*/}
                                    {/*<Box sx={{mt: 2}}>*/}
                                    {/*    <div>*/}

                                    {/*        <Avatar*/}
                                    {/*            variant="circular"*/}
                                    {/*            style={{*/}
                                    {/*                width: 160, height: 160,*/}
                                    {/*                border: '1px dashed #cccdde',*/}
                                    {/*                borderRadius: '140px',*/}
                                    {/*                backgroundColor: '#222b36',*/}
                                    {/*            }}*/}
                                    {/*            // onChange={ UploadImageClick }*/}
                                    {/*        >*/}

                                    {/*              <Box style={{ marginBottom: '4rem',*/}
                                    {/*                  marginLeft: '2rem'}}>*/}
                                    {/*                  <BackupOutlinedIcon*/}
                                    {/*                      style={{*/}
                                    {/*                          width: '1.7rem',*/}
                                    {/*                          color: "#BDBDBD",*/}

                                    {/*                      }}*/}
                                    {/*                  />*/}

                                    {/*              </Box>*/}

                                    {/*          <Box>*/}
                                    {/*              <Typography style={ {  fontSize: '0.9rem',*/}
                                    {/*                  color: '#777', paddingTop: '2rem'*/}
                                    {/*                  ,paddingRight: '2rem'*/}
                                    {/*              }}>*/}
                                    {/*                  Drop an image or {' '}*/}
                                    {/*                  /!*<Link to="/" onClick={}>*!/*/}
                                    {/*                  /!*    Browse*!/*/}
                                    {/*                  /!*</Link>*!/*/}
                                    {/*              </Typography>*/}

                                              {/*</Box>*/}

                                            {/*</Avatar>*/}

                                        {/*</div>*/}
                                    {/*</Box>*/}


                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3
                                        }}
                                    >

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
};


export default WorkspaceCreate;

