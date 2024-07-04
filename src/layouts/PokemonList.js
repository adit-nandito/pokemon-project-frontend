import { useState, Fragment } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { setCatchablePokemon, setSecretPokemon } from '../redux/slices/pokemonSlice';
import { releasePokemon, renamePokemon } from '../services/APIService';
import PaginationRounded from '../components/pagination/Pagination';
import Thumbnail from '../components/thumbnail/Thumbnail';
import SelectInput from '../components/selectInput/SelectInput';
import TabMenu from '../components/tabMenu/TabMenu';
import './style.css';

const PokemonList = (props) => {
  const response = useLoaderData();
  const dispatch = useDispatch();

  // const typePage = useSelector((state) => state.pokemon.page);
  // console.log('count========', count);

  const offset = 27;
  const [isShowDialogForm, setShowDialogForm] = useState(false);
  const [isShowDialogChoice, setShowDialogChoice] = useState(false);
  const [isShowDialogConfirm, setShowDialogConfirm] = useState(false);
  const [idPokemon, setIDPokemon] = useState('');
  const [pageCatchablePokemon, setPageCatchablePokemon] = useState(1);
  const [pageSecretPokemon, setPageSecretPokemon] = useState(1);
  const [typePage, setTypePage] = useState('main');

  const listCatchablePokemon = response.catchablePokemon.list;
  const listSecretPokemon = response.secretPokemon.list;
  const limitCatchablePokemon = response.catchablePokemon.limit;
  const limitSecretPokemon = response.secretPokemon.limit;
  const limitPokemon = typePage === 'secret' ? limitSecretPokemon : limitCatchablePokemon;

  dispatch(setCatchablePokemon(listCatchablePokemon));
  dispatch(setSecretPokemon(listSecretPokemon));

  const __generateMainPage = (dataObject) => {
    const { listCatchablePokemon, listSecretPokemon } = dataObject;
    const pageValue = typePage === 'secret' ? pageSecretPokemon : pageCatchablePokemon;
    const minValue = (pageValue - 1) * offset;
    const maxValue = minValue + offset;
    let listPokemon = listCatchablePokemon.slice(minValue, maxValue);
    if (typePage === 'secret') {
      listPokemon = listSecretPokemon.slice(minValue, maxValue);
    }

    return listPokemon.map((item) => (
      <div key={item.id} className="layoutPokemonList">
        <Thumbnail index={item.index} id={item.id} image={item.image} />
      </div>
    ));
  };

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
    <div id="PokemonListLayout">
      <TabMenu setTypePage={setTypePage} typePage={typePage} />
      <div className="layoutPokemonList">
        <div className="componentPagination">
          <PaginationRounded
            limitPokemon={limitPokemon}
            offset={offset}
            typePage={typePage}
            setPageCatchablePokemon={setPageCatchablePokemon}
            setPageSecretPokemon={setPageSecretPokemon}
            pageCatchablePokemon={pageCatchablePokemon}
            pageSecretPokemon={pageSecretPokemon}
          ></PaginationRounded>
        </div>
        {__generateMainPage({ typePage, listCatchablePokemon, listSecretPokemon })}
      </div>
      <div className="componentSelectedInput">
        <SelectInput
          limitPokemon={limitPokemon}
          offset={offset}
          typePage={typePage}
          setPageCatchablePokemon={setPageCatchablePokemon}
          setPageSecretPokemon={setPageSecretPokemon}
          pageCatchablePokemon={pageCatchablePokemon}
          pageSecretPokemon={pageSecretPokemon}
        />
      </div>
    </div>
  );
};

export default PokemonList;
