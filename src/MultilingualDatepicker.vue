<template>
  <div class="space-y-3 relative pl-20 pr-20" v-toggle-calendar:aways>
      <slot
          :value="(multilingualDatepicker.selectedBeginDate.value)? multilingualDatepicker.selectedBeginDate.value.format(format) : null"
          :placeholder="$attrs.placeholder"
          :clear="clearDate"
      >
      <div class="flex w-1/3 rounded-md text-basetext-xl font-semibold ">
        Date Range
      </div>
      <div class="relative multilingual-datepicker-calendar flex items-center justify-center py-3 rounded-md overflow-hidden text-base sm:text-center sm:text-sm transition-colors bg-gray-50 font-semibold shadow-xl">
        <template v-if="multilingualDatepicker.selectedBeginDate.value && multilingualDatepicker.selectedEndDate.value">
            <span class="text-md text-gray-700 flex items-center flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M3 7h18M6 4v2M18 4v2M5 7V4a2 2 0 012-2h10a2 2 0 012 2v3H5zm14 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9h14z" />
                </svg>
                {{ multilingualDatepicker.selectedBeginDate.value.format(format) }} ~ {{ multilingualDatepicker.selectedEndDate.value.format(format) }}
            </span>
        </template>
        <template v-else>
            <span class="flex items-center flex-1 text-base text-gray-400">
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

          <div v-if="showCalendar" class="multilingual-datepicker-calendar pl-4 pr-10 bg-white rounded-[10px] py-5 px-6 shadow-xl text-xs flex items-start space-x-3 z-[99] min-w-0">
              <button @click="calendarView.subtractMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                  <i class="fas fa-chevron-left fa-lg"></i>
              </button>

              <div class="flex space-x-12 w-full justify-between">
                   <Calendar v-for="x in 1" :date="calendarView.date.value.add((x - 1), 'month')" />
              </div>
              <button @click="calendarView.addMonth()" class="w-10 h-10 hover:bg-gray-100 rounded-full">
                <i class="fas fa-chevron-right fa-lg"></i>
              </button>
        
                <select v-model="currentLocale" @change="changeLocale(currentLocale)">
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="es">Español</option>
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
import 'dayjs/locale/de';
import 'dayjs/locale/es'; 

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

      const currentLocale = ref('en'); // Default locale

      // Watch for changes in the locale and update Day.js config
      watch(currentLocale, (newLocale) => {
          dayjs.locale(newLocale);
      });

       // Method to change the locale
       const changeLocale = (locale) => {
           currentLocale.value = locale;
       };

  

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

<style>

@media (max-width: 640px){
    /* Base styles for the .attic-datepicker-calendar's pseudo-element */
.attic-datepicker-calendar::before {
    --attic-datepicker-calendar: 0px;
    content: '';
    position: absolute;
    top: 0;
    width: 4rem;  /* Adjust size as needed for mobile */
    height: 4rem; /* Adjust size as needed for mobile */
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.1);
    transform: translate(50%, -50%) rotate(-45deg);
    clip-path: polygon(
        calc(var(--attic-datepicker-calendar) * -1) calc(var(--attic-datepicker-calendar) * -1),
        calc(100% + var(--attic-datepicker-calendar)) calc(var(--attic-datepicker-calendar) * -1),
        calc(100% + var(--attic-datepicker-calendar)) calc(100% + var(--attic-datepicker-calendar))
    );
}

.attic-datepicker-calendar.place-left::before {
    left: 2rem;  /* Closer to the edge on smaller screens */
}

.attic-datepicker-calendar.place-right::before {
    right: 2rem; /* Closer to the edge on smaller screens */
}

}


/* Adjustments for tablets */
@media (min-width: 768px) {
    .attic-datepicker-calendar::before {
        content: '';
        position: absolute;
        top: 0;
        width: 6rem;  /* Larger size for tablets */
        height: 6rem; /* Larger size for tablets */
        background-color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border: 1px solid rgba(0,0,0,0.1);
        transform: translate(50%, -50%) rotate(-45deg);
        clip-path: polygon(
            calc(var(--attic-datepicker-calendar) * -1) calc(var(--attic-datepicker-calendar) * -1),
            calc(100% + var(--attic-datepicker-calendar)) calc(var(--attic-datepicker-calendar) * -1),
            calc(100% + var(--attic-datepicker-calendar)) calc(100% + var(--attic-datepicker-calendar))
        );
    }
    .attic-datepicker-calendar.place-left::before {
        left: 4rem;  /* More margin for larger screens */
    }
    .attic-datepicker-calendar.place-right::before {
        right: 4rem; /* More margin for larger screens */
    }
}

/* Adjustments for desktops */
@media (min-width: 1024px) {
    
    .attic-datepicker-calendar::before {
        content: '';
        position: absolute;
        top: 0;
        width: 8rem;  /* Even larger size for desktops */
        height: 8rem; /* Even larger size for desktops */
        background-color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border: 1px solid rgba(0,0,0,0.1);
        transform: translate(50%, -50%) rotate(-45deg);
        clip-path: polygon(
            calc(var(--attic-datepicker-calendar) * -1) calc(var(--attic-datepicker-calendar) * -1),
            calc(100% + var(--attic-datepicker-calendar)) calc(var(--attic-datepicker-calendar) * -1),
            calc(100% + var(--attic-datepicker-calendar)) calc(100% + var(--attic-datepicker-calendar))
        );
    }
    .attic-datepicker-calendar.place-left::before {
        left: 8rem;  /* Further from edge on larger screens */
    }
    .attic-datepicker-calendar.place-right::before {
        right: 8rem; /* Further from edge on larger screens */
    }
}



</style>
