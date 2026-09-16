const API_BASE = '/api';

async function getAllRecords(storeName) {
    const endpoint = storeName === 'menu' ? '/menu' : '/orders';
    const response = await fetch(`${API_BASE}${endpoint}`);
    const data = await response.json();
    if (storeName === 'submissions') {
        return data.map(item => ({
            id: item.id,
            timestamp: item.order_time,
            customer: item.customer_name,
            details: item.order_details
        }));
    }
    return data.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        badge: item.badge,
        desc: item.description
    }));
}

async function insertRecord(storeName, data) {
    const endpoint = storeName === 'menu' ? '/menu' : '/orders';
    const payload = storeName === 'menu' ? data : {
        customer: data.customer,
        details: data.details,
        timestamp: data.timestamp
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return await response.json();
}

async function removeRecord(storeName, id) {
    const endpoint = storeName === 'menu' ? `/menu/${id}` : `/orders/${id}`;
    await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE' });
}

// Authentication Handlers
const loginForm = document.getElementById('login-form');
const authPanel = document.getElementById('auth-panel');
const dashboardPanel = document.getElementById('dashboard-panel');
const authError = document.getElementById('auth-error');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = document.getElementById('admin-user').value.trim();
        const pass = document.getElementById('admin-pass').value;

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: user, password: pass })
            });
            const data = await res.json();

            if (data.success) {
                sessionStorage.setItem('bukluran_auth', 'true');
                if (authError) authError.style.display = 'none';
                renderApp();
            } else {
                if (authError) authError.style.display = 'block';
            }
        } catch {
            if (authError) authError.style.display = 'block';
        }
    });
}

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('bukluran_auth');
        renderApp();
    });
}

function renderApp() {
    if (!authPanel || !dashboardPanel) return;
    const isAuth = sessionStorage.getItem('bukluran_auth') === 'true';
    if (isAuth) {
        authPanel.classList.add('hidden');
        dashboardPanel.classList.remove('hidden');
        renderMenuList();
    } else {
        authPanel.classList.remove('hidden');
        dashboardPanel.classList.add('hidden');
    }
}

document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.target;
        const menuSection = document.getElementById('menu-manager');
        const ordersSection = document.getElementById('orders-manager');
        if (menuSection) menuSection.classList.toggle('hidden', target !== 'menu-manager');
        if (ordersSection) ordersSection.classList.toggle('hidden', target !== 'orders-manager');
        if (target === 'orders-manager') renderSubmissionsList();
    });
});

async function renderMenuList() {
    const tbody = document.getElementById('menu-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const items = await getAllRecords('menu');
    items.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.name}</strong><br><small style="color:var(--text-muted)">${item.desc || ''}</small></td>
            <td>${item.category}</td>
            <td>₱${Number(item.price).toFixed(2)}</td>
            <td>${item.badge ? `<span style="background:rgba(56,189,248,0.2);color:var(--accent-blue);padding:2px 6px;border-radius:4px;font-size:0.8rem">${item.badge}</span>` : '-'}</td>
            <td><button class="btn-danger" onclick="deleteMenuItem(${item.id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteMenuItem = async function (id) {
    await removeRecord('menu', id);
    renderMenuList();
};

const addMenuForm = document.getElementById('add-menu-form');
if (addMenuForm) {
    addMenuForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newItem = {
            name: document.getElementById('menu-name').value,
            category: document.getElementById('menu-category').value,
            price: parseFloat(document.getElementById('menu-price').value),
            badge: document.getElementById('menu-badge').value,
            desc: document.getElementById('menu-desc').value
        };
        await insertRecord('menu', newItem);
        addMenuForm.reset();
        renderMenuList();
    });
}

async function renderSubmissionsList() {
    const tbody = document.getElementById('submissions-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const submissions = await getAllRecords('submissions');
    submissions.forEach((entry) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${entry.timestamp}</td>
            <td>${entry.customer}</td>
            <td>${entry.details}</td>
            <td><button class="btn-danger" onclick="deleteSubmissionItem(${entry.id})">Clear</button></td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteSubmissionItem = async function (id) {
    await removeRecord('submissions', id);
    renderSubmissionsList();
};

renderApp();