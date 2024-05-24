import dayjs from 'dayjs'
import {Ref, ref} from "vue";

export default class picker{
    selectedBeginDate: Ref<dayjs.Dayjs | null>
    selectedEndDate: Ref<dayjs.Dayjs | null>
    isRange: boolean
    isDisplay: boolean

    constructor(date: string|null, selectedEndDate: string|null, isRange: boolean, isDisplay: boolean) {
        this.selectedBeginDate = ref((date)? dayjs(date) : null)
        this.selectedEndDate = ref(null)
        this.isRange = isRange
        this.isDisplay = isDisplay



        if(isRange) {
            this.selectedEndDate.value = (selectedEndDate)? dayjs(selectedEndDate) : null
        }
    }

    public selectDate(date: dayjs.Dayjs)
    {
        if(!this.isRange) {
            this.selectedBeginDate.value = date
            return
        }

        if(this.selectedBeginDate.value && this.selectedEndDate.value) {
            this.selectedBeginDate.value = date
            this.selectedEndDate.value = null
            return
        }

        if(!this.selectedBeginDate.value || date.diff(this.selectedBeginDate.value, 'day') < 0) {
            this.selectedBeginDate.value = date
            return
        }

        if(date.diff(this.selectedBeginDate.value, 'day') > 0) {
            this.selectedEndDate.value = date
        }
    }

    public allowClose(): boolean {

        if(!this.isDisplay)
        {
            if(this.isRange && this.selectedBeginDate.value && this.selectedEndDate.value)
            {
                return true
            }
        }

        return false
    }
}


