import { Box, Container, Grid } from '@mui/material'
import { React, useEffect, useState } from 'react'
import { FaAccusoft, FaAmbulance, FaImage } from "react-icons/fa";
import { BsFiletypeSvg } from "react-icons/bs";
import { Link } from 'react-router-dom';
import banner from './brands/animatedbanner.png'
import FullScreenDialog from './FullScreenDialog';
import axios from 'axios';
import Search from './Search';

function Animatedicons() {

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
        console.log(res.data.data);
        setData(res.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <Box>
      <Search />
      <Grid container paddingTop={'10px'}>
        <Grid xs={12}>
          <Box className='home-hero' sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, backgroundColor: '#272727', position: 'relative', alignItems: 'center', display: 'flex' }}>
            <Grid md={12} sx={{ padding: '20px', textAlign: 'center' }}>

              <Box sx={{ fontSize: { xs: '14px', sm: '20px', md: '32px' }, width: '63%', margin: 'auto', textTransform: 'capitalize', fontWeight: '700', padding: { md: '50px 0px 0px 0px' }, color: '#ffbc06' }}>
                Explore a vast collection of over 18,000 animated icons at your disposal.
              </Box>
              <Box sx={{ fontSize: { xs: '8px', sm: '14px', md: '18px' }, width: '63%', margin: 'auto', color: '#fff', padding: { md: '10px 0px 0px 0px' } }}>
                IconGrid offers a robust collection of meticulously designed animated icons, ready for seamless integration into your digital products, presentations, or videos!
              </Box>
              <Link to="/Topanimatedicon">
              <Box sx={{ padding: { xs: '9px 0px 0px 0px', md: '30px 0px 50px 20px' } }}>
                <Box sx={{ fontSize: { xs: '10px', md: '16px' }, border: '1px solid #FFBC06', backgroundColor: '#FFBC06', borderRadius: '10px', padding: '10px 15px', display: 'inline-block' }}>
                  See All Icon
                </Box>
              </Box>
              </Link>
              <Box sx={{ position: 'absolute', bottom: -8 }} >

              </Box>
            </Grid>

          </Box>
        </Grid>
        <Grid container paddingTop={{ xs: '20px', md: '45px' }} xs={12} className='center'>

          {
            data.map((el, index) => {
              return <Grid key={index} xs={6} sm={4} md={2} lg={1} sx={{ padding: '15px' }}  >
                <Box onClick={() => handleOpenDialog(el._id)} className="card4" id="card4">
                  <Box className="content4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="50" height="50" dangerouslySetInnerHTML={{ __html: el.regular }}></svg>
                  </Box>
                </Box>
              </Grid>
            })
          }

          <FullScreenDialog open={isDialogOpen} onClose={() => handleCloseDialog(selectedIconId)} iconId={selectedIconId} entityType="animated" />

        </Grid>
        <Grid xs={12}>
          <Box className="center" sx={{ fontSize: "18px", padding: '10px' }}>
            <Box sx={{ fontSize: { xs: '10px', md: '16px' }, border: '1px solid #FFBC06', padding: '7px 20px', borderRadius: '5px', backgroundColor: '#FFBC06' }}>
              <Link to="/Topanimatedicon">
                See All Animated Icon
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12}>
          <Box sx={{ padding: { xs: '20px 20px 20px 20px', md: '50px 20px 50px 20px' } }}>
            <Box sx={{ fontSize: { xs: '22px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
              How to add animated
            </Box>
            <Box sx={{ fontSize: { xs: '19px', sm: '50px', md: '72px' }, marginTop: { xs: '-22px', sm: '-48px', md: '-65px' }, color: '#272727', textAlign: 'center' }}>
              icons to any design
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Container maxWidth="xl">

        <Grid container xs={12} sx={{ backgroundColor: '#FAFAFC', padding: { xs: '10px 10px 10px 10px', md: '40px 40px 10px 40px' } }}>
          <Grid xs={12} md={6} >
            <Box className='center' paddingTop={'50px'}>
              <img width={'60%'} src="https://cdn.svgator.com/assets/landing-pages/static/create-animated-svg-icons/59510656-0-Microinteractions.svg" alt="" srcset="" />
            </Box>
            <Grid container xs={12} paddingTop={'50px'}>
              <Grid xs={6} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: { xs: '10px', md: '20px' } }}>
                    <FaImage fontSize={'25px'} />
                  </Box>
                  <Box display={'flex'} fontWeight={'600'}>
                    PNG
                    <Box sx={{ marginLeft: '7px', fontSize: { xs: '10px', md: '14px' }, padding: { xs: '4px 12px', md: '0px 10px' }, backgroundColor: '#ffbc06', borderRadius: '5px', border: '1px solid #FFBC06' }}>
                      FREE
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ fontSize: { xs: '12px', md: '16px' }, paddingLeft: { xs: '35px', md: '45px' }, color: '#888888' }}>
                  The prevalent image format that commonly supports transparencies.
                </Box>
              </Grid>
              <Grid xs={6} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: { xs: '10px', md: '20px' } }}>
                    <BsFiletypeSvg fontSize={'25px'} />
                  </Box>
                  <Box display={'flex'} fontWeight={'600'}>
                    SVG
                    <Box sx={{ fontSize: { xs: '10px', md: '14px' }, padding: { xs: '4px 12px', md: '0px 10px' }, marginLeft: '7px', backgroundColor: '#ffbc06', borderRadius: '5px', border: '1px solid #FFBC06' }}>
                      FREE
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ fontSize: { xs: '12px', md: '16px' }, paddingLeft: { xs: '35px', md: '45px' }, color: '#888888' }}>

                  Vector formats allow for easy editing according to your preferences.
                </Box>
              </Grid>
              <Grid xs={6} paddingTop={'35px'}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: { xs: '10px', md: '20px' } }}>
                    <BsFiletypeSvg fontSize={'25px'} />
                  </Box>
                  <Box display={'flex'} fontWeight={'600'}>
                    SVG
                    <Box sx={{ fontSize: { xs: '10px', md: '14px' }, padding: { xs: '4px 12px', md: '0px 10px' }, marginLeft: '7px', backgroundColor: '#ffbc06', borderRadius: '5px', border: '1px solid #FFBC06' }}>
                      FREE
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ fontSize: { xs: '12px', md: '16px' }, paddingLeft: { xs: '35px', md: '45px' }, color: '#888888' }}>

                  Vector formats allow for easy editing according to your preferences.
                </Box>
              </Grid>
              <Grid xs={6} paddingTop={'35px'}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: { xs: '10px', md: '20px' } }}>
                    <BsFiletypeSvg fontSize={'25px'} />
                  </Box>
                  <Box display={'flex'} fontWeight={'600'}>
                    SVG
                    <Box sx={{ fontSize: { xs: '10px', md: '14px' }, padding: { xs: '4px 12px', md: '0px 10px' }, marginLeft: '7px', backgroundColor: '#ffbc06', borderRadius: '5px', border: '1px solid #FFBC06' }}>
                      FREE
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ fontSize: { xs: '12px', md: '16px' }, paddingLeft: { xs: '35px', md: '45px' }, color: '#888888' }}>
                  Vector formats allow for easy editing according to your preferences.
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <img width={'100%'} src={banner} alt="" srcset="" />
          </Grid>

        </Grid>

      </Container>



      <Box sx={{ padding: { xs: '20px 20px 20px 20px', md: '50px 20px 50px 20px' } }}>
        <Box sx={{ fontSize: { xs: '22px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
          Top Icon
        </Box>
        <Box sx={{ fontSize: { xs: '19px', sm: '50px', md: '72px' }, marginTop: { xs: '-22px', sm: '-48px', md: '-65px' }, textTransform: 'uppercase', fontWeight: '600', color: '#272727', textAlign: 'center' }}>
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

export default Animatedicons
