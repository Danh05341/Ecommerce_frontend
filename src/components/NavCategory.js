import { useEffect, useState } from "react"

const NavCategory = () => {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}category`)
            const dataRes = await fetchData.json()
            setCategories(dataRes)
        }
        fetchApi()
    }, [])
    console.log(categories.data)
    return (
        <div className="hidden cursor-default max-w-[1200px] absolute top-[44px] left-0 right-0 m-auto p-[15px] bg-white shadow-lg group-hover/navCategory:flex flex-1">
            <div className="flex gap-3 m-auto flex-1">
                {/* <div className="max-w-[220px] flex-1 m-auto">
                    <div className="cursor-pointer hover:text-[#ff2d37] font-bold border-b pb-[10px]  mt-[10px] border-dashed border-[#ebebeb] text-[12px] text-[#282828]  ">
                        Giày nam
                    </div>
                    <div className="flex flex-col justify-between gap-[6px] mt-[10px] mb-[20px]">
                        <span className="text-[13px] text-[#282828] normal-case font-normal  cursor-pointer hover:text-[#ff2d37]">Giày lười, giày mọi</span>
                        <span className="text-[13px] text-[#282828] normal-case font-normal cursor-pointer hover:text-[#ff2d37]">Giày casual</span>
                        <span className="text-[13px] text-[#282828] normal-case font-normal cursor-pointer hover:text-[#ff2d37]">Giày bốt nam</span>
                        <span className="text-[13px] text-[#282828] normal-case font-normal cursor-pointer hover:text-[#ff2d37]">Sneaker nam</span>
                        <span className="text-[13px] text-[#282828] normal-case font-normal cursor-pointer hover:text-[#ff2d37]">Giày tăng chiều cao</span>
                        <span className="text-[13px] text-[#282828] normal-case font-normal cursor-pointer hover:text-[#ff2d37]">Xăng đan, dép kẹp</span>
                    </div>
                </div> */}
                {
                    categories && categories.data ? (
                        categories.data
                        .filter(category => category.name !== 'Giày thể thao')
                        .map((category, index) => {
                            return (
                                <div key={index} className="max-w-[200px] flex-1 mx-auto">
                                    <div k className="cursor-pointer hover:text-[#ff2d37] font-bold border-b pb-[10px]  mt-[10px] border-dashed border-[#ebebeb] text-[12px] text-[#282828]  ">
                                        {category.name}
                                    </div>
                                    {
                                        category.children.map((children, index) => {
                                            return (
                                                <div key={index} className="flex flex-col justify-between gap-[6px] mt-[10px] mb-[10px]">
                                                    <span  className="text-[13px] text-[#282828] normal-case font-normal  cursor-pointer hover:text-[#ff2d37]">{children.name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    ) : <></>
                }

            </div>
        </div>

    )
}

export default NavCategory