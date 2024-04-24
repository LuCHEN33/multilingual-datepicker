<template>
    <div class="flex-1 flex justify-center items-center space-x-16">
        <div class="space-y-5">
            <h2 class="text-center font-bold text-xl">
                <span class="hover:bg-blue-500 hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out" @click="$emit('changeView', 'months')">{{ date.format('MMMM') }}</span>
                <span class="hover:bg-blue-500 hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out" @click="$emit('changeView', 'years')">{{ date.format('YYYY') }}</span>
            </h2>

            <div class="grid grid-cols-7 gap-1">
                <div v-for="weekDay in dayjs.weekdaysMin()" class="font-semibold text-sm text-gray-500 text-center">{{ weekDay }}</div>

                <div v-for="day in monthDays" class="flex justify-center items-center">
                    <div v-if="isSameMonth(day)" v-bind:class="[
                             'transition ease-in-out duration-200',
                             { 'bg-blue-500 text-white': isSelectedDay(day) },
                             { 'rounded-full': (!multilingualDatepicker.isRange) },
                             { 'rounded-l-full': (multilingualDatepicker.isRange && multilingualDatepicker.selectedBeginDate.value && multilingualDatepicker.selectedBeginDate.value.isSame(day)) },
                             { 'rounded-r-full': (multilingualDatepicker.isRange && multilingualDatepicker.selectedEndDate.value && multilingualDatepicker.selectedEndDate.value.isSame(day)) },
                             { 'bg-gray-100': isInBetweenRange(day) }
                         ]">
                        <div class="hover:bg-blue-200 hover:border-blue-500 hover:rounded-full mx-auto cursor-pointer flex justify-center items-center font-bold text-sm w-12 h-12 transition-colors duration-200 ease-in-out" @click="selectDate(day)">
                            <span>{{ day.format('DD') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import dayjs from 'dayjs'
import {ref, reactive, inject, provide, nextTick} from "vue";

export default {
    name: "Dates",
    setup(props, { emit }) {
        const calendarView = inject('calendarView')
        const multilingualDatepicker = inject('multilingualDatepicker')
        const showCalendar = inject('showCalendar')
        const monthDays = inject('monthDays')
        const date = inject('date')

        const isSameMonth = (day) => {
            return day.isSame(date.value.format('YYYY-MM'), 'month')
        }

        const isSelectedDay = (day) => {
            return (multilingualDatepicker.selectedBeginDate.value && multilingualDatepicker.selectedBeginDate.value.isSame(day)) ||
                (multilingualDatepicker.selectedEndDate.value && multilingualDatepicker.selectedEndDate.value.isSame(day))
        }

        const isInBetweenRange = (day) => {
            return multilingualDatepicker.isRange &&
                (multilingualDatepicker.selectedBeginDate.value && multilingualDatepicker.selectedEndDate.value) &&
                day.isBetween(multilingualDatepicker.selectedBeginDate.value, multilingualDatepicker.selectedEndDate.value)
        }

        const selectDate = (day) => {
            multilingualDatepicker.selectDate(day)
            showCalendar.value = !multilingualDatepicker.allowClose()
        }

        return {
            multilingualDatepicker,
            calendarView,
            isSameMonth,
            isInBetweenRange,
            isSelectedDay,
            dayjs,
            monthDays,
            date,
            selectDate
        }
    }
}
</script>
