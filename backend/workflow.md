# 📋 Workflow — Kế Hoạch Phát Triển Dự Án Planner

> Tài liệu này liệt kê các công việc cần triển khai cho dự án **Planner** (file `index11.html` và `group.html`).  
> Cập nhật lần cuối: 2026-06-19 — Cập nhật trạng thái sau khi kiểm tra index.html (web5)

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
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 4. 🕐 Sửa lại logo Due Time
- **Mô tả:** Icon/label cho trường "Due Time" trong modal tạo task không rõ ràng hoặc chưa đúng chuẩn thiết kế.
- **Yêu cầu:**
  - Cập nhật icon và nhãn của trường Due Time trong modal task (cả `index11.html` và `group.html`).
  - Sử dụng icon đồng hồ ⏰ thống nhất, label rõ ràng: "Thời gian đến hạn".
  - Đảm bảo hiển thị badge thời gian trên task card nhất quán với thiết kế.
- **File liên quan:** `index11.html`, `group.html`
- **Trạng thái:** `[x]` Đã hoàn thành

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
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 7. 📝 Hiện Note ở phần trên phần lịch nếu có — Đổi tên thành Sub-task
- **Mô tả:** Phần "Notes / Context details" trong task cần được đổi tên thành "Sub-task" và hiển thị rõ ràng hơn ở phía trên phần lịch (day column header).
- **Yêu cầu:**
  - Đổi tên label "Notes" → **"Sub-task"** trong cả modal và task card.
  - Nếu task có nội dung sub-task, hiển thị preview ngắn phía trên (header) của cột ngày tương ứng hoặc trong thẻ task card với icon 📝 rõ ràng hơn.
  - Cho phép sub-task có thể có dạng checklist (bullet points) nếu được nhập theo dòng.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 8. 🔥 Thêm phần Priority Task in Day
- **Mô tả:** Mỗi ngày cần có một section riêng để đánh dấu các task được ưu tiên cao nhất trong ngày đó.
- **Yêu cầu:**
  - Thêm trường **Priority** vào modal tạo/sửa task với các mức: Normal, High, Urgent.
  - Trong cột ngày (`day-col`), hiển thị section **"Priority Tasks"** ở đầu, chứa các task có priority cao.
  - Các task Urgent hiển thị với màu accent/đỏ nổi bật, High hiển thị với màu vàng cảnh báo.
  - Badge priority hiển thị trên task card.
- **File liên quan:** `index11.html`, `group.html`
- **Trạng thái:** `[x]` Đã hoàn thành

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
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 10. 🏷️ Phần tên tài khoản hiển thị chưa rõ ràng tên Gmail
- **Mô tả:** Hiện tại tên người dùng trên header bị cắt ngắn quá nhiều (chỉ hiện 5 ký tự đầu của phần trước @), khiến người dùng khó nhận biết họ đang đăng nhập bằng tài khoản nào.
- **Yêu cầu:**
  - Tăng số ký tự hiển thị của email (hiện tại `substring(0, 5)` → mở rộng hoặc hiển thị đầy đủ).
  - Thêm tooltip/title hiển thị email đầy đủ khi hover vào tên tài khoản.
  - Cân chỉnh max-width của `.user-email-txt` cho phù hợp, tránh tràn layout.
  - Định dạng hiển thị: ưu tiên hiện phần trước `@` đầy đủ, cắt ngắn nếu quá dài (ví dụ: `nguyenvana…` thay vì `nguye`).
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 11. 📦 Thêm đường viền đậm nổi bật cho ngày hiện tại ở trang chính
- **Mô tả:** Box cột ngày hôm nay (`day-col.today`) chưa đủ nổi bật so với các ngày khác, người dùng khó nhận ra ngày hiện tại trong lưới 7 ngày.
- **Yêu cầu:**
  - Thêm `border` dày và màu accent rõ nét (ví dụ: `2px solid var(--accent)`) cho `.day-col.today`.
  - Có thể thêm `box-shadow` với màu accent để tạo hiệu ứng phát sáng nhẹ.
  - Giữ hiệu ứng gradient nền hiện tại, kết hợp thêm đường viền để tổng thể nhìn ấn tượng hơn.
  - Đảm bảo hiệu ứng vẫn đẹp trên cả dark mode và light mode.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 12. 🗂️ Xóa và sửa tên Personal Project
- **Mô tả:** Hiện tại không có tùy chọn để xóa hoặc đổi tên project sau khi đã tạo trong sidebar.
- **Yêu cầu:**
  - Thêm nút **Xóa** (delete) và **Sửa tên** (rename) cho từng project trong danh sách sidebar.
  - Khi xóa: hiển thị confirm dialog trước khi xóa, các task thuộc project bị xóa cần được xử lý (xóa theo hoặc unassign).
  - Khi sửa tên: mở inline input hoặc modal nhỏ để đổi tên và chọn lại màu.
  - Cập nhật realtime lên Supabase sau khi xóa / sửa.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 13. 📄 Tách file: index, login
- **Mô tả:** Hiện tại toàn bộ màn hình auth (login/signup) và màn hình app đều nằm trong cùng 1 file `index11.html`, gây khó bảo trì và debug.
- **Yêu cầu:**
  - Tách `login.html` riêng: chứa màn hình đăng nhập / đăng ký.
  - `index11.html` chỉ chứa app chính (sau khi đã đăng nhập).
  - Khi chưa đăng nhập → redirect sang `login.html`; khi đăng nhập thành công → redirect sang `index11.html`.
  - Đảm bảo theme, Supabase config được dùng chung hoặc import nhất quán.
- **File liên quan:** `index11.html` → tách thành `index11.html` + `login.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 14. 📅 Thêm thời gian rõ ràng dưới thanh Week Range
- **Mô tả:** Thanh điều hướng tuần hiện chỉ hiển thị khoảng ngày dạng "1 thg 6 - 7 thg 6", chưa có chỉ thị tương đối để người dùng hiểu mình đang ở tuần nào so với hiện tại.
- **Yêu cầu:**
  - Thêm nhãn tương đối phía dưới hoặc bên cạnh week range, hiển thị theo quy tắc:
    - `weekOffset === 0` → **"This week"**
    - `weekOffset === -1` → **"1w earlier"**
    - `weekOffset === -2` → **"2w earlier"**
    - `weekOffset === 1` → **"Next week"**
    - `weekOffset === 2` → **"+2w"**
    - `weekOffset >= 3` → **"+Nw"**
  - Nhãn tương đối hiển thị nhỏ bên dưới `.week-nav-label`, dùng font mono, màu `--ink-faint`.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 15. ⚠️ Cảnh báo khi thêm task có thời gian < thời điểm hiện tại
- **Mô tả:** Hiện tại người dùng có thể thêm task với due time đã qua (trong quá khứ) mà không có cảnh báo nào.
- **Yêu cầu:**
  - Khi người dùng chọn date + due_time trong modal tạo task, nếu thời điểm đó < `Date.now()` thì hiển thị cảnh báo inline (màu vàng/cam) trong modal: *"⚠️ Thời gian này đã qua — task sẽ được đánh dấu là trễ hạn."*
  - Vẫn cho phép lưu task (không chặn), chỉ cảnh báo.
  - Cảnh báo tự ẩn khi người dùng chỉnh lại thời gian hợp lệ.
- **File liên quan:** `index11.html`, `group.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 16. 🐛 Sửa lỗi Delete không hoạt động sau khi thêm task
- **Mô tả:** Sau khi thêm task mới, nút xóa (✕) trên task card không phản hồi — có thể do event listener bị mất sau khi re-render DOM.
- **Yêu cầu:**
  - Kiểm tra và đảm bảo event listener được gán lại đúng cách sau mỗi lần `renderGrid()` được gọi.
  - Tránh dùng `innerHTML` trực tiếp làm mất listener; ưu tiên `addEventListener` sau khi tạo element.
  - Test lại sau khi fix: thêm task → xóa task → không bị lỗi.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 17. 🃏 Chỉnh lại giao diện hiển thị task card
- **Mô tả:** Task card hiện hiển thị quá nhiều thông tin (due time, notes, project tag, move button...). Khi task description quá dài, card bị vỡ layout.
- **Yêu cầu:**
  - Trên task card trong lưới 7 ngày, **chỉ hiển thị:** tên task (`Task description`) và project tag (`Assign to Project`).
  - Ẩn badge due time, badge notes, nút move khỏi card mặc định (có thể hiện khi hover nếu cần).
  - **Task description** bị giới hạn hiển thị tối đa **2 dòng** (`-webkit-line-clamp: 2`), phần dư hiển thị `…`.
  - Layout card chỉ mở rộng theo **chiều ngang** (không tăng chiều cao khi nội dung dài).
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 18. 📖 Trang chi tiết ngày (Day Detail Page)
- **Mô tả:** Khi người dùng click vào một ngày trong lưới 7 ngày, cần hiển thị trang/panel riêng cho ngày đó thay vì xem toàn bộ tuần.
- **Yêu cầu:**
  - Click vào header ngày (`day-col-head`) → mở **Day Detail View** (có thể là panel trượt từ phải hoặc trang mới).
  - Day Detail View bao gồm:
    - **Tiêu đề:** Tên ngày + ngày tháng đầy đủ (ví dụ: *"Thứ Ba — 18 tháng 6, 2026"*).
    - **Thanh tiến độ:** % task hoàn thành trong ngày đó.
    - **Danh sách task chi tiết:** hiển thị đầy đủ title, project, due time, notes/sub-task, priority, trạng thái done.
    - **Nút thêm task** cho ngày đó.
  - Nút **"← Back"** để quay lại lưới tuần.
- **File liên quan:** `index11.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 19. 🔍 Sửa lại icon kính lúp (Search Icon)
- **Mô tả:** Icon kính lúp ở ô tìm kiếm hiện tại sử dụng emoji, cần thay bằng icon SVG hoặc CSS icon chuẩn để hiển thị rõ ràng hơn trên mọi trình duyệt.
- **Yêu cầu:**
  - Thay emoji 🔍 bằng icon SVG kính lúp chuẩn (hoặc dùng CSS pseudo-element).
  - Đảm bảo icon hiển thị nhất quán trên dark mode và light mode.
- **File liên quan:** `index.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 20. 🕐 Sửa lại icon đồng hồ Due Time
- **Mô tả:** Icon đồng hồ ⏰ ở trường Due Time và trên badge thời gian cần được thay bằng icon đồng hồ SVG chuẩn, rõ ràng hơn.
- **Yêu cầu:**
  - Thay emoji ⏰ bằng icon SVG đồng hồ chuẩn trong label modal và trên task card badge.
  - Đảm bảo hiển thị tốt ở cả kích thước nhỏ (badge) và lớn (label).
- **File liên quan:** `index.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 21. 🌐 Chuyển toàn bộ giao diện sang tiếng Anh
- **Mô tả:** Hiện tại giao diện xen lẫn tiếng Việt và tiếng Anh. Cần thống nhất toàn bộ text hiển thị sang tiếng Anh.
- **Yêu cầu:**
  - Chuyển tất cả label, placeholder, button text, toast message, confirm dialog, modal title sang tiếng Anh.
  - Bao gồm: auth form, task modal, project modal, sidebar, header, day view, stats, archive, user dropdown, end week, warnings...
  - Giữ nguyên tên biến và comment code (không cần dịch code comment).
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 22. 🔐 Sign Up: Thêm Confirm Password + Show/Hide Password
- **Mô tả:** Khi chuyển sang tab Sign Up, form đăng ký chỉ có 1 trường password, thiếu trường xác nhận mật khẩu và nút hiển thị mật khẩu.
- **Yêu cầu:**
  - Khi ở chế độ **Sign Up**, hiển thị thêm trường **Confirm Password** bên dưới trường Password.
  - Validate: nếu 2 mật khẩu không khớp → hiển thị lỗi inline trước khi submit.
  - Thêm **icon mắt** (👁 / 👁‍🗨) ở bên phải mỗi trường password để toggle hiển thị/ẩn mật khẩu.
  - Khi click icon → chuyển `type` từ `password` sang `text` và ngược lại.
  - Ẩn trường Confirm Password khi quay lại tab Sign In.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 23. 👁 Login: Thêm nút Show/Hide Password
- **Mô tả:** Ở form đăng nhập (Sign In), người dùng chỉ thấy dấu chấm tròn khi nhập mật khẩu, không có cách nào xem lại mật khẩu đang nhập.
- **Yêu cầu:**
  - Thêm **icon mắt** ở bên phải ngoài cùng trường password trong form Sign In.
  - Click icon → toggle hiển thị mật khẩu (chuyển `type` giữa `password` và `text`).
  - Icon thay đổi trạng thái: mắt mở (đang hiện) / mắt đóng (đang ẩn).
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 24. 🔁 Sửa lỗi Repeat (Lặp lại) không hoạt động
- **Mô tả:** Chức năng lặp lại task (Daily / Weekly / Monthly) khi được chọn trong modal tạo/sửa task hiện không tạo task lặp lại như mong đợi.
- **Yêu cầu:**
  - Kiểm tra logic `toggleTaskStatus()`: khi task có `repeat_mode !== 'none'` và được đánh dấu done → tự động tạo task mới cho kỳ tiếp theo.
  - Đảm bảo `repeat_mode` được lưu đúng vào database khi tạo/sửa task.
  - Đảm bảo task mới được tạo với cùng `title`, `subject_id`, `due_time`, `priority`, `repeat_mode`.
  - Kiểm tra trùng lặp: không tạo task lặp nếu đã tồn tại task cùng tên + cùng ngày + chưa done.
  - Test lại: tạo task daily → đánh dấu done → kiểm tra task mới xuất hiện ở ngày tiếp theo.
- **File liên quan:** `index.html`
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
| 10 | Tên Gmail hiển thị rõ ràng hơn | 🔴 Cao | ⭐ Dễ | index11 |
| 11 | Viền đậm nổi bật ngày hiện tại | 🔴 Cao | ⭐ Dễ | index11 |
| 12 | Xóa và sửa tên Personal Project | 🔴 Cao | ⭐⭐ Trung bình | index11 |
| 13 | Tách file index + login | 🔴 Cao | ⭐⭐ Trung bình | index11 |
| 14 | Nhãn tương đối dưới Week Range | 🔴 Cao | ⭐ Dễ | index11 |
| 15 | Cảnh báo task quá khứ | 🟡 Trung bình | ⭐ Dễ | index11, group |
| 16 | Sửa lỗi Delete sau thêm task | 🔴 Cao | ⭐⭐ Trung bình | index11 |
| 17 | Chỉnh giao diện task card | 🟡 Trung bình | ⭐⭐ Trung bình | index11 |
| 18 | Trang chi tiết ngày | 🟡 Trung bình | ⭐⭐⭐ Khó | index11 |

---

## Ghi chú kỹ thuật

- **Database (Supabase):** Một số tính năng (repeat, priority, sub-task) cần thêm cột mới vào bảng `tasks` và có thể cần migration.
- **Columns cần thêm vào bảng `tasks`:**
  - `priority` — enum: `'normal' | 'high' | 'urgent'`
  - `repeat_mode` — enum: `'none' | 'daily' | 'weekly' | 'monthly'`
  - `sub_tasks` — `text` hoặc `jsonb` (danh sách sub-task)
- **Email Reminder:** Cần tích hợp Supabase Edge Function + SendGrid / Resend để gửi email.
- **Push Notification:** Dùng Web Notifications API (`Notification`), yêu cầu HTTPS hoặc localhost.
