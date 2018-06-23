const getPlaceIndexes = (place, dimentions) => {
  const row = Math.floor(place / dimentions.y);
  const col = place - row * dimentions.y;

  return { row, col };
};

const pickPlace = places => {
  return Math.floor(Math.random() * places);
};

const isOpenPlace = (matrix, place, dimentions) => {
  const { row, col } = getPlaceIndexes(place, dimentions);
  return matrix[row][col] === undefined;
};

const putItemInPlace = (matrix, item, dimentions) => {
  const places = dimentions.x * dimentions.y;
  let firstPlace = pickPlace(places);
  while (!isOpenPlace(matrix, firstPlace, dimentions)) {
    firstPlace = pickPlace(places);
  }

  const { row, col } = getPlaceIndexes(firstPlace, dimentions);
  matrix[row][col] = item;
};

const initializeMatrix = (rows, columns) => {
  const matrix = new Array(rows);
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    matrix[rowIndex] = new Array(columns);
  }

  return matrix;
};

const buildMatrix = itemsNumber => {
  let remainingPlaces = itemsNumber * 2;
  const dimentions = getBoardDimentions(itemsNumber);
  let matrix = initializeMatrix(dimentions.x, dimentions.y);

  for (let index = 0; index < itemsNumber; index++) {
    putItemInPlace(matrix, index, dimentions);
    putItemInPlace(matrix, index, dimentions);
  }

  return matrix;
};

const getDividers = num => {
  const mul = num * 2;
  const dividers = [];
  let rightDivider = num;

  for (let index = 3; index < rightDivider; index++) {
    if (mul % index === 0) {
      rightDivider = mul / index;
      dividers.push({ x: index, y: rightDivider });
    }
  }

  return dividers;
};

const getBoardDimentions = num => {
  const dividers = getDividers(num);
  if (dividers.length === 0) {
    //throw new Error('Number is not dividing well');
    return null;
  }

  const closestDividers = dividers[dividers.length - 1];
  return { ...closestDividers };
};

module.exports = {
  buildMatrix,
  getBoardDimentions,
};
