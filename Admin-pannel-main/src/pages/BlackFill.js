import React, { useEffect, useState } from 'react'
import Cardicon from './Cardicon'
import { Box, Grid } from '@mui/material'
import FullScreenDialog from './FullScreenDialog';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function BlackFill() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [category, setCategory] = useState([])

    let location = useLocation()
    let cardName =  location.state.cardName

    useEffect(() => {
        getCategory()
        Gotoup()
    }, [])
    const Gotoup = () => {

        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    
      }

    const getCategory = () => {
        axios.get(`http://localhost:3001/popCategory/findOne/${cardName}`)
            .then((res) => {
                console.log(res.data.data);
                setCategory(res.data.data)
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })
    }


    const handleOpenDialog = () => {
        setDialogOpen(true);

    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    return (
        <Box sx={{ paddingBottom: '150px' }}>

            <Box sx={{ padding: '50px 20px 0px 20px' }}>
                <Box sx={{ fontSize: { xs: '22px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
                    {cardName}
                </Box>
                <Grid container sx={{ paddingTop: '50px' }}>

                    {
                        category.map((el, index) => {
                            return <Grid key={index} lg={3} md={4} sm={6} xs={12} className='setcontant'>
                                <Link to={{ pathname: "/pack", state: { categoryName: el.name, id: el._id, popIcon: "popIcon" } }}>
                                    <Cardicon name="boxshadowyellow" popCard="popCard" categoryName={el.name} bannerimg={''} heading={el.name} description={el.description} />
                                </Link>
                            </Grid>
                        })
                    }





                </Grid>
            </Box>
        </Box>
    )
}

export default BlackFill