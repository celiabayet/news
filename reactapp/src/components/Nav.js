import React, { useState, useEffect } from 'react';
import { Link as RouterLink , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Link} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BookOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import '../stylesheets/App.css';

const Nav = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userName = async() => {
        const data = await fetch(`/users/username?token=${props.token}`);
        const body = await data.json();
        setUsername(body.username);
    }
    userName()
  }, [props.token])

  const pages = [
    { name: 'Source', route: '/source', icon: <HomeOutlined />},
    { name: 'Library', route: '/library', icon: <BookOutlined />},
    { name: `Hello ${username}`,route: '/', icon: <LogoutOutlined />}
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (

    <AppBar position="sticky" >
      <Container maxWidth="xl">
        <Toolbar disableGutters style={myStyle.customizeToolbar}>

          {/* Mobile navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{vertical: 'bottom',horizontal: 'center',}}
              keepMounted
              transformOrigin={{vertical: 'top',horizontal: 'left',}}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: { xs: 'block', md: 'none' }}}
            >
              {pages.map((page) => (
                <Link
                  component={RouterLink}
                  to={page.route}
                  underline='none'
                >
                  <MenuItem key={page.name}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>

              ))}
            </Menu>
          </Box>

          {/* Web navbar */}
          <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-around',
            alignItems: 'center'
            }}
          >
            {pages.map((page, index) => {
                return (
                  <Button  
                    key={page.id}
                    component={RouterLink}
                    to={page.route}
                  >
                    <Typography textAlign="center" variant="body1">{page.icon} {page.name} </Typography>
                  </Button> 
                )
              })
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Style
const myStyle = {
  customizeToolbar: {
    minHeight: 36
  }
};

function mapStateToProps(state){
  return {token: state.token}
}
export default withRouter(connect(mapStateToProps, null)(Nav));
