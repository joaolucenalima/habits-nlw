import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDates } from "../utils/generate-dates-from-year-beginning"
import HabitDay from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDates()

const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type summary = Array<{
  id: string,
  date: string,
  amount: number,
  completed: number
}>

export function Table() {

  const [summary, setSummary] = useState<summary>([])

  useEffect(() => {
    api.get('/summary').then(response => {
      setSummary(response.data)
    })
  }, [])

  return (
    <div className="w-full flex">

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })


          return (
            <HabitDay
              key={String(date)}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => { //transforma os dias restantes em array para usar o .map
          return (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded opacity-40 cursor-not-allowed"
            />
          )
        })}
      </div>

    </div>
  )
}