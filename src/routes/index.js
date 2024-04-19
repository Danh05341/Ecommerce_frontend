import Home from "../pages/Home"
import News from "../pages/News"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import NewProduct from "../pages/NewProduct"
import Signup from "../pages/Signup"
import ProductList from "../pages/ProductList"
import ProductDetail from "../pages/ProductDetail"
import Admin from "../pages/Admin"


const publicRoutes = [
    { path: '/', page: Home},
    { path: '/lien-he', page: Contact},
    { path: '/gioi-thieu', page: About},
    { path: '/tin-tuc', page: News},
    { path: '/product/:id', page: ProductList},
    { path: '/login', page: Login},
    { path: '/newproduct', page: NewProduct},
    { path: '/signup', page: Signup},
    { path: '/search', page: ProductList},
    { path: '/:slug', page: ProductDetail},

]

const privateRoutes = [
    { path: '/admin/dashboard', page: Admin},
]

export { publicRoutes, privateRoutes }