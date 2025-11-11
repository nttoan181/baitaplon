
# OCR helper using pytesseract + Pillow. Requires tesseract binary installed on Windows.
try:
    import pytesseract
    from PIL import Image
except Exception:
    pytesseract = None
    Image = None

import re
import unicodedata

def extract_invoice_data(image_path: str) -> dict:
    filename = image_path.replace("\\", "/").split("/")[-1]
    if pytesseract is None or Image is None:
        raw = "(OCR unavailable - install pytesseract and pillow)"
        parsed = {"vendor": "", "tax_id": "", "total_amount": None, "date": ""}
        return {
            "filename": filename,
            "raw_text": raw,
            "vendor": "",
            "tax_id": "",
            "total_amount": None,
            "date": "",
            "parsed_json": parsed,
        }
    try:
        # You can tweak lang to 'vie+eng' if Vietnamese traineddata installed
        text = pytesseract.image_to_string(Image.open(image_path), lang="vie+eng")
    except Exception as e:
        text = f"(OCR error: {e})"

    vendor = ""
    tax_id = ""
    total = None
    date = ""

    # Normalize Unicode to NFC to avoid glyph issues with Vietnamese accents
    text = unicodedata.normalize('NFC', text)
    lines = text.splitlines()
    for line in lines:
        l = line.strip()
        if not l:
            continue
        low = l.lower()
        if "mã số" in low or "mst" in low or "tax" in low:
            tax_id = l
        if any(k in low for k in ["tổng", "total", "amount", "thanhtien", "thành tiền"]):
            nums = re.findall(r"[-+]?\d[\d\.,]*", l.replace(" ", ""))
            if nums:
                try:
                    num = nums[-1].replace(".", "").replace(",", ".")
                    total = float(num)
                except:
                    total = None
        if ("/" in l or "-" in l or "." in l) and any(c.isdigit() for c in l) and len(l) >= 6:
            date = l
        if not vendor and len(l) > 2 and len(l) < 100 and not any(word in low for word in ["số", "mst", "tổng", "total", "hóa", "invoice", "ngày", "date"]):
            vendor = l

    parsed = {"vendor": vendor, "tax_id": tax_id, "total_amount": total, "date": date}
    return {
        "filename": filename,
        "raw_text": text,
        "vendor": vendor,
        "tax_id": tax_id,
        "total_amount": total,
        "date": date,
        "parsed_json": parsed,
    }
