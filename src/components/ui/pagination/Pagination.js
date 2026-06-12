import { Pagination, Stack } from '@mui/material';

const PaginationRounded = (props) => {
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

  return (
    <Stack sx={{ width: 1, alignItems: 'center' }} spacing={2}>
      <Pagination
        onChange={(event, value) => {
          setPage(value);
        }}
        page={page}
        count={Math.ceil(limitPokemon / offset)}
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationRounded;
