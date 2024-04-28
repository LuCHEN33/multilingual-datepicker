<template>
    <div class="flex-1">
        <div class="max-h-72 max-w-sm overflow-y-auto md:overflow-scroll space-y-5 font-bold text-sm">
            <button v-for="year in years" class="w-full rounded-xl py-3 px-4 transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="selectYear(year)">{{ year }}</button>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue'
import dayjs from "dayjs";

export default {
    name: "Years",
    setup(props, { emit }) {
        const multilingualDatepicker = inject('multilingualDatepicker')

        // Compute the years array to show current year +- 5 years
        const years = computed(() => {
            const currentYear = dayjs().year();
            const years = [];

            for (let i = currentYear - 5; i <= currentYear + 6; i++) {
                years.push(i);
            }

           
            return years.reverse();
        });

        // Function to handle year selection
        const selectYear = (year) => {
            multilingualDatepicker.selectedBeginDate.value = multilingualDatepicker.selectedBeginDate.value ? 
                multilingualDatepicker.selectedBeginDate.value.year(year) : 
                dayjs().year(year);

            multilingualDatepicker.selectedEndDate.value = null;

            // Emit an event to potentially change view
            emit('changeView', 'dates');
        }

        return {
            years,
            selectYear,
            dayjs
        }
    }
}
</script>
