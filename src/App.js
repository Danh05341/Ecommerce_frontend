import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth';

import { publicRoutes, privateRoutes } from './routes';
import { Fragment, useEffect } from 'react';
import { DefaultLayout } from './components/Layouts';


function App() {

    return (
        <Router>
            <Routes>
                {
                    publicRoutes.map((route, index) => {
                        const Page = route.page
                        let Layout = route.layout || DefaultLayout
                        if (route.layout === null) {
                            Layout = Fragment
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })
                }
                {
                    privateRoutes.map((route, index) => {
                        const Page = route.page
                        const Layout = route.layout || DefaultLayout
                        if (route.layout === null) {
                            Layout = Fragment
                        }
                        return (
                            <Route key={index} element={<RequireAuth />}>
                                <Route
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </Route>
                        )
                    })
                }
            </Routes>
        </Router>
    );
}

export default App;
