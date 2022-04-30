import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import lol from './Header.module.css'




const Header = ({username,isAuth,Logout}) => {
  const [anchorElUser, setAnchorElUser] =useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return (
        <header  >
      <AppBar position={"static"}  className={lol.bg_header} >
      <Container className={lol.bg_header}   maxWidth="xl">
        <Toolbar    disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
          <Link className={lol.linksdelete} to={'/'}>Project Manager</Link>
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          <Button variant="outlined"
                sx={{ ml: 5, color: 'white', display: 'block' }}
              ><Link className={lol.linksdelete} to={'/project/create'}>Project Create</Link>
              </Button>
          </Box>


          <Box  sx={{ flexGrow: 0 }}>
            <Tooltip  title="Open settings">
              <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               <div className={lol.linksdelete}> {username}</div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>

                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                      {isAuth ? <Button   onClick={Logout} color={'primary'}>Logout</Button>
                  :
                          <Link to={'/'}>Login</Link>
                  }
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>


        </header>
    );
};



export default compose(connect(null, null
))(Header);
