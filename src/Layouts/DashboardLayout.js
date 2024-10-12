import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import EmployeeList from "../Components/EmployeeList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddEmployee from "../Page/AddEmployee";
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname, navigate }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Employee List */}
      {pathname === "/employee" && <EmployeeList />}
      {pathname === "/add_employee" && <AddEmployee />}
    </Box>
  );
}

DemoPageContent.propTypes = {
  navigate: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutPattern(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState("/employee");
  const navigate = React.useCallback((path) => setPathname(String(path)), []);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate,
    };
  }, [pathname, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={[
        {
          segment: "dashboard",
          title: "Dashboard",
          icon: <DashboardIcon />,
        },
        {
          segment: "employee",
          title: "Employee List",
          icon: <PeopleAltIcon />,
          pattern: "employee",
        },
        {
          segment: "add_employee",
          title: "Add Employee",
          icon: <AddCircleOutlineIcon />,
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} navigate={navigate} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutPattern;
