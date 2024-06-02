import Home from "../pages/Home"
import News from "../pages/News"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import NewProduct from "../pages/NewProduct"
import Signup from "../pages/Signup"
import ProductList from "../pages/ProductList"
import ProductDetail from "../pages/ProductDetail"
import Cart from "../pages/Cart/Cart"
import Checkout from "../pages/Checkout"

import Dashboard from "../pages/Admin/Dashboard/Dashboard"
import AdminLayout from "../components/Layouts/AdminLayout"
import Orders from "../pages/Admin/Orders/Orders"
import Products from "../pages/Admin/Products/Products"
import ProductDetails from "../pages/Admin/Products/ProductDetails"


const publicRoutes = [
    { path: '/', page: Home},
    { path: '/lien-he', page: Contact},
    { path: '/gioi-thieu', page: About},
    { path: '/tin-tuc', page: News},
    { path: '/product/:name', page: ProductList},
    { path: '/login', page: Login},
    { path: '/newproduct', page: NewProduct},
    { path: '/signup', page: Signup},
    { path: '/search', page: ProductList},
    { path: '/:slug', page: ProductDetail},
    { path: '/cart', page: Cart},
    { path: '/checkout', page: Checkout, layout: null},
]

const privateRoutes = [
    { path: '/admin/dashboard', page: Dashboard, layout: AdminLayout},
    { path: '/admin/orders', page: Orders, layout: AdminLayout},
    { path: '/admin/products', page: Products, layout: AdminLayout},
    { path: '/admin/products/:id', page: ProductDetails, layout: AdminLayout},
    // { path: '/admin/orders', page: Orders},
    // { path: '/admin/all-products', page: ProductsAll},
    // { path: '/admin/add-product', page: AddProduct},
    // { path: '/admin/product/:id', page: SingleProduct},
    // { path: '/admin/customers', page: Customers},
    // { path: '/admin/chats', page: Chats},
    // { path: '/admin/manage-profile', page: Profile},
    // { path: '/admin/settings', page: Settings},
    // { path: '/admin/404', page: Page404},
    // { path: '/admin/blank', page: Blank},
]

export { publicRoutes, privateRoutes }