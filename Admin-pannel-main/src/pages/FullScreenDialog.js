// FullScreenDialog.js
import React, { useEffect, useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { FaCopy } from "react-icons/fa";
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { IoMdImages, IoIosShareAlt, IoIosDownload, IoIosArrowDown, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoPlaystation, IoLogoWhatsapp } from "react-icons/io";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, iconId, entityType }) {
  const [data, setData] = useState();
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedIconUrl, setSelectedIconUrl] = useState(null);
  const [iconName, setIconName] = useState('');
  const [pngName, setPngName] = useState('regular');
  const [png, setPng] = useState({ pngIcon: { regular: '', bold: '', thin: '', solid: '', straight: '', rounded: '' } });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleColorChange = async (event) => {
    const newColor = event.target.value;
    const cleanedColor = newColor.replace(/#/g, '');
    setSelectedColor(cleanedColor);
  };

  const handleColorPickerClose = async () => {
    getIcon(iconId, selectedColor)
  };

  useEffect(() => {
    if (iconId) {
      getIcon(iconId);
    }
  }, [iconId]);

  const getIcon = (iconId, color) => {
    axios.get(`http://localhost:3001/${entityType}/findById/${iconId}`)
      .then((res) => {
        console.log("Demo :- ", res.data.data);
        setIconName(res.data.data.name)

        if (color) {
          const allowedProperties = ['regular', 'bold', 'thin', 'solid', 'straight', 'rounded', 'icon'];
          const editedIconsArray = {};

          allowedProperties.forEach((el) => {
            if (res.data.data && res.data.data[el]) {
              const colorHex = "#" + color;
              let svgData = res.data.data[el];

              // Perform string manipulation operations
              if (svgData.includes('stroke="currentColor"')) {
                svgData = svgData.replace(/stroke="currentColor"/g, `stroke="${colorHex}"`);
                svgData = svgData.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
                svgData = svgData.replace(/<path\s+d="([^"]+)"\s*\/?>/g, `<path d="$1" fill="${colorHex}" />`);
              } else {
                svgData = svgData.replace(/stroke="#[a-zA-Z0-9]+"/g, `stroke="${colorHex}"`);
                svgData = svgData.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s+fill="#[a-zA-Z0-9]+"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
                if (svgData.includes('fill="#')) {
                  svgData = svgData.replace(/<path\s+d="([^"]+)"\s+fill="#[a-zA-Z0-9]+"/g, `<path d="$1" fill="${colorHex}" />`);
                } else {
                  svgData = svgData.replace(/<path\s+d="([^"]+)"\s*\/?>/g, `<path d="$1" fill="${colorHex}" />`);
                }
              }
              editedIconsArray[el] = svgData;
            }
          });
          console.log("svgData :- ", editedIconsArray);
          setData(editedIconsArray);
          if (entityType == "popular") {
            setSelectedIconUrl(editedIconsArray.icon);
          }
          else {
            setSelectedIconUrl(editedIconsArray[pngName]);
          }
          getPngIcon(editedIconsArray)
        }
        else {
          setData(res.data.data);
          getPngIcon(res.data.data)
          if (entityType == "popular") {
            setSelectedIconUrl(res.data.data.icon);
          }
          else {
            setSelectedIconUrl(res.data.data[pngName]);
          }
        }

      })
      .catch((error) => {
        console.log("Error:", error);
      })
  };

  useEffect(() => {
    if (pngName && data) {
      getPngIcon(data);
    }
  }, [pngName, data]);

  const getPngIcon = (svg) => {
    if (!svg || !svg[pngName]) {
      console.error('SVG data is missing or invalid');
      return;
    }

    let svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="200" height="200">${svg[pngName]}</svg>`;

    // Trim leading/trailing whitespace
    svgData = svgData.trim();

    console.log("SVG Data aaaaaaaa :- ", svgData); // Log SVG data for inspection

    if (svgData) {
      try {
        const base64Svg = btoa(svgData);

        const svgImageUrl = `data:image/svg+xml;base64,${base64Svg}`;

        const svgImage = new Image();

        svgImage.onload = () => {
          console.log("SVG loaded successfully");

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = svgImage.width;
          canvas.height = svgImage.height;

          context.drawImage(svgImage, 0, 0);

          canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result;

              let pngImg = `<img src="${base64data}">`;

              setPng({ pngIcon: { [pngName]: pngImg } });
              console.log("PNG Data:", pngImg);
            };
          }, 'image/png');
        };

        svgImage.onerror = (error) => {
          console.error('Error loading SVG image:', error);
        };

        svgImage.src = svgImageUrl;
      } catch (error) {
        console.error('Error converting SVG to PNG:', error);
      }
    } else {
      console.error('Invalid SVG data');
    }
  };

  const copyPngIcon = async () => {
    console.log("png :- ", png);
    if (png && png.pngIcon) {
      let pngData = png.pngIcon[pngName];
      await navigator.clipboard.writeText(pngData)
        .then(() => {
          console.log('Link copied to clipboard:', pngData);
        })
        .catch((error) => {
          console.error('Failed to copy link:', error);
        });
    }
  };

  const pngDownload = async (width) => {
    try {
      const svgElement = document.querySelector('.sizesvg svg');
      if (!svgElement) {
        console.error('SVG element not found');
        return;
      }

      let scaleFactor = 1; // Default scale factor for PNG

      // Determine scale factor based on width selection
      if (width === '512px') {
        scaleFactor = 512 / svgElement.width.baseVal.value;
      } else if (width === '256px') {
        scaleFactor = 256 / svgElement.width.baseVal.value;
      } else if (width === '128px') {
        scaleFactor = 128 / svgElement.width.baseVal.value;
      } else if (width === '64px') {
        scaleFactor = 64 / svgElement.width.baseVal.value;
      } else if (width === '32px') {
        scaleFactor = 32 / svgElement.width.baseVal.value;
      } else if (width === '24px') {
        scaleFactor = 24 / svgElement.width.baseVal.value;
      } else if (width === '16px') {
        scaleFactor = 16 / svgElement.width.baseVal.value;
      }

      // Convert SVG element to PNG image with the determined scale factor
      const pngDataUrl = await toPng(svgElement, { pixelRatio: scaleFactor });

      // Create a temporary anchor element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = pngDataUrl;
      downloadLink.download = `${iconName}-${pngName}-${width}.png`; // Add width information to the filename
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setAnchorEl(null);
    } catch (error) {
      console.error('Error downloading PNG:', error);
    }
  };

  const selectedIcon = (icon, iconName) => {
    console.log("selectedIcon function called");
    if (data && data.regular) {
      let selectedUrl = icon ? icon : data.regular;
      setSelectedIconUrl(selectedUrl);
      setPngName(iconName);
    }
  };

  const link = () => {
    if (selectedIconUrl) {
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="65" height="65">${selectedIconUrl}</svg>`;
      return svgContent;
    }
    return '';
  };

  const copy = () => {
    const linkContent = link();
    if (linkContent) {
      navigator.clipboard.writeText(linkContent)
        .then(() => {
          console.log('Link copied to clipboard:', linkContent);
        })
        .catch((error) => {
          console.error('Failed to copy link:', error);
        });
    }
  };

  const download = () => {
    const linkContent = link();
    if (linkContent) {
      const blob = new Blob([linkContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${iconName}-${pngName}.svg` // Set the desired filename here
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const pack = async () => {
    try {
      const iconVariants = ['regular', 'bold', 'solid', 'thin', 'rounded', 'straight'];
      const zip = new JSZip();

      iconVariants.forEach((variant) => {
        const svgData = data[variant];
        if (svgData) {
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="200" height="200">${svgData}</svg>`;
          zip.file(`${iconName}-${variant}.svg`, svgContent);
        }
      });

      const content = await zip.generateAsync({ type: 'blob' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(content);
      downloadLink.download = 'icon_pack.zip';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error packing icons:', error);
    }
  };

  const save = (data) => {
    axios.post(`http://localhost:3001/save/create`, { save: data._id })
      .then((res) => {
        console.log("save Dataaaaaaa :- ", res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      })
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: '#FFBC06' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" color={'#272727'} fontWeight={'600'} component="Box">
              {iconName}
            </Typography>
            <IconButton
              edge="start"
              color="black"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{}}>
          {data && (
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', padding: '10px 25px', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <Box sx={{ fontSize: { xs: '10px', sm: '14px' }, border: '1px solid', borderRadius: '7px', fontWeight: '600', padding: '7px 20px' }} onClick={() => save(data)}>
                    Save
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}>
                    <input
                      type="color"
                      id="color1"
                      value={selectedColor}
                      onChange={handleColorChange}
                      onBlur={handleColorPickerClose}
                    />
                  </Box>
                </Box>
                <Box className='center sizesvg' sx={{ paddingY: '55px', border: '1px solid #dadada', borderRadius: '9px', margin: '10px 25px' }}>
                  {selectedIconUrl && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: selectedIconUrl }}></svg>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', padding: '10px 21px', justifyContent: 'space-between', fontWeight: '600', fontSize: '24px' }}>
                  IconGrid
                </Box>

                {
                  entityType == "popular" ? '' : <Box sx={{ display: 'flex', padding: '12px 0px', justifyContent: 'space-around', overflow: 'hidden' }}>
                    <Tooltip title="Regular">

                      <Box sx={{ cursor: 'pointer' }} className='type' onClick={() => selectedIcon(data.regular, "regular")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: data.regular }}></svg>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Bold">

                      <Box sx={{ cursor: 'pointer' }} className='type' onClick={() => selectedIcon(data.bold, "bold")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: data.bold }}></svg>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Solid">

                      <Box sx={{ cursor: 'pointer' }} className='type' onClick={() => selectedIcon(data.solid, "solid")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: data.solid }}></svg>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Thin">

                      <Box sx={{ cursor: 'pointer' }} className='type' onClick={() => selectedIcon(data.thin, "thin")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: data.thin }}></svg>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Rounded">

                      <Box sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }} className='type' onClick={() => selectedIcon(data.rounded, "rounded")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: data.rounded }}></svg>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Straight">

                      <Box sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }} className='type' onClick={() => selectedIcon(data.straight, "straight")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: data.straight }}></svg>
                      </Box>
                    </Tooltip>
                  </Box>
                }

                <Box className='center' sx={{ height: '175px', margin: '12px 25px' }}>
                  <Box className="code-editor">
                    <Box className="header">
                      <span className="title">HTML</span>
                      <span className="title" ><FaCopy onClick={copy} /></span>
                    </Box>
                    <Box className="editor-content">
                      <code className="code">
                        <p><span className="color-0"> </span> <span></span></p>
                        <p className="property">
                          <span className="color-2">{link()}</span>
                        </p>
                        <span></span>
                      </code>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', margin: '24px 25px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Box className='center' sx={{ borderRadius: '7px', cursor: 'pointer', fontWeight: '600', backgroundColor: '#ffbc06', color: '#272727', padding: '10px 30px' }}
                        onClick={() => copyPngIcon()}
                      >
                        <Box sx={{ paddingRight: '7px', display: 'flex', alignItems: 'center' }}><IoMdImages fontSize={'20px'} /></Box>
                        <Box fontSize={'13px'}>
                          <Tooltip title="Copy PNG to clipboard">Copy PNG</Tooltip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} onClick={pack}>
                      <Box className='center' sx={{ borderRadius: '7px', cursor: 'pointer', fontWeight: '600', backgroundColor: '#198754', color: '#fff', padding: '10px 30px' }}>
                        <Box sx={{ paddingRight: '7px', display: 'flex', alignItems: 'center' }}><IoIosDownload fontSize={'20px'} />
                        </Box>
                        <Box fontSize={'13px'}>
                          <Tooltip title="Download Pack">Pack</Tooltip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                      <Box className='center' sx={{ borderRadius: '7px', cursor: 'pointer', fontWeight: '600', backgroundColor: '#272727', color: '#fff', padding: '10px 30px' }}>
                        <Box sx={{ paddingRight: '7px', display: 'flex', alignItems: 'center' }}><IoIosShareAlt fontSize={'20px'} />
                        </Box>
                        <Box fontSize={'13px'}>
                          <Tooltip title="Download Pack">Share</Tooltip>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* <Grid xs={12} sm={4}>
                    <div class="bg-box">
                      <div class="share-btn">
                        <span class="text-share-btn"><IoIosShareAlt fontSize={'20px'} />Share</span>
                        <ul class="share-items">
                          <li><a href="#"><IoLogoFacebook /></a></li>
                          <li><a href="#"><IoLogoTwitter /></a></li>
                          <li><a href="#"><IoLogoInstagram /></a></li>
                          <li><a href="#"><IoLogoPlaystation /></a></li>
                          <li><a href="#"><IoLogoWhatsapp /></a></li>
                        </ul>
                      </div>
                    </div>
                  </Grid> */}

                {/* <Box sx={{ display: 'flex', margin: '24px 25px' }}>
                  <Grid container>
                  <Grid xs={6} sm={3} marginRight={'10px'}>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        className='center'
                        sx={{
                          borderRadius: '7px',
                          backgroundColor: '#f5f5f5',
                          fontWeight: '600',
                          padding: '10px 10px',
                          cursor: 'pointer',
                        }}
                      // onClick={handleClick}
                      >
                        <Box>
                          PNG <IoIosArrowDown onClick={handleClick} />
                        </Box>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      >
                        <MenuItem onClick={() => pngDownload('512px')}>512px</MenuItem>
                        <MenuItem onClick={() => pngDownload('256px')}>256px</MenuItem>
                        <MenuItem onClick={() => pngDownload('128px')}>128px</MenuItem>
                        <MenuItem onClick={() => pngDownload('64px')}>64px</MenuItem>
                        <MenuItem onClick={() => pngDownload('32px')}>32px</MenuItem>
                        <MenuItem onClick={() => pngDownload('24px')}>24px</MenuItem>
                        <MenuItem onClick={() => pngDownload('16px')}>16px</MenuItem>
                      </Menu>
                    </Box>
                  </Grid>
                  <Grid xs={6} sm={3} marginRight={'10px'}>
                    <Box onClick={download} className='center' sx={{ borderRadius: '7px', backgroundColor: '#f5f5f5', fontWeight: '600', padding: '10px 30px' }}>
                      SVG
                    </Box>
                  </Grid>
                  <Grid xs={6} sm={3} marginRight={'10px'}>
                    <Box onClick={download} className='center' sx={{ borderRadius: '7px', backgroundColor: '#f5f5f5', fontWeight: '600', padding: '10px 30px' }}>
                      Android
                    </Box>
                  </Grid>
                  <Grid onClick={download} xs={6} sm={3} >
                    <Box className='center' sx={{ borderRadius: '7px', backgroundColor: '#f5f5f5', fontWeight: '600', padding: '10px 30px' }}>
                      iOS
                    </Box>
                  </Grid>
                  </Grid>
                </Box> */}
                <Box sx={{ display: 'flex', margin: '24px 25px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3} marginBottom={'10px'}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          className='center'
                          sx={{
                            borderRadius: '7px',
                            backgroundColor: '#f5f5f5',
                            fontWeight: '600',
                            padding: '10px',
                            cursor: 'pointer',

                          }}
                          onClick={handleClick}
                        >
                          <Box>
                            PNG <IoIosArrowDown />
                          </Box>
                        </Box>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                          <MenuItem onClick={() => pngDownload('512px')}>512px</MenuItem>
                          <MenuItem onClick={() => pngDownload('256px')}>256px</MenuItem>
                          <MenuItem onClick={() => pngDownload('128px')}>128px</MenuItem>
                          <MenuItem onClick={() => pngDownload('64px')}>64px</MenuItem>
                          <MenuItem onClick={() => pngDownload('32px')}>32px</MenuItem>
                          <MenuItem onClick={() => pngDownload('24px')}>24px</MenuItem>
                          <MenuItem onClick={() => pngDownload('16px')}>16px</MenuItem>
                        </Menu>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} marginBottom={'10px'}>
                      <Box onClick={download} className='center' sx={{ borderRadius: '7px', backgroundColor: '#f5f5f5', fontWeight: '600', padding: '10px', width: '100%', cursor:'pointer' }}>
                        SVG
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} marginBottom={'10px'}>
                      <Box onClick={download} className='center' sx={{ borderRadius: '7px', backgroundColor: '#f5f5f5', fontWeight: '600', padding: '10px', width: '100%', cursor:'pointer' }}>
                        Android
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box onClick={download} className='center' sx={{ borderRadius: '7px', backgroundColor: '#f5f5f5', fontWeight: '600', padding: '10px', width: '100%', cursor:'pointer' }}>
                        iOS
                      </Box>
                    </Grid>
                  </Grid>
                </Box>


                <Box className='center' sx={{ fontSize: { xs: '11px', sm: '18px' }, paddingTop: '20px' }}>
                  Begin incorporating this icon into your designs.
                </Box>
              </Grid>

              <Grid xs={12}>
                <Box paddingBottom={'60px'} justifyContent={'center'} display={'flex'}>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
