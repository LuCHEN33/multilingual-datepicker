<template>
  <div class="space-y-3 relative pl-5 pr-5 sm:pl-10 sm:pr-10 md:pl-20 md:pr-20" v-toggle-calendar:aways>
      <slot
          :value="(multilingualDatepicker.selectedBeginDate.value)? multilingualDatepicker.selectedBeginDate.value.format(format) : null"
          :placeholder="$attrs.placeholder"
          :clear="clearDate"
      >
      <div class="flex mt-4 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 rounded-md text-sm md:text-base lg:text-xl font-semibold">
        Date Range
      </div>
      <div class="relative multilingual-datepicker-calendar flex items-center justify-center py-3 rounded-md overflow-hidden text-sm md:text-base transition-colors bg-gray-50 font-semibold shadow-xl md:w-2/5 lg:w-2/5 xl:w-2/5 ">
        <template v-if="multilingualDatepicker.selectedBeginDate.value && multilingualDatepicker.selectedEndDate.value">
            <span class="text-md text-gray-700 flex items-center flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M3 7h18M6 4v2M18 4v2M5 7V4a2 2 0 012-2h10a2 2 0 012 2v3H5zm14 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9h14z" />
                </svg>
                {{ multilingualDatepicker.selectedBeginDate.value.format(format) }} ~ {{ multilingualDatepicker.selectedEndDate.value.format(format) }}
            </span>
        </template>
        <template v-else>
            <span class="flex items-center flex-1 text-sm md:text-base text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M3 7h18M6 4v2M18 4v2M5 7V4a2 2 0 012-2h10a2 2 0 012 2v3H5zm14 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9h14z" />
                </svg>
                DD MM YYYY
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

          <div v-if="showCalendar" class="multilingual-datepicker-calendar pl-4 pr-10 bg-white rounded-[10px] py-5 px-6 shadow-xl text-xs flex items-start space-x-3 z-[99] min-w-0 md:w-2/5 lg:w-2/5 xl:w-2/5">
              <button @click="calendarView.subtractMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                  <i class="fas fa-chevron-left fa-lg"></i>
              </button>

              <div class="flex space-x-12 w-full justify-between">
                   <Calendar v-for="x in 1" :date="calendarView.date.value.add((x - 1), 'month')" />
              </div>
              <button @click="calendarView.addMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                <i class="fas fa-chevron-right fa-lg"></i>
              </button>
        
                <select v-model="currentLocale" @change="changeLocale(currentLocale)"
                class="w-18 h-10 font-semibold text-base sm:text-base text-sm hover:bg-gray-100 rounded-[10px]">
                    <option class="font-semibold text-base text-xs" value="en">English</option>
                    <option class="font-semibold text-base text-xs" value="zh">中文</option>
                    <option class="font-semibold text-base text-xs" value="hi">हिन्दी</option>
                    <option class="font-semibold text-base text-xs" value="es">Español</option>
                    <option class="font-semibold text-base text-xs" value="ar">العربية </option>
                    <option class="font-semibold text-base text-xs" value="fr">Français</option>
                    <option class="font-semibold text-base text-xs" value="bn">বাংলা</option>
                    <option class="font-semibold text-base text-xs" value="ru">Русский</option>
                    <option class="font-semibold text-base text-xs" value="pt">Português</option>
                    <option class="font-semibold text-base text-xs" value="sw">Kiswahili</option>
                    <option class="font-semibold text-base text-xs" value="id">Indonesia</option>
                    <option class="font-semibold text-base text-xs" value="ur">اردو</option>
                    <option class="font-semibold text-base text-xs" value="ja">日本語</option>
                    <option class="font-semibold text-base text-xs" value="pa-Arab">Punjabi</option>
                    <option class="font-semibold text-base text-xs" value="de">Deutsch</option>
                    <option class="font-semibold text-base text-xs" value="fa">فارسی</option>
                    <option class="font-semibold text-base text-xs" value="vi">Tiếng Việt</option>
                    <option class="font-semibold text-base text-xs" value="it">Italiano</option>
                    <option class="font-semibold text-base text-xs" value="tr">Türkçe</option>
                    <option class="font-semibold text-base text-xs" value="mr">मराठी</option>
                  <!-- Add more options as needed -->
                </select>
                
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
import 'dayjs/locale/zh'; 
import 'dayjs/locale/hi'; 
import 'dayjs/locale/es'; 
import 'dayjs/locale/ar'; 
import 'dayjs/locale/fr'; 
import 'dayjs/locale/bn';
import 'dayjs/locale/ru';
import 'dayjs/locale/pt';
import 'dayjs/locale/sw';
import 'dayjs/locale/id';
import 'dayjs/locale/ur';
import 'dayjs/locale/ja';
import 'dayjs/locale/de'; 
import 'dayjs/locale/fa'; 
import 'dayjs/locale/vi'; 
import 'dayjs/locale/it'; 
import 'dayjs/locale/tr';
import 'dayjs/locale/mr'; 
import 'dayjs/locale/ta'; 
import 'dayjs/locale/ko';  

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
              date,
              endDate
          }
      })

      const clearDate = () => {
          multilingualDatepicker.selectedBeginDate.value = null
          multilingualDatepicker.selectedEndDate.value = null
          showCalendar.value = false
      }

      const currentLocale = ref('en'); // Default locale

      // Watch for changes in the locale and update Day.js config
      watch(currentLocale, (newLocale) => {
          dayjs.locale(newLocale);
      });

       // Method to change the locale
       const changeLocale = (locale) => {
           currentLocale.value = locale;
       }
      

      provide('multilingualDatepicker', multilingualDatepicker)
      provide('showCalendar', showCalendar)
      provide('calendarView', calendarView)
      provide('currentLocale', currentLocale);

      return {
          clearDate,
          multilingualDatepicker,
          showCalendar,
          calendarView,
          dayjs,
          changeLocale, 
          currentLocale,
          
      }
  }
}
</script>
