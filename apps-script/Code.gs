/**
 * CHỤP BÀI → DRIVE: máy chủ nhỏ nhận file PDF bài làm từ app và lưu vào Google Drive.
 * App: https://vtthinh28.github.io/chup-bai-drive/
 * Hướng dẫn cài đặt: https://github.com/VTThinh28/chup-bai-drive#readme
 *
 * Bài được lưu theo cây thư mục:  <thư mục gốc> / <kỳ kiểm tra> / Lớp <lớp> / <STT> - <Họ tên>.pdf
 */

// (1) MÃ BÍ MẬT: đổi thành chuỗi riêng của thầy cô (ít nhất 6 kí tự). Nhập đúng mã này vào app.
const MA_BI_MAT = 'doi-ma-nay';

// (2) THƯ MỤC GỐC: để trống thì máy chủ tự tạo thư mục "Chụp bài (app)" trong My Drive.
//     Muốn dùng thư mục có sẵn: mở thư mục đó trên Drive, chép đoạn mã sau "/folders/" trên thanh địa chỉ,
//     dán vào giữa hai dấu nháy, ví dụ: const ID_THU_MUC_GOC = '1AbCdEfGhIjKlMnOpQrStUvWxYz012345';
const ID_THU_MUC_GOC = '';

const TEN_THU_MUC_GOC = 'Chụp bài (app)';
const PHIEN_BAN = '1.0';

function doGet() {
  return HtmlService.createHtmlOutput(
    '<div style="font:16px/1.5 sans-serif;padding:20px;max-width:560px">' +
    '<h3>Máy chủ "Chụp bài → Drive" đang chạy ✓</h3>' +
    '<p>Thầy cô chép địa chỉ của trang này (đuôi <b>/exec</b>) dán vào phần Cài đặt của app.</p></div>'
  ).setTitle('Chụp bài → Drive');
}

function doPost(e) {
  let req;
  try {
    req = JSON.parse(e.postData.contents);
  } catch (err) {
    return traLoi_({ ok: false, error: 'Dữ liệu gửi lên không đọc được.' });
  }
  if (MA_BI_MAT === 'doi-ma-nay' || String(MA_BI_MAT).length < 6) {
    return traLoi_({ ok: false, error: 'Máy chủ chưa đổi mã bí mật. Thầy cô sửa dòng MA_BI_MAT trong Code.gs rồi triển khai lại.' });
  }
  if (!req || req.key !== MA_BI_MAT) return traLoi_({ ok: false, error: 'Sai mã bí mật.' });
  try {
    switch (req.action) {
      case 'ping': {
        const goc = thuMucGoc_();
        return traLoi_({ ok: true, version: PHIEN_BAN, rootName: goc.getName(), rootUrl: goc.getUrl() });
      }
      case 'upload': return traLoi_(luuFile_(req));
      case 'delete': return traLoi_(xoaFile_(req));
      case 'list': return traLoi_(danhSach_(req));
      default: return traLoi_({ ok: false, error: 'Lệnh không hợp lệ.' });
    }
  } catch (err) {
    return traLoi_({ ok: false, error: 'Lỗi máy chủ: ' + (err && err.message ? err.message : String(err)) });
  }
}

/** Lưu một file (thường là PDF bài làm). File cùng tên trong thư mục lớp được bỏ vào thùng rác. */
function luuFile_(req) {
  const ten = sach_(req.name);
  if (!ten) return { ok: false, error: 'Thiếu tên file.' };
  if (!req.data) return { ok: false, error: 'Thiếu dữ liệu file.' };
  const lop = thuMucLop_(req.ky, req.lop);
  const blob = Utilities.newBlob(Utilities.base64Decode(req.data), req.mime || 'application/pdf', ten);
  const file = lop.createFile(blob);
  boFileTrung_(lop, ten, file.getId());
  if (req.oldName && sach_(req.oldName) !== ten) boFileTrung_(lop, sach_(req.oldName), '');
  return {
    ok: true, id: file.getId(), url: file.getUrl(), size: file.getSize(),
    folderId: lop.getId(), folderUrl: lop.getUrl()
  };
}

function xoaFile_(req) {
  const lop = thuMucLop_(req.ky, req.lop);
  return { ok: true, count: boFileTrung_(lop, sach_(req.name), '') };
}

function danhSach_(req) {
  const lop = thuMucLop_(req.ky, req.lop);
  const files = [];
  const it = lop.getFiles();
  while (it.hasNext()) {
    const f = it.next();
    if (f.isTrashed()) continue;
    files.push({ name: f.getName(), id: f.getId(), size: f.getSize(), time: f.getLastUpdated().getTime() });
  }
  return { ok: true, folderId: lop.getId(), folderUrl: lop.getUrl(), files: files };
}

function boFileTrung_(thuMuc, ten, giuLaiId) {
  if (!ten) return 0;
  let n = 0;
  const it = thuMuc.getFilesByName(ten);
  while (it.hasNext()) {
    const f = it.next();
    if (f.getId() !== giuLaiId && !f.isTrashed()) { f.setTrashed(true); n++; }
  }
  return n;
}

function thuMucGoc_() {
  if (ID_THU_MUC_GOC) return DriveApp.getFolderById(ID_THU_MUC_GOC);
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('ROOT_ID');
  if (id) {
    try {
      const f = DriveApp.getFolderById(id);
      if (!f.isTrashed()) return f;
    } catch (err) { /* thư mục đã bị xoá: tạo lại */ }
  }
  const root = DriveApp.getRootFolder();
  const it = root.getFoldersByName(TEN_THU_MUC_GOC);
  const f = it.hasNext() ? it.next() : root.createFolder(TEN_THU_MUC_GOC);
  props.setProperty('ROOT_ID', f.getId());
  return f;
}

function thuMucCon_(cha, ten) {
  const it = cha.getFoldersByName(ten);
  while (it.hasNext()) {
    const f = it.next();
    if (!f.isTrashed()) return f;
  }
  return cha.createFolder(ten);
}

function thuMucLop_(ky, lop) {
  const khoa = LockService.getScriptLock();
  khoa.waitLock(30000);
  try {
    const goc = thuMucGoc_();
    const thuMucKy = thuMucCon_(goc, sach_(ky) || 'Chưa đặt tên kỳ');
    return thuMucCon_(thuMucKy, 'Lớp ' + (sach_(String(lop || '').replace(/\//g, '-')) || 'chưa rõ'));
  } finally {
    khoa.releaseLock();
  }
}

function sach_(s) {
  return String(s == null ? '' : s)
    .replace(/[\\/:*?"<>|#%\u0000-\u001f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150);
}

function traLoi_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Chạy hàm này một lần trong trình soạn thảo (chọn kiemTra rồi bấm Chạy) để cấp quyền và xem thư mục lưu bài. */
function kiemTra() {
  const goc = thuMucGoc_();
  Logger.log('Thư mục lưu bài: ' + goc.getName() + ' → ' + goc.getUrl());
  if (MA_BI_MAT === 'doi-ma-nay') Logger.log('Nhớ đổi MA_BI_MAT trước khi triển khai.');
}
