export const ADD_SPOTS = "ADD_SPOTS";

export const addSpots = spots => {
  return {
    type: ADD_SPOTS,
    payload: { spots: spots }
  };
};
