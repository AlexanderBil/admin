import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  TableSortLabel,
  styled,
  Typography,
} from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { usersSubmitionFiltersState } from 'store/usersSubmitionStore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tableHead: {
    [theme.breakpoints.down('laptop')]: {
      display: 'none',
    },
  },
  tableRow: {
    [theme.breakpoints.down('laptop')]: {
      border: '1px solid black',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      marginBottom: '15px',
    },
  },

  tableCell: {
    position: 'relative',
    padding: '12px',
    maxWidth: '100%',

    [theme.breakpoints.down('laptop')]: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'right',
      alignItems: 'end',
      minHeight: '40px',
      '&:before': {
        content: '""attr(datalabel)""',
        position: 'absolute',
        left: '2%',
        top: '50%',
        transform: 'translate(0, -50%)',
        whiteSpace: 'pre',
      },
    },
  },
  tableCellPositionCenter: {
    position: 'relative',
    padding: '12px',
    maxWidth: '100%',

    [theme.breakpoints.down('laptop')]: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
      minHeight: '40px',
      '&:before': {
        content: '""attr(datalabel)""',
        position: 'absolute',
        left: '2%',
        top: '25%',
      },
    },
  },
  tablePaginationBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('laptop')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  tablePagination: {
    marginTop: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('laptop')]: {
      '& .css-168a8eu-MuiToolbar-root-MuiTablePagination-toolbar': {
        paddingLeft: '5px',
        paddingRight: '20px',
      },
      '& .MuiTablePagination-actions': {
        marginLeft: '0px',
      },
      '& .css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
        marginRight: '10px',
      },
    },
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#eeeeee',
  },
  '&:last-child td, &:last-child th': {},
}));

const Table = ({
  data = [],
  columns = [],
  pagination = {},
  rowsPerPageOptions = [],
  onPageChange,
  onRowsPerPageChange = () => {},
  isNeadPagination,
  isNeadTableSortLabel,
  valueToOrderBy,
  handleRequestSort,
  alignTop,
  from,
  sideContent,
}) => {
  const setFilters = useSetRecoilState(usersSubmitionFiltersState);
  const classes = useStyles();

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
    setFilters((prevState) => ({
      ...prevState,
      page: 0,
      sortField: property === 'event' ? 'eventId' : property,
    }));
  };

  return (
    <Box>
      <TableContainer>
        <MuiTable>
          {from !== 'content' && (
            <TableHead className={classes.tableHead}>
              <TableRow style={{ verticalAlign: 'text-top' }}>
                {columns.map(({ name, label }) => (
                  <TableCell
                    style={{ paddingLeft: '12px' }}
                    key={name}
                    align={'left'}
                  >
                    {isNeadTableSortLabel ? (
                      <TableSortLabel
                        active={valueToOrderBy === name}
                        onClick={createSortHandler(name)}
                      >
                        {label}
                      </TableSortLabel>
                    ) : (
                      <span style={{ whiteSpace: 'pre' }}>{label}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {data.map((row, idx) => (
              <StyledTableRow
                className={classes.tableRow}
                sx={{
                  height:
                    from === 'importContentModal'
                      ? '25px'
                      : from === 'contentPublish'
                        ? '10px'
                        : '75px',
                }}
                key={row.id || idx}
              >
                {columns.map(({ name, renderCell, label, isShowAttr }) => (
                  <TableCell
                    datalabel={label}
                    className={
                      sideContent === 'center'
                        ? classes.tableCellPositionCenter
                        : classes.tableCell
                    }
                    sx={{
                      verticalAlign: alignTop ? 'text-top' : 'middle',
                    }}
                    key={name}
                    align='left'
                  >
                    {renderCell ? renderCell(row) : row[name]}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {!isNeadPagination && from !== 'content' && (
        <TablePagination
          className={classes.tablePagination}
          component='div'
          rowsPerPageOptions={rowsPerPageOptions}
          count={pagination.totalEntries}
          rowsPerPage={pagination.pageSize}
          page={pagination.page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}

      {!isNeadPagination && from === 'content' && (
        <Box
          className={classes.tablePaginationBox}
          sx={{
            display: (from = 'content' ? 'flex' : 'block'),
          }}
        >
          <Typography
            sx={{
              borderBottom: '1px solid grey',
              marginLeft: { mobileS: '5px', tablet: '0px' },
            }}
          >
            {' '}
            <span style={{ fontWeight: '500' }}>Total items:</span>{' '}
            {pagination.totalEntries}
          </Typography>

          <TablePagination
            className={classes.tablePagination}
            sx={{ marginTop: 1 }}
            component='div'
            rowsPerPageOptions={rowsPerPageOptions}
            count={pagination.totalEntries}
            rowsPerPage={pagination.pageSize}
            page={pagination.page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </Box>
      )}
    </Box>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      renderCell: PropTypes.func,
    })
  ),
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
    totalEntries: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  isNeadPagination: PropTypes.bool,
  isNeadTableSortLabel: PropTypes.bool,
  valueToOrderBy: PropTypes.string,
  handleRequestSort: PropTypes.func,
  alignTop: PropTypes.bool,
  from: PropTypes.string,
  sideContent: PropTypes.string,
};

export default Table;
