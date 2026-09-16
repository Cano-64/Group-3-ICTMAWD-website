const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/auth/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const [rows] = await pool.query(
            'SELECT * FROM admins WHERE username = ? OR email = ? LIMIT 1',
            [identifier, identifier]
        );

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        const admin = rows[0];
        const match = await bcrypt.compare(password, admin.password_hash);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        return res.json({
            success: true,
            user: { id: admin.id, username: admin.username, email: admin.email }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error during authentication.' });
    }
});

app.get('/api/menu', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM menu_items ORDER BY id DESC');
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve menu items.' });
    }
});

app.post('/api/menu', async (req, res) => {
    try {
        const { name, category, price, badge, desc } = req.body;
        if (!name || !category || price === undefined) {
            return res.status(400).json({ error: 'Name, category, and price are required.' });
        }

        const [result] = await pool.query(
            'INSERT INTO menu_items (name, category, price, badge, description) VALUES (?, ?, ?, ?, ?)',
            [name, category, parseFloat(price), badge || '', desc || '']
        );

        return res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create menu item.' });
    }
});

app.delete('/api/menu/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM menu_items WHERE id = ?', [id]);
        return res.json({ success: true, message: 'Item deleted.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete menu item.' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders ORDER BY id DESC');
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve orders.' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { customer, details, timestamp } = req.body;
        if (!customer || !details) {
            return res.status(400).json({ error: 'Customer name and details are required.' });
        }

        const [result] = await pool.query(
            'INSERT INTO orders (customer_name, order_details, order_time) VALUES (?, ?, ?)',
            [customer, details, timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })]
        );

        return res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to submit order.' });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM orders WHERE id = ?', [id]);
        return res.json({ success: true, message: 'Order cleared.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to clear order.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});