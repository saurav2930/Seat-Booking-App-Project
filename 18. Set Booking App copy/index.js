// 1. STORE MOVIE DATA
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

const selectMovie = document.querySelector("#selectMovie");
const movieName = document.querySelector("#movieName");
const moviePrice = document.querySelector("#moviePrice");
const numberOfSeat = document.querySelector("#numberOfSeat");
const totalPrice = document.querySelector("#totalPrice");
const selectedSeatsHolder = document.querySelector("#selectedSeatsHolder");
const proceedBtn = document.querySelector("#proceedBtn");
const cancelBtn = document.querySelector("#cancelBtn");

// states
let currentMovieIndex = 0;
let noOfSeatSelected = 0;
let arrayOfSelectedSeats = [1, 9, 17, 25, 33, 41, 49, 57];
let arr = [];

function populateMovies() {
  moviesList.forEach((movie, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${movie.movieName} ($${movie.price})`;
    if (index === 0) {
      option.selected = true;
    }
    selectMovie.appendChild(option);
  });
  movieName.textContent = moviesList[0].movieName;
  moviePrice.textContent = `$ ${moviesList[0].price}`;

  selectMovie.addEventListener("change", (e) => {
    currentMovieIndex = e.target.value;
    movieName.textContent = moviesList[currentMovieIndex].movieName;
    moviePrice.textContent = `$ ${moviesList[currentMovieIndex].price}`;
    const moviePr = moviesList[currentMovieIndex].price;
      const totalPr = noOfSeatSelected * moviePr;
      numberOfSeat.textContent = noOfSeatSelected;
      totalPrice.textContent = `$ ${totalPr}`;
  });
}

populateMovies();

const seats = document.querySelectorAll("#seatCont .seat");

seats.forEach((seat, index) => {
  if (!seat.classList.contains("occupied")) {
    seat.addEventListener("click", () => {
      if (
        !seat.classList.contains("selected") &&
        arrayOfSelectedSeats.every((seatIndex) => seatIndex !== index)
      ) {
        seat.classList.add("selected");
        noOfSeatSelected++;
        arrayOfSelectedSeats.push(index);
        showSeatHolder(index + 1);
      } else if(seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        noOfSeatSelected--;        
        arrayOfSelectedSeats = arrayOfSelectedSeats.filter((s) => s !== index);
      }
      const moviePr = moviesList[currentMovieIndex].price;
      const totalPr = noOfSeatSelected * moviePr;
      numberOfSeat.textContent = noOfSeatSelected;
      totalPrice.textContent = `$ ${totalPr}`;
    });
  }
});

function showSeatHolder(seatNum) {
  //Aise bhi kar skte ho

  // if(selectedSeatsHolder.querySelector('.noSelected')){
  //   selectedSeatsHolder.innerHTML = ''
  // }

  let noSelected = selectedSeatsHolder.querySelector(".noSelected");
  if (noSelected) {
    noSelected.remove();
  }

  // selectedSeatsHolder.querySelector('.noSelected').remove()
  // direct remove mt karo kyu ki next time jab seat per click kroge to element milega ni aur "selectedSeatsHolder.querySelector('.noSelected')" ye "null" mein convert ho jaega mtlb second click pe "null.remove" hoga aur ye wrong hai "null" isliye hoga ku ki jo khoj rhe the DOM me mila hi ni vo first seat click me remove ho gya tha islye if laga ke karo if lagane ka mtlb hai "agr table hai ya mila tabhi remove kro"

  const span = document.createElement("span");

  span.classList.add("selectedSeat");
  span.textContent = `Seat ${seatNum}`;

  selectedSeatsHolder.appendChild(span);
}

proceedBtn.addEventListener("click", () => {
  if (noOfSeatSelected === 0) {
    alert("Oops, no seat selected");
  } else {
    alert("Congratulation! Your seat(s) have been booked.");
    seats.forEach((seat) => {
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        seat.classList.add("occupied");                                               
      }
    });

    const seatHolder = selectedSeatsHolder.querySelectorAll(".selectedSeat");
    seatHolder.forEach((seat) => {
      seat.remove();
    });
    selectedSeatsHolder.innerHTML =
      '<span class="noSelected">No Seat Selected</span>';

    numberOfSeat.textContent = "0";
    totalPrice.textContent = `$ 0`;
    noOfSeatSelected = 0;
  }
});

cancelBtn.addEventListener("click", () => {
  seats.forEach((seat) => {
    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
    }
  });

  const seatHolder = selectedSeatsHolder.querySelectorAll(".selectedSeat");
  seatHolder.forEach((seat) => {
    seat.remove();
  });
  selectedSeatsHolder.innerHTML =
    '<span class="noSelected">No Seat Selected</span>';

  numberOfSeat.textContent = "0";
  totalPrice.textContent = `$ 0`;
  noOfSeatSelected = 0;
  arrayOfSelectedSeats = [];
  seats.forEach((seat, index) => {
    if (seat.classList.contains("occupied")) {
      arrayOfSelectedSeats.push(index);
    }
  });
});

// One another way to find real index bro:-
// const allSeats = [...document.querySelectorAll('.seat')];
// const occupiedSeats = document.querySelectorAll('.occupied');

// occupiedSeats.forEach(seat => {
//   console.log(allSeats.indexOf(seat)); // real index
// });

// 💥 Why this happens?

// Because querySelectorAll():

// 👉 Always returns a NEW NodeList
// 👉 Index always starts from 0

// "seats" mein bhi sare seats ni the aur yahan pe bhi 0 se index start hua hai lkn baat ye tha ki jitne bhi seat book krne wale hai "seats" mein selected hai aur sare seat ko uske index mil gye
