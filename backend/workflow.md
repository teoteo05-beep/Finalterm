# 📋 Workflow — Kế Hoạch Phát Triển Dự Án Planner

> Tài liệu này liệt kê các công việc cần triển khai cho dự án **Planner** (file `index11.html` và `group.html`).  
> Cập nhật lần cuối: 2026-06-18

---

## Danh Sách Công Việc

### 1. 👤 Thiếu chức năng của User (mũi tên bên cạnh tên tài khoản)
- **Mô tả:** Hiện tại khi click vào mũi tên ▼ cạnh tên tài khoản, không có dropdown menu hiện ra.
- **Yêu cầu:**
  - Tạo dropdown menu khi click vào `user-chip` (avatar + email + mũi tên).
  - Nội dung dropdown gồm: đổi mật khẩu, đăng xuất.
  - Đóng dropdown khi click ra ngoài.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 2. 🐛 Lỗi End Week
- **Mô tả:** Nút "End Week ↺" (hiện đang được dùng như nút logout) hoạt động không đúng — nó đăng xuất người dùng thay vì thực hiện chức năng kết thúc tuần.
- **Yêu cầu:**
  - Tách riêng chức năng **End Week** và **Logout**.
  - Chức năng End Week: đánh dấu tất cả task của tuần hiện tại là đã kết thúc / lưu lại thống kê tuần, sau đó chuyển sang tuần mới.
  - Thêm nút Logout riêng vào dropdown menu của user.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 3. ➕ Thiếu Sub-task trong Create New Project
- **Mô tả:** Khi tạo project mới (modal "Create a Project List"), không có trường nhập sub-task / checklist con.
- **Yêu cầu:**
  - Thêm phần **Sub-tasks** vào modal tạo project.
  - Cho phép thêm / xóa sub-task động bằng nút "+" và "×".
  - Lưu sub-task vào database cùng với project.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 4. 🕐 Sửa lại logo Due Time
- **Mô tả:** Icon/label cho trường "Due Time" trong modal tạo task không rõ ràng hoặc chưa đúng chuẩn thiết kế.
- **Yêu cầu:**
  - Cập nhật icon và nhãn của trường Due Time trong modal task (cả `index11.html` và `group.html`).
  - Sử dụng icon đồng hồ ⏰ thống nhất, label rõ ràng: "Thời gian đến hạn".
  - Đảm bảo hiển thị badge thời gian trên task card nhất quán với thiết kế.
- **File liên quan:** `index11.html`, `group.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 5. 🔁 Thêm phần Lặp lại (Hàng ngày / Hàng tuần / Hàng tháng)
- **Mô tả:** Task hiện tại chỉ có thể tạo một lần, chưa hỗ trợ lặp lại tự động.
- **Yêu cầu:**
  - Thêm trường **Repeat** vào modal tạo/sửa task với các tùy chọn:
    - Không lặp lại (mặc định)
    - Hàng ngày (Daily)
    - Hàng tuần (Weekly)
    - Hàng tháng (Monthly)
  - Khi sang tuần/tháng mới, task lặp lại sẽ tự động được tạo lại.
  - Hiển thị badge "🔁 Daily / Weekly / Monthly" trên task card nếu task có lặp lại.
- **File liên quan:** `index11.html`, `group.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 6. 🔍 Chức năng Search Task chỉ hoạt động trong tuần đang hiển thị
- **Mô tả:** Ô tìm kiếm hiện tại tìm toàn bộ task, cần giới hạn chỉ tìm trong tuần đang được hiển thị.
- **Yêu cầu:**
  - Filter kết quả tìm kiếm theo `weekOffset` hiện tại (chỉ hiện task thuộc 7 ngày của tuần đang xem).
  - Khi người dùng chuyển tuần, tự động xóa / cập nhật kết quả tìm kiếm.
  - Hiển thị số lượng kết quả tìm thấy bên cạnh ô search.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 7. 📝 Hiện Note ở phần trên phần lịch nếu có — Đổi tên thành Sub-task
- **Mô tả:** Phần "Notes / Context details" trong task cần được đổi tên thành "Sub-task" và hiển thị rõ ràng hơn ở phía trên phần lịch (day column header).
- **Yêu cầu:**
  - Đổi tên label "Notes" → **"Sub-task"** trong cả modal và task card.
  - Nếu task có nội dung sub-task, hiển thị preview ngắn phía trên (header) của cột ngày tương ứng hoặc trong thẻ task card với icon 📝 rõ ràng hơn.
  - Cho phép sub-task có thể có dạng checklist (bullet points) nếu được nhập theo dòng.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 8. 🔥 Thêm phần Priority Task in Day
- **Mô tả:** Mỗi ngày cần có một section riêng để đánh dấu các task được ưu tiên cao nhất trong ngày đó.
- **Yêu cầu:**
  - Thêm trường **Priority** vào modal tạo/sửa task với các mức: Normal, High, Urgent.
  - Trong cột ngày (`day-col`), hiển thị section **"Priority Tasks"** ở đầu, chứa các task có priority cao.
  - Các task Urgent hiển thị với màu accent/đỏ nổi bật, High hiển thị với màu vàng cảnh báo.
  - Badge priority hiển thị trên task card.
- **File liên quan:** `index11.html`, `group.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 9. 🔔 Làm phần Nhắc nhở (Reminder)
- **Mô tả:** Hệ thống nhắc nhở chủ động cho task quan trọng, chỉ kích hoạt khi task có Priority = **Urgent**.
- **Yêu cầu:**
  - **Push Notification (Browser):** Gửi thông báo trình duyệt khi đến gần giờ đến hạn của task Urgent (trước 15 phút, 5 phút, đúng giờ).
  - **Email Reminder:** Gửi email nhắc nhở khi task Urgent sắp đến hạn. Tích hợp với Supabase Edge Function hoặc dịch vụ email.
  - Người dùng phải cấp quyền thông báo để nhận Push Notification.
  - Chỉ task có `priority = 'urgent'` mới kích hoạt reminder.
  - Hiển thị badge "🔔 Reminder ON" trên task card khi reminder đang active.
  - Tránh gửi duplicate notification (dùng Set để tracking).
- **File liên quan:** `index11.html`, `group.html`
- **Trạng thái:** `[ ]` Chưa làm

---

## Thứ Tự Ưu Tiên Triển Khai

| STT | Công việc | Độ ưu tiên | Độ phức tạp | File |
|-----|-----------|------------|-------------|------|
| 1 | Sửa lại logo Due Time | 🔴 Cao | ⭐ Dễ | index11, group |
| 2 | Lỗi End Week | 🔴 Cao | ⭐⭐ Trung bình | index11 |
| 3 | Chức năng User dropdown | 🟡 Trung bình | ⭐⭐ Trung bình | index11 |
| 4 | Priority Task in Day | 🟡 Trung bình | ⭐⭐ Trung bình | index11, group |
| 5 | Search chỉ trong tuần hiện tại | 🟡 Trung bình | ⭐⭐ Trung bình | index11 |
| 6 | Đổi Note → Sub-task | 🟢 Thấp | ⭐ Dễ | index11 |
| 7 | Sub-task trong Create Project | 🟢 Thấp | ⭐⭐⭐ Khó | index11 |
| 8 | Lặp lại hàng ngày/tuần/tháng | 🟢 Thấp | ⭐⭐⭐ Khó | index11, group |
| 9 | Nhắc nhở (Reminder) | 🟢 Thấp | ⭐⭐⭐ Khó | index11, group |

---

## Ghi chú kỹ thuật

- **Database (Supabase):** Một số tính năng (repeat, priority, sub-task) cần thêm cột mới vào bảng `tasks` và có thể cần migration.
- **Columns cần thêm vào bảng `tasks`:**
  - `priority` — enum: `'normal' | 'high' | 'urgent'`
  - `repeat_mode` — enum: `'none' | 'daily' | 'weekly' | 'monthly'`
  - `sub_tasks` — `text` hoặc `jsonb` (danh sách sub-task)
- **Email Reminder:** Cần tích hợp Supabase Edge Function + SendGrid / Resend để gửi email.
- **Push Notification:** Dùng Web Notifications API (`Notification`), yêu cầu HTTPS hoặc localhost.
