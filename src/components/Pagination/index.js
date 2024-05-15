import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationRounded({page, pageNumbers, handleChangePage}) {
  console.log('render-pagination')
  return (
      <Pagination page={page} count={pageNumbers} onChange={handleChangePage} variant="outlined" shape="rounded" />
  );
}