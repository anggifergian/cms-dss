import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { requestLogin } from '../../redux/auth/action'

function Login() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState({
    username: '',
    password: ''
  })

  const onLogin = params => dispatch(requestLogin(params))

  const handleLogin = () => {
    const data = {
      user_name: query.username,
      user_password: query.password
    }

    onLogin(data)
  }

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="mt-20 lg:mt-0 w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl mb-0">Welcome!</h1>

          <p className="mt-2 text-gray-500">
            DSS Content Management System
          </p>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
                value={query.username}
                onChange={e => setQuery({ ...query, username: e.target.value })}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
                value={query.password}
                onChange={e => setQuery({ ...query, password: e.target.value })}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

          <div className="flex items-center justify-start">
            <button
              type="button"
              className="w-full md:w-28 inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div className="relative w-full h-64 hidden lg:block lg:w-1/2 lg:h-full">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="https://www.hyperui.dev/photos/team-1.jpeg"
          alt=""
        />
      </div>
    </section>
  )
}

export default Login