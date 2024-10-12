import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiAxios from "./ApiAxios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const columns = [
  { id: "id", label: "Id", minWidth: 150 },
  { id: "firstName", label: "First Name", minWidth: 150 },
  { id: "lastName", label: "Last Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "contactNumber", label: "Contact Number", minWidth: 150 },
  { id: "age", label: "Age", minWidth: 100, align: "right" },
  { id: "dob", label: "Date of Birth", minWidth: 150 },
  { id: "salary", label: "Salary", minWidth: 100, align: "right", format: (value) => value.toLocaleString("en-US", { style: "currency", currency: "USD" }) },
  { id: "address", label: "Address", minWidth: 200 },
  { id: "actions", label: "Action", minWidth: 200 },
];

// Buat komponen Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EmployeeList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApiAxios.get("/employee?noofRecords=100&idStarts=1");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        await ApiAxios.delete(`/employee?id=${id}`);
        setData((prevData) => prevData.filter((employee) => employee.id !== id));
        setSnackbarMessage("Delete data successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (err) {
        setSnackbarMessage("Error deleting employee: " + err.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Fungsi untuk navigasi ke detail anggota
  const handleUpdate = (id) => {
    navigate(`/employee/${id}`); // Ganti dengan route yang sesuai untuk detail anggota
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {loading ? ( // Tampilkan spinner jika loading
          <Box display="flex" justifyContent="center" alignItems="center" height="440px">
            <CircularProgress />
          </Box>
        ) : error ? ( // Tampilkan pesan error jika ada
          <Box display="flex" justifyContent="center" alignItems="center" height="440px">
            <p style={{ color: "red" }}>Error: {error}</p>
          </Box>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }} // Menambahkan efek pointer
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "actions" ? (
                            <div style={{ display: "flex", gap: "10px" }}>
                              {/* button Edit */}
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "transparent",
                                  color: "gray",
                                  "&:hover": { color: "#fdd835" },
                                }}
                                onClick={() => handleUpdate(row.id)}
                              >
                                <ModeEditIcon />
                              </Button>
                              {/* button Delete */}
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "transparent",
                                  color: "gray",
                                  "&:hover": { color: "#d32f2f" },
                                }}
                                onClick={() => handleDelete(row.id)}
                              >
                                <DeleteIcon />
                              </Button>
                            </div>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />

      {/* Snackbar untuk notifikasi */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default EmployeeList;
