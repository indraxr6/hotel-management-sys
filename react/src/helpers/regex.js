async function regex(roomNumbers) {
     var regex = /\d{3}(?=\d{0,2}(?:\D|$))/g;
     return roomNumbers.map(function (roomNumber) {
          return roomNumber.replace(regex, '$& ');
     });
}

export default regex;
