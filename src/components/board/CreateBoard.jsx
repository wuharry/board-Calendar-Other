// import * as React from "react";
import { Paper, Button } from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";

function CreateBoard({ handleCreateBoard }) {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "lightgrey",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Button
        sx={{
          width: "fit-content",
          height: "100%",
          "&:hover": {
            backgroundColor: "lightgrey", // 使用與正常狀態相同的背景色
            boxShadow: "none", // 移除 hover 時的陰影
          },
        }}
        onClick={() => handleCreateBoard()}
      >
        <AddIcon color="white" />
      </Button>
    </Paper>
  );
}

CreateBoard.propTypes = {
  handleCreateBoard: PropTypes.func.isRequired,
};

export default CreateBoard;
