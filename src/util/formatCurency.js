export const formatCurrency = (value) => {
    // Xóa các ký tự không phải số
    const cleanValue = value.replace(/\D/g, '');
    // Loại bỏ các số 0 ở đầu
    const noLeadingZeros = cleanValue.replace(/^0+/, '');
    // Định dạng số thành chuỗi có dấu phẩy ngăn cách
    return noLeadingZeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
