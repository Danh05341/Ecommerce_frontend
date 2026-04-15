import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BsChevronDown } from 'react-icons/bs'
import NavCategory from "./NavCategory"
import NavSportShoes from "./NavSportShoes"
import slugify from 'slugify'
import { fetchCategoryAPI } from "../apis"
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
    const [categories, setCategories] = useState([])
    const [sportShoes, setsportShoes] = useState([])
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
    const [mobileSportOpen, setMobileSportOpen] = useState(false)
    const handleOnMouse2 = () => {
        setOpen2(true)
    }
    const handleClick2 = () => {
        setOpen2(false)
    }

    const handleOnMouse = () => {
        setOpen(true)
    }
    const handleClick = () => {
        setOpen(false)
    }

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
        <>
            {/* Desktop navbar */}
            <div className="w-full relative h-[44px] flex items-center justify-center gap-[35px] bg-[#ff2d37] uppercase font-bold text-[14px] text-white cursor-pointer site-navbar site-navbar-desktop">
                <div className="">
                    <Link to='/' className="leading-[44px] inline-block">Trang chủ</Link>
                </div>
                <div onMouseEnter={handleOnMouse} onMouseLeave={handleClick} onClick={handleClick} className="group/navCategory">
                    <Link to='/product/all' className="inline-block leading-[44px]">Sản phẩm</Link>
                    <BsChevronDown className="ml-[8px] text-[12px] inline-block " />
                    {open ? (<NavCategory data={categories} handleClick={handleClick} />) : <></>}
                </div>
                <div onMouseEnter={handleOnMouse2} onMouseLeave={handleClick2} onClick={handleClick2} className="group/sportShoes relative">
                    <Link to={`/product/${slugify("Giày thể thao", { locale: 'vi' })}`} className="inline-block leading-[44px]">Giày thể thao</Link>
                    <BsChevronDown className="ml-[8px] text-[12px] inline-block " />
                    {open2 ? (<NavSportShoes data={sportShoes} handleClick={handleClick2} />) : <></>}
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

            {/* Mobile navbar */}
            <div className="w-full bg-[#ff2d37] text-white site-navbar-mobile">
                <div className="h-[44px] px-[15px] flex items-center justify-between">
                    <button
                        className="w-[40px] h-[40px] flex items-center justify-center"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMobileOpen(v => !v)}
                    >
                        {mobileOpen ? <FiX className="text-[22px]" /> : <FiMenu className="text-[22px]" />}
                    </button>
                    <div className="uppercase font-bold text-[14px]">Menu</div>
                    <div className="w-[40px]" />
                </div>

                {mobileOpen ? (
                    <div className="site-mobile-menu">
                        <Link className="site-mobile-menu-item" to="/" onClick={() => setMobileOpen(false)}>Trang chủ</Link>

                        <button
                            className="site-mobile-menu-item site-mobile-menu-toggle"
                            onClick={() => setMobileProductsOpen(v => !v)}
                            type="button"
                        >
                            <span>Sản phẩm</span>
                            <BsChevronDown className={`text-[12px] transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileProductsOpen ? (
                            <div className="site-mobile-submenu">
                                <Link className="site-mobile-submenu-item" to="/product/all" onClick={() => setMobileOpen(false)}>Tất cả sản phẩm</Link>
                                {categories?.map((c) => (
                                    <Link
                                        key={c?._id || c?.name}
                                        className="site-mobile-submenu-item"
                                        to={`/product/${slugify(c?.name || '', { locale: 'vi' })}`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {c?.name}
                                    </Link>
                                ))}
                            </div>
                        ) : null}

                        <button
                            className="site-mobile-menu-item site-mobile-menu-toggle"
                            onClick={() => setMobileSportOpen(v => !v)}
                            type="button"
                        >
                            <span>Giày thể thao</span>
                            <BsChevronDown className={`text-[12px] transition-transform ${mobileSportOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileSportOpen ? (
                            <div className="site-mobile-submenu">
                                <Link
                                    className="site-mobile-submenu-item"
                                    to={`/product/${slugify("Giày thể thao", { locale: 'vi' })}`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Tất cả giày thể thao
                                </Link>
                                {sportShoes?.map((c) => (
                                    <Link
                                        key={c?._id || c?.name}
                                        className="site-mobile-submenu-item"
                                        to={`/product/${slugify(c?.name || '', { locale: 'vi' })}`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {c?.name}
                                    </Link>
                                ))}
                            </div>
                        ) : null}

                        <Link className="site-mobile-menu-item" to={`/${slugify("Liên hệ", { locale: 'vi' })}`} onClick={() => setMobileOpen(false)}>Liên hệ</Link>
                        <Link className="site-mobile-menu-item" to={`/${slugify("Giới thiệu", { locale: 'vi' })}`} onClick={() => setMobileOpen(false)}>Giới thiệu</Link>
                        <Link className="site-mobile-menu-item" to={`/${slugify("Tin tức", { locale: 'vi' })}`} onClick={() => setMobileOpen(false)}>Tin tức</Link>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default Navbar