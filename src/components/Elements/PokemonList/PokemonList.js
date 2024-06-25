import { useState, Fragment, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getListMyPokemon, getListPokemon, releasePokemon, renamePokemon } from '../../../services/APIService';
import { useDispatch } from 'react-redux';
import { addPokemon } from '../../../redux/slices/pokemonSlice';

const PokemonList = (props) => {
  const { isMyPokemon } = props;

  const dispatch = useDispatch();
  const generateThumbnailPokemon = (itemPokemon) => {
    return (
      <Link to={`/detail/${itemPokemon.id}`}>
        <CardActionArea>
          <CardMedia component="img" height="180" image={itemPokemon.image} alt={itemPokemon.name} />
        </CardActionArea>
      </Link>
    );
  };

  const [isShowDialogForm, setShowDialogForm] = useState(false);
  const [isShowDialogChoice, setShowDialogChoice] = useState(false);
  const [isShowDialogConfirm, setShowDialogConfirm] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [idPokemon, setIDPokemon] = useState('');

  useEffect(() => {
    if (isMyPokemon) {
      getListMyPokemon((data) => {
        setPokemonList(data);
      });
    } else {
      getListPokemon((data) => {
        setPokemonList(data);
      });
    }
  }, []);

  useEffect(() => {
    if (isShowDialogConfirm) {
      getListMyPokemon((data) => {
        setPokemonList(data);
      });
    }
  }, [isShowDialogConfirm]);

  const handleClickOpenDialogForm = (id) => {
    setIDPokemon(id);
    setShowDialogForm(true);
  };

  const handleCloseDialogForm = () => {
    setShowDialogForm(false);
  };

  const handleClickOpenDialogChoice = (id) => {
    setIDPokemon(id);
    setShowDialogChoice(true);
  };

  const handleCloseDialogChoice = () => {
    setShowDialogChoice(false);
  };

  const handleCloseDialogConfirm = () => {
    setShowDialogConfirm(false);
  };

  const handleSubmitRename = (nickname) => {
    setShowDialogForm(false);
    dispatch(addPokemon(true));
    renamePokemon(idPokemon, nickname, (res) => {
      setShowDialogConfirm(true);
    });
  };

  const handleRelease = () => {
    setShowDialogChoice(false);
    releasePokemon(idPokemon, (res) => {
      setShowDialogConfirm(true);
    });
  };

  const generateCardMyPokemon = (itemPokemon) => {
    const idPokemon = itemPokemon.id.split('_')[0];
    return (
      <Fragment>
        <CardActionArea>
          <Link to={`/detail/${idPokemon}`}>
            <CardMedia component="img" height="200" image={itemPokemon.image} alt={itemPokemon.name} />
          </Link>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {itemPokemon.nickName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {itemPokemon.name}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => handleClickOpenDialogChoice(itemPokemon.id)}>
              Release
            </Button>

            <Button variant="outlined" onClick={() => handleClickOpenDialogForm(itemPokemon.id)}>
              Rename
            </Button>
          </CardActions>
        </CardActionArea>

        <Dialog
          open={isShowDialogForm}
          onClose={handleCloseDialogForm}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              handleSubmitRename(event.target.nickname.value);
            }
          }}
        >
          <DialogTitle>Rename POKéMON</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="nickname"
              name="nickname"
              label="Nickname"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogForm}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isShowDialogChoice}
          onClose={handleCloseDialogChoice}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure release the POKéMON?'}</DialogTitle>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleRelease}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleCloseDialogChoice}>
              No
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isShowDialogConfirm}
          onClose={handleCloseDialogConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Data has been updated'}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialogConfirm} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  };

  return (
    <div style={{ display: 'ruby' }}>
      {pokemonList.map((item) => {
        return (
          <Card key={item.id} sx={{ display: 'inline-grid', margin: 10 / 8, width: isMyPokemon ? 'none' : 180 }}>
            {isMyPokemon ? generateCardMyPokemon(item) : generateThumbnailPokemon(item)}
          </Card>
        );
      })}
    </div>
  );
};

export default PokemonList;
