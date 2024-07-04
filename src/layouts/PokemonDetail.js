import { useEffect, useState } from 'react';
import './style.css';
import { catchPokemon, getDetailPokemon } from '../services/APIService';
import BoxDesc from '../components/boxDesc/BoxDesc';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/pokemonSlice';
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

const PokemonDetail = () => {
  const pokemonDetail = useLoaderData();
  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

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
