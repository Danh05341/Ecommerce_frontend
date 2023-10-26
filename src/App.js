import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import { publicRoutes } from './routes';
import { Fragment, useEffect } from 'react';
import { DefaultLayout } from './components/Layouts';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlice';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getProducts = async() => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
            const dataRes = await fetchData.json()
            console.log(dataRes)
            dispatch(setDataProduct(dataRes))
        }
        getProducts()
    }, [])
    const dataProduct = useSelector(state => state.product.data)
    console.log(dataProduct)
    return (
        <Router>
            <Routes>
                {
                    publicRoutes.map((route, index) => {
                        const Page = route.page
                        let Layout = route.layout || DefaultLayout
                        if(route.layout === null) {
                            Layout = Fragment
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page/>
                                    </Layout>
                                }
                            />
                        )
                    })
                }
            </Routes>
        </Router>
    );
}

export default App;
