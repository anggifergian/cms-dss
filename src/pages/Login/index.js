import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Password } from '../../components'
import { requestLogin } from '../../redux/auth/action'

function Login() {
  const dispatch = useDispatch()
  const Auth = useSelector(state => state.Auth)

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
      <div className="mt-20 lg:mt-0 w-full px-4 py-12 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl mb-0">Welcome!</h1>

          <p className="mt-2 text-gray-500">
            DSS Content Management System
          </p>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
          {Auth.hasError && (
            <div
              className="p-4 border rounded text-amber-700 bg-amber-50 border-amber-900/10"
              role="alert"
            >
              <strong className="text-sm font-medium">{Auth.error}</strong>
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pr-12 text-sm border border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter username/email"
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

          <Password
            name='password'
            label='Password'
            placeholder='Enter password'
            value={query.password}
            onChange={e => setQuery({ ...query, password: e.target.value })}
          />

          <div className="flex items-center justify-start">
            <button
              type="button"
              className="w-full md:w-28 inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
              onClick={handleLogin}
            >
              {Auth.isLoading ? 'Signing...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login