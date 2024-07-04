import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './style.css';

const SelectInput = (props) => {
  const {
    limitPokemon,
    offset,
    typePage,
    setPageCatchablePokemon,
    setPageSecretPokemon,
    pageCatchablePokemon,
    pageSecretPokemon
  } = props;

  let page = pageCatchablePokemon;
  let setPage = setPageCatchablePokemon;
  if (typePage === 'secret') {
    page = pageSecretPokemon;
    setPage = setPageSecretPokemon;
  }

  const MenuProps = {
    PaperProps: {
      className: 'selectInputMenu',
      style: {
        maxHeight: 150,
        bottom: 160
      }
    }
  };

  const __generateListPage = () => {
    const listPage = [];
    for (let i = 1; i <= Math.ceil(limitPokemon / offset); i++) {
      listPage.push(i);
    }

    return listPage.map((item) => {
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="LabelPage">Page</InputLabel>
      <Select
        className="selectInputPage"
        id="SelectInputPage"
        value={page}
        label="Page"
        onChange={(event) => {
          setPage(event.target.value);
        }}
        MenuProps={MenuProps}
      >
        {__generateListPage()}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
