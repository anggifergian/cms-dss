import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({
    token: '',
    user: {},
  })

  const handleSetToken = (token) => setAuth({ ...Auth, token })
  const handleSetUser = (user) => setAuth({ ...Auth, user })

  return (
    <AuthContext.Provider value={{
      Auth,
      handleSetToken,
      handleSetUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)