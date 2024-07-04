import _ from 'lodash';
import { useEffect, useState } from 'react';
import './style.css';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BaseStatusBar = (props) => {
  const { pokemonDetail } = props;

  const [progressHp, setProgressHp] = useState(0);
  const [progressAttack, setProgressAttack] = useState(0);
  const [progressDefense, setProgressDefense] = useState(0);
  const [progressSpAttack, setProgressSpAttack] = useState(0);
  const [progressSpDefense, setProgressSpDefense] = useState(0);
  const [progressSpeed, setProgressSpeed] = useState(0);

  useEffect(() => {
    pokemonDetail.stats.forEach((item) => {
      const statName = item.param;
      const baseStat = item.value;
      if (statName === 'hp') {
        __setProgressBar(baseStat, setProgressHp);
      } else if (statName === 'attack') {
        __setProgressBar(baseStat, setProgressAttack);
      } else if (statName === 'defense') {
        __setProgressBar(baseStat, setProgressDefense);
      } else if (statName === 'special-attack') {
        __setProgressBar(baseStat, setProgressSpAttack);
      } else if (statName === 'special-defense') {
        __setProgressBar(baseStat, setProgressSpDefense);
      } else if (statName === 'speed') {
        __setProgressBar(baseStat, setProgressSpeed);
      }
    });
  }, []);

  const __setProgressBar = (baseStat, setState) => {
    const timer = setInterval(() => {
      setState((progress) => {
        const limit = (baseStat / 255) * 100;
        if (progress === Math.floor(limit)) {
          clearInterval(timer);
          return progress;
        }

        return progress + 1;
      });
    }, 20);
  };

  const __generateValueStatusBar = (statName) => {
    if (statName === 'hp') {
      return progressHp;
    } else if (statName === 'attack') {
      return progressAttack;
    } else if (statName === 'defense') {
      return progressDefense;
    } else if (statName === 'special-attack') {
      return progressSpAttack;
    } else if (statName === 'special-defense') {
      return progressSpDefense;
    } else if (statName === 'speed') {
      return progressSpeed;
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
    }
  }));

  return (
    <div id="BaseStatusBarComponent">
      {pokemonDetail.stats.map((item) => (
        <div key={item.param} className="componentDetailStatus">
          <span style={{ alignSelf: 'center', fontWeight: 'bold', width: '33%' }}>
            {_.startCase(item.param).replace('-', ' ')}
          </span>
          <Stack spacing={2} sx={{ flexGrow: 1, alignSelf: 'center' }}>
            <BorderLinearProgress variant="determinate" value={__generateValueStatusBar(item.param)} />
          </Stack>
        </div>
      ))}
    </div>
  );
};

export default BaseStatusBar;
