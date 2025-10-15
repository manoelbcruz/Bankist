'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  locale: 'fr-FR',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  locale: 'ja-JP',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2015-11-01T13:15:33.035Z',
    '2016-11-30T09:48:16.867Z',
    '2017-12-25T06:04:23.907Z',
    '2020-11-25T14:18:46.235Z',
    '2020-04-05T16:33:06.386Z',
    '2020-05-10T14:43:26.374Z',
    '2020-10-25T18:49:59.371Z',
    '2023-11-26T12:01:20.894Z',
  ],
  locale: 'pt-BR',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2014-11-01T13:15:33.035Z',
    '2019-04-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-20T14:18:46.235Z',
    '2020-03-05T16:33:06.386Z',
  ],
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];
const timeWelcome = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
};
const date = new Date();
const year = date.getFullYear();
const month = `${date.getMonth() + 1}`.padStart(2, 0);
const day = `${date.getDate()}`.padStart(2, 0);
const hours = `${date.getHours()}`.padStart(2, 0);
const minutes = `${date.getMinutes()}`.padStart(2, 0);
const seconds = `${date.getSeconds()}`.padStart(2, 0);
let time = 300;
let loginEl, account, sorted;
let eventEl = 1;
let sumP = 0;
let sumL = 0;
let sum = 0;

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerLogout = document.querySelector('.logout');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const containerLogin = document.querySelector('.login');

const btnLogout = document.querySelector('.logout__btn');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function displayMovements() {
  containerMovements.innerHTML = '';
  account.movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const newDate = new Date(account.movementsDates[i]);
    const displayDate = new Intl.DateTimeFormat(account.locale).format(newDate);
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function displayInOut() {
  sumP = 0;
  sumL = 0;
  for (const mov of account.movements) mov > 0 ? (sumP += mov) : (sumL += mov);
  labelSumIn.textContent = sumP + '€';
  labelSumOut.textContent = Math.abs(sumL.toFixed(2)) + '€';
}

function displayInterest() {
  labelSumInterest.textContent =
    ((sumP * account.interestRate) / 100).toFixed(2) + '€';
}

function displayBalance() {
  sum = 0;
  account.movements.forEach(x => {
    sum += x;
  });
  labelBalance.textContent = sum + '€';
}

function displayMovementsSort() {
  if (sorted === 0) {
    const movSorted = account.movements.toSorted((a, b) => a - b);
    containerMovements.innerHTML = '';
    movSorted.forEach((mov, i) => {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const movms = element => element === mov;
      const index = account.movements.findIndex(movms);
      const newDate = new Date(account.movementsDates[index]);
      const displayDate = new Intl.DateTimeFormat(account.locale).format(
        newDate
      );
      const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2) + '€'}</div>
  </div>`;
      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
    sorted = 1;
  } else {
    displayMovements();
    sorted = 0;
  }
}

function loan(ev) {
  ev.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && account.movements.some(mov => mov >= amount * 0.1)) {
    inputLoanAmount.value = '';
    time = 300;
    setTimeout(() => {
      account.movements.push(amount);
      account.movementsDates.push(new Date().toISOString());
      displayBalance();
      displayInOut();
      sorted === 0 ? (sorted = 1) : (sorted = 0);
      displayMovementsSort();
      displayInterest();
    }, 2500);
  }
}

function transfer(ev) {
  ev.preventDefault();
  const userName = inputTransferTo.value;
  const value = +inputTransferAmount.value;
  if (
    value > 0 &&
    userName !==
      account.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('')
  ) {
    accounts.forEach(acc => {
      time = 300;
      const user = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
      if (user === userName && value <= sum) {
        account.movementsDates.push(new Date().toISOString());
        acc.movementsDates.push(new Date().toISOString());
        acc.movements.push(value);
        account.movements.push(-value);
      }
    });
    sum = 0;
    displayBalance();
    displayInOut();
    sorted === 0 ? (sorted = 1) : (sorted = 0);
    displayMovementsSort();
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
  }
}

function closeAcc(ev) {
  ev.preventDefault();
  const userName = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  const user = account.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  if (userName === user && pin === account.pin) {
    const accExc = accounts.splice(account, 1);
    labelWelcome.textContent = `Log in to get started`;
    inputCloseUsername.textContent = '';
    inputClosePin.textContent = '';
    inputClosePin.blur();
    logout();
  }
}

function login(ev) {
  ev.preventDefault();
  const user = inputLoginUsername.value;
  const pin = +inputLoginPin.value;
  accounts.forEach(acc => {
    const userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    if (userName === user && acc.pin === pin) {
      account = acc;
      labelDate.textContent = new Intl.DateTimeFormat(
        account.locale,
        timeWelcome
      ).format(date);
      containerApp.classList.remove('hidden');
      containerLogin.classList.add('hidden');
      labelWelcome.textContent = `Welcome ${account.owner}`;
      displayBalance();
      displayMovements();
      displayInOut();
      displayInterest();
      loginEl = 1;
      sorted = 0;
      inputLoginPin.value = '';
      inputLoginUsername.value = '';
      inputLoginPin.blur();
      const logoutAutomatic = setInterval(() => {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;
        if (time === 0 || !loginEl) {
          clearInterval(logoutAutomatic);
          logout();
        }
        time--;
      }, 1000);
    }
  });
}

function logout() {
  containerApp.classList.add('hidden');
  containerLogin.classList.remove('hidden');
  labelWelcome.textContent = `Log in to get started`;
  time = 300;
  sorted = 0;
  loginEl = 0;
}

btnLogin.addEventListener('click', login);
btnSort.addEventListener('click', displayMovementsSort);
btnLoan.addEventListener('click', loan);
btnTransfer.addEventListener('click', transfer);
btnLogout.addEventListener('click', logout);
btnClose.addEventListener('click', closeAcc);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*movements.forEach((x, i) => {
  console.log(
    `Movimento ${i + 1}: ${x > 0 ? 'Depositou' : 'Retirou'} ${Math.abs(x)} R$`
  );
});

currencies.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});*/

const now = new Date();
console.log(now);
