import './style.css';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button href="/home" sx={{ my: 2, color: 'white', display: 'block' }}>
              Pokedex
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
