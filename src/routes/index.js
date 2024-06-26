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
import Payments from "../pages/Payments"
import OrderList from "../pages/Order/OrderList"
import OrderDetail from "../pages/Order/OrderDetail"
import OrderStatus from "../pages/Order/OrderStatus"

import Dashboard from "../pages/Admin/Dashboard/Dashboard"
import AdminLayout from "../components/Layouts/AdminLayout"
import Orders from "../pages/Admin/Orders/Orders"
import Products from "../pages/Admin/Products/Products"
import ProductDetails from "../pages/Admin/Products/ProductDetails"
import AddProductVariant from "../pages/Admin/Products/AddProductVariant"
import OrderDetailsAdmin from "../pages/Admin/Orders/OrderDetailsAdmin"
import CreateNewProduct from "../pages/Admin/Products/CreateNewProduct"
import Category from "../pages/Admin/Category/Category"
import CategoryForm from "../pages/Admin/Category/CategoryForm"
import DiscountList from "../pages/Admin/Discount/DiscountList"
import CreateDiscount from "../pages/Admin/Discount/CreateDiscount"
import EditDiscount from "../pages/Admin/Discount/EditDiscount"
import CustomerList from "../pages/Admin/Customer/CustomerList"
import CreateCustomer from "../pages/Admin/Customer/CreateCustomer"
import EditCustomer from "../pages/Admin/Customer/EditCustomer"
import Account from "../pages/Account/Account"



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
    { path: '/order/user/:id', page: OrderList},
    { path: '/order/details/:id', page: OrderDetail},
    { path: '/payment/status', page: Payments, layout: null},
    { path: '/order/status', page: OrderStatus, layout: null},
]

const privateRoutes = [
    { path: '/admin/dashboard', page: Dashboard, layout: AdminLayout, requiredRole: 'admin'},
    { path: '/admin/orders', page: Orders, layout: AdminLayout},
    { path: '/admin/products', page: Products, layout: AdminLayout},
    { path: '/admin/products/:id', page: ProductDetails, layout: AdminLayout},
    { path: '/admin/products/create', page: CreateNewProduct, layout: AdminLayout},
    { path: '/admin/products/:id/variant/create', page: AddProductVariant, layout: null},
    { path: '/admin/order/details/:id', page: OrderDetailsAdmin, layout: AdminLayout},
    { path: '/admin/category', page: Category, layout: AdminLayout},
    { path: '/admin/category/create', page: CategoryForm, layout: AdminLayout},
    { path: '/admin/discounts', page: DiscountList, layout: AdminLayout},
    { path: '/admin/discounts/create', page: CreateDiscount, layout: AdminLayout},
    { path: '/admin/discounts/edit/:id', page: EditDiscount, layout: AdminLayout},
    { path: '/admin/customers', page: CustomerList, layout: AdminLayout},
    { path: '/admin/customers/create', page: CreateCustomer, layout: AdminLayout},
    { path: '/admin/customers/edit/:id', page: EditCustomer, layout: AdminLayout},
    
    { path: '/checkout', page: Checkout, layout: null},
    { path: '/account/user', page: Account},

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