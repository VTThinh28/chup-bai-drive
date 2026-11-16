# Chụp bài → Drive

App chụp bài kiểm tra trên điện thoại. Mỗi em chụp 2–3 trang, app gộp các trang thành **một file PDF** mang số thứ tự và họ tên em đó, rồi lưu vào Google Drive của thầy cô. Chụp xong cả lớp, thầy cô gửi link thư mục lớp cho Claude để chấm.

**Mở app:** https://vtthinh28.github.io/chup-bai-drive/

## App làm gì

- Chạy ngay trên trình duyệt điện thoại (Chrome, Safari), không cần cài.
- Chọn kỳ kiểm tra, lớp, bấm tên em rồi chụp lần lượt từng trang.
- Khi chuyển sang em khác, app gộp các trang thành 1 file PDF, ví dụ `07 - Nguyễn Văn An.pdf`, và lưu lên Drive.
- File nằm theo cây thư mục: `Chụp bài (app) / GK1 / Lớp 6-7 /`.
- Chụp lại một trang thì app gửi lại file PDF mới, file cũ vào thùng rác Drive.
- Mất mạng vẫn chụp được. Có mạng lại, app tự gửi tiếp.
- Nhập danh sách lớp thẳng từ file Excel có cột "Họ và tên", hoặc dán danh sách.

## Cài đặt lần đầu (khoảng 10 phút, nên làm trên máy tính)

### Bước 1. Tạo máy chủ lưu bài trên Google Apps Script

1. Trên máy tính, mở app, bấm **⚙** (Cài đặt) → **Chép mã máy chủ**. App tự tạo một mã bí mật, điền sẵn vào mã máy chủ và chép toàn bộ mã.
2. Mở https://script.google.com bằng tài khoản Google muốn lưu bài, bấm **Dự án mới** (New project). Xoá hết mã có sẵn, dán mã vừa chép vào (Ctrl+V).
3. Bấm biểu tượng **Lưu**. Đặt tên dự án, ví dụ "Chụp bài → Drive".
4. Chọn hàm `kiemTra` trên thanh công cụ, bấm **Chạy** (Run). Google hỏi quyền: chọn tài khoản → **Nâng cao** (Advanced) → **Chuyển đến … (không an toàn)** → **Cho phép** (Allow). Đây là mã của chính thầy cô, chỉ chạy trong tài khoản của mình.
5. Bấm **Triển khai** (Deploy) → **Tùy chọn triển khai mới** (New deployment) → bánh răng cạnh "Chọn loại" → **Ứng dụng web** (Web app), rồi chọn:
   - Thực thi với tư cách (Execute as): **Tôi** (Me)
   - Người có quyền truy cập (Who has access): **Bất kỳ ai** (Anyone)
6. Bấm **Triển khai**. Chép **URL ứng dụng web**, dạng `https://script.google.com/macros/s/…/exec`.

Nút **Chép mã máy chủ** không dùng được thì chép tay: mở [mã máy chủ dạng văn bản thuần](https://raw.githubusercontent.com/VTThinh28/chup-bai-drive/main/apps-script/Code.gs), bấm Ctrl+A rồi Ctrl+C, dán vào script.google.com. Sửa dòng `const MA_BI_MAT = 'doi-ma-nay';` thành mã riêng, ví dụ `const MA_BI_MAT = 'ma-rieng-6789';` (ít nhất 6 kí tự, giữ nguyên hai dấu nháy), rồi gõ đúng mã đó vào ô **Mã bí mật** trong Cài đặt của app.

### Bước 2. Kết nối app với máy chủ

1. Quay lại app trên máy tính, mở **⚙ Cài đặt**, dán URL ở bước 1 vào ô **Địa chỉ máy chủ** (mã bí mật đã có sẵn), bấm **Lưu và kiểm tra**. Thấy "✓ Đã kết nối" là được.
2. Bấm **Mã QR cho điện thoại** và dùng camera điện thoại quét mã. App mở trên điện thoại với cài đặt có sẵn.
3. Thêm app ra màn hình chính cho tiện: Chrome → ⋮ → **Thêm vào màn hình chính**; Safari → nút Chia sẻ → **Thêm vào MH chính**.

### Bước 3. Nhập danh sách lớp

- **⚙ Cài đặt → Nhập từ file Excel**: chọn file danh sách có cột "Họ và tên". Mỗi trang tính là một lớp, app đoán tên lớp từ tên trang tính.
- Hoặc **Dán danh sách**: mỗi dòng một em, dán thẳng các dòng từ Excel cũng được.
- Thứ tự trong danh sách là số thứ tự trên tên file.

## Chụp bài

1. Chọn **Kỳ kiểm tra** (ví dụ GK1) và **Lớp**.
2. Bấm tên em (ô tìm kiếm gõ không dấu được) → **📷 Chụp trang 1**, **Chụp trang 2**…
3. Bấm **Em tiếp theo ›**. App gộp và lưu bài của em vừa chụp, rồi mở em kế tiếp chưa có ảnh.
4. Bài không có trong danh sách: bấm **＋ Bài không có trong danh sách**, tên file sẽ là `Thêm 01 - …`.
5. Chụp xong lớp: ở thẻ "Thư mục Drive", bấm **Chép link** và gửi cho Claude để chấm.

Mẹo chụp: đặt bài trên mặt bàn, chụp thẳng từ trên xuống, đủ sáng, không có bóng tay, thấy đủ 4 góc giấy. Bấm vào ảnh nhỏ để xem lớn, kiểm tra chữ có rõ không.

## Trạng thái của mỗi bài

| Trạng thái | Nghĩa |
|---|---|
| chưa lưu | Đang chụp em này, chưa gửi |
| chờ gửi, đang lưu | App đang gửi lên Drive |
| đã lưu ✓ | File PDF đã nằm trên Drive |
| lỗi | Bấm nút trạng thái trên cùng → **Thử lại tất cả**. Lỗi mạng thì app tự thử lại |

## Gặp lỗi

- **"Máy chủ trả về trang web thay vì dữ liệu"**: lúc triển khai chưa chọn "Bất kỳ ai", hoặc URL không có đuôi `/exec`.
- **"Sai mã bí mật"**: mã trong app khác dòng `MA_BI_MAT`.
- **"Máy chủ chưa đổi mã bí mật"**: mã dán vào script.google.com vẫn còn dòng `'doi-ma-nay'`. Bấm lại **Chép mã máy chủ** rồi dán đè, hoặc sửa tay dòng đó.
- **Sửa Code.gs sau khi đã triển khai** (đổi mã, đổi thư mục): **Triển khai → Quản lý các tùy chọn triển khai** (Manage deployments) → biểu tượng bút chì → Phiên bản: **Phiên bản mới** (New version) → **Triển khai**. URL giữ nguyên.
- **Muốn lưu vào thư mục có sẵn**: điền mã thư mục vào dòng `ID_THU_MUC_GOC` trong Code.gs, rồi triển khai phiên bản mới.
- **Đổi điện thoại**: mở app trên máy mới, quét lại mã QR, nhập lại danh sách lớp.

## Về dữ liệu

- Kho GitHub này chỉ chứa mã của app, không có tên học sinh hay ảnh bài làm.
- Ảnh tạm, danh sách lớp, địa chỉ máy chủ và mã bí mật chỉ lưu trong trình duyệt của máy đang dùng. Ảnh của các bài đã lưu lên Drive có thể dọn trong Cài đặt.
- File PDF lưu trong Google Drive của chính thầy cô. Máy chủ chỉ nhận lệnh khi có đúng mã bí mật.

## Dành cho chủ kho GitHub

App chạy trên GitHub Pages. Bật một lần: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, thư mục `/ (root)` → Save**. Khoảng 1–2 phút sau, app có ở địa chỉ `https://<tên-tài-khoản>.github.io/chup-bai-drive/`.

## Thành phần

- `index.html`: toàn bộ app. App tự gộp ảnh thành PDF, không dùng thư viện ngoài.
- `apps-script/Code.gs`: máy chủ nhỏ trên Google Apps Script, nhận file và lưu vào Drive.
- `vendor/qrcode.js`: tạo mã QR, thư viện [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) của Kazuhiko Arase, giấy phép MIT.
