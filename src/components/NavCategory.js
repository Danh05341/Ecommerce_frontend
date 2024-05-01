import { Link } from "react-router-dom"
import slugify from "slugify"
import "../assets/css/NavCategory.css"
const NavCategory = (props) => {
    return (
        <div className="hidden z-50 cursor-default max-w-[1200px]  absolute top-[44px] left-0 right-0 m-auto p-[15px] bg-white shadow-lg group-hover/navCategory:flex flex-1 nav">
            <div className="flex gap-3 m-auto flex-1">
                {
                    props?.data ? (
                        props.data.map((category, index) => {
                            return (
                                <div key={index} className="max-w-[200px] flex-1 mx-auto">

                                    <Link to={"/product/" + slugify(category.name, { locale: 'vi' })}>
                                        <div onClick={props?.handleClick} className=" cursor-pointer hover:text-[#ff2d37] font-bold border-b pb-[10px]  mt-[10px] border-dashed border-[#ebebeb] text-[12px] text-[#282828]  ">
                                            {category.name}
                                        </div>
                                    </Link>
                                    <div key={index} className="flex flex-col justify-between gap-[6px] mt-[10px] mb-[10px]">
                                        {
                                            category.children.map((children, index) => {
                                                return (
                                                    <Link key={index} to={"/product/" + slugify(children.name, { locale: 'vi' })}>
                                                        <span onClick={props?.handleClick} key={index} className=" text-[13px] text-[#282828] normal-case font-normal  cursor-pointer hover:text-[#ff2d37]">{children.name}</span>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
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