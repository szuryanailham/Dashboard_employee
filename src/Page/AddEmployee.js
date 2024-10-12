import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Box, Paper, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ApiAxios from "../Components/ApiAxios";

// Komponen Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dob: "",
    salary: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await ApiAxios.post(`/employee`, employee);

      setSnackbarMessage("Employee added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (err) {
      setSnackbarMessage("Failed to add employee");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h4" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="First Name" name="firstName" value={employee.firstName} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Last Name" name="lastName" value={employee.lastName} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={employee.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Contact Number" name="contactNumber" value={employee.contactNumber} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Date of Birth" name="dob" value={employee.dob} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Salary" name="salary" value={employee.salary} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Address" name="address" value={employee.address} onChange={handleChange} fullWidth margin="normal" />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add Employee"}
          </Button>
        </Box>
      </form>

      {/* Snackbar untuk notifikasi */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default AddEmployee;
