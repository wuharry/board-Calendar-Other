import { useState } from "react";
import { Box, Tabs, Tab, AppBar, Container, Toolbar } from "@mui/material";
import CustomTabPanel from "./components/customPanel/CustomPanel";
import Calendar from "./components/calendar/Calendar";
import Board from "./components/board/Board";
import { useEffect } from "react";

function App() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const exampleColumns = [
    {
      id: "column-1",
      title: "To Do",
      tasks: [
        { id: "task-1", title: "To Do 1", date: "2024-10-10", task: "task1" },
        { id: "task-2", title: "To Do 2", date: "2025-01-11", task: "task2" },
      ],
    },
    {
      id: "column-2",
      title: "In Progress",
      tasks: [
        {
          id: "task-3",
          title: "In Progress 1",
          date: "2025-02-12",
          task: "task3",
        },
        {
          id: "task-4",
          title: "In Progress 2",
          date: "2024-10-10",
          task: "task4",
        },
      ],
    },
    {
      id: "column-3",
      title: "Done",
      tasks: [
        { id: "task-5", title: "Done 1", date: "2025-02-18", task: "task5" },
        { id: "task-6", title: "Done 2 ", date: "2025-102-15", task: "task6" },
      ],
    },
  ];
  useEffect(() => {
    console.log("useEffect");
    setData(exampleColumns);
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCreateTask = () => {
    console.log("create task");
    // create task code here
    // setData([...data, { id: "new-column", title: "New Column", tasks: [] }]);
    //  open modal to create new task
  };
  const handleCreateBoard = () => {
    console.log("create column");
    // delete column code here
    // setData(data.filter((column) => column.id!== columnId));
    //  open modal to confirm
  };
  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "100vh" }}>
      <AppBar position="static" color="warning">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="board" />
              <Tab label="calendar" />
              <Tab label="dateRangePicker" />
            </Tabs>
          </Toolbar>
        </Container>
      </AppBar>

      <CustomTabPanel value={value} index={0} sx={{ marginTop: "1rem" }}>
        <Board
          data={data}
          handleCreateBoard={handleCreateBoard}
          handleCreateTask={handleCreateTask}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} sx={{ marginTop: "1rem" }}>
        {/* calendar */}
        <Calendar data={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} sx={{ marginTop: "1rem" }}>
        dateRangePicker
      </CustomTabPanel>
    </Box>
  );
}

export default App;
