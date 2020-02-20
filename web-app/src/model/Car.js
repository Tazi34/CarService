

import React, { Component } from 'react'

export class Car {
    constructor(data) {
        if (!data)
            return;
        this.id = data.id
        this.make = data.carMake
        this.model = data.carModel
        this.licenseNumber = data.licenseNumber
        this.seats = data.seats
        this.year = data.year
        this.location = data.location
        this.price = data.price
    }
}

export default Car
