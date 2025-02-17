import { Box } from "@mui/material";
import Columns from "./Columns";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

function Board() {
  // 這裡的 columns 是一個假資料，實際應該是從後端取得
  const exampleColumns = [
    {
      id: "column-1",
      title: "To Do",
      tasks: [
        { id: "task-1", title: "To Do 1", date: "2021-10-10", task: "task1" },
        { id: "task-2", title: "To Do 2", date: "2021-10-11", task: "task2" },
      ],
    },
    {
      id: "column-2",
      title: "In Progress",
      tasks: [
        {
          id: "task-3",
          title: "In Progress 1",
          date: "2021-10-12",
          task: "task3",
        },
        {
          id: "task-4",
          title: "In Progress 2",
          date: "2021-10-10",
          task: "task4",
        },
      ],
    },
    {
      id: "column-3",
      title: "Done",
      tasks: [
        { id: "task-5", title: "Done 1", date: "2021-10-13", task: "task5" },
        { id: "task-6", title: "Done 2 ", date: "2021-10-14", task: "task6" },
      ],
    },
  ];

  const [columns, setColumns] = useState(exampleColumns);
  const onDragEnd = (result) => {
    // 處理拖拽結束後的邏輯
    if (!result.destination) return; // 如果拖曳到無效區域，不做任何事情
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
  };

  const handleMoveTask = (
    source,
    destination,
    sourceColumnIndex,
    destinationColumnIndex
  ) => {
    const newColumns = Array.from(columns); // 先複製整個 columns 陣列

    const sourceColumn = newColumns[sourceColumnIndex]; // 來源欄位
    const destinationColumn = newColumns[destinationColumnIndex]; // 目標欄位

    const sourceTasks = Array.from(sourceColumn.tasks); // 複製來源欄位的 tasks 陣列
    const destinationTasks = Array.from(destinationColumn.tasks); // 複製目標欄位的 tasks 陣列

    // 取出被拖曳的任務
    const [movedTask] = sourceTasks.splice(source.index, 1);
    console.log("你的來源的物件index", sourceColumnIndex);
    console.log("你的目的的index", destinationColumnIndex);

    // 插入到新的位置
    if (sourceColumnIndex === destinationColumnIndex) {
      // 如果來源和目標欄位相同，則直接插入到新位置
      sourceTasks.splice(destination.index, 0, movedTask);
    } else {
      destinationTasks.splice(destination.index, 0, movedTask);
    }

    // 更新欄位的 task
    newColumns[sourceColumnIndex] = { ...sourceColumn, tasks: sourceTasks };
    newColumns[destinationColumnIndex] = {
      ...destinationColumn,
      tasks: destinationTasks,
    };

    setColumns(newColumns); // 更新狀態
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* 使用 <Droppable type="COLUMN"> 來允許列的重新排序 */}
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
              justifyContent: "space-around",
            }}
          >
            {columns.map((column, index) => (
              <Columns
                key={column.id}
                id={column.id}
                column={column}
                index={index}
              />
              // ✅ 只傳遞單個 column
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
