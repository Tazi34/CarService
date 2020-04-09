import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { uniqueId } from "lodash";

const mapIdToCity = (cities, id) => {
  return cities.items[id];
};
const mapIdToSpot = (spots, id) => {
  return spots.items[id];
};

export const LocationPicker = ({
  currentCity,
  currentSpot,
  cities,
  spots,
  setCity,
  setSpot,
  ...props
}) => {
  const [labelId] = useState(uniqueId("label-"));
  const citiesValues = cities.byId.map(id => mapIdToCity(cities, id));

  return (
    <div {...props}>
      <FormControl fullWidth>
        <InputLabel id={`${labelId}_city`}>Source</InputLabel>
        <Select
          labelId={`${labelId}_city`}
          onChange={e => {
            setCity(mapIdToCity(cities, e.target.value));
          }}
          value={currentCity.item.id}
        >
          <MenuItem value={-1} key={-1} disabled>
            Source
          </MenuItem>
          {citiesValues.map((city, index) => (
            <MenuItem value={city.id} key={index}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InputLabel id={`${labelId}_spot`}>Location</InputLabel>
      <FormControl fullWidth>
        <Select
          labelId={`${labelId}_spot`}
          disabled={!currentCity.selected}
          type="controlled"
          onChange={e => setSpot(mapIdToSpot(spots, e.target.value))}
          value={currentSpot.id}
        >
          <MenuItem value={-1} key={-1} disabled>
            Spot
          </MenuItem>
          {currentCity.item.spots.map(spot => (
            <MenuItem value={spot.id} key={spot.id}>
              {spot.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
