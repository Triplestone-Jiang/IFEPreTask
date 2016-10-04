export default class Queue{
    constructor() {
        this.list = []
        this.timeId = null
    }

    add(fn, time) {
        this.list.push({fn, time})
        return this
    }

    execute() {
        let action = this.list.shift()
        if (this.timeId || !action) {
            return
        }
        let {fn, time}=action
        this.timeId = setTimeout(()=> {
            this.timeId = null
            fn()
            this.execute()
        }, time)
        return this
    }
}