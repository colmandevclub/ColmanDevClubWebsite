
import React from 'react';
import StyledTableCell from './styledTableCell';
import { TableRow } from '@mui/material';

const TableHeader = ({ columns }) => (
  <React.Fragment>
    <TableRow>
      {columns.map((column) => {
        let cellType;
        if (column.subColumns) cellType = 'header-top';
        else cellType = 'header-single';

        if (column.subColumns) {
          return (
            <StyledTableCell key={column.headerName} colSpan={column.subColumns.length} align="center" style={{ width: column.width }} cellType={cellType}>
              {column.headerName}
            </StyledTableCell>
          );
        } else {
          return (
            <StyledTableCell key={column.field} rowSpan={2} style={{ width: column.width }} cellType={cellType}>
              {column.headerName}
            </StyledTableCell>
          );
        }
      })}
    </TableRow>
    <TableRow>
      {columns.flatMap((column) => {
        if (column.subColumns) {
          return column.subColumns.map((subColumn) => (
            <StyledTableCell key={subColumn.field} align="center" style={{ width: subColumn.width }} cellType="header-middle">
              {subColumn.headerName}
            </StyledTableCell>
          ));
        } else {
          return [];
        }
      })}
    </TableRow>
  </React.Fragment>
);

export default TableHeader;
