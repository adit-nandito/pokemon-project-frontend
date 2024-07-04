import Logo from '../../assets/pokemon-navbar.png';
import './style.css';
import TabMenu from '../tabMenu/TabMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/slices/pokemonSlice';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pokemon.page);

  const handleChangePage = (event, value) => {
    dispatch(setPage(value));
  };
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
