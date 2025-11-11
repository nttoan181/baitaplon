
const apiBase = '/api';
let currentPage = 1;
const pageSize = 25;
function el(id){ return document.getElementById(id); }
async function fetchInvoices(page = 1){
  const q = el('q').value;
  const invoice_id = el('invoice_id').value;
  const params = new URLSearchParams({
    page, size: pageSize,
    ...(q ? { q } : {}),
    ...(invoice_id ? { invoice_id } : {}),
  });
  const res = await fetch(`${apiBase}/invoices?${params.toString()}`);
  const data = await res.json();
  renderTable(data);
  renderActiveFilters({ q, invoice_id });
}
function renderTable(data){
  const tbody = el('table-body'); tbody.innerHTML = '';
  data.items.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-2">${row.id}</td>
      <td class="px-4 py-2">${row.filename}</td>
      <td class="px-4 py-2">${row.vendor || ''}</td>
      <td class="px-4 py-2">${row.tax_id || ''}</td>
      <td class="px-4 py-2">${row.total_amount ?? ''}</td>
      <td class="px-4 py-2">${row.date || ''}</td>
      <td class="px-4 py-2">${row.created_at || ''}</td>
      <td class="px-4 py-2">
        <button onclick="viewInvoice(${row.id})" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Xem</button>
        <button onclick="deleteInvoice(${row.id})" class="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  el('total-count').textContent = `Tổng: ${data.total}`;
  const pag = el('pagination'); pag.innerHTML = '';
  const totalPages = Math.ceil(data.total / data.size);
  for(let p=1;p<=Math.min(totalPages,10);p++){
    const btn = document.createElement('button');
    btn.textContent = p;
    btn.className = (p===data.page) ? 'px-3 py-1 bg-indigo-600 text-white rounded mr-1' : 'px-3 py-1 bg-slate-600 text-white rounded mr-1';
    btn.onclick = ()=>{ currentPage=p; fetchInvoices(p); };
    pag.appendChild(btn);
  }
}
function viewInvoice(id){ window.location.href = `/invoice/${id}`; }
function deleteInvoice(id){
  if(confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')){
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = 'Đang xóa...';
    
    fetch(`/api/invoice/${id}`, { method: 'DELETE' })
      .then(res => {
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if(data.status === 'ok'){
          alert('Xóa thành công!');
          fetchInvoices(currentPage);
        } else {
          alert('Lỗi: ' + (data.error || 'Không thể xóa'));
        }
      })
      .catch(e => {
        console.error('Delete error:', e);
        alert('Lỗi: ' + e.message);
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Xóa';
      });
  }
}
el('upload-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fileInput = el('file-input');
  if(!fileInput.files.length) return alert('Chọn file trước');
  const fd = new FormData();
  fd.append('file', fileInput.files[0]);
  const btn = el('upload-button');
  btn.disabled = true; btn.textContent = 'Uploading...';
  try{
    const r = await fetch(`${apiBase}/upload`, { method: 'POST', body: fd });
    const data = await r.json();
    alert('Upload xong. ID = ' + data.invoice.id);
    fileInput.value = '';
    fetchInvoices(currentPage);
  }catch(e){ alert('Upload lỗi: ' + e); } finally { btn.disabled = false; btn.textContent = 'Upload'; }
});
// show chosen file name
const fi = el('file-input');
if(fi){
  fi.addEventListener('change', ()=>{
    const nameEl = el('file-name');
    nameEl && (nameEl.textContent = fi.files.length ? fi.files[0].name : 'Chưa chọn file');
  });
}
el('filter-button').addEventListener('click', ()=>{ currentPage=1; fetchInvoices(1); });
el('clear-button').addEventListener('click', ()=>{ ['q','invoice_id'].forEach(id=>{ const x=el(id); if(x) x.value=''; }); currentPage=1; fetchInvoices(1); });
el('export-button').addEventListener('click', ()=>{
  const q = el('q').value;
  const invoice_id = el('invoice_id').value;
  const params = new URLSearchParams({
    ...(q ? { q } : {}),
    ...(invoice_id ? { invoice_id } : {}),
  });
  window.location = `/api/export?${params.toString()}`;
});
// removed sidebar toggle (not needed)
// Active filters badges
function renderActiveFilters(filters){
  const container = el('active-filters'); if(!container) return;
  container.innerHTML = '';
  Object.entries(filters).forEach(([k,v])=>{
    if(v){
      const span = document.createElement('span');
      span.className = 'inline-flex items-center bg-slate-100 border border-slate-300 text-slate-700 rounded px-2 py-1';
      span.textContent = `${k}: ${v}`;
      container.appendChild(span);
    }
  });
}

// Debounced typing on filters
let debounceTimer;
['q','invoice_id'].forEach(id=>{
  const input = el(id);
  input && input.addEventListener('input', ()=>{
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=>{ currentPage=1; fetchInvoices(1); }, 350);
  });
});

// initial load
fetchInvoices(1);
