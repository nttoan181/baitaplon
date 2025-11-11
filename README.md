<h2 align="center">
    <a href="https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin">
    🎓 Faculty of Information Technology (DaiNam University)
    </a>
</h2>
<h2 align="center">
   TỰ ĐỘNG NHẬP LIỆU HÓA ĐƠN & CHỨNG TỪ KẾ TOÁN TỪ ẢNH/SCAN
</h2>
<div align="center">
    <p align="center">
        <img src="docs/aiotlab_logo.png" alt="AIoTLab Logo" width="170"/>
        <img src="docs/fitdnu_logo.png" alt="Faculty Logo" width="180"/>
        <img src="docs/dnu_logo.png" alt="DaiNam University Logo" width="200"/>
    </p>

[![AIoTLab](https://img.shields.io/badge/AIoTLab-green?style=for-the-badge)](https://www.facebook.com/DNUAIoTLab)
[![Faculty of Information Technology](https://img.shields.io/badge/Faculty%20of%20Information%20Technology-blue?style=for-the-badge)](https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin)
[![DaiNam University](https://img.shields.io/badge/DaiNam%20University-orange?style=for-the-badge)](https://dainam.edu.vn)

</div>

---

## 📖 1. Giới thiệu

**Đề tài**: Tự động nhập liệu hóa đơn & chứng từ kế toán từ ảnh/scan bằng OCR.

**Mục tiêu**:
* Nhận diện nội dung hóa đơn bằng OCR (Việt/Anh).
* Trích xuất thông tin: vendor, tax_id, date, total_amount.
* Lưu trữ & tìm kiếm hóa đơn.
* Hỗ trợ xem chi tiết & xuất Excel.

Ứng dụng giúp sinh viên hiểu:
* Xử lý ảnh + OCR.
* Trích xuất thông tin bằng regex/logic.
* Tạo API + lưu dữ liệu database.


## 📌 2. Công nghệ sử dụng

* **OCR**: Tesseract OCR / Google Vision API
* **Backend**: Python (FastAPI) / Node.js (Express)
* **Database**: SQLite / PostgreSQL
* **Frontend**: React / Java Swing
* **Excel Export**: Pandas / openpyxl


## ⚡ 3. Chức năng hệ thống

### 3.1. Upload ảnh hóa đơn
* Hỗ trợ JPG / PNG / PDF.

### 3.2. OCR tự động
* Nhận diện tiếng Việt + tiếng Anh.

### 3.3. Trích xuất thông tin hóa đơn
* Vendor
* Tax ID
* Ngày hóa đơn (date)
* Tổng tiền (total_amount)

### 3.4. Lưu trữ database
* Lưu thông tin + ảnh gốc.

### 3.5. Tìm kiếm hóa đơn
* Theo ID hoặc từ khóa.

### 3.6. Xem chi tiết hóa đơn
* Hiển thị ảnh + dữ liệu đã trích.

### 3.7. Phân tích biểu đồ
* Biểu đồ chi phí theo thời gian.

### 3.8. Xuất Excel
* Xuất danh sách hóa đơn ra file `.xlsx`.

### 3.9. Xóa hóa đơn
* Xóa mềm hoặc xóa vĩnh viễn.

## 💻 4. Các thành phần chính

| File / Module          | Chức năng |
|------------------------|-----------|
| `upload_handler.py`    | Upload ảnh hóa đơn |
| `ocr_engine.py`        | Nhận diện văn bản |
| `extractor.py`         | Trích thông tin từ OCR |
| `database.py`          | Kết nối & thao tác DB |
| `ui/` hoặc `frontend/` | Giao diện quản lý |

---

## 📞 5. Liên hệ

* 💌 Email: **tattoan181@gmail.com**
* ☎️ SĐT: **0976987556**

© 2025 AIoTLab – Faculty of Information Technology – DaiNam University
