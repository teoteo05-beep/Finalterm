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

### 16. 🐛 Sửa lỗi nút Delete trong modal chỉnh sửa task không hoạt động
- **Mô tả:** Sau khi thêm task, người dùng click vào task để mở modal chỉnh sửa, nhấn nút **Delete** nhưng không có phản hồi — task không bị xóa. Nguyên nhân: nút `taskDeleteBtn` trong modal chưa được gán `onclick` handler.
- **Yêu cầu:**
  - Gán `onclick` handler cho nút `$('taskDeleteBtn')` để gọi hàm `deleteTask()` khi người dùng nhấn Delete.
  - Khi nhấn Delete → hiển thị confirm dialog → nếu xác nhận → xóa task khỏi database → đóng modal → reload danh sách.
  - Đảm bảo xóa cả subtasks con (nếu có) khi xóa task cha.
  - Test lại: tạo task → mở modal chỉnh sửa → nhấn Delete → task bị xóa thành công.
- **File liên quan:** `index.html`
- **Trạng thái:** `[x]` Đã hoàn thành

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
- **Trạng thái:** `[x]` Đã hoàn thành

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
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 23. 👁 Login: Thêm nút Show/Hide Password
- **Mô tả:** Ở form đăng nhập (Sign In), người dùng chỉ thấy dấu chấm tròn khi nhập mật khẩu, không có cách nào xem lại mật khẩu đang nhập.
- **Yêu cầu:**
  - Thêm **icon mắt** ở bên phải ngoài cùng trường password trong form Sign In.
  - Click icon → toggle hiển thị mật khẩu (chuyển `type` giữa `password` và `text`).
  - Icon thay đổi trạng thái: mắt mở (đang hiện) / mắt đóng (đang ẩn).
- **File liên quan:** `index.html`
- **Trạng thái:** `[x]` Đã hoàn thành

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
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 25. 📊 Sửa thanh tiến độ (Progress Bar) cho to và dễ nhìn hơn
- **Mô tả:** Thanh tiến độ tuần ở trang chính hiện tại quá mỏng (1px), khó nhìn và không nổi bật.
- **Yêu cầu:**
  - Tăng chiều cao thanh `.progress-line-track` (ví dụ: từ `1px` lên `6px` hoặc `8px`).
  - Bo tròn thanh progress (`border-radius`).
  - Phần `.progress-fill` nên có gradient hoặc màu nổi bật hơn để dễ nhận biết tiến độ.
  - Text phần trăm (`progress-stats-text`) cũng cần tăng kích thước font cho dễ đọc.
- **File liên quan:** `index.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 26. 📅 Thu nhỏ thanh trượt chuyển tuần (Week Navigation)
- **Mô tả:** Thanh điều hướng tuần (week-nav-container) hiện tại hơi to, chiếm nhiều không gian trên header, cần thu gọn lại cho cân đối hơn.
- **Yêu cầu:**
  - Giảm `min-width` của `.week-nav-container` (ví dụ: từ `190px` xuống `160px`).
  - Giảm `padding` bên trong cho compact hơn.
  - Giảm `font-size` của `.week-nav-label` nếu cần.
  - Đảm bảo nút ‹ › và label vẫn dễ bấm và đọc được sau khi thu nhỏ.
- **File liên quan:** `index.html`
- **Trạng thái:** `[x]` Đã hoàn thành

---

### 27. 🗂️ Chỉnh Archive hiển thị dạng cột
- **Mô tả:** Phần Archive (hiển thị task đã hoàn thành) hiện tại liệt kê theo dạng danh sách dọc, cần chuyển sang dạng cột để dễ nhìn và so sánh hơn.
- **Yêu cầu:**
  - Chỉnh layout Archive thành dạng cột (grid hoặc multi-column).
  - Hiển thị rõ ràng tên task, ngày hoàn thành, project.
  - Giữ nút Restore cho mỗi task.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 28. ✏️ Sửa text "Good morning" thành "Hello" ở onboarding
- **Mô tả:** Đoạn text chào mừng khi người dùng mới vào lần đầu (chưa có project) hiện ghi "Good morning. Let's plan your week." — cần đổi thành "Hello".
- **Yêu cầu:**
  - Đổi text trong `.onboarding-header h2` từ "Good morning" → **"Hello"**.
  - Ví dụ: "Hello. Let's plan your week."
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 29. 🐛 Lỗi "Add task for this day" thêm task cho tất cả các ngày
- **Mô tả:** Khi ở Day Detail View, nhấn nút "Thêm task cho ngày này" nhưng task được thêm vào sai ngày hoặc cho tất cả các ngày thay vì chỉ ngày đang xem.
- **Yêu cầu:**
  - Kiểm tra biến `dayViewDate` có được truyền đúng vào `openNewTask()` khi nhấn nút thêm task trong Day View.
  - Đảm bảo `targetTaskDate` được gán chính xác là ngày đang xem trong Day Detail.
  - Test: mở Day View ngày Thứ Ba → thêm task → task chỉ xuất hiện ở Thứ Ba.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 30. 📊 Sửa Stats: chỉ tính task chính, không tính sub-task
- **Mô tả:** Panel Stats hiện tại đang đếm cả sub-task (task có `parent_id`) vào thống kê, dẫn đến số liệu không chính xác.
- **Yêu cầu:**
  - Trong hàm tính Stats, filter chỉ lấy task có `parent_id === null` (task chính).
  - Cập nhật cả phần per-day breakdown để chỉ đếm task chính.
  - Hiển thị: "X of Y tasks complete" — chỉ tính task chính.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 31. 🚫 Bỏ option "No Category / Personal" trong Project/Space dropdown
- **Mô tả:** Trong modal tạo/sửa task, dropdown "Project / Space" có option "-- No Category / Personal --" cho phép tạo task không thuộc project nào. Cần bỏ option này để ép người dùng phải chọn project.
- **Yêu cầu:**
  - Xóa option `-- No Category / Personal --` khỏi dropdown `taskSubjSelect`.
  - Nếu chưa có project nào → hiển thị thông báo yêu cầu tạo project trước.
  - Validate: không cho save task nếu chưa chọn project.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 32. 🐛 Lỗi logic Repeat: bỏ tick rồi tick lại tạo ra task trùng lặp
- **Mô tả:** Khi task có chế độ lặp lại (daily/weekly/monthly), nếu người dùng bỏ tick (uncheck done) rồi tick lại (check done), hệ thống tạo thêm task lặp mới mỗi lần → dẫn đến nhiều task giống nhau.
- **Yêu cầu:**
  - Trong `toggleTaskStatus()`, trước khi tạo task lặp mới, kiểm tra kỹ xem đã tồn tại task cùng `title` + cùng `date` (ngày tiếp theo) + chưa done hay chưa.
  - Nếu đã tồn tại → **không tạo thêm**, chỉ toast thông báo "Task lặp lại đã tồn tại".
  - Kiểm tra cả trường hợp task bị uncheck rồi check lại nhiều lần liên tục.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 33. 📊 Sửa thanh tiến độ trang chính: chỉ tính task chính, không tính sub-task
- **Mô tả:** Thanh tiến độ (progress bar) ở trang chính đang tính cả sub-task vào tổng số task và số task hoàn thành, dẫn đến phần trăm không chính xác.
- **Yêu cầu:**
  - Trong hàm `renderProgress()`, filter chỉ lấy task có `parent_id === null` hoặc `!t.parent_id`.
  - Cập nhật cả sidebar counts (`cntAll`, `cntPending`, `cntDone`) để chỉ đếm task chính.
  - Đảm bảo nhất quán: progress bar, sidebar counts, và Stats đều chỉ đếm task chính.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 34. 🔔 Sửa thời gian nhắc nhở Reminder: 24h, 12h, 1h, đến hạn
- **Mô tả:** Hiện tại reminder chỉ gửi thông báo trước 15 phút, 5 phút, và đúng giờ. Cần thay đổi thành các mốc thời gian lớn hơn: 24 giờ, 12 giờ, 1 giờ, và đến hạn.
- **Yêu cầu:**
  - Thay đổi logic trong `startNotificationDaemon()`:
    - Trước **24 giờ** → thông báo "24 hours remaining"
    - Trước **12 giờ** → thông báo "12 hours remaining"
    - Trước **1 giờ** → thông báo "1 hour remaining"
    - **Đúng giờ** → thông báo "DUE NOW"
  - Vẫn chỉ áp dụng cho task có `priority = 'urgent'`.
  - Cập nhật key tracking trong `notifiedTasks` Set cho các mốc mới.
- **File liên quan:** `index.html`
- **Trạng thái:** `[x]` Đã làm

---

### 35. ⏱️ Tăng thời gian hiển thị toast notification lên 7 giây
- **Mô tả:** Toast notification hiện tại biến mất quá nhanh (khoảng 3 giây), đặc biệt với thông báo reminder cần người dùng đọc kịp.
- **Yêu cầu:**
  - Tăng thời gian hiển thị toast từ `3000ms` lên **`7000ms`** (7 giây).
  - Hoặc tạo toast type riêng cho reminder với thời gian dài hơn, giữ toast thường ở 3-4 giây.
  - Đảm bảo animation `toastOut` vẫn mượt khi ẩn đi.
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 36. ➡️ Thêm nút "Next Week" bên cạnh "This Week"
- **Mô tả:** Hiện tại chỉ có nút "This Week" để nhảy về tuần hiện tại. Cần thêm nút "Next Week" bên cạnh để người dùng nhanh chóng chuyển sang tuần tiếp theo.
- **Yêu cầu:**
  - Thêm nút **"Next Week"** ngay bên cạnh nút "This Week" trên header.
  - Click → set `weekOffset = 1` và `renderAll()`.
  - Style giống nút "This Week" (dùng class `btn-tool`).
- **File liên quan:** `index.html`
- **Trạng thái:** `[ ]` Chưa làm

---

### 37. 🗑️ Bỏ toàn bộ phần Group trong file index
- **Mô tả:** File index hiện tại chứa nhiều code liên quan đến Team Groups (tạo group, join group, manage group, group members, group tasks...) nhưng không cần dùng. Cần xóa sạch để giảm file size và tránh nhầm lẫn.
- **Yêu cầu:**
  - Xóa toàn bộ HTML liên quan đến group: modal `groupOverlay`, sidebar group section (đã comment), các nút create/join group.
  - Xóa toàn bộ CSS liên quan đến group (nếu có riêng).
  - Xóa toàn bộ JS liên quan: `loadGroups()`, `groupMembersCache`, `renderManageGroupList()`, `selectManageGroup()`, `groupSaveBtn`, `groupLeaveBtn`, biến `groups`, `groupFilter`, `groupModalMode`, `activeManageGroupId`.
  - Cập nhật `loadAll()` để không gọi `loadGroups()`.
  - Cập nhật `subscribeRealtime()` để không subscribe bảng `groups` và `group_members`.
  - Cập nhật `populateSpaceDropdown()` để không hiện group options.
  - Test: đảm bảo app vẫn hoạt động bình thường sau khi xóa toàn bộ group code.
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
