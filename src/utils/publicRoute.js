import { Navigate, Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} element={props => (
    isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Navigate to='/dashboard' replace />
    )
  )} />
)

export default PublicRoute