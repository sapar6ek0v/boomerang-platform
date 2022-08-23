import React, { FC } from 'react'

interface IProps {
  title: string
}

const InputForm: FC<IProps> = ({ title }) => {
  return (
    <>
      <input
        type="text"
        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
        {title}
      </label>
    </>
  )
}

export default InputForm
