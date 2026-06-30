export const coordinateParser = (coor) => {
  let coorArray = coor.split(".");
  let pointNumber = coorArray[1].slice(0, 2);
  coorArray.splice(1, 1, pointNumber);
  return coorArray.join(".");
};
