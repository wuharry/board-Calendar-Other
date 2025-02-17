import { Box } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import TaskCard from "./Card";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Columns({ column, index }) {
  const tasks = column.tasks || []; // 避免 tasks 可能是 undefined

  return (
    <Draggable draggableId={column.id} index={index}>
      {(draggableProvided) => (
        <Paper
          elevation={3}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          sx={{ backgroundColor: "#3C3C3C", borderRadius: 2, padding: 2 }}
        >
          <Typography variant="h4" gutterBottom>
            {column.title}
          </Typography>
          {/* 這個 Droppable 允許 TaskCard 被放入 */}
          <Droppable droppableId={column.id} type="TASK">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 300,
                  height: "100%",
                  flexWrap: "wrap",
                  gap: 2,
                  margin: 2,
                  padding: 2,
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={task.date}
                    task={task.task}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                {/* ✅ 必須加上,確保 UI 不會在拖曳時發生「跳動」或「崩潰」確保 UI 不會在拖曳時發生「跳動」或「崩潰」 */}
              </Box>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
  );
}
Columns.propTypes = {
  id: PropTypes.string.isRequired,
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string,
        task: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default Columns;
