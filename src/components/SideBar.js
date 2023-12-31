import { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import slugify from 'slugify'

const SideBar = () => {

    const [children, setChildren] = useState([])
    const [childrenActive, setChildrenActive] = useState(false)

    const [categories, setCategories] = useState([])
    const [sportShoes, setsportShoes] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}category`)
            const dataRes = await fetchData.json()
            console.log(dataRes)
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
    // const renderCategories = (categories) => {
    //     return (
    //         categories.map((category, index) => {
    //             return (
    //                 <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
    //                     {category.name}
    //                 </li>
    //             )
    //         })
    //     );
    // };
    const handleActive = (e) => {
        const element = e.target.dataset
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

    console.log(children)

    return (
        <div className="flex flex-col gap-y-[10px]">
            <Link to='/'>
                <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
                    Trang chủ
                </li>
            </Link>
            <li className="list-none text-[14px] ">
                <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">
                    <div className="flex-1"><Link to='/all-product'>Sản phẩm</Link></div>
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
                                        <Link to={"/" + slugify(category.name, { locale: 'vi' })}>
                                            <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
                                                {category.name}
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </li>
            <li className="list-none text-[14px]">
                <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">
                    <div className="flex-1"><Link to='/giay-the-thao'>Giày thể thao</Link></div>
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
                                        <a key={index}>
                                            {
                                                category.children ? (

                                                    <li key={index} className="list-none text-[14px] ">
                                                        <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">

                                                            <div className="flex-1">
                                                                <Link className="block " to={"/" + slugify(category.name, { locale: 'vi' })}>
                                                                    {category?.name}
                                                                </Link>

                                                            </div>
                                                            <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px]' data-name={category?.name} onClick={handleActive} />
                                                        </span>
                                                        {
                                                            children.find(item => item === category?.name) && (
                                                                <ul className="list-none text-[14px] pl-[20px] flex flex-col gap-[10px] pt-[10px]">
                                                                    {
                                                                        category?.children?.map((category, index) => {
                                                                            return (
                                                                                <Link to={"/" + slugify(category.name, { locale: 'vi' })}>
                                                                                    <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
                                                                                        {category?.name}
                                                                                    </li>
                                                                                </Link>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            )
                                                        }
                                                    </li>

                                                ) : (
                                                    <Link to={"/" + slugify(category.name, { locale: 'vi' })}>
                                                        <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">
                                                            {category.name}
                                                        </li>
                                                    </Link>
                                                )
                                            }
                                        </a>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer"><Link to='/gioi-thieu'>Giới thiệu</Link></li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer"><Link to='/lien-he'>Liên hệ</Link></li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer"><Link to='/tin-tuc'>Tin tức</Link></li>
        </div>
    )
}

export default SideBar