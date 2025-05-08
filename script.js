// Thay đổi ảnh sản phẩm khi click vào ảnh nhỏ
function changeImage(src) {
    document.getElementById('mainProductImage').src = src;
}

// Xử lý chọn màu sắc
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    });
});

// Xử lý chọn kích cỡ
const sizeOptions = document.querySelectorAll('.size-option');
sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    });
});

// Xử lý tăng giảm số lượng
const qtyMinus = document.querySelector('.qty-minus');
const qtyPlus = document.querySelector('.qty-plus');
const qtyInput = document.querySelector('.quantity-selector input');

qtyMinus.addEventListener('click', function() {
    let currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
});

qtyPlus.addEventListener('click', function() {
    let currentValue = parseInt(qtyInput.value);
    qtyInput.value = currentValue + 1;
});

// Xử lý form đặt hàng
const checkoutForm = document.getElementById('checkoutForm');
checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy dữ liệu từ form
    const formData = new FormData(checkoutForm);
    const orderData = {};
    formData.forEach((value, key) => {
        orderData[key] = value;
    });
    
    // Thêm thông tin sản phẩm
    orderData.product = "Áo Sơ Mi Chấm Bi";
    orderData.quantity = qtyInput.value;
    orderData.price = "235.000đ";
    
    // Hiển thị thông báo đặt hàng thành công
    alert(`Đặt hàng thành công!\nChúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.`);
    
    // Reset form
    checkoutForm.reset();
});

// Thêm tỉnh/thành phố vào dropdown (ví dụ)
const provinces = [
    "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", 
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu"
];

const provinceSelect = document.getElementById('province');
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    option.textContent = province;
    provinceSelect.appendChild(option);
});

// Xử lý thay đổi tỉnh/thành phố
provinceSelect.addEventListener('change', function() {
    const districtSelect = document.getElementById('district');
    const wardSelect = document.getElementById('ward');
    
    // Xóa các option cũ
    districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
    wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
    
    // Thêm các quận/huyện tương ứng (ví dụ)
    if (this.value) {
        const districts = getDistrictsByProvince(this.value);
        districts