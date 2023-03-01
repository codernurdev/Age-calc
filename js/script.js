// Get form inputs and result elements
const dobDayInput = document.getElementById('dob-day');
const dobMonthInput = document.getElementById('dob-month');
const dobYearInput = document.getElementById('dob-year');
const currentDateInput = document.getElementById('current-date');
const ageResult = document.getElementById('age-result');


// Set default value of current date input to today's date
const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
if (month < 10) {
	month = '0' + month;
}
let day = today.getDate();
if (day < 10) {
	day = '0' + day;
}
const todayFormatted = `${year}-${month}-${day}`;
currentDateInput.value = todayFormatted;

// Get calculate button and add event listener
const calculateBtn = document.getElementById('calculate-btn');
calculateBtn.addEventListener('click', calculateAge);

// Get reset button and add event listener
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetForm);

// Initialize date pickers
const dobCalendar = flatpickr('#dob-calendar', {
	dateFormat: 'd-m-Y',
	defaultDate: new Date(dobYearInput.value, dobMonthInput.value - 1, dobDayInput.value)
});
const currentCalendar = flatpickr('#current-calendar', {
	dateFormat: 'Y-m-d',
	defaultDate: todayFormatted
});

// Calculate age and display result
function calculateAge() {
	const dobDay = parseInt(dobDayInput.value);
	const dobMonth = parseInt(dobMonthInput.value) - 1;
	const dobYear = parseInt(dobYearInput.value);
	const currentDate = new Date(currentDateInput.value);
	const dob = new Date(dobYear, dobMonth, dobDay);

	let ageInYears = currentDate.getFullYear() - dob.getFullYear();
	let ageInMonths = currentDate.getMonth() - dob.getMonth();
	let ageInDays = currentDate.getDate() - dob.getDate();

	if (ageInDays < 0) {
		const daysInBirthMonth = new Date(dob.getFullYear(), dob.getMonth() + 1, 0).getDate();
		ageInDays += daysInBirthMonth;
		ageInMonths--;
	}

	if (ageInMonths < 0) {
		ageInMonths += 12;
		ageInYears--;
	}

	ageResult.innerHTML = `${ageInYears} years ${ageInMonths} months ${ageInDays} days`;
}

// Reset form
function resetForm() {
	dobDayInput.value = '';
	dobMonthInput.value = '';
	dobYearInput.value = '';
	dobCalendar.clear();
	currentDateInput.value = todayFormatted;
	currentCalendar.setDate(todayFormatted);
	ageResult.innerHTML = '';
  }
  