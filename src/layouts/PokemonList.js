import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCatchablePokemon, setSecretPokemon } from '../redux/slices/pokemonSlice';
import { getListPokemon } from '../services/APIService';
import ErrorPage from '../pages/ErrorPage';
import Loading from '../components/loading/Loading';
import PaginationRounded from '../components/pagination/Pagination';
import Thumbnail from '../components/thumbnail/Thumbnail';
import SelectInput from '../components/selectInput/SelectInput';
import TabMenu from '../components/tabMenu/TabMenu';
import './style.css';

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
      </div>
    );
  };

  return generatePokemonListLayout();
};

export default PokemonList;
