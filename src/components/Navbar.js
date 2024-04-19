import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BsChevronDown } from 'react-icons/bs'
import NavCategory from "./NavCategory"
import NavSportShoes from "./NavSportShoes"
import slugify from 'slugify'
import { fetchCategoryAPI } from "../apis"

const Navbar = () => {
    const [categories, setCategories] = useState([])
    const [sportShoes, setsportShoes] = useState([])

    useEffect(() => {
        fetchCategoryAPI().then((dataRes) => {
            const filteredData = dataRes.data.reduce(
                (result, category) => {
                    if (category.name !== 'Giày thể thao') {
                        result.categories.push(category)
                    } else {
                        result.sportShoes.push(category)
                    }
                    return result
                },
                { categories: [], sportShoes: [] }
            )
            setCategories(filteredData.categories)
            setsportShoes(filteredData.sportShoes)
        })
    }, [])
    console.log(categories, sportShoes)
    return (
        <div className="w-full relative h-[44px] flex items-center justify-center gap-[35px] bg-[#ff2d37] uppercase font-bold text-[14px] text-white cursor-pointer">
            <div className="">
                <Link to='/' className="leading-[44px] inline-block">Trang chủ</Link>
            </div>
            <div className="group/navCategory">
                <Link to='/product/all' className="inline-block leading-[44px]">Sản phẩm</Link>
                <BsChevronDown className="ml-[8px] text-[12px] inline-block " />
                <NavCategory data={categories} />
            </div>
            <div className="group/sportShoes relative">
                <Link to={`/product/${slugify("Giày thể thao", { locale: 'vi' })}`} className="inline-block leading-[44px]">Giày thể thao</Link>
                <BsChevronDown className="ml-[8px] text-[12px] inline-block " />
                <NavSportShoes data={sportShoes} />
            </div>
            <div className="">
                <Link to={`/${slugify("Liên hệ", { locale: 'vi' })}`} className="inline-block leading-[44px]">Liên hệ</Link>
            </div>
            <div className="">
                <Link to={`/${slugify("Giới thiệu", { locale: 'vi' })}`} className="inline-block leading-[44px]">Giới thiệu</Link>
            </div>
            <div className="">
                <Link to={`/${slugify("Tin tức", { locale: 'vi' })}`} className="inline-block leading-[44px]">Tin tức</Link>
            </div>
        </div>
    )
}

export default Navbar