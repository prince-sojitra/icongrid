import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import CountUp from 'react-countup';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { FaSearch, FaRegSmile, FaSmile } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import iconlogo from './img/Vector.png'
import interfaceicon from './img/interfaceicon.png'
import animatedicon from './img/animated.png'
import camera from './img/cameraanimation.gif'
import bee1 from './img/bee_1 1.png'
import bee2 from './img/bee_2.png'
import bee3 from './img/bee_3.png'
import boy from './img/phone-carry 1.png'
import football from './img/Football.png'
import happy from './img/happy.png'
import sad from './img/sad.png'
import lineleft from './img/line left.png'
import lineright from './img/line right.png'


import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const card1 = (
    <React.Fragment>

        <img src={iconlogo} className='block' alt="" />

    </React.Fragment>
);
const card2 = (
    <React.Fragment>

        <img src={interfaceicon} className='block' alt="" />

    </React.Fragment>
);
const card3 = (
    <React.Fragment>
        <img src={animatedicon} className='block' alt="" />
    </React.Fragment>
);
// function autoToggle() {
//     var checkbox = document.getElementById('toggleCheckbox');
//     checkbox.checked = !checkbox.checked;
// }
// setInterval(autoToggle, 3000);

function WebBody() {
    // useEffect(() => {
    //     AOS.init();
    //   }, [])
    //   AOS.init({
    //     offset: 200,
    //     duration: 400,
    //     easing: 'ease-in-sine',
    //     delay: 100,
    //     once: true,
    //   });

    const [searchValue, setSearchValue] = useState('');

    let history = useHistory()

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
    useEffect(() => {
        Gotoup()
      }, [])
      const Gotoup = () => {
    
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    
      }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = () => {
        history.push({
            pathname: '/search-icon',
            state: { searchValue: searchValue }
        });
    };

    return (
        <>
            <Box sx={{ width: '100%', paddingTop: '55px' }}>
                <Box className="home-hero" sx={{ backgroundColor: "#ffffff", paddingTop: '55px', height: '650px', width: '100%', zIndex: 9 }}>

                    <Container maxWidth="xl">

                        <Box sx={{ position: 'relative'/*display: { xs: 'none', md: 'flex' }*/ }}>
                            <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                                <Stack spacing={0} direction="row" alignItems="center" sx={{ width: "100%" }}>
                                    <Grid item xs={12} sx={{
                                        display: 'flex', width: '70%', flexDirection: 'column', color: '#272727', justifyContent: 'center', marginTop: { xs: '50px', sm: '120px' }, textAlign: 'center', lineHeight: '1',
                                        fontWeight: "700", zIndex: 9, fontSize: { xs: '22px', sm: '32px', md: '45px' }
                                    }}>
                                        {/* data-aos="zoom-in" data-aos-offset="0" */}
                                        <Box  >Take the hassle out of <font color="#ffbc06">icons</font>  </Box>
                                        <Box>in your website.</Box>
                                    </Grid>

                                </Stack>
                                <Stack spacing={1} direction="row" alignItems="center" sx={{ width: { xs: '80%', sm: "48%" } }}>
                                    <Grid item xs={12} sx={{
                                        color: '#272727', textAlign: 'center', paddingTop: '33px',
                                        alignItems: 'end', zIndex: 9, fontSize: { xs: '12px', sm: '12px', md: '14px' }
                                    }}>
                                        "At <b> <font fontSize="16px">IconGrid,</font></b> we believe in the power of connection to transform lives and shape futures. Join our global community to share ideas, collaborate on projects, and build meaningful relationships. Together, let's turn dreams into reality."
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Box>
                    </Container>
                    <Box sx={{ flexGrow: 1 }}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid sx={{ width: { xs: '90%', sm: '50%' }, paddingTop: '33px' }}>
                                <Search sx={{ backgroundColor: '#fff0', border: '1px solid #272727', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box className="icon-serch" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ paddingLeft: '10px', paddingTop: '5px' }}>
                                            <FaSearch fontSize={'20px'} />
                                        </Box>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={searchValue}
                                            onChange={handleSearchChange}
                                            onKeyPress={handleKeyPress} // Add this line
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '7px' }}>
                                        <Box sx={{ border: '1px solid #FFBC06', backgroundColor: '#FFBC06', borderRadius: '5px', padding: '0px 10px', cursor: 'pointer' }} onClick={handleSearchSubmit}>
                                            <Link to={{ pathname: "/search-icon", state: { searchValue: searchValue } }}>
                                                Go
                                            </Link>
                                        </Box>
                                    </Box>
                                </Search>
                            </Grid>
                        </Toolbar>
                    </Box>
                </Box>

                <Box sx={{ marginTop: '0px', backgroundColor: '#272727' }}>
                    <Grid container padding={'24px'} sx={{ justifyContent: 'space-around' }}>
                        <Grid item md={3} sm={6} xs={12} sx={{}}  >
                            <Link to="/icons" >
                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0px 20px 0px' }}>
                                    {card1}
                                </Box>
                                <Box fontWeight={600} fontSize={'30px'} className='center c-white'>
                                    <CountUp delay={2} end={200} />+
                                </Box>
                                <CardActions className='c-white' sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
                                    <Button className='center c-white' size="large">Icons</Button>
                                </CardActions>
                                <Typography textAlign={'center'} className='c-white' fontSize={'15px'}>
                                    A comprehensive repository of freely available icons suitable for various projects.
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <Link to="/interface-icons">
                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0px 20px 0px' }}>
                                    {card2}
                                </Box>
                                <Box fontWeight={600} fontSize={'30px'} className='center c-white'>
                                    <CountUp delay={2} end={200} />+

                                </Box>
                                <CardActions className='c-white' sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
                                    <Button className='center c-white' size="large">Interface Icons</Button>
                                </CardActions>
                                <Typography className='center c-white' textAlign={'center'} color={'#777'} fontSize={'15px'}>
                                    Icons crafted specifically for your user interfaces.
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <Link to="/animated-icons">
                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0px 20px 0px' }}>
                                    {card3}
                                </Box>
                                <Box fontWeight={600} fontSize={'30px'} className='center c-white'>
                                    <CountUp delay={2} end={200} />+

                                </Box>
                                <CardActions className='c-white' sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
                                    <Button className='center c-white' size="large">Animated Icons</Button>
                                </CardActions>
                                <Typography className='c-white center' textAlign={'center'} color={'#777'} fontSize={'15px'}>
                                    Animated icons to enhance the visual appeal of your projects.
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ marginTop: '70px', padding: '0px 24px' }}>
                    <Container maxWidth="xl">
                        <Grid xs={12}>
                            <Typography sx={{ fontSize: { xs: '18px', sm: '30px' }, fontFamily: 'Degular,Inter,Helvetica Neue,Helvetica,Arial,sans-serif', color: '#424242;', fontWeight: 600 ,textAlign:'center' }}>
                                GICONS, The highly sought-after collection of free SVG user interface icons
                            </Typography>
                            <Typography sx={{ color: '#777', fontSize: { xs: '12px', sm: '16px' ,textAlign:'center'} }}>
                                Explore a collection of over 24,300 free UI icons, presented in 9 distinct styles, fully editable and customizable to uniquely suit your needs.
                            </Typography>
                        </Grid>

                    </Container>

                    <Container maxWidth="xl" sx={{ marginTop: '35px' }}>
                        <Grid container xs={12} className='center'>
                            <Box padding={'0px 8px'} margin={'20px 0px'}>
                                <Grid sx={{ borderRadius: '20px', overflow: 'hidden', width: '269px', border: '1px solid #272727' }}>
                                    <Box sx={{ height: '86px', backgroundColor: '#FFE08A' }}>
                                    </Box>
                                    <Box className='center'>
                                        <Box className='center' sx={{ marginTop: '-37px', height: '73px', width: '73px', backgroundColor: '#FFC62D', alignItems: 'center', borderRadius: '50%' }}>
                                            <FaRegSmile fontSize={'35px'} />
                                        </Box>

                                    </Box>
                                    <Box className='center' fontSize={'18px'} padding={'20px'}>
                                        Regular
                                    </Box>
                                    <Box className='center' padding={'0px 28px'} textAlign={"center"}>
                                        "Explore our free regular icons for versatile design solutions. From simple outlines to detailed illustrations, find the perfect icon to enhance your projects effortlessly."
                                    </Box>

                                    <Box className='center' sx={{ padding: '20px 28px', textAlign: 'center' }} >
                                        <Link to="/most-downloads">

                                            <Box sx={{ border: '1px solid #ffbc06', padding: '5px 60px', borderRadius: '7px', backgroundColor: '#FFE08A' }}>Explore</Box>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Box >
                            <Box padding={'0px 8px'} margin={'20px 0px'}>
                                <Grid sx={{ borderRadius: '20px', overflow: 'hidden', width: '269px', border: '1px solid #272727' }}>
                                    <Box sx={{ height: '86px', backgroundColor: '#AEDBFF' }}>
                                    </Box>
                                    <Box className='center'>
                                        <Box className='center' sx={{ marginTop: '-37px', height: '73px', width: '73px', backgroundColor: '#74C0FC', alignItems: 'center', borderRadius: '50%' }}>
                                            <FaSmile fontSize={'35px'} />
                                        </Box>

                                    </Box>
                                    <Box className='center' fontSize={'18px'} padding={'20px'}>
                                        Bold
                                    </Box>
                                    <Box className='center' padding={'0px 28px'} textAlign={"center"}>
                                        "Explore our free bold icons for versatile design solutions. From simple outlines to detailed illustrations, find the perfect icon to enhance your projects effortlessly."                                    </Box>
                                    <Box className='center' sx={{ padding: '20px 28px', textAlign: 'center' }} >
                                        <Link to="/most-downloads">
                                            <Box sx={{ border: '1px solid #AEDBFF', padding: '5px 60px', borderRadius: '7px', backgroundColor: '#AEDBFF' }}>Explore</Box>
                                        </Link>
                                    </Box>

                                </Grid>
                            </Box>
                            <Box padding={'0px 8px'} margin={'20px 0px'}>
                                <Grid sx={{ borderRadius: '20px', overflow: 'hidden', width: '269px', border: '1px solid #272727' }}>
                                    <Box sx={{ height: '86px', backgroundColor: '#CDBBFF' }}>
                                    </Box>
                                    <Box className='center'>
                                        <Box className='center' sx={{ marginTop: '-37px', height: '73px', width: '73px', backgroundColor: '#B197FC', alignItems: 'center', borderRadius: '50%' }}>
                                            <CiFaceSmile fontSize={'35px'} />
                                        </Box>

                                    </Box>
                                    <Box className='center' fontSize={'18px'} padding={'20px'}>
                                        Thin
                                    </Box>
                                    <Box className='center' padding={'0px 28px'} textAlign={"center"}>
                                        "Explore our free thin icons for versatile design solutions. From simple outlines to detailed illustrations, find the perfect icon to enhance your projects effortlessly."
                                    </Box>
                                    <Box className='center' sx={{ padding: '20px 28px', textAlign: 'center' }} >
                                        <Link to="/most-downloads">
                                            <Box sx={{ border: '1px solid #CDBBFF', padding: '5px 60px', borderRadius: '7px', backgroundColor: '#CDBBFF' }}>Explore</Box>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Box>
                            <Box padding={'0px 8px'} margin={'20px 0px'}>
                                <Grid sx={{ borderRadius: '20px', overflow: 'hidden', width: '269px', border: '1px solid #272727' }}>
                                    <Box sx={{ height: '86px', backgroundColor: '#94FFDE' }}>
                                    </Box>
                                    <Box className='center'>
                                        <Box className='center' sx={{ marginTop: '-37px', height: '73px', width: '73px', backgroundColor: '#63E6BE', alignItems: 'center', borderRadius: '50%' }}>
                                            <BsEmojiSmile fontSize={'35px'} />
                                        </Box>

                                    </Box>
                                    <Box className='center' fontSize={'18px'} padding={'20px'}>
                                        Solid
                                    </Box>
                                    <Box className='center' padding={'0px 28px'} textAlign={"center"}>
                                        "Explore our free solid icons for versatile design solutions. From simple outlines to detailed illustrations, find the perfect icon to enhance your projects effortlessly."
                                    </Box>
                                    <Box className='center' sx={{ padding: '20px 28px', textAlign: 'center' }} >
                                        <Link to="/most-downloads">
                                            <Box sx={{ border: '1px solid #94FFDE', padding: '5px 60px', borderRadius: '7px', backgroundColor: '#94FFDE' }}>Explore</Box>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>

                    </Container>
                </Box>

                <Box sx={{ marginTop: '70px' }}>
                    <Container maxWidth="xl" sx={{ backgroundColor: '#CDBBFF' }}>
                        <Grid container xs={12}>
                            <Box sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', display: 'flex' }}>
                                <Grid flexDirection={'column'} position={'relative'} xs={12} md={6}    >
                                    <Box className='center' sx={{ alignItems: 'center', color: '#703DFF', flexDirection: 'column', fontSize: { xs: '40px', sm: '60px', md: '60px', lg: '70px' }, paddingTop: '55px', fontWeight: '700', fontFamily: "Rammetto One, sans-serif" }}>
                                        Animated
                                    </Box>
                                    <Box sx={{ marginTop: '-37px' }}>
                                        <Box className='center gif' sx={{ alignItems: 'center', fontWeight: '700', fontFamily: "Rammetto One, sans-serif" }}>
                                            <img src={camera} alt="" srcset="" />
                                        </Box>
                                        <Box className='center' sx={{
                                            marginTop: { xs: '-146px', sm: '-268px', md: '-268px', lg: '-282px' },
                                            marginLeft: { xs: 'auto', sm: '65px' },
                                            alignItems: 'center', color: '#fff', fontSize: { xs: '90px', sm: '155px', md: '155px', lg: '171px' }, fontFamily: "Rammetto One, sans-serif"
                                        }}>
                                            Ic&nbsp;&nbsp;&nbsp;ns
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid xs={12} md={6} sx={{ padding: { xs: '10px', sm: '10px', md: '60px' }, display: 'felx', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box sx={{ paddingTop: { sm: '0px', md: '30px' }, fontSize: { xs: '12px', sm: '16px' } }}>
                                        We provide you animated icons through which you can bring your website to life and make it animated. animations plays a vital role in your web page as it can directly enhance the user experience and change their perception of visualizing your brand.
                                    </Box>
                                    <Box sx={{ paddingTop: '20px', fontSize: { xs: '12px', sm: '16px' } }}>
                                        Explore different categories of animated icons with unique creativity to unlock more productivity.
                                    </Box>
                                    <Box sx={{ paddingTop: { xs: '40px', sm: '60px' } }}>
                                        <Box sx={{ borderRadius: '7px', display: 'inline-block', padding: '5px 20px', color: '#fff', backgroundColor: '#703DFF', cursor: 'pointer' }}>
                                            <Link to="/animated-icons">
                                                <Box color={'#fff'}>More..!</Box>
                                            </Link>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                    </Container>
                </Box>


                {/* responsive */}

                <Box className="Hide">
                <Box sx={{display:{xs:'none',md:'block'}, marginTop: '50px', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: '52%', zIndex: 9 }}>
                        <img src={lineleft} alt="" srcset="" />
                    </Box>
                    <Box sx={{ position: 'absolute', top: '21%', right: 0, zIndex: 9 }}>
                        <img src={lineright} alt="" srcset="" />
                    </Box>
                    <Container maxWidth="lg" sx={{}}>
                        <Grid xs={12} container>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid xs={6}>
                                    <Box sx={{ fontSize: '163px', fontWeight: '600' }}>
                                        make
                                    </Box>
                                </Grid >
                                <Grid xs={6} display={'flex'}>
                                    <Grid xs={3}>
                                        <Box sx={{ fontSize: '70px', marginLeft: '0px', height: '121px', width: '121px', backgroundColor: '#65C67F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <BsArrowRight />
                                        </Box>
                                    </Grid>
                                    <Grid xs={7}>
                                        <Box>
                                            <label class="switch" id="autoToggle">
                                                <span class="happy"><img width="50%" src={happy} alt="" srcset="" /></span>
                                                <span class="sad"><img width="50%" src={sad} alt="" srcset="" /></span>
                                                <input type="checkbox" class="input" id="toggleCheckbox"></input>
                                                <span class="slider"></span>
                                            </label>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid xs={12} marginTop={'-80px'} container position={'relative'}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                <Box sx={{ fontSize: '70px', marginLeft: '25px', height: '121px', width: '121px', backgroundColor: '#FFBC06', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                </Box>
                                <Box sx={{ fontSize: '160px', marginLeft: '80px', fontWeight: '600' }}>
                                    ur website
                                </Box>
                            </Box>
                            <Box className='blur' sx={{ position: 'relative', height: '43px', top: '98px', left: '10.5%', position: 'absolute', width: '127px' }}>
                                <Box sx={{
                                    height: '6px',
                                    width: '56px',
                                    backgroundColor: 'black',
                                    position: 'absolute',
                                    top: '18px',
                                    left: '39px',
                                    borderRadius: '50px'
                                }}></Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} marginTop={'-80px'} container position={'relative'}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box marginLeft={'150px'}></Box>
                                <Box
                                    sx={{
                                        height: '121px', width: '121px',
                                        backgroundImage: 'radial-gradient( #F76D42 35%, #5552EC 100%)',
                                        borderRadius: '50%',
                                        marginLeft: '40px'
                                    }}>

                                </Box>
                                <Box
                                    sx={{
                                        height: '121px', width: '121px',
                                        backgroundColor: '#95CCFF',
                                        borderRadius: '50%',
                                        marginLeft: '-65px'
                                    }}>

                                </Box>

                                <Box sx={{ marginLeft: '40px' }}>
                                    <img className='vert-move' src={football} alt="" srcset="" />
                                </Box>
                                <Box sx={{ fontSize: '158px', fontWeight: '600' }}>
                                    lifelike
                                </Box>
                            </Box>

                        </Grid>
                    </Container>
                </Box>
                </Box>

                {/* responsive */}

                <Box sx={{ marginTop: '25px', backgroundColor: '#FFE08A' }}>
                    <Container className='bgIcons' maxWidth="xl" sx={{}}>
                        <Grid container xs={12}>
                            <Grid xs={12} sm={6} sx={{ padding: { xs: '70px 24px 70px 24px', sm: '70px 30px 70px 30px', md: '122px 70px 0px 90px' } }} >
                                <Box sx={{ position: 'relative' }}>
                                    <Box sx={{ fontSize: '34px', marginBottom: '17px', fontWeight: '500', display: 'inline-block', borderBottom: '3px solid #272727' }}>Our Interface</Box>
                                    <Box sx={{ position: 'absolute', top: { xs: '-55%', sm: '-55%', md: '-52%' }, left: { xs: '54%', sm: '58%', md: '33%' } }}><img src={bee1} alt="" srcset="" /></Box>
                                </Box>
                                <Box>
                                    <Grid xs={12}>
                                        <Box sx={{ position: 'relative', fontSize: { xs: '12px', sm: '16px', md: '14px', lg: '16px' } }}>

                                            Our interface is simplified so that our users can navigate through different pages & icons without any problems. Our interface is user-friendly, featuring a clean design for easy navigation. You can browse categories, search for icons, and preview them in different sizes and formats. It's responsive across devices, ensuring a seamless experience. Simplifying the process, you can quickly find and download icons for your projects, whether you're a designer, developer, or enthusiast.

                                        </Box>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid sm={6}>
                                <Box sx={{ position: 'relative' }}>

                                    <Box className='Nest'>

                                        <Box sx={{ position: 'absolute', bottom: { sm: '23%', md: '23%' }, left: { sm: '40%', md: '21%' } }}>
                                            <img src={bee2} alt="" srcset="" />
                                        </Box>
                                        <Box sx={{ position: 'absolute', top: { sm: '6%', md: '6%' }, left: { sm: '14%', md: '7%' } }}>
                                            <img src={bee3} alt="" srcset="" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                <Box sx={{ marginTop: '70px' }}>
                    <Container maxWidth="xl" sx={{}}>
                        <Grid container xs={12}>
                            <Box sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', display: 'flex' }}>
                                <Grid xs={12} md={6} sx={{ padding: { xs: '20px 24px 0px 24px', md: '70px 70px 0px 90px' } }}>
                                    <Box sx={{}}>
                                        <Box sx={{ fontSize: { xs: '28px', sm: '45px', md: '45px', lg: '54px' }, marginBottom: '17px', fontWeight: '500', display: 'inline-block', fontFamily: "Rammetto One, sans-serif", color: '#BBFCE9', WebkitTextStroke: '1px #272727', userSelect: 'none' }}>Whats new ?</Box>
                                    </Box>
                                    <Box>
                                        <Grid xs={12}>
                                            <Box sx={{ fontSize: { xs: '12px', sm: '16px', md: '14px', lg: '16px' } }}>
                                                Exciting news! Premium icons are now free for all users! Explore our latest collection of meticulously crafted icons designed to elevate your projects. Unlock creativity with our diverse range of high-quality icons. Upgrade your designs effortlessly with us!
                                            </Box>
                                            <Box sx={{ marginTop: '25px', fontSize: { xs: '12px', sm: '16px', md: '14px', lg: '16px' } }}>
                                                We're thrilled to announce updates to our icon website! Explore new icons across categories and enjoy an improved user interface with enhanced navigation and faster performance. Discover the perfect icons for your projects with ease. Stay tuned for more updates as we strive to provide the best selection and user experience possible.
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid xs={6} sx={{ paddingLeft: '100px', margin: { xs: '0px 0px -6px 0px', sm: '0px 0px -7px 0px', md: '0px 0px -65px 0px', lg: '0px 0px -7px 0px' } }}>
                                    <img src={boy} alt="" width={'100%'} srcset="" />
                                </Grid>
                            </Box>
                        </Grid>
                    </Container>
                </Box>
            </Box >

        </>
    )
}

export default WebBody