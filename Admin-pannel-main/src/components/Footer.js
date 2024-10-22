import { Box, Container, Grid, Button } from '@mui/material';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import line from './Line 9.png';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Icons', path: '/icons' },
  { name: 'Interface icons', path: '/interface-icons' },
  { name: 'Animated icons', path: '/animated-icons' },
];

const Help = [
  { name: 'Support', path: '/support' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'Icon styles', path: '' },
  { name: 'IconGrid collections', path: '' },
];

const Company = [
  { name: 'About', path: '' },
  { name: 'Contact us', path: '/contact-us' },
  { name: 'Follow', path: '' },
];

function Footer() {
  const theme = useTheme();
  const history = useHistory();

  const handlePageClick = (path) => {
    history.push(path);
  };

  return (
    <Box>
      <Box sx={{ width: '100%', backgroundColor: '#272727', borderRadius: { md: '230px 0px 0px 0px' }, paddingTop: '70px' }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid container item xs={12} md={9} sx={{ display: { xs: 'none', sm: 'flex' }, color: '#fff', justifyContent: 'space-around' }}>
              <Grid item xs={12} sm={3} className='color-272727'>
                <Box sx={{ fontSize: '24px', fontWeight: '600' }}>
                  Content
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  {pages.map((page, i) => (
                    <Button

                      key={i}
                      onClick={() => handlePageClick(page.path)}
                      sx={{ my: 1, color: '#fff', display: 'flex', justifyContent: 'flex-start', textTransform: 'capitalize', padding: '0' }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Box sx={{ fontSize: '24px', fontWeight: '600' }}>
                  Help
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  {Help.map((page, i) => (
                    <Button
                      key={i}
                      onClick={() => handlePageClick(page.path)}
                      sx={{ my: 1, color: 'white', display: 'flex', justifyContent: 'flex-start', textTransform: 'capitalize', padding: '0' }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Box sx={{ fontSize: '24px', fontWeight: '600' }}>
                  Company
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  {Company.map((page, i) => (
                    <Button
                      key={i}
                      onClick={() => handlePageClick(page.path)}
                      sx={{ my: 1, color: 'white', display: 'flex', justifyContent: 'flex-start', textTransform: 'capitalize', padding: '0' }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Grid container item xs={12} md={9} sx={{ display: { xs: 'flex', sm: 'none' }, color: '#fff', justifyContent: 'space-around' }}>
              <Box sx={{width:'100%'}}>
                <Accordion sx={{backgroundColor:'#272727',color:'#fff'}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Content
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                      {pages.map((page, i) => (
                        <Button
                          key={i}
                          onClick={() => handlePageClick(page.path)}
                          sx={{ my: 1, color: '#272727', display: 'flex', justifyContent: 'flex-start', textTransform: 'capitalize', padding: '0' }}
                        >
                          {page.name}
                        </Button>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{backgroundColor:'#272727',color:'#fff'}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    Help
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                      {Help.map((page, i) => (
                        <Button
                          key={i}
                          onClick={() => handlePageClick(page.path)}
                          sx={{ my: 1, color: '#272727', display: 'flex', justifyContent: 'flex-start', textTransform: 'capitalize', padding: '0' }}
                        >
                          {page.name}
                        </Button>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion >
                <Accordion sx={{backgroundColor:'#272727',color:'#fff'}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    Company
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                      {Company.map((page, i) => (
                        <Button
                          key={i}
                          onClick={() => handlePageClick(page.path)}
                          sx={{ my: 1, color: '#272727', display: 'flex', justifyContent: 'flex-start', textTransform: 'capitalize', padding: '0' }}
                        >
                          {page.name}
                        </Button>
                      ))}
                    </Box>
                  </AccordionDetails>

                </Accordion>
              </Box>
            </Grid>
            

            <Grid item xs={12} md={3} sx={{ color: '#fff' ,marginTop:{xs:'20px',sm:'0px'} }}>
              <Box sx={{ width: '100%', fontSize: '24px', fontWeight: '600', display: 'flex', justifyContent: 'center' }}>Socials</Box>
              <Box sx={{ fontSize: '35px', display: 'flex', justifyContent: 'space-around', paddingTop: '10px' }}>
                <FaFacebook />
                <a target='_blank' href="https://www.instagram.com/icongrid_/?next=%2F">
                <FaInstagram  color='#fff'/>
                </a>
                <FaTwitter />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ padding: '30px 0px 20px 0px' }}>
            <img width="100%" src={line} alt="" />
          </Box>

          <Box sx={{ fontSize:{xs:'9px',sm:'16px'},textAlign: 'center', color: 'white', paddingBottom: '20px' }}>
            Copyright © 2024 IconGrid Company S.L. All rights reserved
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
