import { React, useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import { FaAccusoft, FaAmbulance, FaImage } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FullScreenDialog from './FullScreenDialog';
import axios from 'axios';
function Topanimatedicon() {

  const [data, setData] = useState([])
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState(null);

  const handleOpenDialog = (iconId) => {
    setSelectedIconId(iconId);
    setDialogOpen(true);
  };

  const handleCloseDialog = (iconId) => {
    setDialogOpen(false);
    updateIcons(iconId)
  };
  
  const updateIcons = async (iconId) => {
    await axios.put(`http://localhost:3001/editIcon/update/${iconId}/000000/animated`)
      .then((res) => {
        console.log("update Icon color :- ", res.data.data);
        getAnimatedIcon();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  useEffect(() => {
    getAnimatedIcon()
    Gotoup()

  }, [])
  
  const Gotoup = () => {

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })

  }

  const getAnimatedIcon = () => {
    axios.get('http://localhost:3001/animated/find')
      .then((res) => {
        let regularIcon = res.data.data.map(icon => (icon))
        console.log("regularIcon :- ", regularIcon);
        setData(regularIcon)
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  }

  return (
    <Box>
      <Box sx={{ padding: '100px 20px 0px 20px' }}>
        <Box sx={{ fontSize: { xs: '34px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
          Top animated
        </Box>
        <Box sx={{ fontSize: { xs: '34px', sm: '50px', md: '72px' }, marginTop: { xs: '-30px', sm: '-48px', md: '-65px' }, textTransform: 'uppercase', fontWeight: '600', color: '#272727', textAlign: 'center' }}>
          Icon
        </Box>
      </Box>
      <Grid container paddingTop={'10px'}>
        <Grid container paddingTop={'35px'} xs={12} className='center'>

          {
            data.map((el, index) => {
              return <Grid key={index} lg={1} sx={{ padding: '15px' }}  >
                <Box onClick={() => handleOpenDialog(el._id)} className="card4" id="card4">
                  <Box className="content4">
                    {/* <img src={el.regular} alt={el.name} title={el.name} width="50px" height="auto" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="50" height="50" dangerouslySetInnerHTML={{ __html: el.regular }}></svg>
                  </Box>
                </Box>
              </Grid>
            })
          }

          <FullScreenDialog open={isDialogOpen} onClose={() => handleCloseDialog(selectedIconId)} iconId={selectedIconId} entityType="animated" />

        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px 0px' }}>
        <Stack spacing={2}>
          <Pagination
            count={10}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default Topanimatedicon
