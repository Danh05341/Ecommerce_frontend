import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function PaginationRounded({ page, pageNumbers, handleChangePage }) {
  console.log('render-pagination')
  return (
    pageNumbers ? (
      <Pagination
        page={page}
        count={pageNumbers}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        sx={{
          marginTop: 5,
          float: 'right',
          '.MuiButtonBase-root:hover': { bgcolor: '#ff2d37', color: '#fff' },
          '.MuiButtonBase-root': { bgcolor: '#f1f2f7', borderRadius: 0, color: '#8d90a6', border: 'none' },
          '.Mui-selected': { bgcolor: '#ff2d37 !important', color: '#fff' },
        }}
      />
    ) : (
      <></>
    )
  );
}