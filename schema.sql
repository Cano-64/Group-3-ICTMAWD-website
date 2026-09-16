CREATE DATABASE IF NOT EXISTS bukluran_db;
USE bukluran_db;

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    badge VARCHAR(50) DEFAULT '',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    order_details TEXT NOT NULL,
    order_time VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO admins (id, username, email, password_hash)
VALUES (
    1,
    'admin',
    'admin@buklurancafe.com',
    '$2b$10$7R0P2yq5Lgq.9iCjYw1CceG9J1mXN8o.gD9Z3qB9Xb5zHwYq0Cqre'
);

INSERT IGNORE INTO menu_items (name, category, price, badge, description) VALUES
('Original Latte', 'latte', 85.00, 'Classic', 'Classic and comforting coffee drink made with espresso and velvety steamed milk.'),
('Caramel Macchiato Latte', 'latte', 85.00, 'Popular', 'Balanced espresso, creamy steamed milk, and sweet caramel drizzle.'),
('Hazelnut Brew Latte', 'latte', 85.00, '', 'Rich and nutty hazelnut brew, perfect for coffee lovers.'),
('Vanilla Blanca Latte', 'latte', 85.00, '', 'Silky espresso infusion with smooth vanilla notes.'),
('White Cappuccino Latte', 'latte', 85.00, '', 'Smooth and creamy blend of espresso, steamed milk, and light froth.'),
('Salted Caramel Latte', 'latte', 85.00, 'Best Seller', 'Smooth and velvety latte with balanced salted caramel notes.'),
('Barista''s Red Velvet Latte', 'latte', 100.00, 'Specialty', 'Velvety latte with rich red velvet notes.'),
('Barista''s Green Matcha Latte', 'latte', 100.00, 'Signature', 'Earthy and creamy green tea matcha latte.'),
('Original Amerikano', 'amerikano', 85.00, 'Pure Roast', 'Classic Americano with a clean, robust coffee finish.'),
('Caramel Macchiato Amerikano', 'amerikano', 85.00, '', 'Rich espresso combined with hot water and sweet caramel aroma.'),
('Wintermelon Milk Tea', 'milk-tea', 72.00, 'Top Seller', 'Creamy black tea beverage steeped with sweet wintermelon syrup.'),
('Okinawa Milk Tea', 'milk-tea', 72.00, 'Customer Pick', 'Fragrant milk tea infused with roasted brown sugar taste.'),
('Chocolate Frappe', 'frappe', 100.00, '', 'Blended icy cocoa confection with rich whipped topping.'),
('Java Chip Frappe', 'frappe', 100.00, 'Must Try', 'Rich espresso blend with chocolate chips and mocha sauce.'),
('Kiwi Fruit Tea', 'fruit-soda', 72.00, 'Chilled', 'Vibrant kiwi fruit tea notes for a refreshing drink.'),
('Kiwi Sparkling Soda', 'fruit-soda', 85.00, 'Fizzy', 'Bubbly sparkling soda with tangy kiwi fruit infusion.'),
('Butter Croissant', 'bakery', 95.00, 'Baked Daily', 'Flaky French butter pastry with crisp layers and honeycomb interior.'),
('Creamy Carbonara Pasta', 'bakery', 195.00, 'Main Dish', 'Al dente pasta tossed in rich egg-cream sauce, bacon, and parmesan.');