
import React from 'react';
import StyledTableCell from './styledTableCell';
import { TableRow } from '@mui/material';
import ColorSelect from '../ColorSelect/ColorSelect';

const TableBodyContent = ({ rows, columns, columnColorsMap, onChangeHandler }) => (
  <>
    {rows.map((row) => (
      <TableRow key={row.id}>
        {columns.flatMap((column) => {
          if (column.subColumns) {
            return column.subColumns.map((subColumn) => {
              const value = row[subColumn.field];
              const columnType = subColumn.type;
              const colorMap = columnColorsMap[columnType];
              const statusId = row[subColumn.id];
              return (
                <StyledTableCell key={subColumn.field} style={{ width: subColumn.width }} cellType="body">
                  {colorMap && value && colorMap[value] !== undefined ? (
                    <ColorSelect
                      colors={colorMap}
                      onColorSelect={async (color) =>  {await onChangeHandler(statusId, subColumn.type, color.key)}}
                      defaultValue={value}
                    />
                  ) : (
                    value
                  )}
                </StyledTableCell>
              );
            });
          } else {
            if (column.renderCell) {
              return (
                <StyledTableCell key={column.field} cellType="body">
                  {column.renderCell(row)}
                </StyledTableCell>
              );
            } else {
              const value = row[column.field];
              const columnType = column.type;
              const colorMap = columnColorsMap[columnType];

              return (
                <StyledTableCell key={column.field} style={{ width: column.width }} cellType="body">
                  {colorMap && value && colorMap[value] !== undefined ? (
                    <ColorSelect
                      colors={colorMap}
                      onColorSelect={(color) => console.log(`Selected ${color.key} for ${column.field}`)}
                      defaultValue={value}
                    />
                  ) : (
                    value
                  )}
                </StyledTableCell>
              );
            }
          }
        })}
      </TableRow>
    ))}
  </>
);

export default TableBodyContent;

