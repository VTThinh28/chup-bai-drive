# Chụp bài → Drive

App chụp bài kiểm tra trên điện thoại. Mỗi bài có 2–3 trang, app gộp các trang thành **một file PDF** (Bài 01, Bài 02…) và lưu vào Google Drive của thầy cô. Chụp xong, thầy cô gửi link thư mục cho Claude để chấm. Claude đọc tên học sinh ngay trên bài làm.

**Mở app:** https://vtthinh28.github.io/chup-bai-drive/

## App làm gì

- Chạy ngay trên trình duyệt điện thoại (Chrome, Safari), không cần cài.
- Thầy cô chọn học kì, gõ tên bài kiểm tra và lớp (hoặc phòng thi), rồi bấm **Chụp bài mới**.
- Mỗi bài thành 1 file PDF: `Bài 01.pdf`, `Bài 02.pdf`…
- File nằm theo cây thư mục: `Chụp bài (app) / HK1 - Giữa kì / Lớp 6-7 /`.
- Chụp lại một trang thì app gửi lại file PDF mới, file cũ vào thùng rác Drive.
- Mất mạng vẫn chụp được. Có mạng lại, app tự gửi tiếp.

## Cài đặt lần đầu (khoảng 10 phút, nên làm trên máy tính)

### Bước 1. Tạo máy chủ lưu bài trên Google Apps Script

1. Trên máy tính, mở app, bấm **⚙** (Cài đặt) → **Chép mã máy chủ**. App tự tạo một mã bí mật, điền sẵn vào mã máy chủ và chép toàn bộ mã.
2. Mở https://script.google.com bằng tài khoản Google muốn lưu bài, bấm **Dự án mới** (New project). Xoá hết mã có sẵn, dán mã vừa chép vào (Ctrl+V).
3. Bấm biểu tượng **Lưu**. Đặt tên dự án, ví dụ "Chụp bài → Drive".
4. Chọn hàm `kiemTra` trên thanh công cụ, bấm **Chạy** (Run). Google báo "chưa xác minh ứng dụng": bấm **Nâng cao** (Advanced) → dòng có chữ **(không an toàn)** → tick **Chọn tất cả** nếu có → **Cho phép** (Allow). Đây là mã của chính thầy cô, chỉ chạy trong tài khoản của mình. Nhật ký hiện dòng "Thư mục lưu bài: Chụp bài (app) → …" là được.
5. Bấm **Triển khai** (Deploy) → **Tùy chọn triển khai mới** (New deployment) → bánh răng cạnh "Chọn loại" → **Ứng dụng web** (Web app), rồi chọn:
   - Thực thi với tư cách (Execute as): **Tôi** (Me)
   - Người có quyền truy cập (Who has access): **Bất kỳ ai** (Anyone)
6. Bấm **Triển khai**. Chép **URL ứng dụng web**, dạng `https://script.google.com/macros/s/…/exec`.

Nút **Chép mã máy chủ** không dùng được thì chép tay: mở [mã máy chủ dạng văn bản thuần](https://raw.githubusercontent.com/VTThinh28/chup-bai-drive/main/apps-script/Code.gs), bấm Ctrl+A rồi Ctrl+C, dán vào script.google.com. Sửa dòng `const MA_BI_MAT = 'doi-ma-nay';` thành mã riêng, ví dụ `const MA_BI_MAT = 'ma-rieng-6789';` (ít nhất 6 kí tự, giữ nguyên hai dấu nháy), rồi gõ đúng mã đó vào ô **Mã bí mật** trong Cài đặt của app.

### Bước 2. Kết nối app với máy chủ

1. Quay lại app trên máy tính, mở **⚙ Cài đặt**, dán URL ở bước 1 vào ô **Địa chỉ máy chủ** (mã bí mật đã có sẵn), bấm **Lưu và kiểm tra**. Thấy "✓ Đã kết nối" là được.
2. Bấm **Mã QR cho điện thoại** và dùng camera điện thoại quét mã. App mở trên điện thoại với cài đặt có sẵn.
3. Thêm app ra màn hình chính cho tiện: Chrome → ⋮ → **Thêm vào màn hình chính**; Safari → nút Chia sẻ → **Thêm vào MH chính**.

## Chụp bài

1. Chọn **Học kì 1** hoặc **Học kì 2**. Gõ tên **bài kiểm tra** (ví dụ "Giữa kì Toán 6") và **lớp hoặc phòng** (ví dụ 6/7, Phòng 12).
2. Bấm **📷 Chụp bài mới**. Camera mở ngay, chụp trang 1. Bấm **Chụp trang 2**, **Chụp trang 3**…
3. Bấm **Bài tiếp theo ›**. App gộp và lưu bài vừa chụp, rồi mở camera cho bài kế tiếp.
4. Chụp xong, bấm **Xong**. Ở màn hình chính, bấm **Chép link thư mục** và gửi cho Claude để chấm.

Mẹo chụp: đặt bài trên mặt bàn, chụp thẳng từ trên xuống, đủ sáng, không có bóng tay, thấy đủ 4 góc giấy. Bấm vào ảnh nhỏ để xem lớn, kiểm tra chữ có rõ không.

## Trạng thái của mỗi bài

| Trạng thái | Nghĩa |
|---|---|
| chưa lưu | Đang chụp bài này, chưa gửi |
| đang xử lý ảnh | App đang thu nhỏ ảnh vừa chụp. Thầy cứ chụp tiếp, không cần chờ |
| chờ gửi, đang lưu | App đang gửi lên Drive |
| đã lưu ✓ | File PDF đã nằm trên Drive |
| lỗi | Bấm nút trạng thái trên cùng → **Thử lại tất cả**. Lỗi mạng thì app tự thử lại |

## Gặp lỗi

- **"Máy chủ trả về trang web thay vì dữ liệu"**: lúc triển khai chưa chọn "Bất kỳ ai", hoặc URL không có đuôi `/exec`.
- **"Sai mã bí mật"**: mã trong app khác dòng `MA_BI_MAT`.
- **"Máy chủ chưa đổi mã bí mật"**: mã dán vào script.google.com vẫn còn dòng `'doi-ma-nay'`. Bấm lại **Chép mã máy chủ** rồi dán đè, hoặc sửa tay dòng đó.
- **Sửa Code.gs sau khi đã triển khai** (đổi mã, đổi thư mục): **Triển khai → Quản lý các tùy chọn triển khai** (Manage deployments) → biểu tượng bút chì → Phiên bản: **Phiên bản mới** (New version) → **Triển khai**. URL giữ nguyên.
- **Muốn lưu vào thư mục có sẵn**: điền mã thư mục vào dòng `ID_THU_MUC_GOC` trong Code.gs, rồi triển khai phiên bản mới.
- **Đổi điện thoại**: mở app trên máy mới, quét lại mã QR trong Cài đặt của máy đang dùng.

## Về dữ liệu

- Kho GitHub này chỉ chứa mã của app, không có ảnh bài làm hay tên học sinh.
- Ảnh tạm, địa chỉ máy chủ và mã bí mật chỉ lưu trong trình duyệt của máy đang dùng. Ảnh của các bài đã lưu lên Drive có thể dọn trong Cài đặt.
- File PDF lưu trong Google Drive của chính thầy cô. Máy chủ chỉ nhận lệnh khi có đúng mã bí mật.

## Dành cho chủ kho GitHub

App chạy trên GitHub Pages. Bật một lần: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, thư mục `/ (root)` → Save**. Khoảng 1–2 phút sau, app có ở địa chỉ `https://<tên-tài-khoản>.github.io/chup-bai-drive/`.

## Thành phần

- `index.html`: toàn bộ app. App tự gộp ảnh thành PDF, không dùng thư viện ngoài.
- `apps-script/Code.gs`: máy chủ nhỏ trên Google Apps Script, nhận file và lưu vào Drive.
- `vendor/qrcode.js`: tạo mã QR, thư viện [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) của Kazuhiko Arase, giấy phép MIT.
