
const items = 10;
let remainingPlaces = items * 2;
let matrix = new Array(remainingPlaces);

console.log(matrix)

/*
[ 0,  1,  2,  3,  4,
  5,  6,  7,  8,  9,
 10, 11, 12, 13, 14,
 15, 16, 17, 18, 19 ]
*/

const pickPlace = places => {
  return Math.floor(Math.random() * places);
}

const isOpenPlace = (matrix, place) => {
  return matrix[place] === undefined;
}

const putItemInPlace = (matrix, item) => {
    const places = matrix.length;
    let firstPlace = pickPlace(places);
    while (!isOpenPlace(matrix, firstPlace)) {
      firstPlace = pickPlace(places);
    }

    matrix[firstPlace] = item;
}

const y = Math.random() * 10;

for (let index = 0; index < items; index++) {
  putItemInPlace(matrix, index);
  putItemInPlace(matrix, index);
}


console.log(matrix)
