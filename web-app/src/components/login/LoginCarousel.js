import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import carImages from "../../images/carImages";
import Box from "@material-ui/core/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  },
  image: {
    width: "100%",
    height: "450px",
    display: "block"
  }
}));

export const LoginCarousel = props => {
  const classes = useStyles();
  const carouselIntervalInMs = 5000;
  const carouselTransitionTimeInMs = 1000;
  return (
    <Box bgcolor={"background.default"} className={classes.root}>
      <Carousel
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={carouselIntervalInMs}
        transitionTime={carouselTransitionTimeInMs}
      >
        {carImages.map(image => (
          <div>
            <img src={image} className={classes.image} />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};
