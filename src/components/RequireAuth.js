import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkTokenAPI } from '../apis'
const RequireAuth = (allowRole) => {
  const token = useSelector(state => state.user.token.accessToken)
  const role = localStorage.getItem('role')
  const location = useLocation()

  return (
    token ?
      <Outlet /> :
      <Navigate to={"login"} state={{ from: location }} replace />

  )
}

export default RequireAuth