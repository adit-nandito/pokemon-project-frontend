import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Slide,
  Alert
} from '@mui/material';
import { useState } from 'react';
import _ from 'lodash';
import './style.css';
import { catchPokemon } from '../../../services/APIService';
import LoadingComponent from '../Loading/LoadingComponent';

const PokemonDetail = (props) => {
  const { detail } = props;
  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const [stateIsShowPopup, setStateShowPopup] = useState(false);
  const [stateIsShowSnackbar, setStateShowSnackbar] = useState(false);
  const [stateIsLoading, setStateLoading] = useState(false);
  const [stateSnackbarStatus, setSnackBarStatus] = useState('');

  const handleCatch = () => {
    setStateShowPopup(false);
    setStateLoading(true);
    catchPokemon(detail.id, (isCaptured) => {
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', opacity: stateIsLoading ? 0.5 : 'unset' }}>
        <Card
          sx={{
            width: 2 / 5,
            boxShadow: '0px 2px 1px 15px rgba(0,0,0,0.25)',
            marginTop: '14px'
          }}
        >
          <div className="componentDetail"># {detail.id}</div>
          <CardMedia sx={{ width: 'auto' }} component="img" alt={detail.name} image={detail.image} />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {detail.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {detail.desc}
            </Typography>
            <div className="componentDetailStatus">
              <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>Types</span>
              <span style={{ display: 'flex', gap: '10px' }}>
                {detail.types.map((type) => (
                  <Chip label={_.capitalize(type)} variant="outlined" />
                ))}
              </span>
            </div>
            <div className="componentDetailStatus">
              <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>Habitat</span>
              <span>{_.startCase(detail.habitat.name).replace('-', ' ')}</span>
            </div>
            <div className="componentDetailStatus">
              <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>Height</span>
              <span>{detail.height} feet</span>
            </div>
            <div className="componentDetailStatus">
              <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>Weight</span>
              <span>{new Intl.NumberFormat().format(detail.weight)} pound</span>
            </div>
            {detail.stats.map((item) => (
              <div className="componentDetailStatus">
                <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                  {_.startCase(item.stat.name).replace('-', ' ')}
                </span>
                <span>{item.base_stat}</span>
              </div>
            ))}
          </CardContent>

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
        {LoadingComponent(stateIsLoading)}
      </div>
    </div>
  );
};

export default PokemonDetail;
