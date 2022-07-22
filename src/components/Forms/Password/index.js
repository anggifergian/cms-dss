import React, { useState } from 'react'

const Password = ({
  name,
  label,
  value,
  placeholder,
  onChange
}) => {
  const [type, setType] = useState('password')

  const handleShowPassword = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div>
      <label htmlFor="password" className="sr-only">{label}</label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <span className="absolute inset-y-0 inline-flex items-center right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleShowPassword}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Password