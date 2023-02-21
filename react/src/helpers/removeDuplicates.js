async function removeDuplicates(input) {
     const numbers = input.split(',').map(Number);
     const uniqueNumbers = [...new Set(numbers)];
     return uniqueNumbers.join(',');
}

export default removeDuplicates 
