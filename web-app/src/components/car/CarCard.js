import React, { Component } from 'react'
import { CardActions, Button, Card, CardContent, Typography, CardActionArea, CardMedia, List, ListItem, Container, Tooltip, Grid, makeStyles, Divider, } from '@material-ui/core';
import carImage from '../../sampleCar.png'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Filter5Icon from '@material-ui/icons/Filter5';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth:400,
        background:"#d1c5c5",
        padding:5,
        border:"2px solid black"
    },
    title:{
        fontWeight:700,
        paddingTop:10,
    },
    iconContainer:{
        paddingTop:10,
        marginBottom:-20,
    }

}));
function CarCard(props) {
    const classes = useStyles()
    var car = props.car;
    if (!car)
        return null;

    return (
        <Card className={classes.root}>
            <CardActionArea >
                <CardContent>
                    <CardMedia
                        style={{ height: "300px", borderRadius: "5px" }}
                        image={carImage}
                        title= {car.make + " " + car.model}
                    />
                    <Typography gutterBottom  variant="h5" component="h2" className={classes.title}>
                        {car.make + " " + car.model}
                    </Typography>
                    <Divider/>
                    <Grid container spacing={1} direction="row" className={classes.iconContainer}>
                        <Grid item>
                            <Tooltip title="Air conditioning" placement="top">
                                <AcUnitIcon color="primary" fontSize="large" />
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Seats" placement="top">
                                <Filter5Icon style={{ color: "green" }} fontSize="large" />
                            </Tooltip>
                        </Grid>
                    </Grid>




                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" size="small" color="primary">
                    BOOK
                        </Button>
                <Button variant="outlined" size="small" color="primary">
                    DETAILS
                        </Button>
            </CardActions>
        </Card>


    )

}

export default CarCard
