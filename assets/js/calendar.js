// Format this .js later
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const firstDay = new Date(currentYear, currentMonth, 1).getDay();
const startOffset = (firstDay + 6) % 7;

const calendarMonth = document.getElementById("calendar-month");

const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const calendarGrid = document.getElementById("calendar-grid");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = months[currentMonth] + " " + currentDay + ", " + currentYear;
const monthYear = months[currentMonth] + " " + currentYear;
calendarMonth.textContent = monthYear;

for (let i = 0; i < startOffset; i++) {
    const emptyCell = document.createElement("div");
    calendarGrid.appendChild(emptyCell);
}

for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;

    if (day === currentDay) {
        dayElement.classList.add("today");
    }

    calendarGrid.appendChild(dayElement);
}


