import React from "react";
import "./MenuBar.css";
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MenuIcon from "@mui/icons-material/Menu";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; 
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(17, 81, 88, 0.8)",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 850,
      lg: 1200,
      xl: 1536,
    },
  },
});

const MenuBar = ({ children }: any) => {
  const pages = ["Training", "Graph", "MyPage"];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" className="header">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* PC ロゴ */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Link to={"/"} className="logoLink">
                  <h6>トレコード</h6>
                  <p>Training×Recording</p>
                </Link>
              </Box>

              {/* SP メニューアイコン */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
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
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link to={`/${page.toLowerCase()}/`}>{page}</Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* SP　ロゴ */}
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                トレコード
              </Typography>

              {/* PC　メニュー */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "end",
                  gap: "20px",
                  fontSize: "18px",
                }}
              >
                <Link className="menu linkColor" to={"/training/"}>
                  <FitnessCenterIcon />
                  Training
                </Link>
                <Link className="menu linkColor" to={"/graph/"}>
                  <TimelineIcon />
                  Graph
                </Link>
                <Link className="menu linkColor" to={"/mypage/"}>
                  <PersonRoundedIcon />
                  My Page
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      {children}
    </>
  );
};

export default MenuBar;
