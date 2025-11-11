
Invoice OCR Dashboard (Dark) - Vietnamese UI
-------------------------------------------
Run (Windows):
1. Extract this folder to a path without spaces, e.g., C:\projects\invoice-ocr
2. Create venv and activate:
   python -m venv venv
   .\venv\Scripts\Activate
3. Install requirements:
   pip install -r requirements.txt
4. Install Tesseract OCR (Windows): https://github.com/tesseract-ocr/tesseract/releases
   If tesseract.exe not in PATH, edit app/ocr_utils.py and set pytesseract.pytesseract.tesseract_cmd
5. Run server:
   python -m uvicorn app.main:app --reload
6. Open http://127.0.0.1:8000
