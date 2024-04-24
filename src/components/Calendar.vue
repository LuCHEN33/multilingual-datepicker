<template>
    <div>
        <Years v-show="displayView === 'years'" @changeView="changeView" />
        <Months v-show="displayView === 'months'" @changeView="changeView" />
        <Dates v-show="displayView === 'dates'" @changeView="changeView" />
    </div>
</template>

<script>
import { ref, watch, provide, computed } from "vue";
import { setUpCalendar } from "../lib/calendar"

import Years from "./Years.vue"
import Months from "./Months.vue"
import Dates from "./Dates.vue"

export default {
    name: "Calendar",
    props:{
        date: Object
    },
    components: {
        Years,
        Months,
        Dates
    },
    setup(props) {
        const { calendar } = setUpCalendar()

        const displayView = ref('dates')
        const monthDays = computed(() => calendar.value.monthView.date(props.date))
        const date = ref(props.date)

        provide('date', date)
        provide('monthDays', monthDays)

        const changeView = (view) => {
            displayView.value = view
        }

        watch(() => props.date, (value, prevValue) => {
            date.value = value
        })

        return {
            displayView,
            changeView
        }
    }
}
</script>
