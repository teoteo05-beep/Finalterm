# đŸ“‹ Workflow â€” Káº¿ Hoáº¡ch PhĂ¡t Triá»ƒn Dá»± Ăn Planner

> TĂ i liá»‡u nĂ y liá»‡t kĂª cĂ¡c cĂ´ng viá»‡c cáº§n triá»ƒn khai cho dá»± Ă¡n **Planner** (file `index11.html` vĂ  `group.html`).  
> Cáº­p nháº­t láº§n cuá»‘i: 2026-06-18 â€” ThĂªm má»¥c 10 â†’ 18

---

## Danh SĂ¡ch CĂ´ng Viá»‡c

### 1. đŸ‘¤ Thiáº¿u chá»©c nÄƒng cá»§a User (mÅ©i tĂªn bĂªn cáº¡nh tĂªn tĂ i khoáº£n)
- **MĂ´ táº£:** Hiá»‡n táº¡i khi click vĂ o mÅ©i tĂªn â–¼ cáº¡nh tĂªn tĂ i khoáº£n, khĂ´ng cĂ³ dropdown menu hiá»‡n ra.
- **YĂªu cáº§u:**
  - Táº¡o dropdown menu khi click vĂ o `user-chip` (avatar + email + mÅ©i tĂªn).
  - Ná»™i dung dropdown gá»“m: Ä‘á»•i máº­t kháº©u, Ä‘Äƒng xuáº¥t.
  - ÄĂ³ng dropdown khi click ra ngoĂ i.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[x]` ÄĂ£ hoĂ n thĂ nh

---

### 2. đŸ› Lá»—i End Week
- **MĂ´ táº£:** NĂºt "End Week â†º" (hiá»‡n Ä‘ang Ä‘Æ°á»£c dĂ¹ng nhÆ° nĂºt logout) hoáº¡t Ä‘á»™ng khĂ´ng Ä‘Ăºng â€” nĂ³ Ä‘Äƒng xuáº¥t ngÆ°á»i dĂ¹ng thay vĂ¬ thá»±c hiá»‡n chá»©c nÄƒng káº¿t thĂºc tuáº§n.
- **YĂªu cáº§u:**
  - TĂ¡ch riĂªng chá»©c nÄƒng **End Week** vĂ  **Logout**.
  - Chá»©c nÄƒng End Week: Ä‘Ă¡nh dáº¥u táº¥t cáº£ task cá»§a tuáº§n hiá»‡n táº¡i lĂ  Ä‘Ă£ káº¿t thĂºc / lÆ°u láº¡i thá»‘ng kĂª tuáº§n, sau Ä‘Ă³ chuyá»ƒn sang tuáº§n má»›i.
  - ThĂªm nĂºt Logout riĂªng vĂ o dropdown menu cá»§a user.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[x]` ÄĂ£ hoĂ n thĂ nh

---

### 3. â• Thiáº¿u Sub-task trong Create New Project
- **MĂ´ táº£:** Khi táº¡o project má»›i (modal "Create a Project List"), khĂ´ng cĂ³ trÆ°á»ng nháº­p sub-task / checklist con.
- **YĂªu cáº§u:**
  - ThĂªm pháº§n **Sub-tasks** vĂ o modal táº¡o project.
  - Cho phĂ©p thĂªm / xĂ³a sub-task Ä‘á»™ng báº±ng nĂºt "+" vĂ  "Ă—".
  - LÆ°u sub-task vĂ o database cĂ¹ng vá»›i project.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 4. đŸ• Sá»­a láº¡i logo Due Time
- **MĂ´ táº£:** Icon/label cho trÆ°á»ng "Due Time" trong modal táº¡o task khĂ´ng rĂµ rĂ ng hoáº·c chÆ°a Ä‘Ăºng chuáº©n thiáº¿t káº¿.
- **YĂªu cáº§u:**
  - Cáº­p nháº­t icon vĂ  nhĂ£n cá»§a trÆ°á»ng Due Time trong modal task (cáº£ `index11.html` vĂ  `group.html`).
  - Sá»­ dá»¥ng icon Ä‘á»“ng há»“ â° thá»‘ng nháº¥t, label rĂµ rĂ ng: "Thá»i gian Ä‘áº¿n háº¡n".
  - Äáº£m báº£o hiá»ƒn thá»‹ badge thá»i gian trĂªn task card nháº¥t quĂ¡n vá»›i thiáº¿t káº¿.
- **File liĂªn quan:** `index11.html`, `group.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 5. đŸ” ThĂªm pháº§n Láº·p láº¡i (HĂ ng ngĂ y / HĂ ng tuáº§n / HĂ ng thĂ¡ng)
- **MĂ´ táº£:** Task hiá»‡n táº¡i chá»‰ cĂ³ thá»ƒ táº¡o má»™t láº§n, chÆ°a há»— trá»£ láº·p láº¡i tá»± Ä‘á»™ng.
- **YĂªu cáº§u:**
  - ThĂªm trÆ°á»ng **Repeat** vĂ o modal táº¡o/sá»­a task vá»›i cĂ¡c tĂ¹y chá»n:
    - KhĂ´ng láº·p láº¡i (máº·c Ä‘á»‹nh)
    - HĂ ng ngĂ y (Daily)
    - HĂ ng tuáº§n (Weekly)
    - HĂ ng thĂ¡ng (Monthly)
  - Khi sang tuáº§n/thĂ¡ng má»›i, task láº·p láº¡i sáº½ tá»± Ä‘á»™ng Ä‘Æ°á»£c táº¡o láº¡i.
  - Hiá»ƒn thá»‹ badge "đŸ” Daily / Weekly / Monthly" trĂªn task card náº¿u task cĂ³ láº·p láº¡i.
- **File liĂªn quan:** `index11.html`, `group.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 6. đŸ” Chá»©c nÄƒng Search Task chá»‰ hoáº¡t Ä‘á»™ng trong tuáº§n Ä‘ang hiá»ƒn thá»‹
- **MĂ´ táº£:** Ă” tĂ¬m kiáº¿m hiá»‡n táº¡i tĂ¬m toĂ n bá»™ task, cáº§n giá»›i háº¡n chá»‰ tĂ¬m trong tuáº§n Ä‘ang Ä‘Æ°á»£c hiá»ƒn thá»‹.
- **YĂªu cáº§u:**
  - Filter káº¿t quáº£ tĂ¬m kiáº¿m theo `weekOffset` hiá»‡n táº¡i (chá»‰ hiá»‡n task thuá»™c 7 ngĂ y cá»§a tuáº§n Ä‘ang xem).
  - Khi ngÆ°á»i dĂ¹ng chuyá»ƒn tuáº§n, tá»± Ä‘á»™ng xĂ³a / cáº­p nháº­t káº¿t quáº£ tĂ¬m kiáº¿m.
  - Hiá»ƒn thá»‹ sá»‘ lÆ°á»£ng káº¿t quáº£ tĂ¬m tháº¥y bĂªn cáº¡nh Ă´ search.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 7. đŸ“ Hiá»‡n Note á»Ÿ pháº§n trĂªn pháº§n lá»‹ch náº¿u cĂ³ â€” Äá»•i tĂªn thĂ nh Sub-task
- **MĂ´ táº£:** Pháº§n "Notes / Context details" trong task cáº§n Ä‘Æ°á»£c Ä‘á»•i tĂªn thĂ nh "Sub-task" vĂ  hiá»ƒn thá»‹ rĂµ rĂ ng hÆ¡n á»Ÿ phĂ­a trĂªn pháº§n lá»‹ch (day column header).
- **YĂªu cáº§u:**
  - Äá»•i tĂªn label "Notes" â†’ **"Sub-task"** trong cáº£ modal vĂ  task card.
  - Náº¿u task cĂ³ ná»™i dung sub-task, hiá»ƒn thá»‹ preview ngáº¯n phĂ­a trĂªn (header) cá»§a cá»™t ngĂ y tÆ°Æ¡ng á»©ng hoáº·c trong tháº» task card vá»›i icon đŸ“ rĂµ rĂ ng hÆ¡n.
  - Cho phĂ©p sub-task cĂ³ thá»ƒ cĂ³ dáº¡ng checklist (bullet points) náº¿u Ä‘Æ°á»£c nháº­p theo dĂ²ng.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 8. đŸ”¥ ThĂªm pháº§n Priority Task in Day
- **MĂ´ táº£:** Má»—i ngĂ y cáº§n cĂ³ má»™t section riĂªng Ä‘á»ƒ Ä‘Ă¡nh dáº¥u cĂ¡c task Ä‘Æ°á»£c Æ°u tiĂªn cao nháº¥t trong ngĂ y Ä‘Ă³.
- **YĂªu cáº§u:**
  - ThĂªm trÆ°á»ng **Priority** vĂ o modal táº¡o/sá»­a task vá»›i cĂ¡c má»©c: Normal, High, Urgent.
  - Trong cá»™t ngĂ y (`day-col`), hiá»ƒn thá»‹ section **"Priority Tasks"** á»Ÿ Ä‘áº§u, chá»©a cĂ¡c task cĂ³ priority cao.
  - CĂ¡c task Urgent hiá»ƒn thá»‹ vá»›i mĂ u accent/Ä‘á» ná»•i báº­t, High hiá»ƒn thá»‹ vá»›i mĂ u vĂ ng cáº£nh bĂ¡o.
  - Badge priority hiá»ƒn thá»‹ trĂªn task card.
- **File liĂªn quan:** `index11.html`, `group.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 9. đŸ”” LĂ m pháº§n Nháº¯c nhá»Ÿ (Reminder)
- **MĂ´ táº£:** Há»‡ thá»‘ng nháº¯c nhá»Ÿ chá»§ Ä‘á»™ng cho task quan trá»ng, chá»‰ kĂ­ch hoáº¡t khi task cĂ³ Priority = **Urgent**.
- **YĂªu cáº§u:**
  - **Push Notification (Browser):** Gá»­i thĂ´ng bĂ¡o trĂ¬nh duyá»‡t khi Ä‘áº¿n gáº§n giá» Ä‘áº¿n háº¡n cá»§a task Urgent (trÆ°á»›c 15 phĂºt, 5 phĂºt, Ä‘Ăºng giá»).
  - **Email Reminder:** Gá»­i email nháº¯c nhá»Ÿ khi task Urgent sáº¯p Ä‘áº¿n háº¡n. TĂ­ch há»£p vá»›i Supabase Edge Function hoáº·c dá»‹ch vá»¥ email.
  - NgÆ°á»i dĂ¹ng pháº£i cáº¥p quyá»n thĂ´ng bĂ¡o Ä‘á»ƒ nháº­n Push Notification.
  - Chá»‰ task cĂ³ `priority = 'urgent'` má»›i kĂ­ch hoáº¡t reminder.
  - Hiá»ƒn thá»‹ badge "đŸ”” Reminder ON" trĂªn task card khi reminder Ä‘ang active.
  - TrĂ¡nh gá»­i duplicate notification (dĂ¹ng Set Ä‘á»ƒ tracking).
- **File liĂªn quan:** `index11.html`, `group.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 10. đŸ·ï¸ Pháº§n tĂªn tĂ i khoáº£n hiá»ƒn thá»‹ chÆ°a rĂµ rĂ ng tĂªn Gmail
- **MĂ´ táº£:** Hiá»‡n táº¡i tĂªn ngÆ°á»i dĂ¹ng trĂªn header bá»‹ cáº¯t ngáº¯n quĂ¡ nhiá»u (chá»‰ hiá»‡n 5 kĂ½ tá»± Ä‘áº§u cá»§a pháº§n trÆ°á»›c @), khiáº¿n ngÆ°á»i dĂ¹ng khĂ³ nháº­n biáº¿t há» Ä‘ang Ä‘Äƒng nháº­p báº±ng tĂ i khoáº£n nĂ o.
- **YĂªu cáº§u:**
  - TÄƒng sá»‘ kĂ½ tá»± hiá»ƒn thá»‹ cá»§a email (hiá»‡n táº¡i `substring(0, 5)` â†’ má»Ÿ rá»™ng hoáº·c hiá»ƒn thá»‹ Ä‘áº§y Ä‘á»§).
  - ThĂªm tooltip/title hiá»ƒn thá»‹ email Ä‘áº§y Ä‘á»§ khi hover vĂ o tĂªn tĂ i khoáº£n.
  - CĂ¢n chá»‰nh max-width cá»§a `.user-email-txt` cho phĂ¹ há»£p, trĂ¡nh trĂ n layout.
  - Äá»‹nh dáº¡ng hiá»ƒn thá»‹: Æ°u tiĂªn hiá»‡n pháº§n trÆ°á»›c `@` Ä‘áº§y Ä‘á»§, cáº¯t ngáº¯n náº¿u quĂ¡ dĂ i (vĂ­ dá»¥: `nguyenvanaâ€¦` thay vĂ¬ `nguye`).
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 11. đŸ“¦ ThĂªm Ä‘Æ°á»ng viá»n Ä‘áº­m ná»•i báº­t cho ngĂ y hiá»‡n táº¡i á»Ÿ trang chĂ­nh
- **MĂ´ táº£:** Box cá»™t ngĂ y hĂ´m nay (`day-col.today`) chÆ°a Ä‘á»§ ná»•i báº­t so vá»›i cĂ¡c ngĂ y khĂ¡c, ngÆ°á»i dĂ¹ng khĂ³ nháº­n ra ngĂ y hiá»‡n táº¡i trong lÆ°á»›i 7 ngĂ y.
- **YĂªu cáº§u:**
  - ThĂªm `border` dĂ y vĂ  mĂ u accent rĂµ nĂ©t (vĂ­ dá»¥: `2px solid var(--accent)`) cho `.day-col.today`.
  - CĂ³ thá»ƒ thĂªm `box-shadow` vá»›i mĂ u accent Ä‘á»ƒ táº¡o hiá»‡u á»©ng phĂ¡t sĂ¡ng nháº¹.
  - Giá»¯ hiá»‡u á»©ng gradient ná»n hiá»‡n táº¡i, káº¿t há»£p thĂªm Ä‘Æ°á»ng viá»n Ä‘á»ƒ tá»•ng thá»ƒ nhĂ¬n áº¥n tÆ°á»£ng hÆ¡n.
  - Äáº£m báº£o hiá»‡u á»©ng váº«n Ä‘áº¹p trĂªn cáº£ dark mode vĂ  light mode.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 12. đŸ—‚ï¸ XĂ³a vĂ  sá»­a tĂªn Personal Project
- **MĂ´ táº£:** Hiá»‡n táº¡i khĂ´ng cĂ³ tĂ¹y chá»n Ä‘á»ƒ xĂ³a hoáº·c Ä‘á»•i tĂªn project sau khi Ä‘Ă£ táº¡o trong sidebar.
- **YĂªu cáº§u:**
  - ThĂªm nĂºt **XĂ³a** (delete) vĂ  **Sá»­a tĂªn** (rename) cho tá»«ng project trong danh sĂ¡ch sidebar.
  - Khi xĂ³a: hiá»ƒn thá»‹ confirm dialog trÆ°á»›c khi xĂ³a, cĂ¡c task thuá»™c project bá»‹ xĂ³a cáº§n Ä‘Æ°á»£c xá»­ lĂ½ (xĂ³a theo hoáº·c unassign).
  - Khi sá»­a tĂªn: má»Ÿ inline input hoáº·c modal nhá» Ä‘á»ƒ Ä‘á»•i tĂªn vĂ  chá»n láº¡i mĂ u.
  - Cáº­p nháº­t realtime lĂªn Supabase sau khi xĂ³a / sá»­a.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 13. đŸ“„ TĂ¡ch file: index, login
- **MĂ´ táº£:** Hiá»‡n táº¡i toĂ n bá»™ mĂ n hĂ¬nh auth (login/signup) vĂ  mĂ n hĂ¬nh app Ä‘á»u náº±m trong cĂ¹ng 1 file `index11.html`, gĂ¢y khĂ³ báº£o trĂ¬ vĂ  debug.
- **YĂªu cáº§u:**
  - TĂ¡ch `login.html` riĂªng: chá»©a mĂ n hĂ¬nh Ä‘Äƒng nháº­p / Ä‘Äƒng kĂ½.
  - `index11.html` chá»‰ chá»©a app chĂ­nh (sau khi Ä‘Ă£ Ä‘Äƒng nháº­p).
  - Khi chÆ°a Ä‘Äƒng nháº­p â†’ redirect sang `login.html`; khi Ä‘Äƒng nháº­p thĂ nh cĂ´ng â†’ redirect sang `index11.html`.
  - Äáº£m báº£o theme, Supabase config Ä‘Æ°á»£c dĂ¹ng chung hoáº·c import nháº¥t quĂ¡n.
- **File liĂªn quan:** `index11.html` â†’ tĂ¡ch thĂ nh `index11.html` + `login.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 14. đŸ“… ThĂªm thá»i gian rĂµ rĂ ng dÆ°á»›i thanh Week Range
- **MĂ´ táº£:** Thanh Ä‘iá»u hÆ°á»›ng tuáº§n hiá»‡n chá»‰ hiá»ƒn thá»‹ khoáº£ng ngĂ y dáº¡ng "1 thg 6 - 7 thg 6", chÆ°a cĂ³ chá»‰ thá»‹ tÆ°Æ¡ng Ä‘á»‘i Ä‘á»ƒ ngÆ°á»i dĂ¹ng hiá»ƒu mĂ¬nh Ä‘ang á»Ÿ tuáº§n nĂ o so vá»›i hiá»‡n táº¡i.
- **YĂªu cáº§u:**
  - ThĂªm nhĂ£n tÆ°Æ¡ng Ä‘á»‘i phĂ­a dÆ°á»›i hoáº·c bĂªn cáº¡nh week range, hiá»ƒn thá»‹ theo quy táº¯c:
    - `weekOffset === 0` â†’ **"This week"**
    - `weekOffset === -1` â†’ **"1w earlier"**
    - `weekOffset === -2` â†’ **"2w earlier"**
    - `weekOffset === 1` â†’ **"Next week"**
    - `weekOffset === 2` â†’ **"+2w"**
    - `weekOffset >= 3` â†’ **"+Nw"**
  - NhĂ£n tÆ°Æ¡ng Ä‘á»‘i hiá»ƒn thá»‹ nhá» bĂªn dÆ°á»›i `.week-nav-label`, dĂ¹ng font mono, mĂ u `--ink-faint`.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 15. â ï¸ Cáº£nh bĂ¡o khi thĂªm task cĂ³ thá»i gian < thá»i Ä‘iá»ƒm hiá»‡n táº¡i
- **MĂ´ táº£:** Hiá»‡n táº¡i ngÆ°á»i dĂ¹ng cĂ³ thá»ƒ thĂªm task vá»›i due time Ä‘Ă£ qua (trong quĂ¡ khá»©) mĂ  khĂ´ng cĂ³ cáº£nh bĂ¡o nĂ o.
- **YĂªu cáº§u:**
  - Khi ngÆ°á»i dĂ¹ng chá»n date + due_time trong modal táº¡o task, náº¿u thá»i Ä‘iá»ƒm Ä‘Ă³ < `Date.now()` thĂ¬ hiá»ƒn thá»‹ cáº£nh bĂ¡o inline (mĂ u vĂ ng/cam) trong modal: *"â ï¸ Thá»i gian nĂ y Ä‘Ă£ qua â€” task sáº½ Ä‘Æ°á»£c Ä‘Ă¡nh dáº¥u lĂ  trá»… háº¡n."*
  - Váº«n cho phĂ©p lÆ°u task (khĂ´ng cháº·n), chá»‰ cáº£nh bĂ¡o.
  - Cáº£nh bĂ¡o tá»± áº©n khi ngÆ°á»i dĂ¹ng chá»‰nh láº¡i thá»i gian há»£p lá»‡.
- **File liĂªn quan:** `index11.html`, `group.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 16. đŸ› Sá»­a lá»—i Delete khĂ´ng hoáº¡t Ä‘á»™ng sau khi thĂªm task
- **MĂ´ táº£:** Sau khi thĂªm task má»›i, nĂºt xĂ³a (âœ•) trĂªn task card khĂ´ng pháº£n há»“i â€” cĂ³ thá»ƒ do event listener bá»‹ máº¥t sau khi re-render DOM.
- **YĂªu cáº§u:**
  - Kiá»ƒm tra vĂ  Ä‘áº£m báº£o event listener Ä‘Æ°á»£c gĂ¡n láº¡i Ä‘Ăºng cĂ¡ch sau má»—i láº§n `renderGrid()` Ä‘Æ°á»£c gá»i.
  - TrĂ¡nh dĂ¹ng `innerHTML` trá»±c tiáº¿p lĂ m máº¥t listener; Æ°u tiĂªn `addEventListener` sau khi táº¡o element.
  - Test láº¡i sau khi fix: thĂªm task â†’ xĂ³a task â†’ khĂ´ng bá»‹ lá»—i.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 17. đŸƒ Chá»‰nh láº¡i giao diá»‡n hiá»ƒn thá»‹ task card
- **MĂ´ táº£:** Task card hiá»‡n hiá»ƒn thá»‹ quĂ¡ nhiá»u thĂ´ng tin (due time, notes, project tag, move button...). Khi task description quĂ¡ dĂ i, card bá»‹ vá»¡ layout.
- **YĂªu cáº§u:**
  - TrĂªn task card trong lÆ°á»›i 7 ngĂ y, **chá»‰ hiá»ƒn thá»‹:** tĂªn task (`Task description`) vĂ  project tag (`Assign to Project`).
  - áº¨n badge due time, badge notes, nĂºt move khá»i card máº·c Ä‘á»‹nh (cĂ³ thá»ƒ hiá»‡n khi hover náº¿u cáº§n).
  - **Task description** bá»‹ giá»›i háº¡n hiá»ƒn thá»‹ tá»‘i Ä‘a **2 dĂ²ng** (`-webkit-line-clamp: 2`), pháº§n dÆ° hiá»ƒn thá»‹ `â€¦`.
  - Layout card chá»‰ má»Ÿ rá»™ng theo **chiá»u ngang** (khĂ´ng tÄƒng chiá»u cao khi ná»™i dung dĂ i).
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

### 18. đŸ“– Trang chi tiáº¿t ngĂ y (Day Detail Page)
- **MĂ´ táº£:** Khi ngÆ°á»i dĂ¹ng click vĂ o má»™t ngĂ y trong lÆ°á»›i 7 ngĂ y, cáº§n hiá»ƒn thá»‹ trang/panel riĂªng cho ngĂ y Ä‘Ă³ thay vĂ¬ xem toĂ n bá»™ tuáº§n.
- **YĂªu cáº§u:**
  - Click vĂ o header ngĂ y (`day-col-head`) â†’ má»Ÿ **Day Detail View** (cĂ³ thá»ƒ lĂ  panel trÆ°á»£t tá»« pháº£i hoáº·c trang má»›i).
  - Day Detail View bao gá»“m:
    - **TiĂªu Ä‘á»:** TĂªn ngĂ y + ngĂ y thĂ¡ng Ä‘áº§y Ä‘á»§ (vĂ­ dá»¥: *"Thá»© Ba â€” 18 thĂ¡ng 6, 2026"*).
    - **Thanh tiáº¿n Ä‘á»™:** % task hoĂ n thĂ nh trong ngĂ y Ä‘Ă³.
    - **Danh sĂ¡ch task chi tiáº¿t:** hiá»ƒn thá»‹ Ä‘áº§y Ä‘á»§ title, project, due time, notes/sub-task, priority, tráº¡ng thĂ¡i done.
    - **NĂºt thĂªm task** cho ngĂ y Ä‘Ă³.
  - NĂºt **"â† Back"** Ä‘á»ƒ quay láº¡i lÆ°á»›i tuáº§n.
- **File liĂªn quan:** `index11.html`
- **Tráº¡ng thĂ¡i:** `[ ]` ChÆ°a lĂ m

---

## Thá»© Tá»± Æ¯u TiĂªn Triá»ƒn Khai

| STT | CĂ´ng viá»‡c | Äá»™ Æ°u tiĂªn | Äá»™ phá»©c táº¡p | File |
|-----|-----------|------------|-------------|------|
| 1 | Sá»­a láº¡i logo Due Time | đŸ”´ Cao | â­ Dá»… | index11, group |
| 2 | Lá»—i End Week | đŸ”´ Cao | â­â­ Trung bĂ¬nh | index11 |
| 3 | Chá»©c nÄƒng User dropdown | đŸŸ¡ Trung bĂ¬nh | â­â­ Trung bĂ¬nh | index11 |
| 4 | Priority Task in Day | đŸŸ¡ Trung bĂ¬nh | â­â­ Trung bĂ¬nh | index11, group |
| 5 | Search chá»‰ trong tuáº§n hiá»‡n táº¡i | đŸŸ¡ Trung bĂ¬nh | â­â­ Trung bĂ¬nh | index11 |
| 6 | Äá»•i Note â†’ Sub-task | đŸŸ¢ Tháº¥p | â­ Dá»… | index11 |
| 7 | Sub-task trong Create Project | đŸŸ¢ Tháº¥p | â­â­â­ KhĂ³ | index11 |
| 8 | Láº·p láº¡i hĂ ng ngĂ y/tuáº§n/thĂ¡ng | đŸŸ¢ Tháº¥p | â­â­â­ KhĂ³ | index11, group |
| 9 | Nháº¯c nhá»Ÿ (Reminder) | đŸŸ¢ Tháº¥p | â­â­â­ KhĂ³ | index11, group |
| 10 | TĂªn Gmail hiá»ƒn thá»‹ rĂµ rĂ ng hÆ¡n | đŸ”´ Cao | â­ Dá»… | index11 |
| 11 | Viá»n Ä‘áº­m ná»•i báº­t ngĂ y hiá»‡n táº¡i | đŸ”´ Cao | â­ Dá»… | index11 |
| 12 | XĂ³a vĂ  sá»­a tĂªn Personal Project | đŸ”´ Cao | â­â­ Trung bĂ¬nh | index11 |
| 13 | TĂ¡ch file index + login | đŸ”´ Cao | â­â­ Trung bĂ¬nh | index11 |
| 14 | NhĂ£n tÆ°Æ¡ng Ä‘á»‘i dÆ°á»›i Week Range | đŸ”´ Cao | â­ Dá»… | index11 |
| 15 | Cáº£nh bĂ¡o task quĂ¡ khá»© | đŸŸ¡ Trung bĂ¬nh | â­ Dá»… | index11, group |
| 16 | Sá»­a lá»—i Delete sau thĂªm task | đŸ”´ Cao | â­â­ Trung bĂ¬nh | index11 |
| 17 | Chá»‰nh giao diá»‡n task card | đŸŸ¡ Trung bĂ¬nh | â­â­ Trung bĂ¬nh | index11 |
| 18 | Trang chi tiáº¿t ngĂ y | đŸŸ¡ Trung bĂ¬nh | â­â­â­ KhĂ³ | index11 |

---

## Ghi chĂº ká»¹ thuáº­t

- **Database (Supabase):** Má»™t sá»‘ tĂ­nh nÄƒng (repeat, priority, sub-task) cáº§n thĂªm cá»™t má»›i vĂ o báº£ng `tasks` vĂ  cĂ³ thá»ƒ cáº§n migration.
- **Columns cáº§n thĂªm vĂ o báº£ng `tasks`:**
  - `priority` â€” enum: `'normal' | 'high' | 'urgent'`
  - `repeat_mode` â€” enum: `'none' | 'daily' | 'weekly' | 'monthly'`
  - `sub_tasks` â€” `text` hoáº·c `jsonb` (danh sĂ¡ch sub-task)
- **Email Reminder:** Cáº§n tĂ­ch há»£p Supabase Edge Function + SendGrid / Resend Ä‘á»ƒ gá»­i email.
- **Push Notification:** DĂ¹ng Web Notifications API (`Notification`), yĂªu cáº§u HTTPS hoáº·c localhost.
