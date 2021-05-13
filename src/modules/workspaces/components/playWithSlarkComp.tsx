import type {FC} from 'react';
import {
    Box,
    Card,
    Button,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import SpaRoundedIcon from '@material-ui/icons/SpaRounded';

const onPlayWithSlark = () =>{
    console.log('in onPlayWithSlark')
}
const WorkspaceCreateDetailsComp: FC = () => {


    return (
                <form

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
                                    <Typography sx={{mt: 6}}
                                                style = {{ fontSize: '1.6rem', paddingLeft: '6rem', paddingRight:'6rem'}}
                                                color="textSecondary"
                                        // variant="overline"
                                    >
                                            That's it. Now go and change the world!
                                            And don't forget to have fun {' '}

                                           <EmojiEmotionsRoundedIcon style={{
                                               // width: '4rem',
                                               // height:'2.4rem',
                                               color: "yellow",
                                               paddingLeft: '0.1rem',
                                               // paddingTop: '0.5rem'

                                           }} />
                                           <SpaRoundedIcon
                                               style={{
                                                   // width: '4rem',
                                                   // height:'2.4rem',
                                                   color: "yellow",

                                                   // paddingTop: '0.5rem'

                                               }}/>
                                    </Typography>




                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3
                                        }}
                                    >
                                        <Box sx={{flexGrow: 1}}/>
                                        <Button
                                            style={{
                                                marginTop: "1rem",
                                                maxHeight: "3.4rem",
                                                minHeight: "3.4rem",
                                            }}
                                            color="primary"
                                            // disabled={isSubmitting}
                                            onClick={ onPlayWithSlark }
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            play with slark
                                        </Button>


                                    </Box>

                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </form>

    );
}

export default WorkspaceCreateDetailsComp;