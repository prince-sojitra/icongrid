import { Box, Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import faq from './brands/FAQs-bro.png'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
function Faqs() {
    const [expanded, setExpanded] = React.useState('panel1');
    useEffect(() => {
        Gotoup()
    }, [])
    const Gotoup = () => {

        window.scrollTo({ top: 0, left: 0, behavior: "auto" })

    }
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <Box>
            <Box sx={{ margin: '100px 20px', borderRadius: '40px', backgroundColor: '#FDF0CE' }}>
                <Container maxWidth="xl" sx={{}}>
                    <Grid container xs={12}>
                        <Box sx={{ flexDirection: { xs: 'column', md: 'row' }, display: 'flex' }}>
                            <Grid md={6} xs={12} sx={{ padding: { xs: '36px 40px', md: '36px 40px', lg: '80px 40px' } }}>
                                <Box sx={{ marginBottom: '20px', fontWeight: '500', color: '#B28F34' }}>
                                    FAQ
                                </Box>
                                <Box sx={{ fontSize: { xs: '30px', sm: '50px', md: '60px', lg: '70px' }, lineHeight: '1.2', fontWeight: '700', color: '#272727' }}>
                                    Find the Answers You Need
                                </Box>
                                <Box sx={{ fontSize: { xs: '12px', sm: '16px' }, color: '#888888' }}>
                                    Discover solutions to your queries and maximize your IconGrid experience through our comprehensive documentation, step-by-step guides, and troubleshooting insights.
                                </Box>
                            </Grid>
                            <Grid md={6} xs={12} className='center' sx={{ alignItems: 'center' }}>
                                <Box>
                                    <img width={'100%'} src={faq} alt="" srcset="" />
                                </Box>
                            </Grid>

                        </Box>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ fontSize: '32px', fontWeight: '600', textAlign: 'center', margin: '20px 0px' }}>
                General FAQs
            </Box>
            <Box sx={{ width: '80%', margin: 'auto', marginBottom: '30px' }}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Where and how can I upload my own icons?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            The latest feature in our Kits offering is Icon Upload, allowing users to seamlessly integrate their own SVG icons into their chosen kits. This feature not only enhances customization but also boosts performance, making Kits the optimal choice for leveraging IconGrid on the web. With Icon Upload, users can simply upload their desired icons into their selected kit and immediately incorporate them alongside IconGrid's extensive library.

                            Although currently tailored for web applications, we envision Kits evolving into a pivotal component for a broader range of functionalities in the future. Stay tuned for updates as we continue to expand the capabilities of Kits to meet the evolving needs of our users.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>What formats is IconGrid available in?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            IconGrid Free are available to you in two formats:

                            as an SVG, also called better format
                            as PNG
                            Downloads of either format are available for both IconGrid Free and IconGrid Pro (if you have a perpetual license). To make them easier to use on the web, we have created frameworks for each. And we have lots of documentation on how to use them on the web and on the desktop.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography>What are Pageviews?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Pageviews serve as our primary metric for gauging the utilization of our Kits service, which efficiently hosts and delivers icons for your projects. By default, there are no limitations placed on the domains that can access your Kit. However, for enhanced security and control, we provide the option to "whitelist" specific domains. This feature empowers you to selectively restrict access to your Kit, ensuring it is only utilized by approved websites.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    )
}

export default Faqs