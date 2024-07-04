import { Pagination, Stack } from '@mui/material';

const PaginationRounded = (props) => {
  const {
    limitPokemon,
    offset,
    typePage,
    setPageCatchablePokemon,
    setPageRarePokemon,
    pageCatchablePokemon,
    pageRarePokemon
  } = props;

  let page = pageCatchablePokemon;
  let setPage = setPageCatchablePokemon;
  if (typePage === 'secret') {
    page = pageRarePokemon;
    setPage = setPageRarePokemon;
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
