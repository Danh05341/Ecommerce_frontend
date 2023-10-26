import Home from "../pages/Home"
import Menu from "../pages/Menu"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import NewProduct from "../pages/NewProduct"
import Signup from "../pages/Signup"



const publicRoutes = [
    { path: '/', page: Home},
    { path: '/menu', page: Menu},
    { path: '/about', page: About},
    { path: '/contact', page: Contact},
    { path: '/login', page: Login},
    { path: '/newproduct', page: NewProduct},
    { path: '/signup', page: Signup},

]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }