// DOM Elements
const modeBtns = document.querySelectorAll('.mode-btn');
const counterSections = document.querySelectorAll('.counter-section');
const calendarOptions = document.querySelectorAll('.calendar-option');
const currentYearEl = document.getElementById('current-year');

// Life Counter Elements
const birthDateInput = document.getElementById('birth-date');
const deathDateInput = document.getElementById('death-date');
const calculateLifeBtn = document.getElementById('calculate-life');
const lifeDaysEl = document.getElementById('life-days');
const lifeYearsLivedEl = document.getElementById('life-years-lived');
const lifeDaysLivedEl = document.getElementById('life-days-lived');
const lifeInputsSection = document.getElementById('life-inputs');
const lifeResultsSection = document.getElementById('life-results');
const recalculateLifeBtn = document.getElementById('recalculate-life');

// Calendar Counter Elements
const dayOptionBtn = document.getElementById('day-option');
const monthOptionBtn = document.getElementById('month-option');
const yearOptionBtn = document.getElementById('year-option');
const calendarDaysContainer = document.getElementById('calendar-days-container');
const calendarSecondsContainer = document.getElementById('calendar-seconds-container');
const calendarDaysEl = document.getElementById('calendar-days');
const calendarHoursEl = document.getElementById('calendar-hours');
const calendarMinutesEl = document.getElementById('calendar-minutes');
const calendarSecondsEl = document.getElementById('calendar-seconds');

// Custom Counter Elements
const targetDateInput = document.getElementById('target-date');
const eventNameInput = document.getElementById('event-name');
const calculateCustomBtn = document.getElementById('calculate-custom');
const eventDisplayEl = document.getElementById('event-display');
const customDaysEl = document.getElementById('custom-days');
const customHoursEl = document.getElementById('custom-hours');
const customMinutesEl = document.getElementById('custom-minutes');
const customSecondsEl = document.getElementById('custom-seconds');

// Variables
let calendarInterval;
let customInterval;
let calendarMode = 'day'; // Default to day mode

// Initialize
function init() {
    setCurrentYear();
    setupEventListeners();
    
    // Set default date values
    const today = new Date();
    birthDateInput.valueAsDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
    
    // Default death date to 80 years from birth
    const defaultDeathDate = new Date(today.getFullYear() + 50, today.getMonth(), today.getDate());
    deathDateInput.valueAsDate = defaultDeathDate;
    
    // Set default target date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    targetDateInput.value = formatDateTimeForInput(tomorrow);
    
    // Initialize calendar mode display
    if (calendarMode === 'day') {
        calendarDaysContainer.style.display = 'none';
        calendarSecondsContainer.style.display = 'flex';
    } else {
        calendarDaysContainer.style.display = 'flex';
        calendarSecondsContainer.style.display = 'none';
    }
    
    // Start calendar countdown
    updateCalendarCountdown();
    calendarInterval = setInterval(updateCalendarCountdown, 1000);
}

// Helper Functions
function setCurrentYear() {
    currentYearEl.textContent = new Date().getFullYear();
}

function formatDateTimeForInput(date) {
    return date.toISOString().slice(0, 16);
}

function calculateDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Reset times to avoid time zone issues
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const timeDiff = end - start;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function calculateYearsBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    
    // Adjust years if the end date hasn't reached the same month and day yet
    if (end.getMonth() < start.getMonth() || 
        (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())) {
        years--;
    }
    
    return years;
}

// Add new function to get detailed time display
function formatDetailedTime(years, days) {
    return `${years} ${years === 1 ? 'year' : 'years'}, ${days} ${days === 1 ? 'day' : 'days'}`;
}

function getTimeRemainingDetails(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const totalSeconds = Math.floor((end - now) / 1000);
    
    if (totalSeconds <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return {
        days,
        hours,
        minutes,
        seconds
    };
}

function getDayEnd() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
}

function getMonthEnd() {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return lastDay;
}

function getYearEnd() {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    return lastDay;
}

// Event Handlers
function setupEventListeners() {
    // Mode switching
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetMode = btn.id.split('-')[0];
            counterSections.forEach(section => {
                if (section.id === `${targetMode}-counter`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
    
    // Calendar options
    calendarOptions.forEach(option => {
        option.addEventListener('click', () => {
            calendarOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            if (option.id === 'day-option') {
                calendarMode = 'day';
            } else if (option.id === 'month-option') {
                calendarMode = 'month';
            } else {
                calendarMode = 'year';
            }
            
            updateCalendarCountdown();
        });
    });
    
    // Life calculation
    calculateLifeBtn.addEventListener('click', calculateLifeRemaining);
    recalculateLifeBtn.addEventListener('click', showLifeInputs);
    
    // Custom date calculation
    calculateCustomBtn.addEventListener('click', startCustomCountdown);
}

// Calculation Functions
function calculateLifeRemaining() {
    const birthDate = birthDateInput.value;
    const deathDate = deathDateInput.value;
    
    if (!birthDate || !deathDate) {
        alert('Please enter both birth date and expected end date');
        return;
    }
    
    if (new Date(deathDate) <= new Date(birthDate)) {
        alert('Expected end date must be after birth date');
        return;
    }
    
    // Calculate time lived (from birth to now)
    const today = new Date();
    const yearsLived = calculateYearsBetween(birthDate, today);
    const daysLived = calculateDaysBetween(birthDate, today);
    const daysInYears = yearsLived * 365; // Approximate
    const extraDaysLived = daysLived - daysInYears;
    
    // Calculate time remaining (from now to death date)
    const daysRemaining = calculateDaysBetween(today, deathDate);
    const yearsRemaining = Math.floor(daysRemaining / 365);
    const extraDaysRemaining = daysRemaining % 365;
    
    // Update the display
    lifeYearsLivedEl.textContent = yearsLived;
    lifeDaysLivedEl.textContent = extraDaysLived;
    
    // Set detailed text
    document.getElementById('life-lived-detail').textContent = formatDetailedTime(yearsLived, extraDaysLived);
    document.getElementById('life-remaining-detail').textContent = formatDetailedTime(yearsRemaining, extraDaysRemaining);
    
    // Add remaining years
    document.getElementById('life-years-remaining').textContent = yearsRemaining;
    lifeDaysEl.textContent = extraDaysRemaining;
    
    // Hide inputs, show results
    lifeInputsSection.style.display = 'none';
    lifeResultsSection.style.display = 'flex';
}

function showLifeInputs() {
    lifeInputsSection.style.display = 'block';
    lifeResultsSection.style.display = 'none';
}

function updateCalendarCountdown() {
    let endDate;
    
    if (calendarMode === 'day') {
        endDate = getDayEnd();
        // Hide days counter for day mode
        calendarDaysContainer.style.display = 'none';
        // Show seconds for day mode
        calendarSecondsContainer.style.display = 'flex';
    } else if (calendarMode === 'month') {
        endDate = getMonthEnd();
        calendarDaysContainer.style.display = 'flex';
        // Hide seconds for month mode
        calendarSecondsContainer.style.display = 'none';
    } else {
        endDate = getYearEnd();
        calendarDaysContainer.style.display = 'flex';
        // Hide seconds for year mode
        calendarSecondsContainer.style.display = 'none';
    }
    
    const timeRemaining = getTimeRemainingDetails(endDate);
    
    calendarDaysEl.textContent = timeRemaining.days;
    calendarHoursEl.textContent = timeRemaining.hours;
    calendarMinutesEl.textContent = timeRemaining.minutes;
    calendarSecondsEl.textContent = timeRemaining.seconds;
}

function startCustomCountdown() {
    const targetDate = targetDateInput.value;
    const eventName = eventNameInput.value.trim();
    
    if (!targetDate) {
        alert('Please enter a target date');
        return;
    }
    
    if (new Date(targetDate) <= new Date()) {
        alert('Target date must be in the future');
        return;
    }
    
    // Clear any existing interval
    if (customInterval) {
        clearInterval(customInterval);
    }
    
    // Update event display
    eventDisplayEl.textContent = eventName || 'Countdown';
    
    // Start countdown
    updateCustomCountdown();
    customInterval = setInterval(updateCustomCountdown, 1000);
}

function updateCustomCountdown() {
    const targetDate = targetDateInput.value;
    if (!targetDate) return;
    
    const timeRemaining = getTimeRemainingDetails(targetDate);
    
    customDaysEl.textContent = timeRemaining.days;
    customHoursEl.textContent = timeRemaining.hours;
    customMinutesEl.textContent = timeRemaining.minutes;
    customSecondsEl.textContent = timeRemaining.seconds;
    
    // Stop countdown if reached zero
    if (timeRemaining.days === 0 && 
        timeRemaining.hours === 0 && 
        timeRemaining.minutes === 0 && 
        timeRemaining.seconds === 0) {
        clearInterval(customInterval);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init); 
