<template>
  <div class="space-y-2 relative" v-dir="">
      <slot
          :value="(multilingualDatepicker.selectedBeginDate.value)? multilingualDatepicker.selectedBeginDate.value.format(format) : null"
          :placeholder="$attrs.placeholder"
          :clear="clearDate"
      >
          <div
              class="relative w-full pl-4 pr-10 py-3 rounded-md overflow-hidden text-base transition-colors bg-gray-50 border focus-within:ring focus-within:outline-none dark:focus-within:ring-opacity-25"
               v-bind="$attrs">
              <span v-if="multilingualDatepicker.selectedBeginDate.value">{{ multilingualDatepicker.selectedBeginDate.value.format(format) }}</span>
          </div>
      </slot>

      <Transition enter-from-class="opacity-0 translate-y-3"
                  enter-to-class="opacity-100 translate-y-0"
                  enter-active-class="transform transition ease-out duration-200"
                  leave-active-class="transform transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-3">

          <div v-if="showCalendar" class="multilingual-datepicker-calendar absolute bg-white rounded-[20px] border py-5 px-6 shadow-xl flex items-start space-x-3 z-[99] min-w-0">
              <button @click="calendarView.subtractMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                  <i class="fas fa-chevron-left"></i>
              </button>

              <div class="flex space-x-12 w-full">
                  <Calendar v-for="x in parseInt(showXMonths ?? 1)" :date="calendarView.date.value.add((x - 1), 'month')" />
              </div>

              <button @click="calendarView.addMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                  <i class="fas fa-chevron-right"></i>
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
      format: {
          type: String,
          default: 'DD MMM YYYY'
      },
      isRange: Boolean,
      autoApply: Boolean
  },
  components: {
      Calendar,
      Years,
      Months,
      Dates
  },
  directives: {
      dir: {
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
      const multilingualDatepicker = new picker('2024-01-01', null, (props.isRange === 'true'), (props.isDisplay === 'true'))

      const calendarView = computed(() => {
          const date = ref((props.date)? dayjs(props.date) : dayjs())

          const subtractMonth = () => {
              date.value = date.value.subtract(1, 'month')
          }

          const addMonth = () => {
              date.value = date.value.add(1, 'month')
          }

          watch(() => multilingualDatepicker.selectedBeginDate.value, (value, prevValue) => {
              date.value = value
          })

          return {
              subtractMonth,
              addMonth,
              date
          }
      })

      const clearDate = () => {
          multilingualDatepicker.selectedBeginDate.value = null
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
  .multilingual-datepicker-calendar::before {
      --multilingual-datepicker: 0px;
      content: '';
      @apply absolute top-0 w-4 h-4 bg-white shadow border border-black/[.1];
      transform: translate(50%, -50%) rotate(-45deg);

      clip-path: polygon(
              calc(var(--multilingual-datepicker) * -1) calc(var(--multilingual-datepicker) * -1),
              calc(100% + var(--multilingual-datepicker)) calc(var(--multilingual-datepicker) * -1),
              calc(100% + var(--multilingual-datepicker))
              calc(100% + var(--multilingual-datepicker))
      );
  }
</style>
