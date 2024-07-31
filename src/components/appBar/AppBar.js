import { useDispatch } from 'react-redux';
import './style.css';
import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from '@mui/material';
import { setShowPopupGetPokeball } from '../../redux/slices/actionSlice';

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography sx={{ alignSelf: 'center' }} variant="button">
              <Link href={`/home`} underline="none">
                Pokedex
              </Link>
            </Typography>
            <Button
              onClick={() => dispatch(setShowPopupGetPokeball(true))}
              variant="contained"
              sx={{ left: 'calc(86% - 24px)' }}
            >
              Get Ball
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
