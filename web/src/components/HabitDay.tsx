import { useState } from 'react';
import clsx from 'clsx'
import dayjs from 'dayjs';
import * as Popover from '@radix-ui/react-popover';

import { ProgressBar } from './ProgressBar';
import { HabitList } from './HabitList';

type HabitDayprops = {
  date: Date,
  defaultCompleted?: number,
  amount?: number
}

export default function HabitDay({ date, defaultCompleted = 0, amount = 0 }: HabitDayprops) {

  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercent = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChanges(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-background', {
          'bg-cyan-500 border-cyan-300': completedPercent >= 80,
          'bg-cyan-600 border-cyan-400': completedPercent >= 60 && completedPercent < 80,
          'bg-cyan-700 border-cyan-500': completedPercent >= 40 && completedPercent < 60,
          'bg-cyan-800 border-cyan-600': completedPercent >= 20 && completedPercent < 40,
          'bg-cyan-900 border-cyan-700': completedPercent > 0 && completedPercent < 20,
          'bg-zinc-900 border-zinc-800': completedPercent === 0
        })} />

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

          <ProgressBar progress={completedPercent} />

          <HabitList date={date} onCompletedChanges={handleCompletedChanges} />

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}