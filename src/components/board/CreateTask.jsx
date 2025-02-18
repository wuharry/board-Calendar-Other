import { Button, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

function CreateTask({ handleCreateTask }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "lightgrey",
      }}
    >
      <CardContent>
        <Button onClick={() => handleCreateTask}>
          <AddIcon />
        </Button>
      </CardContent>
    </Card>
  );
}

CreateTask.propTypes = {
  handleCreateTask: PropTypes.func.isRequired,
};
export default CreateTask;
