import HeaderAdmin from '../../Admin/HeaderAdmin'
import SideBar from '../../Admin/SideBarAdmin'


const AdminLayout = ({ children }) => {
    return (
        <div className='flex'>
            <SideBar />

            <main className='bg-[#F9F9F9] min-h-[calc(100vh)] flex-1'>
                <div className='w-[full] h-full'>
                    <HeaderAdmin />
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AdminLayout