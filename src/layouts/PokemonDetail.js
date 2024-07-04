import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Snackbar,
  Typography
} from '@mui/material';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import { catchPokemon } from '../services/APIService';
import BoxDesc from '../components/boxDesc/BoxDesc';
import './style.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const pokemonDetail = useLoaderData();
  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const pokemon = useSelector((state) => state.pokemon);
  const { listCatchablePokemon, listSecretPokemon } = pokemon;

  const [stateIsShowPopup, setStateShowPopup] = useState(false);
  const [stateIsShowSnackbar, setStateShowSnackbar] = useState(false);
  const [stateIsLoading, setStateLoading] = useState(false);
  const [stateSnackbarStatus, setSnackBarStatus] = useState('');
  // const [pokemonDetail, setPokemonDetail] = useState();

  // useEffect(() => {
  //   getDetailPokemon(name, (err, data) => {
  //     if (err) {
  //       console.log('halaman error detail');
  //     } else {
  //       setPokemonDetail(data);
  //     }
  //   });
  // }, []);

  const __generateButtonPokemonDetail = (dataObject) => {
    const { name, isCatchablePokemon, listCatchablePokemon, listSecretPokemon } = dataObject;
    let list = listSecretPokemon;
    if (isCatchablePokemon) {
      list = listCatchablePokemon;
    }

    const index = list.findIndex((item) => item.id === name);
    console.log('PokemonDetail ~ index=====', index);
    const prevPokemon = list[index - 1];
    console.log('PokemonDetail ~ prevPokemon=====', prevPokemon);
    const nextPokemon = list[index + 1];
    console.log('PokemonDetail ~ nextPokemon=====', nextPokemon);

    let prevPokemonButton = '';
    let nextPokemonButton = '';

    if (prevPokemon) {
      prevPokemonButton = (
        <span>
          <Button href={`/detail/${prevPokemon.id}`} variant="contained" startIcon={<ArrowBackIosRounded />}>
            Prev Pokémon
          </Button>
        </span>
      );
    }

    if (nextPokemon) {
      nextPokemonButton = (
        <span>
          <Button href={`/detail/${nextPokemon.id}`} variant="contained" endIcon={<ArrowForwardIosRounded />}>
            Next Pokémon
          </Button>
        </span>
      );
    }

    return (
      <div className="componentButtonPrevNextDetail">
        {prevPokemonButton}
        {nextPokemonButton}
      </div>
    );
  };

  const handleCatch = () => {
    setStateShowPopup(false);
    setStateLoading(true);
    catchPokemon(pokemonDetail.id, (isCaptured) => {
      setStateLoading(false);

      if (isCaptured) {
        setSnackBarStatus('success');
      } else {
        setSnackBarStatus('info');
      }
      setStateShowSnackbar(true);
    });
  };

  const handleOpenPopup = () => {
    setStateShowPopup(true);
  };

  const handleClosePopup = () => {
    setStateShowPopup(false);
  };

  const handleCloseSnackbar = () => {
    setStateShowSnackbar(false);
  };

  return (
    <div className="componentDetailPage">
      <Card
        sx={{
          boxShadow: '0px 2px 1px 15px rgba(0,0,0,0.25)',
          paddingTop: '14px',
          width: 'calc(100% - 550px)',
          padding: '1em 1.5em'
        }}
      >
        {pokemonDetail ? (
          <div className="componentDetailLayout">
            <span className="componentProfileDetail">
              <div className="componentIndexNumber"># {pokemonDetail.index}</div>
              <div className="componentImageDetail">
                <CardMedia
                  sx={{ width: 'auto' }}
                  component="img"
                  alt={pokemonDetail.name}
                  image={pokemonDetail.image}
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {pokemonDetail.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {pokemonDetail.desc}
                </Typography>
                <BoxDesc title="" pokemonDetail={pokemonDetail} type="descstatus" />
              </CardContent>
            </span>
            <span className="componentStatusDescDetail">
              <BoxDesc title="Abilities" pokemonDetail={pokemonDetail} type="abilities" />
              <BoxDesc title="Base Status" pokemonDetail={pokemonDetail} type="basestatus" />
              {__generateButtonPokemonDetail({
                name,
                isCatchablePokemon: pokemonDetail.isCatchablePokemon,
                listCatchablePokemon,
                listSecretPokemon
              })}
            </span>
          </div>
        ) : (
          ''
        )}

        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleOpenPopup}>
            Catch POKéMON
          </Button>

          <Dialog
            open={stateIsShowPopup}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Try to catch POKéMON?'}</DialogTitle>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleCatch}>
                Yes
              </Button>
              <Button variant="outlined" onClick={handleClosePopup}>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={stateIsShowSnackbar}
        TransitionComponent={slideTransition}
        autoHideDuration={4000}
        key={'topcenter'}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={stateSnackbarStatus} variant="filled">
          {stateSnackbarStatus === 'success'
            ? 'Yeay! You Successully catch a POKéMON'
            : 'Oops, You failed catch a POKéMON. Try Again'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PokemonDetail;
