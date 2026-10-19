import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, Paper } from '@mui/material';
import { generateRows } from './generateRows';
import { generateColumns } from './generateColumns';
import TableHeader from './TableHeader.js';
import TableBodyContent from './TableBodyContent.js';

const ControlTable = (props) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (Array.isArray(props.data) && props.data.length > 0) {
      const newColumns = generateColumns(props.data, props.totalColCriteria, props.totalRowCriteria);
      const newRows = generateRows(props.data, props.totalColCriteria, props.totalRowCriteria);
      console.log(newRows);
      setColumns(newColumns);
      setRows(newRows);
    }
  }, [props.data, props.totalColCriteria, props.totalRowCriteria]);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'auto', height: '80svh' }}>
      <Table sx={{ tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: 5 }}>
        <TableHead sx={{ position: 'sticky', top: '5px', zIndex: 1 }}>
          <TableHeader columns={columns} />
        </TableHead>
        <TableBody>
          <TableBodyContent rows={rows} columns={columns} columnColorsMap={props.columnColorsMap} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ControlTable;
