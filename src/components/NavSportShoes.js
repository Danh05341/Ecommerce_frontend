import { Fragment, useEffect, useState } from "react"
import { BsChevronRight } from "react-icons/bs"
import { Link } from "react-router-dom"
import slugify from "slugify"

const NavSportShoes = (props) => {

    return (
        <div className="hidden z-50 cursor-default absolute top-[44px] left-[-11px] min-w-[200px]  bg-white shadow-md group-hover/sportShoes:block font-normal ">
            {
                props.data[0]?.children ? (
                    props.data[0].children.map((category, index) => {
                        return (
                            <Fragment key={index}>
                                {
                                    category?.children ? (
                                        // Parent
                                        <Link key={index} to={"/product/" + slugify(category.name, { locale: 'vi' })}>
                                            <div onClick={props?.handleClick} className="relavtive px-[10px] flex justify-between items-center h-[38px] leading-[38px] text-[#282828] normal-case border-b border-solid border-[#ebebeb] hover:text-[#ff2d37] cursor-pointer group/sportShoesParent">
                                                {category.name}
                                                <BsChevronRight className="text-[10px] font-bold w-[10px] h-[10px] inline" />
                                                {/* children */}
                                                <div onClick={props?.handleClick} className="absolute top-0 left-[100%] hidden z-50 cursor-default min-w-[200px]  bg-white shadow-md group-hover/sportShoesParent:block font-normal ">
                                                    {
                                                        category?.children?.map((category, index) => {
                                                            return (
                                                                <div key={index} className=" h-[38px]  px-[10px] leading-[38px] text-[#282828]  normal-case  border-b border-solid border-[#ebebeb] hover:text-[#ff2d37] cursor-pointer">
                                                                    <Link to={"/product/" + slugify(category.name, { locale: 'vi' })}>
                                                                        {category.name}
                                                                    </Link>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link  key={index} to={"/product/" + slugify(category.name, { locale: 'vi' })}>
                                            <div onClick={props?.handleClick}  className="h-[38px]  px-[10px] leading-[38px] text-[#282828] normal-case border-b border-solid border-[#ebebeb] hover:text-[#ff2d37] cursor-pointer">
                                                {category.name}
                                            </div>
                                        </Link>
                                    )
                                }
                            </Fragment>
                        )
                    })
                ) : <></>
            }
        </div>
    )
}

export default NavSportShoes