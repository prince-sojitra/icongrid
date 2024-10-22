import { Search } from '@mui/icons-material'
import { Box, Button, Container, Grid, Toolbar } from '@mui/material'
import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
const StyledInput = styled(Input)(
    ({ theme }) => `
  
    .${inputClasses.input} {
      width: 320px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    }
  `,
);

const Label = styled(({ children, className }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
        <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
            {children}
            {required ? ' *' : ''}
        </p>
    );
})`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;
  
    &.invalid {
      color: red;
    }
  `;

const HelperText = styled((props) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
  `;

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

function Support() {
    useEffect(() => {
        Gotoup()
      }, [])
      const Gotoup = () => {
    
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    
      }
    return (
        <Box>
            <Box sx={{ marginTop: '25px', backgroundColor: '#FFE08A' }}>
                <Container className='bgIcons' maxWidth="xl" sx={{}}>
                    <Grid container xs={12}>
                        <Grid xs={12} sx={{ margin: { xs: '70px 24px 70px 24px', sm: '70px 30px 70px 30px', md: '122px 70px 122px 90px' } }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ fontSize: {xs:'23px',sm:'34px'}, marginBottom: '17px', fontWeight: '500', display: 'inline-block', borderBottom: '3px solid #272727' }}>Can we help you?</Box>
                                <Box sx={{ position: 'absolute', top: { xs: '-55%', sm: '-55%', md: '-52%' }, left: { xs: '54%', sm: '58%', md: '33%' } }}></Box>
                            </Box>

                            <Box class="wrapper center" >
                                <Box class="searchBar">
                                    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value="" />
                                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                        <Box sx={{ paddingLeft: '10px', paddingTop: '5px' }}>
                                            <FaSearch fontSize={'20px'} />
                                        </Box>
                                    </button>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Container>
            </Box>

            <Box margin={'20px 0px'}>
                <Box className='center' fontSize={'30px'} fontWeight={'600'}>Submit a request</Box>
                <Box className='center'>
                    <FormControl defaultValue="" >
                        <Label>Name</Label>
                        <StyledInput placeholder="" />
                        <HelperText />
                    </FormControl>

                </Box>
                <Box className='center'>
                    <FormControl defaultValue="" >
                        <Label>Email</Label>
                        <StyledInput placeholder="" />
                        <HelperText />
                    </FormControl>

                </Box>
                <Box className='center'>
                    <FormControl defaultValue="" >
                        <Label>Subject</Label>
                        <StyledInput placeholder="" />
                        <HelperText />
                    </FormControl>

                </Box>
                <Box className='center'>
                    <FormControl defaultValue="" >
                        <Label>Description</Label>
                        <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>
                    </FormControl>
                </Box>
                <Box className='center'>
                    <Button variant="contained" type='submit' sx={{ border:'1px solid',margin: '20px 0px 0px 0px', textTransform: "capitalize", fontSize: "16px", backgroundColor: "#fff", color: '#272727', fontWeight: '700' }}>
                        Send
                    </Button>
                </Box>


            </Box>
        </Box>
    )
}

export default Support