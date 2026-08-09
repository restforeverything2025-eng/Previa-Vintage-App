/*
=========================================
PREVIA

daily-info.js

Daily Info Module

Responsibility:
- Display the daily PREVIA information.
- Select content according to the current date.
=========================================
*/

const DailyInfo = (() => {

    function getDateKey() {

        const date =
            new Date();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${month}-${day}`;

    }

    function getTodayDate() {

    const date =
        new Date();

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    const month =
        date.toLocaleDateString(
            "uk-UA",
            { month: "long" }
        );

    return {
        day,
        month
    };

}

    function getTodayInfo() {

    return DailyFacts.getTodayFact();

}

    function init() {

    const dateElement =
        document.getElementById(
            "daily-date"
        );

    const textElement =
        document.getElementById(
            "daily-text"
        );

    if (!dateElement || !textElement) {

        return;

    }

    const today =
    getTodayDate();

dateElement.innerHTML =
    `<span class="daily-day">${today.day}</span>` +
    `<span class="daily-month">${today.month}</span>`;

    textElement.textContent =
        getTodayInfo();

}

    return {

        init

    };

})();