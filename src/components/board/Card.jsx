import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";

function TaskCard({ title, date, task, id, index }) {
  console.log("TaskCard id", id, typeof id);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card
          sx={{ minWidth: 275 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {date}
            </Typography>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {task}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskCard;
