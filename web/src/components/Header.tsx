import Logo from '../assets/logo.svg'
import { Plus, X } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import { NewHabitForm } from './NewHabitForm';

export function Header() {

  return (
    <header className='flex justify-between items-center w-full max-w-4xl mx-auto'>
      <div>
        <img src={Logo} alt="Logo" />
        <h1 className='text-5xl font-bold pt-3'>Habits</h1>
      </div>

      <Dialog.Root>

        <Dialog.Trigger
          type="button"
          className='flex items-center px-5 h-12 gap-2 border border-cyan-500 hover:border-cyan-700 rounded text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-background'
        >
          <Plus className='text-cyan-500' size={20} />
          Novo Hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>

            <Dialog.Close className='absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-zinc-900'>
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>

            <Dialog.Title className='text-4xl leading-tight font-extrabold transition-colors'>
              Criar Hábito
            </Dialog.Title>

            <NewHabitForm />

          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>

    </header>
  )
}