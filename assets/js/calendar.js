const today = new Date();

const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

let displayMonth = currentMonth;
let displayYear = currentYear;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const calendarMonth = document.getElementById("calendar-month");
const calendarDays = document.getElementById("calendar-days");

const previousMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");


function updateCalendarHeader() {
    calendarMonth.textContent =
        months[displayMonth] + " " + displayYear;
}


function renderCalendar() {
    calendarDays.innerHTML = "";

    const firstDay =
        new Date(displayYear, displayMonth, 1).getDay();

    const startOffset = (firstDay + 6) % 7;

    const daysInMonth =
        new Date(displayYear, displayMonth + 1, 0).getDate();


    for (let i = 0; i < startOffset; i++) {
        const emptyCell = document.createElement("div");
        calendarDays.appendChild(emptyCell);
    }


    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");

        dayElement.textContent = day;

        if (
            day === currentDay &&
            displayMonth === currentMonth &&
            displayYear === currentYear
        ) {
            dayElement.classList.add("today");
        }

        calendarDays.appendChild(dayElement);
    }
}


nextMonthButton.addEventListener("click", function () {
    displayMonth++;

    if (displayMonth > 11) {
        displayMonth = 0;
        displayYear++;
    }

    updateCalendarHeader();
    renderCalendar();
});


previousMonthButton.addEventListener("click", function () {
    displayMonth--;

    if (displayMonth < 0) {
        displayMonth = 11;
        displayYear--;
    }

    updateCalendarHeader();
    renderCalendar();
});


updateCalendarHeader();
renderCalendar();