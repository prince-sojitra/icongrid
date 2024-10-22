// Interfaceicon.js
import { React, useState } from 'react';
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { FaAccusoft, FaAmbulance } from "react-icons/fa";
import { Link } from 'react-router-dom';
import FullScreenDialog from './FullScreenDialog';
import camera from './brands/camerainterface.png'
import { useEffect } from 'react';
import axios from 'axios';
import Search from './Search';

function Interfaceicon() {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState([])
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
    await axios.put(`http://localhost:3001/editIcon/update/${iconId}/000000/interface`)
      .then((res) => {
        console.log("update Icon color :- ", res.data.data);
        getInterfaceIcon();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  useEffect(() => {
    getInterfaceIcon()
    Gotoup()

  }, [])
  const Gotoup = () => {

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })

  }
  const getInterfaceIcon = () => {
    axios.get('http://localhost:3001/interface/find')
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
      <Search />
      <Grid container paddingTop={'10px'}>
        <Grid xs={12} className="backgroundInterface">
          <Box sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, backgroundColor: '#00000021', alignItems: 'center', display: 'flex' }}>
            <Grid md={12} sx={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'center' }}>

              <img src={camera} width={'60%'} alt="" srcset="" />

            </Grid>
            <Grid md={12} sx={{ padding: '20px' }}>

              <Box sx={{ fontSize: { xs: '14px', sm: '20px', md: '32px' }, fontWeight: '700', padding: { md: '50px 0px 0px 20px' }, color: '#fff' }}>
                Utilize icon fonts in projects of any scale, providing a versatile solution for both large and small endeavors.
              </Box>
              <Box sx={{ fontSize: { xs: '8px', sm: '14px', md: '18px' }, padding: { md: '10px 0px 0px 20px' }, color: '#fff' }}>
                Access a vast collection of over 24,000 SVG and web font-optimized vector-based icons designed for web, iOS, and Android applications.
              </Box>
              <Link to="/most-downloads">
                <Box sx={{ padding: { xs: '9px 0px 50px 0px', md: '30px 0px 50px 20px' } }}>
                  <Box sx={{ fontSize: { xs: '10px', md: '16px' }, border: '1px solid #FFBC06', backgroundColor: '#FFBC06', borderRadius: '10px', padding: '10px 15px', display: 'inline-block', cursor: 'pointer', color: '#272727' }}>
                    See All Icon
                  </Box>
                </Box>
              </Link>

            </Grid>

          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Box sx={{ padding: { xs: '22px 20px 20px 20px', md: '50px 20px 50px 20px' } }}>
            <Box sx={{ fontSize: { xs: '23px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
              latest in-demand
            </Box>
            <Box sx={{ fontSize: { xs: '19px', sm: '50px', md: '72px' }, marginTop: { xs: '-23px', sm: '-48px', md: '-65px' }, textTransform: 'uppercase', fontWeight: '600', color: '#272727', textAlign: 'center' }}>
              icons
            </Box>
          </Box>
          <Grid xs={12} container >

            {
              data.map((el, index) => {
                if (index <= 17) {
                  return <Grid key={index} xs={6} sm={4} md={2}>
                    <Box class="card3 wallet">
                      <Box onClick={() => handleOpenDialog(el._id)}>
                        <Box class="overlay"></Box>
                        <Box class="circle">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="60" height="60" dangerouslySetInnerHTML={{ __html: el.regular }}></svg>
                        </Box>
                      </Box></Box>

                  </Grid>
                }
              })
            }

            <FullScreenDialog open={isDialogOpen} onClose={() => handleCloseDialog(selectedIconId)} iconId={selectedIconId} entityType="interface" />

            <Grid xs={12}>
              <Box className="center" sx={{ fontSize: "18px", padding: '10px' }}>
                <Box sx={{ border: '1px solid #FFBC06', padding: '7px 20px', borderRadius: '5px', backgroundColor: '#FFBC06' }}>
                  <Link to="/most-downloads">See All Icon</Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ padding: { xs: '20px 20px', md: '50px 20px' } }}>
        <Box sx={{ fontSize: { xs: '22px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
          Top Icon
        </Box>
        <Box sx={{ fontSize: { xs: '19px', sm: '50px', md: '72px' }, marginTop: { xs: '-23px', sm: '-48px', md: '-65px' }, textTransform: 'uppercase', fontWeight: '600', color: '#272727', textAlign: 'center' }}>
          Search
        </Box>
      </Box>

      <Box>
        <Container maxWidth="lg">
          <Grid container>
            <div class="tags foot-tags hide-foot-tags">
              <a href="" title="" class="text-capitalize">Education</a>
              <a href="" title="" class="text-capitalize">Technology</a>
              <a href="" title="" class="text-capitalize">User</a>
              <a href="" title="" class="text-capitalize">People</a>
              <a href="" title="" class="text-capitalize">Business</a>
              <a href="" title="" class="text-capitalize">Food</a>
              <a href="" title="" class="text-capitalize">Computer</a>
              <a href="" title="" class="text-capitalize">Marketing</a>
              <a href="" title="" class="text-capitalize">Document</a>
              <a href="" title="" class="text-capitalize">Man</a>
              <a href="" title=" " class="text-capitalize">Message</a>
              <a href="" title="" class="text-capitalize">Building</a>
              <a href="" title="" class="text-capitalize">Time</a>
              <a href="" title="" class="text-capitalize">Arrow</a>
              <a href="" title="" class="text-capitalize">Home</a>
              <a href="" title="" class="text-capitalize">House</a>
              <a href="" title="" class="text-capitalize">Music</a>
              <a href="" title="" class="text-capitalize">Chat</a>
              <a href="" title="" class="text-capitalize">Cloud</a>
              <a href="" title="" class="text-capitalize">Book</a>
            </div>
          </Grid>
        </Container>
      </Box>

    </Box>
  )
}

export default Interfaceicon
