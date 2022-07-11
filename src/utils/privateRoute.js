import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} element={props => (
    isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Navigate to='/login' replace />
    )
  )} />
)

export default PrivateRoute