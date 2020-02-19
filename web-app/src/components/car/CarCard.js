import React, { Component } from 'react'
import { Box, CardActions,Button,Card, CardContent, CardHeader, Typography, CardActionArea, CardMedia } from '@material-ui/core';
import carImage from '../../sampleCar.png'
export class CarCard extends Component {

    render() {
        var car = this.props.car;
        console.log(car)
        if (!car)
            return null;

        return (
            <Card style={{ width: "500px" }}>
                <CardActionArea>
                    <CardContent>
                        <CardMedia
                            style={{ height: "300px" }}
                            image={carImage}
                            title="Car"
                        />
                        <Typography gutterBottom variant="h5" component="h2">
                            {car.make}
                            {car.model}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        BOOK
                    </Button>
                    <Button size="small" color="primary">
                        DETAILS
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default CarCard
