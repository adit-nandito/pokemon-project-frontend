import { Tab, Tabs } from '@mui/material';
import './style.css';

const TabMenu = (props) => {
  const { setTypePage, typePage } = props;
  const handleChangePage = (event, value) => {
    setTypePage(value);
  };

  return (
    <Tabs
      className="tabMenuComponent"
      value={typePage}
      textColor="secondary"
      onChange={handleChangePage}
      indicatorColor="secondary"
    >
      <Tab value="main" label="Pokémon" />
      <Tab value="secret" label="Secret Pokémon" />
    </Tabs>
  );
};

export default TabMenu;
