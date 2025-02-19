import { Box } from "@mui/material";
import Columns from "./Columns";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CreateBoard from "./CreateBoard";

function Board({ data, handleCreateBoard, handleCreateTask }) {
  const [columns, setColumns] = useState(data || []);
  useEffect(() => {
    if (data && data.length > 0) {
      setColumns(data);
    }
  }, [data]);

  const onDragEnd = (result) => {
    if (!result.destination) return; // 如果拖曳到無效區域，不做任何事情
    // **區分是「Task 拖曳」還是「Column 拖曳」**
    if (result.type === "COLUMN") {
      handleMoveList(result.source, result.destination);
    } else if (result.type === "TASK") {
      const sourceColumnIndex = columns.findIndex(
        (col) => col.id === result.source.droppableId
      );
      const destinationColumnIndex = columns.findIndex(
        (col) => col.id === result.destination.droppableId
      );

      if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return;

      handleMoveTask(
        result.source,
        result.destination,
        sourceColumnIndex,
        destinationColumnIndex
      );
    }
  };
  const handleMoveTask = (
    source,
    destination,
    sourceColumnIndex,
    destinationColumnIndex
  ) => {
    const newColumns = Array.from(columns);
    const sourceColumn = newColumns[sourceColumnIndex];
    const destinationColumn = newColumns[destinationColumnIndex];
    const sourceTasks = Array.from(sourceColumn.tasks);
    const destinationTasks = Array.from(destinationColumn.tasks);

    // 取出被拖曳的任務
    const [movedTask] = sourceTasks.splice(source.index, 1);
    // 插入到新的位置
    if (sourceColumnIndex === destinationColumnIndex) {
      // 如果來源和目標欄位相同，則直接插入到新位置
      sourceTasks.splice(destination.index, 0, movedTask);
      newColumns[sourceColumnIndex] = {
        ...sourceColumn,
        tasks: sourceTasks,
      };
    } else {
      destinationTasks.splice(destination.index, 0, movedTask);
      newColumns[sourceColumnIndex] = {
        ...sourceColumn,
        tasks: sourceTasks,
      };
      newColumns[destinationColumnIndex] = {
        ...destinationColumn,
        tasks: destinationTasks,
      };
    }
    setColumns(newColumns);
  };
  const handleMoveList = (source, destination) => {
    const newColumns = Array.from(columns);

    const [movedColumn] = newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, movedColumn);
    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* 使用 <Droppable type="COLUMN">  */}
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              height: "100%",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {columns.map((column, index) => (
              <Columns
                key={column.id}
                id={column.id}
                column={column}
                index={index}
                handleCreateTask={handleCreateTask} // 假設有一個函數可以用來建立新的 task
              />
            ))}
            <CreateBoard handleCreateBoard={handleCreateBoard} />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

// 假資料
Board.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCreateBoard: PropTypes.func.isRequired, // 假設有一個函數可以用來建立新的 board
  handleCreateTask: PropTypes.func.isRequired, // 假設有一個函數可以用來建立新的 task
};

export default Board;
