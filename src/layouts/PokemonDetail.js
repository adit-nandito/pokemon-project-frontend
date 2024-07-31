import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import { getDetailPokemon } from '../services/APIService';
import ErrorPage from '../pages/ErrorPage';
import Loading from '../components/loading/Loading';
import BoxDesc from '../components/boxDesc/BoxDesc';
import './style.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const pokemon = useSelector((state) => state.pokemon);
  const { listCatchablePokemon, listSecretPokemon } = pokemon;
  const [pokemonDetail, setPokemonDetail] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getDetailPokemon(name, (err, data) => {
      setLoading(false);
      if (err) {
        return <ErrorPage />;
      } else {
        setPokemonDetail(data);
      }
    });
  }, []);

  const generateButtonPokemonDetail = (dataObject) => {
    const { name, isCatchablePokemon, listCatchablePokemon, listSecretPokemon } = dataObject;
    let list = listSecretPokemon;
    if (isCatchablePokemon) {
      list = listCatchablePokemon;
    }

    const index = list.findIndex((item) => item.id === name);
    const prevPokemon = list[index - 1];
    const nextPokemon = list[index + 1];

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

  const generatePokemonDetailLayout = () => {
    if (isLoading || !pokemonDetail) {
      return <Loading />;
    }

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
          <div className="componentDetailLayout">
            <span className="componentProfileDetail">
              <div className="componentIndexNumber"># {pokemonDetail.index}</div>
              <div className="componentImageDetail">
                <CardMedia
                  sx={{ width: 'unset' }}
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
              {generateButtonPokemonDetail({
                name,
                isCatchablePokemon: pokemonDetail.isCatchablePokemon,
                listCatchablePokemon,
                listSecretPokemon
              })}
            </span>
          </div>
        </Card>
      </div>
    );
  };

  return generatePokemonDetailLayout();
};

export default PokemonDetail;
