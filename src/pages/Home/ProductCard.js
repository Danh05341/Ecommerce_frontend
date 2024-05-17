import product1 from '../../assets/images/product_1.webp'
import { Link } from 'react-router-dom'
const ProductCard = (props) => {
    return (
        <>
            {

                props?.products ? (
                    props.products.map((product, index) => {
                        return (
                            <div key={index} className="flex flex-col justify-between relative  gap-x-[15px] min-w-[203px] flex-1 max-w-[216px] h-[318px] border border-dashed border-[#ebebeb]">
                                {/* <div className='flex flex-col flex-1 justify-between items-center'> */}
                                <Link to={"/" + product.slug} className='flex-1'>
                                    <div className='border border-[rgb(0, 0, 0)]'>
                                        <img src={product.image[0]} alt='product' className='w-[216px] h-[216px]overflow-hidden cursor-pointer' />
                                    </div>
                                </Link>
                                <Link to={"/" + product.slug} className='flex-1 mt-4 text-center inline-block'>
                                    <span className='text-[14px]  inline-block  text-[#282828]  cursor-pointer hover:text-[#ff2d37] '>{product.name}</span>
                                </Link>
                                {/* </div> */}
                                <div className='flex  justify-between items-center h-[45px] px-[10px] border-t border-dashed border-[#ebebeb]'>
                                    <div className="flex flex-col relative">
                                        <span className="text-[#ff2d37] text-[14px] font-[700] top-[5px]">{product.price}₫</span>
                                        {
                                            product?.sale_price && (
                                                <span className="text-[#282828] text-[11px]  line-through">{product.sale_price}₫</span>
                                            )
                                        }
                                    </div>
                                    <div className="w-[58px] h-[24px] bg-[#ff2d37] px-[4px] py-[8px] flex justify-center items-center cursor-pointer hover:bg-white group/detailText">
                                        <Link to={"/" + product.slug}>
                                            <span className="text-white text-[14px] overflow-hidden  group-hover/detailText:text-[#ff2d37] ">Chi tiết</span>
                                        </Link>

                                    </div>
                                </div>

                                {
                                    product?.sale_price && (
                                        <div className=" absolute left-0 top-0 z-10 w-[125px] h-[65px] leading-[50px] text-right bg-[url('https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/hot.png?1664094665337')] bg-contain bg-no-repeat"></div>
                                    )
                                }
                            </div>
                        )
                    })
                ) : <></>
            }

        </>

    )
}

export default ProductCard