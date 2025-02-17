import PropTypes from "prop-types";

const CustomTabPanel = ({ children, value, index }) => {
  const hidden = value !== index;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={`${hidden ? "hidden" : "block"} p-6`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default CustomTabPanel;
