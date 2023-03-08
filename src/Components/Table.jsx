import React from "react";

import {
  Table as MTable,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Box,
} from "@mui/material";
import Stack from "./Common/stack";

const RowInput = ({
  name,
  value,
  error,
  rowData,
  validation,
  childHasError,
  colData,
  ...props
}) => {
  const [hasError, setError] = React.useState(false);
  const handleOnChange = (e) => {
    const hasError = validation(e.target.value, rowData);
    if (hasError) {
      childHasError(true);
      setError(true);
    } else {
      childHasError(false);
      setError(false);
    }
    props.onChange(e);
  };

  return (
    <div>
      <input
        name={name}
        value={value || ""}
        onChange={handleOnChange}
        style={{
          border: hasError
            ? "1px solid red !important"
            : "1px solid #e0e0e0 !important",
          padding: "5px 10px",
          width: 130,
        }}
        autoFocus={colData.autoFocus}
        {...props}
      />
    </div>
  );
};

const Row = ({
  isEditing,
  rowIndex,
  editIndex,
  editData,
  colsData,
  onSave,
  onEdit,
  sx,
}) => {
  let initObj = {};
  colsData.forEach((col) => {
    initObj[col.field] = "";
  });
  const [rowHasError, setRowHasError] = React.useState(false);
  const [rowData, setRowData] = React.useState(
    editData ? Object.assign({}, initObj, editData) : initObj
  );

  const handleSave = () => {
    onSave(rowData);
  };

  const handleOnChange = (e) => {
    const updatedData = Object.assign({}, rowData, {
      [e.target.name]: e.target.value,
    });
    setRowData(updatedData);
  };

  return (
    <TableRow>
      {colsData.map((col, colIndex) => {
        return isEditing && col.editable ? (
          <TableCell
            key={`edit_${col.field}_${colIndex}`}
            sx={{
              verticalAlign: "initial",
              color: "#202020",
              fontSize: "18px",
              ...sx,
            }}
          >
            <RowInput
              onChange={handleOnChange}
              onBlur={handleSave}
              rowData={rowData}
              colData={col}
              value={rowData[col.field]}
              name={col.field}
              error={col.error}
              validation={col.validation}
              childHasError={(bool) => setRowHasError(bool)}
            />
          </TableCell>
        ) : (
          <TableCell
            key={`view_${col.field}_${colIndex}`}
            sx={{
              verticalAlign: "initial",
              color: "#202020",
              fontSize: "18px",
              width: col.editable ? 130 : "auto",
              ...sx,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {col.valueGetter
                ? col.valueGetter(
                    rowData[col.field],
                    rowData,
                    rowIndex,
                    colIndex
                  )
                : rowData[col.field]}
             
            </Stack>
          </TableCell>
        );
      })}
    </TableRow>
  );
};
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      count: 0,
      page: 0,
      rowsPerPage: 10,
      editIndex: null,
      isInitialized: false,
      dataChangedCounter: 0,
      refresh: false,
      stickyHeader:false
    };
  }

  componentDidMount() {
    this.setInitialData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      data = [],
      dataChangedCounter = 0,
      refreshTable = false,
    } = this.props;

    if (!this.state.isInitialized) {
      this.setInitialData();
    } else if (this.state.dataChangedCounter !== dataChangedCounter) {
      console.log("Data changed: Counter & data", dataChangedCounter, data);
      let rows = JSON.parse(JSON.stringify(data || []));
      this.setState({
        data: rows.map((r) => ({
          isEditing: false,
          rowData: r,
        })),
        dataChangedCounter,
      });
    } else if (refreshTable) {
      this.setState({
        page: 0,
        rowsPerPage: 10,
      });
      this.props.onPageChange(1, 10);
    }
  }

  setInitialData = () => {
    const {
      data,
      count,
      page = 0,
      rowsPerPage = 10,
      localPagination = false,
      dataChangedCounter = 0,
    } = this.props;

    let rows = JSON.parse(JSON.stringify(data[page] || []));
    let rowsCount = 0;

    if (data.constructor === Array) {
      rows = JSON.parse(JSON.stringify(data));
      rowsCount = count || rows.count || rows.length || 0;
    }

    if (data.data) {
      rows = JSON.parse(JSON.stringify(data.data[page]));
      rowsCount = data.count;
      if (data.data.constructor === Array) {
        rows = JSON.parse(JSON.stringify(data.data));
        rowsCount = data.count;
      }
    }

    if (localPagination) {
      rows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    if (rows.length && rowsCount) {
      this.setState({
        data: rows.map((r) => ({
          isEditing: false,
          rowData: r,
        })),
        count: rowsCount,
        page,
        rowsPerPage,
        isInitialized: true,
        dataChangedCounter,
      });
    }
  };

  handleRowSave = (rowData) => {
    let isDataModified = false;
    const data = this.state.data.map((d, i) => {
      if (i === this.state.editIndex) {
        Object.keys(d.rowData).forEach((k) => {
          if (d.rowData[k] !== rowData[k]) {
            isDataModified = true;
          }
        });
        return {
          rowData,
          isEditing: false,
        };
      }
      return d;
    });
    this.setState({ data, editIndex: null }, () => {
      if (isDataModified) {
        this.handleDataChange();
      }
    });
  };

  handleDataChange = () => {
    const updatedData = this.state.data.map(({ rowData }) => rowData);
    this.props.onDataChange(updatedData);
  };

  handleRowEdit = (index) => {
    const data = this.state.data.map((d, i) => {
      if (i === index) {
        return {
          ...d,
          isEditing: true,
        };
      }
      return d;
    });
    this.setState({ data, editIndex: index });
  };

  handlePageChange = (e, newPage) => {
    this.setState({ page: newPage });
    this.props.onPageChange(newPage + 1, this.state.rowsPerPage);
  };

  handleRowsPerPageChange = (e) => {
    this.setState({
      page: 0,
      rowsPerPage: parseInt(e.target.value),
    });
    this.props.onPageChange(1, parseInt(e.target.value));
  };

  render() {
    const {
      sx = {},
      th_sx = {},
      td_sx = {},
      columns = [],
      pagination = false,
      loading = false,
    } = this.props;
    const { data, count, page, rowsPerPage, editIndex } = this.state;
    return (
      <>
        {pagination ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={this.handlePageChange}
            onRowsPerPageChange={this.handleRowsPerPageChange}
          />
        ) : null}

        <TableContainer
          sx={{ overflow: `${loading ? "hidden" : "auto"}`, ...sx }}
        >
          <MTable>
            <TableHead>
              <TableRow>
                {columns.map((c) => (
                  <TableCell
                    key={c.field}
                    sx={{
                      color: "#1D9BFF",
                      background: "#E3F3FF",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "5px 18px",
                      whiteSpace: "nowrap",
                      ...th_sx,
                    }}
                  >
                    {c.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody
              sx={{ display: `${loading ? "none" : "table-row-group"}` }}
            >
              {data.map(({ rowData, isEditing }, i) => {
                return (
                  <Row
                    key={`${Math.random()}_${i}`}
                    isEditing={isEditing}
                    rowIndex={i}
                    editIndex={editIndex}
                    editData={rowData}
                    colsData={columns}
                    onSave={this.handleRowSave}
                    onEdit={() => this.handleRowEdit(i)}
                    sx={td_sx}
                  />
                );
              })}
            </TableBody>
          </MTable>
          {/* Loader */}
          {loading ? (
            <Box
              sx={{ width: "100%", position: "relative", minHeight: "300px" }}
            >
         
            </Box>
          ) : null}
        </TableContainer>
      </>
    );
  }
}

export default React.memo(Table);
