import Header from '../../Header'
import Footer from '../../Footer'
import Navbar from '../../Navbar'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header/>
            <Navbar/>
            <main className='bg-slate-100 min-h-[calc(100vh)]'>
                {children}
            </main>
            <Footer />

        </>
    )
}

export default DefaultLayout