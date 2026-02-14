import { useState } from "react"
import { AddNewTransactionModal } from "./components/AddNewTransactionModal/AddNewTransactionModal"

export const App = () => {

  const [isAddNewTransactionModalOpened,  setIsAddNewTransactionModalOpened] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">Organizador Financeiro</h1>
          <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700" onClick={() => setIsAddNewTransactionModalOpened(true)}>
            Nova transação
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Saldo atual</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">R$ 2.450,00</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Receitas</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">R$ 3.200,00</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Despesas</p>
            <p className="mt-2 text-2xl font-semibold text-rose-600">R$ 750,00</p>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Últimas transações</h2>
            <button className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
              Ver todas
            </button>
          </div>

          <ul className="mt-4 divide-y rounded-lg border bg-white">
            <li className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">Salário</p>
                <p className="text-sm text-slate-500">14 de fev</p>
              </div>
              <span className="font-medium text-emerald-600">+ R$ 3.000,00</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">Mercado</p>
                <p className="text-sm text-slate-500">12 de fev</p>
              </div>
              <span className="font-medium text-rose-600">- R$ 250,00</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">Internet</p>
                <p className="text-sm text-slate-500">10 de fev</p>
              </div>
              <span className="font-medium text-rose-600">- R$ 120,00</span>
            </li>
          </ul>
        </section>
      </main>

      <AddNewTransactionModal
        title="teste"
        description="seila descricao"
        isOpen={isAddNewTransactionModalOpened}
        setIsOpen={setIsAddNewTransactionModalOpened}
        action={() => {}}
      />
    </div>
  )
}

export default App