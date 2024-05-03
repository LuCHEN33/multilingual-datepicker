<template>
    <div class="flex flex-1 justify-center items-center px-4 sm:px-6 lg:px-6">
        <div class="space-y-5 w-full max-w-4xl">
            <h2 class="text-center font-bold text-lg sm:text-xl lg:text-xl">
                <span class="hover:bg-blue-200 hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out" @click="$emit('changeView', 'months')">{{ date.format('MMMM')}}</span>
                <span class="hover:bg-blue-200 hover:text-white p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out" @click="$emit('changeView', 'years')">{{ date.format('YYYY') }}</span>
            </h2>

            <div class="grid grid-cols-7 gap-1">
                <div v-for="weekDay in dayjs.weekdaysMin()" class="font-semibold text-base sm:text-lg lg:text-lg text-gray-500 text-center">{{ weekDay }}</div>

                <div v-for="day in monthDays" class="flex justify-center items-center">
                    <div v-if="isSameMonth(day)" v-bind:class="[
                             'transition ease-in-out duration-200',
                             { 'bg-blue-500 text-white': isSelectedDay(day) },
                             { 'ring-2 ring-blue-500 ring-opacity-50': isToday(day)},
                             { 'text-wirte-500 font-bold rounded-l-[10px] rounded-r-[10px]': isToday(day) },
                             { 'rounded-l-[10px]': (multilingualDatepicker.isRange && multilingualDatepicker.selectedBeginDate.value && multilingualDatepicker.selectedBeginDate.value.isSame(day)) },
                             { 'rounded-r-[10px]': (multilingualDatepicker.isRange && multilingualDatepicker.selectedEndDate.value && multilingualDatepicker.selectedEndDate.value.isSame(day)) },
                             { 'bg-blue-50 text-blue-500': isInBetweenRange(day) },
                         ]">
                        <div class="hover:bg-blue-200 hover:border-blue-500 hover:rounded-[10px] mx-auto cursor-pointer flex justify-center items-center font-semibold text-sm sm:text-base lg:text-base w-10 sm:w-12 lg:w-12 h-10 sm:h-12 lg:h-12 transition-colors duration-200 ease-in-out" @click="selectDate(day)">
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
      
        // Current date to be used in comparisons
        const currentDate = ref(dayjs());

        const isToday = (day) => {
            return day.isSame(currentDate.value, 'day');
        };
        
        const updateLocaleDate = () => {
           date.value = dayjs(date.value); // Reconstruct the dayjs object to apply new locale
       };

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
            selectDate,
            isToday,
            updateLocaleDate
        }
    }
}
</script>
