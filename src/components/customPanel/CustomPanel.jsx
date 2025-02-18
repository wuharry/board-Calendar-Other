import PropTypes from "prop-types";
import { Box } from "@mui/material";

const CustomTabPanel = ({ children, value, index }) => {
  const hidden = value !== index;

  return (
    <Box
      hidden={hidden}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ p: 2 }}
    >
      {value === index && <div>{children}</div>}
    </Box>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default CustomTabPanel;
