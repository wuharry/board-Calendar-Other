import { useState } from "react";
import { Box, Tabs, Tab, AppBar, Container, Toolbar } from "@mui/material";
import CustomTabPanel from "./components/customPanel/CustomPanel";
import Calendar from "./components/calendar/Calendar";
import Board from "./components/board/Board";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "100vh" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters></Toolbar>
        </Container>
      </AppBar>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="board" />
        <Tab label="calendar" />
        <Tab label="dateRangePicker" />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <Board />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* calendar */}
        <Calendar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        dateRangePicker
      </CustomTabPanel>
    </Box>
  );
}

export default App;
