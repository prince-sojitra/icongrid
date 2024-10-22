import * as React from 'react';
import { useState } from 'react'; // Import useState hook
import { Box, CssBaseline, Container, Stack, Typography, Card, CardContent, FormControl, FormLabel, TextField, OutlinedInput, InputAdornment, IconButton, Checkbox, Button, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FaEye } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangePassword = (event) => setPassword(event.target.value);

    let history = useHistory()

    const submit = (event) => {
        event.preventDefault(); // Prevent default form submission

        let value = { email: email, password: password }

        axios.post('http://localhost:3001/admin/login', value)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
                history.push('/admin')
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })

    };

    return (
        <Box className="color" display={'flex'} alignItems={'center'}>

            <CssBaseline />
        <section> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                {/* <div class="signin">

                    <div class="content">

                        <h2>Sign In</h2>

                        <div class="form">


                            <div onSubmit={submit} class="inputBox">

                                <input type='text' size='small' value={email} onChange={handleChangeEmail} required /> <i>Email</i>

                            </div>

                            <Box display={'flex'} className="inputBox">
                                <Box>
                                    <input
                                        type={showPassword ? 'text' : 'password'}

                                        size="small"
                                        value={password}
                                        onChange={handleChangePassword}

                                    />
                                    <i>Password</i>


                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{ color: '#fff' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </Box>
                            </Box>



                    

                        <div class="links" > <a href="#">Forgot Password</a> <a href="#">Signup</a>

                        </div>

                        <div class="inputBox">

                            <input type="submit" value="Login" />

                        </div>


                    </div>
                </div>

            </div> */}

        </section>
            <Container maxWidth="sm" >

                <Grid container justifyContent="center" padding="50px 0px" zIndex={999} position={'relative'}>

                    <Grid item sm={8} xs={12}>

                        

                        <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                            <CardContent sx={{ padding: "30px 20px" }}>
                                <Typography variant="h5" component="div" fontWeight={700} textAlign="center" className='nunito-sans' color="#ffbc06" >
                                    Login to Your Account
                                </Typography>
                                <Typography variant="body2" textAlign="center" marginBottom="22px" color={'#aaa'}>
                                    Enter your email & password to login
                                </Typography>
                                <Stack spacing={2}>
                                    <form onSubmit={submit}> 
                                    

                                        <Box sx={{padding:'20px 0px 10px 0px'}}>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#fff", marginBottom: "8px" }} >Email</FormLabel>
                                            <TextField sx={{border:'1px solid #fff'}} type='text' size='small' value={email} onChange={handleChangeEmail} />
                                        </FormControl>
                                        </Box>

                                        <Box sx={{padding:'10px 0px'}}>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#fff", marginBottom: "8px" }} >Password</FormLabel>
                                            <OutlinedInput
                                            sx={{border:'1px solid #fff'}}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment >
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                size='small'
                                                value={password}
                                                onChange={handleChangePassword}
                                            />
                                        </FormControl>
                                        </Box>

                                        <Stack direction="row" alignItems="center">
                                            <Checkbox disableRipple />
                                            <Typography color={'#fff'}>
                                                Remember me
                                            </Typography>
                                        </Stack>
                                        <Button variant="contained" type='submit' sx={{margin:'20px 0px 0px 0px',width:'100%', textTransform: "capitalize", fontSize: "16px", backgroundColor: "#fff",color:'#272727',fontWeight:'700' }}>
                                            Login
                                        </Button>
                                    </form>

                                </Stack>
                            </CardContent>
                        </Card>

                    </Grid>

                </Grid>
            </Container>


        </Box > 
    )
}

export default Login;