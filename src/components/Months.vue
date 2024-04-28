<template>
    <div class="flex-1">
        <div class="max-h-72 max-w-sm overflow-y-auto md:overflow-scroll space-y-5 font-bold text-sm">
            <button v-for="month in 12" class="w-full rounded-xl py-2 px-3 transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="selectMonth((month - 1))">{{ dayjs().month((month - 1)).format('MMMM') }}</button>
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
