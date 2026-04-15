const Footer = () => {
  return (
    <div className="relavtive site-footer">
      <div className="footer-services-item-wrapper bg-white h-[100px] mx-auto flex justify-between items-center px-[48px] max-w-[1280px] footer-services">
        <div className="footer-services-item-container">
          <div className="flex gap-[10px] footer-services-item">
            <img className="w-[50px] h-[50px]" src="https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/srv_1.png?1705907597479" alt="" />
            <div className="">
              <h3 className="font-bold text-[16px]">Miễn phí vận chuyển</h3>
              <p className="text-[18px]">Miễn phí vận chuyển nội thành</p>
            </div>
          </div>
        </div>
        <div className="footer-services-item-container">
          <div className="flex gap-[10px] footer-services-item">
            <img className="w-[50px] h-[50px]" src="https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/srv_2.png?1705907597479" alt="" />
            <div className="">
              <h3 className="font-bold text-[16px]">Đổi trả hàng</h3>
              <p className="text-[14px]">Đổi trả lên tới 30 ngày</p>
            </div>
          </div>
        </div>
        <div className="footer-services-item-container">
          <div className="flex gap-[10px] footer-services-item">
            <img className="w-[50px] h-[50px]" src="https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/srv_3.png?1705907597479" alt="" />
            <div className="">
              <h3 className="font-bold text-[16px]">Tiết kiệm thời gian</h3>
              <p className="text-[14px]">Mua sắm dễ hơn khi online</p>
            </div>
          </div>
        </div>
        <div className="footer-services-item-container">
          <div className="flex gap-[10px] footer-services-item">
            <img className="w-[50px] h-[50px]" src="https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/srv_4.png?1705907597479" alt="" />
            <div className="">
              <h3 className="font-bold text-[16px]">Tư vấn trực tiếp</h3>
              <p className="text-[14px]">Đội ngũ tư vấn nhiệt tình</p>
            </div>
          </div>
        </div>
      </div>
      {/* footer-bot */}
      <div className="bg-[url('https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/bg_fot.jpg?1705907579799')] bg-cover bg-no-repeat">
        <div className="h-[369px] text-white flex items-center justify-center gap-[90px] footer-links">
          <div className="flex flex-col px-[48px] gap-y-[15px] footer-links-col">
            <div className="font-bold mb-[10px]">CHĂM SÓC KHÁCH HÀNG</div>
            <div>Trang chủ</div>
            <div>Sản phẩm</div>
            <div>Giày thể thao</div>
            <div>Liên hệ</div>
            <div>Giới thiệu</div>
          </div>
          <div className="flex flex-col px-[48px] gap-y-[15px] footer-links-col">
            <div className="font-bold mb-[10px]">HƯỚNG DẪN</div>
            <div>Trang chủ</div>
            <div>Sản phẩm</div>
            <div>Giày thể thao</div>
            <div>Liên hệ</div>
            <div>Giới thiệu</div>
          </div>
          <div className="flex flex-col px-[48px] gap-y-[15px] footer-links-col">
            <div className="font-bold mb-[10px]">CHÍNH SÁCH</div>
            <div>Trang chủ</div>
            <div>Sản phẩm</div>
            <div>Giày thể thao</div>
            <div>Liên hệ</div>
            <div>Giới thiệu</div>
          </div>
          <div className="flex flex-col px-[48px] gap-y-[15px] footer-links-col">
            <div className="font-bold mb-[10px]">VỀ CỬA HÀNG</div>
            <div>Trang chủ</div>
            <div>Sản phẩm</div>
            <div>Giày thể thao</div>
            <div>Liên hệ</div>
            <div>Giới thiệu</div>
          </div>
        </div>
        <div className="flex justify-center pb-[20px] text-white footer-copyright">© Bản quyền thuộc về
          <span className="text-[#FF2D37] mr-[6px]">Delta Shoes</span>| Cung cấp bởi
          <span className="text-[#FF2D37]">LE THANH DANH</span>
        </div>
      </div>
    </div>
  )
}

export default Footer