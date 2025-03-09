// Time Remaining Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get elements for calendar counter
    const calendarDays = document.getElementById('calendar-days');
    const calendarHours = document.getElementById('calendar-hours');
    const calendarMinutes = document.getElementById('calendar-minutes');
    const calendarSeconds = document.getElementById('calendar-seconds');
    
    // Get elements for life counter
    const birthDateInput = document.getElementById('birth-date');
    const deathDateInput = document.getElementById('death-date');
    const calculateLifeButton = document.getElementById('calculate-life');
    const recalculateLifeButton = document.getElementById('recalculate-life');
    const lifeResults = document.getElementById('life-results');
    const timeLivedDisplay = document.getElementById('time-lived-display');
    const timeRemainingDisplay = document.getElementById('time-remaining-display');
    
    // Get elements for custom counter
    const targetDateInput = document.getElementById('target-date');
    const eventNameInput = document.getElementById('event-name');
    const calculateCustomButton = document.getElementById('calculate-custom');
    const eventDisplay = document.getElementById('event-display');
    const customDays = document.getElementById('custom-days');
    const customHours = document.getElementById('custom-hours');
    const customMinutes = document.getElementById('custom-minutes');
    const customSeconds = document.getElementById('custom-seconds');
    
    // Get calendar option buttons
    const dayOption = document.getElementById('day-option');
    const monthOption = document.getElementById('month-option');
    const yearOption = document.getElementById('year-option');
    
    // Get tab buttons
    const calendarTab = document.getElementById('calendar-tab');
    const lifeTab = document.getElementById('life-tab');
    const customTab = document.getElementById('custom-tab');
    
    // Get sections
    const calendarCounter = document.getElementById('calendar-counter');
    const lifeCounter = document.getElementById('life-counter');
    const customCounter = document.getElementById('custom-counter');
    
    // Get theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark-theme');
        
        // Save theme preference to localStorage
        if (document.documentElement.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-theme');
    }
    
    // Tab navigation
    calendarTab.addEventListener('click', function() {
        activateTab('calendar');
    });
    
    lifeTab.addEventListener('click', function() {
        activateTab('life');
    });
    
    customTab.addEventListener('click', function() {
        activateTab('custom');
    });
    
    function activateTab(tabName) {
        // Remove active class from all tabs and sections
        calendarTab.classList.remove('active');
        lifeTab.classList.remove('active');
        customTab.classList.remove('active');
        
        calendarCounter.classList.remove('active');
        lifeCounter.classList.remove('active');
        customCounter.classList.remove('active');
        
        // Add active class to selected tab and section
        if (tabName === 'calendar') {
            calendarTab.classList.add('active');
            calendarCounter.classList.add('active');
        } else if (tabName === 'life') {
            lifeTab.classList.add('active');
            lifeCounter.classList.add('active');
        } else if (tabName === 'custom') {
            customTab.classList.add('active');
            customCounter.classList.add('active');
        }
    }
    
    // Calendar counter - default mode
    let calendarMode = 'day';
    
    // Calendar mode selection
    dayOption.addEventListener('click', function() {
        calendarMode = 'day';
        updateCalendarUI();
    });
    
    monthOption.addEventListener('click', function() {
        calendarMode = 'month';
        updateCalendarUI();
    });
    
    yearOption.addEventListener('click', function() {
        calendarMode = 'year';
        updateCalendarUI();
    });
    
    // Update calendar UI based on selected mode
    function updateCalendarUI() {
        // Remove active class from all options
        dayOption.classList.remove('active');
        monthOption.classList.remove('active');
        yearOption.classList.remove('active');
        
        // Add active class to selected option
        if (calendarMode === 'day') {
            dayOption.classList.add('active');
        } else if (calendarMode === 'month') {
            monthOption.classList.add('active');
        } else if (calendarMode === 'year') {
            yearOption.classList.add('active');
        }
    }
    
    // Set initial calendar UI
    updateCalendarUI();
    
    // Update calendar counter every second
    setInterval(updateCalendarCounter, 1000);
    
    function updateCalendarCounter() {
        const now = new Date();
        let targetDate;
        
        if (calendarMode === 'day') {
            // Target end of the day
            targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
        } else if (calendarMode === 'month') {
            // Target end of the month
            targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
        } else if (calendarMode === 'year') {
            // Target end of the year
            targetDate = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
        }
        
        const diff = targetDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update UI
        calendarDays.textContent = days;
        calendarHours.textContent = hours;
        calendarMinutes.textContent = minutes;
        calendarSeconds.textContent = seconds;
    }
    
    // Life counter calculation
    calculateLifeButton.addEventListener('click', function() {
        const birthDate = new Date(birthDateInput.value);
        const deathDate = new Date(deathDateInput.value);
        
        if (isNaN(birthDate) || isNaN(deathDate)) {
            alert('Please enter valid dates');
            return;
        }
        
        if (birthDate >= deathDate) {
            alert('Birth date must be before death date');
            return;
        }
        
        const now = new Date();
        
        // Calculate time lived
        const livedMilliseconds = now - birthDate;
        const livedDays = Math.floor(livedMilliseconds / (1000 * 60 * 60 * 24));
        const livedYears = Math.floor(livedDays / 365);
        const livedDaysRemaining = livedDays % 365;
        
        // Calculate time remaining
        const remainingMilliseconds = deathDate - now;
        const remainingDays = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));
        const remainingYears = Math.floor(remainingDays / 365);
        const remainingDaysRemaining = remainingDays % 365;
        
        // Update UI
        timeLivedDisplay.textContent = `${livedYears} years, ${livedDaysRemaining} days`;
        timeRemainingDisplay.textContent = `${remainingYears} years, ${remainingDaysRemaining} days`;
        
        // Show results
        lifeResults.style.display = 'block';
    });
    
    // Recalculate life counter
    recalculateLifeButton.addEventListener('click', function() {
        lifeResults.style.display = 'none';
    });
    
    // Custom counter calculation
    calculateCustomButton.addEventListener('click', function() {
        const targetDate = new Date(targetDateInput.value);
        
        if (isNaN(targetDate)) {
            alert('Please enter a valid target date');
            return;
        }
        
        const eventName = eventNameInput.value || 'Countdown';
        eventDisplay.textContent = eventName;
        
        // Start countdown
        startCustomCountdown(targetDate);
    });
    
    let customCountdownInterval;
    
    function startCustomCountdown(targetDate) {
        // Clear any existing interval
        if (customCountdownInterval) {
            clearInterval(customCountdownInterval);
        }
        
        // Update immediately
        updateCustomCountdown(targetDate);
        
        // Then update every second
        customCountdownInterval = setInterval(function() {
            updateCustomCountdown(targetDate);
        }, 1000);
    }
    
    function updateCustomCountdown(targetDate) {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            // Countdown reached
            customDays.textContent = '0';
            customHours.textContent = '0';
            customMinutes.textContent = '0';
            customSeconds.textContent = '0';
            clearInterval(customCountdownInterval);
            eventDisplay.textContent += ' (Completed)';
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update UI
        customDays.textContent = days;
        customHours.textContent = hours;
        customMinutes.textContent = minutes;
        customSeconds.textContent = seconds;
    }

    // Make inputs show calendar only when clicking on the input
    const dateInputs = document.querySelectorAll('input[type="date"], input[type="datetime-local"]');
    
    dateInputs.forEach(input => {
        // Create a label to improve click target
        input.addEventListener('click', function(e) {
            e.stopPropagation();
            // This ensures the native date picker behavior works only when clicking directly on the input
            if (e.target === this) {
                // The calendar will open naturally
                this.focus();
            }
        });
        
        // Prevent default calendar icon's click behavior
        const calendarIcon = input.querySelector('::-webkit-calendar-picker-indicator');
        if (calendarIcon) {
            calendarIcon.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });

    // Ensure date inputs work well on all browsers by making the entire input clickable
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const label = group.querySelector('label');
        const input = group.querySelector('input[type="date"], input[type="datetime-local"]');
        
        if (label && input) {
            label.style.cursor = 'pointer';
            
            // Make clicking on the label also focus the input
            label.addEventListener('click', () => {
                input.focus();
            });
        }
    });
    
    // Set default tab to Calendar
    activateTab('calendar');
}); 