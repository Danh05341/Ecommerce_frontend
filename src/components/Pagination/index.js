import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({pageNumbers, handleChangePage}) {
  return (
      <Pagination count={pageNumbers} onChange={handleChangePage} variant="outlined" shape="rounded" />
  );
}