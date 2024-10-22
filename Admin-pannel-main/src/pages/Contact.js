
import { Box, Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { FaRocketchat } from "react-icons/fa";

function Contact() {
    useEffect(() => {
        Gotoup()
      }, [])
      const Gotoup = () => {
    
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    
      }
    return (
        <Box sx={{ padding: '65px 0px' }}>
            <Box >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ margin: '30px 0px' }}>
                        <Box className='center'
                            sx={{ fontSize: {xs:'21px',sm:'36px'}, fontWeight: '700', color: '#272727' }}
                        >Contact Our Friendly Team

                        </Box>
                        <Box className='center'
                            sx={{ color: '#888888' }}
                        >
                            Let us know how we can help.
                        </Box>
                    </Box>

                    <Box>
                        <Container maxWidth="lg">
                            <Grid container justifyContent={'space-around'}>
                                <Grid md={4} lg={3} xs={12} sx={{ margin: '20px 10px', padding: '20px 20px', border: '1px solid #dcdcdc', borderRadius: '7px' }}>
                                    <Box sx={{ marginBottom: '20px', padding: '10px 15px', border: '1px solid #dcdcdc', borderRadius: '7px', display: 'inline-block' }}>
                                        <FaRocketchat fontSize={'20px'} />
                                    </Box>
                                    <Box sx={{ paddingTop: '30px', fontWeight: '600', fontSize: '20px' }}>
                                        Chat to team
                                    </Box>
                                    <Box fontSize={'15px'} color={'#888888'}>
                                        Chat to our Friendly team 
                                    </Box>
                                    <Box sx={{ marginBottom: '15px', paddingTop: '20px', fontWeight: '600', fontSize: '15px', borderBottom: '2px solid', display: 'inline-block' }}>
                                        icongrid@gmail.com
                                    </Box>
                                </Grid>
                                <Grid md={4} lg={3} xs={12} sx={{ margin: '20px 10px', padding: '20px 20px', border: '1px solid #dcdcdc', borderRadius: '7px' }}>
                                    <Box sx={{ marginBottom: '20px', padding: '10px 15px', border: '1px solid #dcdcdc', borderRadius: '7px', display: 'inline-block' }}>
                                        <FaRocketchat fontSize={'20px'} />
                                    </Box>
                                    <Box sx={{ paddingTop: '30px', fontWeight: '600', fontSize: '20px' }}>
                                        We're here to help.
                                    </Box>
                                    <Box fontSize={'15px'} color={'#888888'}>
                                        Speak to our Friendly team
                                    </Box>
                                    <Box sx={{ marginBottom: '15px', paddingTop: '20px', fontWeight: '600', fontSize: '15px', borderBottom: '2px solid', display: 'inline-block' }}>
                                    icongrid@gmail.com
                                    </Box>
                                </Grid>
                                <Grid md={4} lg={3} xs={12} sx={{ margin: '20px 10px', padding: '20px 20px', border: '1px solid #dcdcdc', borderRadius: '7px' }}>
                                    <Box sx={{ marginBottom: '20px', padding: '10px 15px', border: '1px solid #dcdcdc', borderRadius: '7px', display: 'inline-block' }}>
                                        <FaRocketchat fontSize={'20px'} />
                                    </Box>
                                    <Box sx={{ paddingTop: '30px', fontWeight: '600', fontSize: '20px' }}>
                                        Call us
                                    </Box>
                                    <Box fontSize={'15px'} color={'#888888'}>
                                        Mon-Fri from 8am to 5pm.
                                    </Box>
                                    <Box sx={{ marginBottom: '15px', paddingTop: '20px', fontWeight: '600', fontSize: '15px', borderBottom: '2px solid', display: 'inline-block' }}>
                                        +91 800013 3106
                                        
                                    </Box>
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>


                    {/* <Box sx={{ width: '100%',marginTop:'0px' }}>
                        <Box sx={{ margin: '30px 0px' }}>
                            <Box className='center'
                                sx={{ fontSize: '36px', fontWeight: '700', color: '#272727' }}
                            >Frequently asked question

                            </Box>
                            <Box className='center'
                                sx={{ color: '#888888' }}
                            >
                                Let us know how we can help.
                            </Box>
                        </Box>

                        <Box>

                        </Box>
                    </Box> */}
                </Box>

            </Box>
        </Box>
    )
}

export default Contact