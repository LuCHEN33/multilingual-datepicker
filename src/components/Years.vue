<template>
    <div class="flex-1">
        <div class="max-h-72 max-w-sm overflow-y-auto font-bold space-y-6 p-10 bg-gray-100 rounded-lg shadow">
            <button v-for="year in years" class="rounded-xl py-3 px-4 transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="selectYear(year)">{{ year }}</button>
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

        const years = computed(() => {
            const years = []
            const startYear = parseInt(dayjs().subtract(100, 'years').format('YYYY'))

            for (let i = 0; i <= 100; i++) {
                years.push(startYear + i)
            }

            return years.reverse()
        })

        const selectYear = (year) => {
            multilingualDatepicker.selectedBeginDate.value = (multilingualDatepicker.selectedBeginDate.value)? multilingualDatepicker.selectedBeginDate.value.year(year) : dayjs().year(year)
            multilingualDatepicker.selectedEndDate.value = null

            emit('changeView', 'dates')
        }

        return {
            years,
            selectYear,
            dayjs
        }
    }
}
</script>

<style scoped>

</style>
