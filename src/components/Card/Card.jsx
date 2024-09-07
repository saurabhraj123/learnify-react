// external
import PropTypes from "prop-types";

// material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const ActionAreaCard = (props) => {
  const { title, icon } = props;

  return (
    <Card sx={{ width: 300 }}>
      <CardActionArea>
        <CardMedia component="img" height="280" image={icon} />
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ActionAreaCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

ActionAreaCard.displayName = "Card";

export default ActionAreaCard;
