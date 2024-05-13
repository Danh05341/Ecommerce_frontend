import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({defaultPage, pageNumbers, handleChangePage}) {
  return (
      <Pagination page={defaultPage} count={pageNumbers} onChange={handleChangePage} variant="outlined" shape="rounded" />
  );
}