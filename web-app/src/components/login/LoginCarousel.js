import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import WorkInProgressImg from "../../images/underConstruction.png";

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
  const images = Array(5).fill(WorkInProgressImg);
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
        {images.map(image => (
          <div>
            <img src={image} className={classes.image} />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};
