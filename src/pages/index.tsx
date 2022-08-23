import type { NextPage } from 'next'
import InputForm from '../components/InputForm'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-start bg-white">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium">Доставка</h1>

        <form className="mt-10">
          <input type="hidden" />
          <div className="relative z-0 mt-8 mb-8">
            <InputForm title="Курьер" />
          </div>
          <div className="relative z-0 mt-8 mb-8">
            <InputForm title="Ресторан" />
          </div>
          <div className="relative z-0 mt-8 mb-8">
            <InputForm title="Филиал" />
          </div>
          <div className="relative z-0 mt-8 mb-8">
            <textarea
              name="message"
              rows={5}
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            ></textarea>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
              Сообщение
            </label>
          </div>
          <button
            type="submit"
            className="mt-5 rounded-md bg-black px-10 py-2 text-white"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
