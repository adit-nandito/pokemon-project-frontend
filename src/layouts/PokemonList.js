import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCatchablePokemon, setSecretPokemon } from '../redux/slices/pokemonSlice';
import { getListPokemon, getPokemonBall } from '../services/APIService';
import ErrorPage from '../pages/ErrorPage';
import Loading from '../components/loading/Loading';
import PaginationRounded from '../components/pagination/Pagination';
import Thumbnail from '../components/thumbnail/Thumbnail';
import SelectInput from '../components/selectInput/SelectInput';
import TabMenu from '../components/tabMenu/TabMenu';
import './style.css';
import DialogPopUp from '../components/dialogPopUp/DialogPopUp';

const PokemonList = () => {
  const dispatch = useDispatch();
  const offset = 27;
  const [pageCatchablePokemon, setPageCatchablePokemon] = useState(1);
  const [pageSecretPokemon, setPageSecretPokemon] = useState(1);
  const [typePage, setTypePage] = useState('main');
  const [isLoading, setLoading] = useState(true);
  const [listCatchablePokemon, setListCatchablePokemon] = useState([]);
  const [listSecretPokemon, setListSecretPokemon] = useState([]);
  const [limitPokemon, setLimitPokemon] = useState(0);
  const [dialogDetail, setDialogDetail] = useState({});
  const [isLoadingDialog, setLoadingDialog] = useState(false);

  const action = useSelector((state) => state.action);
  const { isShowPopupGetPokeball } = action;

  useEffect(() => {
    getListPokemon((err, res) => {
      setLoading(false);
      if (err) {
        return <ErrorPage />;
      } else {
        const catchablePokemon = res.catchablePokemon.list;
        const secretPokemon = res.secretPokemon.list;
        const limitCatchablePokemon = res.catchablePokemon.limit;
        const limitSecretPokemon = res.secretPokemon.limit;
        const limit = typePage === 'secret' ? limitSecretPokemon : limitCatchablePokemon;
        setListCatchablePokemon(catchablePokemon);
        setListSecretPokemon(secretPokemon);
        setLimitPokemon(limit);
        dispatch(setCatchablePokemon(listCatchablePokemon));
        dispatch(setSecretPokemon(listSecretPokemon));
      }
    });
  }, []);

  useEffect(() => {
    if (isShowPopupGetPokeball) {
      setLoadingDialog(true);
      getPokemonBall((err, res) => {
        setTimeout(() => {
          setLoadingDialog(false);
        }, 1000);
        if (err) {
          return console.log('error popup');
        } else {
          const image = require(`../assets/${res.id}.png`);
          const object = {
            image,
            title: res.name,
            desc: res.desc,
            btnText1: 'OK'
          };
          setDialogDetail(object);
        }
      });
    }
  }, [isShowPopupGetPokeball]);

  const generateMainPage = (dataObject) => {
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

  const generateDialogPopUp = () => {
    if (isLoadingDialog) {
      return <Loading />;
    }

    return (
      isShowPopupGetPokeball && (
        <DialogPopUp isShowPopupGetPokeball={isShowPopupGetPokeball} dialogDetail={dialogDetail} />
      )
    );
  };

  const generatePokemonListLayout = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div id="PokemonListLayout ">
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
          {generateMainPage({ typePage, listCatchablePokemon, listSecretPokemon })}
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

        {generateDialogPopUp()}
      </div>
    );
  };

  return generatePokemonListLayout();
};

export default PokemonList;
