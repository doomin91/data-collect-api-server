import schedule from "node-schedule"

export default class Scheduler {
    constructor(controllers: any) {
        this.initailize(controllers)
    }

    initailize(controllers: any){
        console.log(controllers)
        const j = schedule.scheduleJob('* */10 * * * *', () => {
            console.log("CSV 수집")
        })
    }
}