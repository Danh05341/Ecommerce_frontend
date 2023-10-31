// {
//     childActive1 && (
//         <ul className="list-none text-[14px] pl-[20px] flex flex-col gap-[10px] pt-[10px]">
//         {
//                 category?.map((category, index) => {
//                     return (
                        
//                         <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">{category.name}</li>
//                     )
//                 })
//         }
//         </ul>
        
//     )
// }


{
    childActive2 && (
        <ul className="list-none text-[14px] pl-[20px] flex flex-col gap-[10px] pt-[10px]">
            {/* <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày ultra boots</li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày chạy bộ</li>
            <li className="list-none text-[14px]">
                <span className="hover:text-[#ff2d37] cursor-pointer">Giày đi phượt</span>
                <ul className="list-none text-[14px] hidden ">
                    <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày chống nước</li>
                    <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày đinh</li>
                </ul>
            </li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày bitis</li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày nike</li> */}
            {
                categorySport?.map((category, index) => {
                    return (
                        <li key={index} className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">{category.name}</li>
                    )
                })
            }
        </ul>
    )
}