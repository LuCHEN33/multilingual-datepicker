<template>
    <div class="flex-1">
        <div class="grid grid-cols-2 gap-4 font-bold text-sm w-full p-10">
            <button v-for="month in 12" class="rounded-xl py-3 px-4 transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="selectMonth((month - 1))">{{ dayjs().month((month - 1)).format('MMMM') }}</button>
        </div>
    </div>
</template>

<script>
import { inject } from "vue"
import dayjs from 'dayjs'

export default {
    name: "Months",
    setup(props, { emit }) {
        const multilingualDatepicker = inject('multilingualDatepicker')

        const selectMonth = (month) => {
            multilingualDatepicker.selectedBeginDate.value = (multilingualDatepicker.selectedBeginDate.value)? multilingualDatepicker.selectedBeginDate.value.month(month) : dayjs().month(month)
            multilingualDatepicker.selectedEndDate.value = null

            emit('changeView', 'dates')
        }

        return {
            selectMonth,
            dayjs
        }
    }
}
</script>
