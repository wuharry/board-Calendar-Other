import { Button, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

function CreateTask({ handleCreateTask, columnId }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        width: "100%",
        cursor: "pointer",
        backgroundColor: "lightgrey",
        padding: 0,
        border: 0,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "inherit",
          height: "100%",
          border: 0,
          // padding: 0,
        }}
      >
        <Button
          sx={{
            width: "inherit",
            height: "100%",
            "&:hover": {
              backgroundColor: "lightgrey", // 使用與正常狀態相同的背景色
              boxShadow: "none", // 移除 hover 時的陰影
            },
          }}
          onClick={() => handleCreateTask(columnId)}
        >
          <AddIcon />
        </Button>
      </CardContent>
    </Card>
  );
}

CreateTask.propTypes = {
  handleCreateTask: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
};
export default CreateTask;
