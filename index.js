const readline = require("readline");

function inputData(callback, array) {
  const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  scanner.question("Masukkan jumlah nilai tugas: ", (length) => {
    const angkaLength = parseInt(length);
    if (isNaN(angkaLength) || angkaLength <= 0) {
      console.log("Invalid input");
      scanner.close();
      inputData(callback, array);
      return;
    }

    for (let i = 0; i < angkaLength; i++) {
      const randomNumber = Math.floor(Math.random() * 101);
      array.push(randomNumber);
    }
    scanner.close();
    callback(array);
  });
}

function inputSearch(callback) {
  const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  scanner.question("Masukkan angka yang ingin dicari: ", (length) => {
    const searchNumber = parseInt(length);
    scanner.close();
    callback(searchNumber);
    return;
  });
}

function showMenu(array, searchNumber) {
  const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Menu Pilihan");
  console.log("1. Input Angka");
  console.log("2. Sorting");
  console.log("3. Searching");
  console.log("4. Selesai");

  scanner.question("Masukkan pilihan (1/2/3/4): ", (choice) => {
    scanner.close();
    const menu = parseInt(choice);
    if (isNaN(menu) || menu < 1 || menu > 4) {
      console.log("Invalid input. Please enter a number from 1 to 4.");
      showMenu(array, searchNumber);
      return;
    }

    pickMenu(menu, array, searchNumber);
  });
}

function pickMenu(menu, array, searchNumber) {
  switch (menu) {
    case 1:
      array = [];
      inputData((array) => {
        for (let i = 0; i < array.length; i++) {
          console.log(`Angka ${i + 1}: ${array[i]}`);
        }
        showMenu(array, searchNumber);
      }, array);
      break;
    case 2:
      sort(array);
      showMenu(array, searchNumber);
      break;
    case 3:
      inputSearch((searchNumber) => {
        search(array, searchNumber);
        showMenu(array, searchNumber);
      }, searchNumber);
      break;
    case 4:
      break;
    default:
      break;
  }
}

function search(array, searchNumber) {
  let found = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === searchNumber) {
      found = true;
      break;
    }
  }
  if (found) {
    console.log("Angka ditemukan");
  } else {
    console.log("Angka tidak ditemukan");
  }
}

function sort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  console.log(`Hasil sorting: ` + array.join(", "));
}

let array = [];
let searchNumber = null;
showMenu(array, searchNumber);
