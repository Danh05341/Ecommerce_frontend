import Home from "../pages/Home"
import Menu from "../pages/Menu"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import NewProduct from "../pages/NewProduct"
import Signup from "../pages/Signup"
import ProductList from "../pages/ProductList"
import ProductDetail from "../pages/ProductDetail"


const publicRoutes = [
    { path: '/', page: Home},
    { path: '/menu', page: Menu},
    { path: '/about', page: About},
    { path: '/contact', page: Contact},
    { path: '/login', page: Login},
    { path: '/newproduct', page: NewProduct},
    { path: '/signup', page: Signup},
    { path: '/search', page: ProductList},
    { path: '/:slug', page: ProductDetail},

]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }