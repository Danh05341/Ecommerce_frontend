import product1 from '../../assets/images/product_1.webp'
import { Link } from 'react-router-dom'
const ProductCard = (props) => {
    return (
        <>
            {

                props?.products ? (
                    props.products.map((product, index) => {
                        return (
                            <div key={index} className="home-product-card flex flex-col relative gap-x-[15px] w-[216px] flex-shrink-0 min-w-[203px] max-w-[216px] h-[318px] border border-dashed border-[#ebebeb]">
                                <div className="flex min-h-0 flex-1 flex-col">
                                    <Link to={"/" + product.slug} className="block shrink-0">
                                        <div className='border border-[rgb(0, 0, 0)] w-full aspect-square overflow-hidden'>
                                            <img src={product.image[0]} alt='product' className='w-full h-full object-cover cursor-pointer' />
                                        </div>
                                    </Link>
                                    <div className="mt-4 flex min-h-0 flex-1 flex-col justify-start px-1">
                                        <Link
                                            to={"/" + product.slug}
                                            className="block w-full text-center"
                                        >
                                            <span className="line-clamp-2 inline-block max-w-full text-center text-[14px] leading-[20px] text-[#282828] hover:text-[#ff2d37]">
                                                {product.name}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className='mt-auto flex shrink-0 justify-between items-center h-[45px] px-[10px] border-t border-dashed border-[#ebebeb]'>
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