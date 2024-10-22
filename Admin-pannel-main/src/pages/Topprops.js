import React from 'react'
import { Box } from '@mui/material'
import house from './brands/house.png'
import Grid from '@mui/material/Grid';

function Topprops(props) {

    return (
        <Box className='iconss' onClick={props.onClick} >
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                <Grid sx={{ display: 'flex', width: '100px', flexDirection: 'column', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="50" height="50" dangerouslySetInnerHTML={{ __html: props.image }}></svg>
                    <Box sx={{ paddingTop: '20px' }}>
                        {props.tag}
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default Topprops