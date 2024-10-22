// Icons.js
import { Box } from '@mui/material'
import { Link } from 'react-router-dom';
import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import backgroundImg from './brands/app-preview-dark.jpg'
import Cardicon from './Cardicon';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Search from './Search';
import Handdrawn from './brands/china.png'
import Handdrawn1 from './brands/puzzle-game.png'
import Handdrawn2 from './brands/send-message.png'
import colorfill from './brands/paris.png'
import colorfill1 from './brands/skull.png'
import colorfill2 from './brands/hospital.png'
import blackoutline from './brands/global-marketing.png'
import blackoutline1 from './brands/idea.png'
import blackoutline2 from './brands/avatar.png'
import BlackFill from './brands/whiteboard.png'
import BlackFill1 from './brands/artificial-intelligence.png'
import BlackFill2 from './brands/twitter1.png'
import LinealColor from './brands/deliver.png'
import LinealColor1 from './brands/cashless-payment.png'
import LinealColor2 from './brands/stopwatch.png'
import Flat from './brands/after-effects.png'
import Flat1 from './brands/yelp.png'
import Flat2 from './brands/ireland.png'
function Icons() {

  const [category, setCategory] = useState([])
  const [card, setCard] = useState([
    { name: "Handdrawn",img:Handdrawn ,img1:Handdrawn1,img2:Handdrawn2, description: "Iconic Indian brands cover diverse sectors across various industries" },
    { name: "Color Fill",img:colorfill1 ,img1:colorfill,img2:colorfill2, description: "The 'color fill' icon applies solid colors in graphic design software." },
    { name: "Black outline",img:blackoutline2 ,img1:blackoutline1,img2:blackoutline, description: "Outline emphasizes visual design edges." },
    { name: "Black Fill",img:BlackFill ,img1:BlackFill2,img2:BlackFill1, description: "Black fill enriches design, adding depth and visual contrast." },
    { name: "Lineal Color",img:LinealColor ,img1:LinealColor2,img2:LinealColor1, description: "Icon symbolizes identity, individuality, personality." },
    { name: "Flat",img:Flat ,img1:Flat1,img2:Flat2, description: "Product description and details" }
  ])


  useEffect(() => {
    getCategory()
    Gotoup()
  }, [])
  const Gotoup = () => {

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })

  }
  const getCategory = () => {
    axios.get('http://localhost:3001/category/find')
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data)
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  }

  return (
    <Box sx={{ paddingBottom: '150px' }}>
      <Search />
      <Grid container paddingTop={'10px'}>
        <Grid xs={12} >
          <Box className="background" sx={{ flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#00000021', alignItems: 'center', display: 'flex' }}>
            <Grid md={6} xs={12} sx={{ padding: '20px', maxWidth: '100%' }}>

              <Box sx={{ fontSize: { xs: '15px', sm: '28px', md: '27px', lg: '32px' }, fontWeight: '700', padding: { xs: '50px 0px 0px 0px', sm: '50px 0px 0px 20px' }, color: '#272727' }}>
                Explore a diverse collection of over 14.2 million PNG icons available for free access.
              </Box>
              <Box sx={{ fontSize: { xs: '10px', sm: '18px', md: '19px', lg: '21px' }, padding: { xs: '10px 0px 0px 0px', sm: '10px 0px 0px 20px' } }}>
                Discover the extensive repository of vector icons for download, encompassing SVG, EPS, PSD, and BASE 64 formats, making it the most comprehensive database available.
              </Box>
              <Link to="/most-downloads">
                <Box sx={{ padding: { xs: '10px 0px 0px 0px', sm: '10px 0px 0px 20px', lg: '30px 0px 50px 20px' } }}>
                  <Box sx={{ fontSize: { xs: '12px', sm: '18px', md: '13px', lg: '18px' }, border: '1px solid #FFBC06', backgroundColor: '#FFBC06', borderRadius: '10px', padding: '10px 15px', display: 'inline-block', cursor: 'pointer' }}>
                    See Trending Icon
                  </Box>
                </Box>
              </Link>


            </Grid>
            <Grid md={6} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>

              <img src={backgroundImg} width={'100%'} alt="" srcSet="" />

            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ padding: '50px 20px 0px 20px' }}>
        <Box sx={{ fontSize: { xs: '22px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
          Premium
        </Box>
        <Box sx={{ fontSize: { xs: '19px', sm: '50px', md: '72px' }, marginTop: { xs: '-23px', sm: '-48px', md: '-65px' }, textTransform: 'uppercase', fontWeight: '600', color: '#272727', textAlign: 'center' }}>
          Icon Packs
        </Box>
        <Grid container sx={{ paddingTop: '50px' }}>

          {
            category.map((el, index) => {
              return <Grid key={index} lg={3} md={4} sm={6} xs={12} className='setcontant'>
                <Link to={{ pathname: "/pack", state: { categoryName: el.name, id: el._id } }}>
                  <Cardicon name="boxshadowyellow" categoryName={el.name} bannerimg={''} heading={el.name} description={el.description} />
                </Link>
              </Grid>
            })
          }

        </Grid>
      </Box>

      <Box sx={{ padding: { xs: '20px 20px', md: '50px 20px 50px 20px' } }}>
        <Box sx={{ fontSize: { xs: '22px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
          Poular
        </Box>
        <Box sx={{ fontSize: { xs: '19px', sm: '50px', md: '72px' }, marginTop: { xs: '-23px', sm: '-48px', md: '-65px' }, textTransform: 'uppercase', fontWeight: '600', color: '#272727', textAlign: 'center' }}>
          Icon Styles
        </Box>
      </Box>
      <Box sx={{ backgroundColor: '#272727', padding: '0px 30px' }}>
        <Grid container sx={{ padding: '70px 0px', justifyContent: 'center' }}>
          {
            card.map((el, index) => {
              return <Grid key={index} className='center' sm={4} lg={2} padding={'10px 0px'}>
                <Link to={{ pathname: "/back-fill", state: { cardName: el.name} }}>
                  <Box className="card">
                  
                    <Box className="card-img">
                      <Box sx={{width:'40px' , height:'40px' }}><img src={el.img} alt="" /></Box>
                      <Box sx={{width:'40px' , height:'40px' }}><img src={el.img1} alt="" /></Box>
                      <Box sx={{width:'40px' , height:'40px'}}><img src={el.img2} alt="" /></Box>
                    </Box>
                    <Box className="card-info">
                      <p className="text-title">{el.name} </p>
                      <p className="text-body">{el.description}</p>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            })
          }

        </Grid>
      </Box>

      <Box sx={{ padding: { xs: '20px', md: '50px 20px' } }}>
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
            <div className="tags foot-tags hide-foot-tags">
              <a href="" title="" className="text-capitalize">Education</a>
              <a href="" title="" className="text-capitalize">Technology</a>
              <a href="" title="" className="text-capitalize">User</a>
              <a href="" title="" className="text-capitalize">People</a>
              <a href="" title="" className="text-capitalize">Business</a>
              <a href="" title="" className="text-capitalize">Food</a>
              <a href="" title="" className="text-capitalize">Computer</a>
              <a href="" title="" className="text-capitalize">Marketing</a>
              <a href="" title="" className="text-capitalize">Document</a>
              <a href="" title="" className="text-capitalize">Man</a>
              <a href="" title="" className="text-capitalize">Message</a>
              <a href="" title="" className="text-capitalize">Building</a>
              <a href="" title="" className="text-capitalize">Time</a>
              <a href="" title="" className="text-capitalize">Arrow</a>
              <a href="" title="" className="text-capitalize">Home</a>
              <a href="" title="" className="text-capitalize">House</a>
              <a href="" title="" className="text-capitalize">Music</a>
              <a href="" title="" className="text-capitalize">Chat</a>
              <a href="" title="" className="text-capitalize">Cloud</a>
              <a href="" title="" className="text-capitalize">Book</a>
            </div>
          </Grid>
        </Container>
      </Box>
    </Box>

  )
}

export default Icons
