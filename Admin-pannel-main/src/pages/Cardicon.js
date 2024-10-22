import React from 'react'
import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Cardicon(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        getIcons(props.categoryName, props.popCard)
    }, [])

    const getIcons = (categoryName, popCard) => {
        if (popCard) {
            axios.get(`http://localhost:3001/popular/findOne/${categoryName}`)
                .then((res) => {
                    console.log(res.data.data);
                    setData(res.data.data)
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                })
        }
        else {
            axios.get(`http://localhost:3001/icon/findOne/${categoryName}`)
                .then((res) => {
                    console.log(res.data.data);
                    setData(res.data.data)
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                })
        }
    }

    return (
        <Box className={props.name} sx={{ border: '1px solid', borderRadius: '10px', overflow: 'hidden' }}>
            <Box sx={{ padding: '15px 10px' }}>
                <Grid container>

                    {
                        data.map((el, index) => {
                            if (index <= 7) {
                                return <Grid key={index} xs={3} className='center'>
                                    <Box sx={{ marginY: '10px', backgroundColor: '#F5F5F5', borderRadius: '10px', display: 'inline-block', padding: '17px' }}>
                                        {el.icon ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20" dangerouslySetInnerHTML={{ __html: el.icon }}></svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20" dangerouslySetInnerHTML={{ __html: el.regular }}></svg>
                                        }
                                    </Box>
                                </Grid>
                            }
                        })
                    }
                </Grid>
            </Box>
            <Box className="info-area">
                <h3 className='m-0'>{props.heading}</h3>
                <p className='m-0'>{props.description}</p>
            </Box>
        </Box>
    )
}
