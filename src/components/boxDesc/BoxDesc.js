import _ from 'lodash';
import BaseStatusBar from '../baseStatusBar/BaseStatusBar';
import DescStatus from '../descStatus/DescStatus';
import './style.css';
import { CardMedia, Chip, Typography } from '@mui/material';

const BoxDesc = (props) => {
  const { title, pokemonDetail, type } = props;

  const __generateDescStatus = () => {
    return (
      <div id="DescStatus">
        <DescStatus
          param="Types"
          value={pokemonDetail.types.map((type) => (
            <Chip key={type} label={_.capitalize(type)} variant="outlined" />
          ))}
        />
        <DescStatus
          param="Weakness"
          value={pokemonDetail.listWeakness.map((type) => (
            <Chip key={type} label={_.capitalize(type)} variant="outlined" />
          ))}
        />
        <DescStatus param="Habitat" value={pokemonDetail.habitat} />
        <DescStatus param="Height" value={pokemonDetail.height} />
        <DescStatus param="Weight" value={pokemonDetail.weight} />
        <DescStatus param="Catch Rate" value={pokemonDetail.catchRate ? `${pokemonDetail.catchRate} %` : null} />
      </div>
    );
  };

  const __generateDescAbilities = () => {
    return (
      <div className="componentDescAbilities">
        <span className="componentDescAbilitesImg">
          <CardMedia component="img" alt={pokemonDetail.name} image={pokemonDetail.icon} />
        </span>
        <span className="componentDescAbilitesLine">
          {pokemonDetail.abilities.map((item) => (
            <div key={item.name} className="componentDescAbilitesText">
              <Typography sx={{ mb: 0 }} gutterBottom variant="h6" component="div">
                {_.startCase(item.name.replace('-', ' '))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </div>
          ))}
        </span>
      </div>
    );
  };

  const __generateComponentBoxDetail = (type) => {
    let layouts = __generateDescStatus();
    if (type === 'basestatus') {
      layouts = <BaseStatusBar pokemonDetail={pokemonDetail} />;
    } else if (type === 'abilities') {
      layouts = __generateDescAbilities();
    }

    return layouts;
  };

  return (
    <div id="BoxDescComponent">
      <h2 style={{ marginBottom: '5px' }}>{title}</h2>
      <div className="componentStatisticDetail">{__generateComponentBoxDetail(type)}</div>
    </div>
  );
};

export default BoxDesc;
