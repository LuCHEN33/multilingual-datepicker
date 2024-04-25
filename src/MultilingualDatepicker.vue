<template>
  <div class="space-y-2 relative" v-toggle-calendar:aways>
      <slot
          :value="(multilingualDatepicker.selectedBeginDate.value)? multilingualDatepicker.selectedBeginDate.value.format(format) : null"
          :placeholder="$attrs.placeholder"
          :clear="clearDate"
      >
      <div class="relative flex w-full pl-4 pr-10 items-center justify-center py-3 w-96 h-10 rounded-md overflow-hidden text-base transition-colors bg-gray-50 border shadow-xl">
        <template v-if="multilingualDatepicker.selectedBeginDate.value && multilingualDatepicker.selectedEndDate.value">
            <span class="text-md text-gray-700 flex items-center flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M3 7h18M6 4v2M18 4v2M5 7V4a2 2 0 012-2h10a2 2 0 012 2v3H5zm14 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9h14z" />
                </svg>
                {{ multilingualDatepicker.selectedBeginDate.value.format(format) }}~{{ multilingualDatepicker.selectedEndDate.value.format(format) }}
            </span>
        </template>
        <template v-else>
            <span class="flex items-center flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M3 7h18M6 4v2M18 4v2M5 7V4a2 2 0 012-2h10a2 2 0 012 2v3H5zm14 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9h14z" />
                </svg>
                Select a date
            </span>
        </template>
    </div>
    

      </slot>

      <Transition enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  enter-active-class="transition ease-out duration-300"
                  leave-active-class="transition ease-in duration-200"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                  >

          <div v-if="showCalendar" class="multilingual-datepicker-calendar absolute bg-white rounded-[20px] border py-5 px-6 shadow-xl text-xs flex items-start space-x-3 z-[99] min-w-0">
              <button @click="calendarView.subtractMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                  <i class="fas fa-chevron-left"></i>
              </button>

              <div class="flex space-x-12 w-full justify-between">
                   <Calendar v-for="x in 2" :date="calendarView.date.value.add((x - 1), 'month')" />
              </div>
              <button @click="calendarView.addMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                <i class="fas fa-chevron-right"></i>
              </button>
          
              <button @click="toggleLanguageMenu" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                <i class="fas fa-globe"></i>
              </button>
            </div>
      </Transition>

  </div>
</template>

<script>
import { ref, computed, provide, watch } from 'vue'
import { toggleCalendarOnClick } from "./lib/calendar"

import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(localeData)
dayjs.extend(weekday)
dayjs.extend(isBetween)

import Calendar from './components/Calendar.vue'
import Years from "./components/Years.vue";
import Months from "./components/Months.vue";
import Dates from './components/Dates.vue'

import picker from './picker'

export default {
  name: 'MultilingualDatepicker',
  props: {
      date: String,
      endDate: String,
      format: {
          type: String,
          default: 'DD MMM YYYY'
      },
      isRange: Boolean,
      isDisplay: Boolean,
  },
  components: {
      Calendar,
      Years,
      Months,
      Dates
  },
  directives: {
    toggleCalendar: {
          mounted: (el, binding) => {
              toggleCalendarOnClick(binding)
          },
          updated: (el, binding) => {
              toggleCalendarOnClick(binding)
          }
      }
  },
  setup(props) {
      const showCalendar = ref(false)
      const multilingualDatepicker = new picker(props.date ?? null, props.endDate ?? null, true, (props.isDisplay === 'true'))

      const calendarView = computed(() => {
          const date = ref((props.date)? dayjs(props.date) : dayjs())
          const endDate = ref((props.endDate)? dayjs(props.endDate) : dayjs())

          const subtractMonth = () => {
              date.value = date.value.subtract(1, 'month')
          }

          const addMonth = () => {
              date.value = date.value.add(1, 'month')
          }

          watch(() => multilingualDatepicker.selectedBeginDate.value, (value, prevValue) => {
              date.value = value
          })

          watch(() => multilingualDatepicker.selectedEndDate.value, (value, prevValue) => {
            endDate.value = value
         })
          return {
              subtractMonth,
              addMonth,
              date
          }
      })

      const clearDate = () => {
          multilingualDatepicker.selectedBeginDate.value = null
          multilingualDatepicker.selectedEndDate.value = null
          showCalendar.value = false
      }

      provide('multilingualDatepicker', multilingualDatepicker)
      provide('showCalendar', showCalendar)
      provide('calendarView', calendarView)

      return {
          clearDate,
          multilingualDatepicker,
          showCalendar,
          calendarView,
          dayjs
      }
  }
}
</script>

<style>

@media (max-width: 640px){
  .multilingual-datepicker-calendar::before {
      --multilingual-datepicker: 0px;
      content: '';
      transform: translate(50%, -50%) rotate(-45deg);

      clip-path: polygon(
              calc(var(--multilingual-datepicker) * -1) calc(var(--multilingual-datepicker) * -1),
              calc(100% + var(--multilingual-datepicker)) calc(var(--multilingual-datepicker) * -1),
              calc(100% + var(--multilingual-datepicker))
              calc(100% + var(--multilingual-datepicker))
      );
  }
} 
</style>
