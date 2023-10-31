import { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";

const SideBar = () => {

    const [children, setChildren] = useState([])
    const [childrenActive, setChildrenActive] = useState(false)

    const [categories, setCategories] = useState([])
    const [sportShoes, setsportShoes] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}category`)
            const dataRes = await fetchData.json()
            setCategories(dataRes.data.filter(item => item.name !== "Giày thể thao"))
            setsportShoes(dataRes.data.filter(item => item.name === "Giày thể thao"))
        }
        fetchApi()
    }, [])
    // category.children ? (
    //     <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
    //         {category.name}
    //     </li>
    // ) : (
    //     renderCategories(category.children)
    // )
    const renderCategories = (categories) => {
        return (
            categories.map((category, index) => {
                return (
                    <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
                        {category.name}
                    </li>
                )
            })
        );
    };
    const handleActive = (e) => {
        // const element = e.target.dataset
        // if (element.name === "Sản phẩm") {
        //     setChildren(categories)
        //     setChildrenActive(prev => !prev)
        // }
        const element = e.target.dataset
        // setChildrenActive(prev => !prev)
        setChildren(prev => {
            if (children.includes(element.name)) {
                return children.filter(data => data !== element.name)
            }
            else {
                return [
                    ...prev,
                    element.name
                ]
            }
        })
    }

    // console.log(categories,categories.filter(item => console.log(item)))

    return (
        <div className="flex flex-col gap-y-[10px]">
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Trang chủ</li>
            <li className="list-none text-[14px] ">
                <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">
                    <div className="flex-1">Sản phẩm</div>
                    {
                        categories && (
                            <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px]' data-name="Sản phẩm" onClick={handleActive} />
                        )
                    }
                </span>
                {
                    children.find(item => item === "Sản phẩm") && (
                        <ul className="list-none text-[14px] pl-[20px] flex flex-col gap-[10px] pt-[10px]">
                            {
                                categories?.map((category, index) => {
                                    return (
                                        <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
                                            {category.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </li>
            <li className="list-none text-[14px]">
                <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">
                    <div className="flex-1">Giày thể thao</div>
                    {
                        sportShoes && (
                            <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px]' data-name={sportShoes[0]?.name} onClick={handleActive} />
                        )
                    }
                </span>
                {
                    children.find(item => item === "Giày thể thao") && (
                        <ul className="list-none text-[14px] pl-[20px] flex flex-col gap-[10px] pt-[10px]">
                            {
                                sportShoes[0]?.children?.map((category, index) => {
                                    return (
                                        <>
                                            {
                                                category.children ? (
                                                    <li key={index} className="list-none text-[14px] ">
                                                        <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">
                                                            <div className="flex-1">{category.children.name}</div>
                                                            <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px]' data-name="Sản phẩm" onClick={handleActive} />
                                                        </span>
                                                        <ul className="list-none text-[14px] block ">
                                                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày chống nước</li>
                                                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày đinh</li>
                                                        </ul>
                                                    </li>
                                                ) : (
                                                    <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
                                                        {category.name}
                                                    </li>
                                                )
                                            }
                                        </>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giới thiệu</li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Liên hệ</li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Tin tức</li>
        </div>
    )
}

export default SideBar