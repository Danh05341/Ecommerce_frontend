import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import slugify from "slugify"

const NavSportShoes = (props) => {
    return (
        <div className="hidden z-50 cursor-default absolute top-[44px] left-[-11px] min-w-[200px] px-[10px] bg-white shadow-md group-hover/sportShoes:block font-normal ">
            {
                props.data[0]?.children ? (
                    props.data[0].children.map((category, index) => {
                        return (
                            <Link to={"/" + slugify(category.name, { locale: 'vi' })}>
                                <div key={index} className="h-[38px] leading-[38px] text-[#282828] normal-case  border-b border-solid border-[#ebebeb] hover:text-[#ff2d37] cursor-pointer">
                                    {category.name}
                                </div>
                            </Link>
                        )
                    })
                ) : <></>
            }
        </div>
    )
}

export default NavSportShoes