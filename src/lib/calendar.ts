import { computed } from 'vue';

// Function to get the previous dates for the calendar view
export const getDatesBeforeMonthStart = (date: any) => {
    const showDates = [];

    for (let i = 0; i <= date.date(0).day(); i++) {
        showDates.push(date.date(0).subtract(i, 'day'));
    }

    return showDates.sort((a, b) => a.date() - b.date());
}

// Function to get the current month's dates for the calendar view
export const getAllDatesInMonth = (date: any) => {
    return Array.from(
        {
            length: date.daysInMonth()
        },
        (_, k) => date.date(k + 1)
    );
}

// Main function to setup the calendar with a month view
export const setUpCalendar = () => {
    const calendar = computed(() => {
        return {
            monthView: {
                date: (inputDate: string) => {
                    return getDatesBeforeMonthStart(inputDate).concat(getAllDatesInMonth(inputDate))
                }
            }
        }
    })

    return {
        calendar
    }
}

// Function for handling a directive with click events
export const toggleCalendarOnClick = (binding: any) => {
    const { instance } = binding;

    document.body.addEventListener('click', $event => {
        if (instance.$el.contains($event.target)) {
            return (instance.showCalendar = true);
        }

        return (instance.showCalendar = false)
    });
}
