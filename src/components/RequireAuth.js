import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkTokenAPI } from '../apis'
const RequireAuth = ({ element, requiredRole }) => {
  const token = useSelector(state => state.user.token.accessToken)
  const role = localStorage.getItem('user_role')
  const location = useLocation()

  // Kiểm tra token và vai trò của người dùng
  if (token) {
    // Nếu không cần yêu cầu vai trò hoặc vai trò phù hợp
    if (!requiredRole || role === requiredRole) {
      return <>{element}</>;
    } else {
      // Nếu có yêu cầu vai trò nhưng vai trò không phù hợp, chuyển hướng về trang 403 hoặc trang khác
      return <>Bạn không có quyền truy cập trang này</>
    }
  } else {
    // Nếu không có token, chuyển hướng về trang đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // return (
  //   token ?
  //     <Outlet /> :
  //     <Navigate to={"login"} state={{ from: location }} replace />

  // )
}

export default RequireAuth