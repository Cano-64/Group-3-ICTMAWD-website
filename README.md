
[setup guide.md](https://github.com/user-attachments/files/32311469/setup.guide.md)
# Bukluran Cafe Web Application

A full-stack web platform for Bukluran Cafe featuring an interactive digital catalog, live customer ordering drawer, and an administrative order/menu dashboard backed by Express, Node.js, and MySQL.

## 1. Prerequisites

Make sure the following tools are installed on your computer:

* [**Node.js**](https://nodejs.org/) (v18.x or higher)

* [**MySQL Server**](https://dev.mysql.com/downloads/mysql/) (v8.0+ or via XAMPP)

* [**Git**](https://git-scm.com/)

## 2. Quick Start Setup Guide (PowerShell / Windows)

Run these steps in order when setting up the project on any computer:

### Step 1: Open the Project Directory

Open **PowerShell** or the integrated terminal inside VS Code in your project root:

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

```

### Step 2: Install Dependencies

Download and restore all required packages (`express`, `mysql2`, `bcrypt`, `dotenv`, etc.):

```
npm install

```

### Step 3: Create the Environment File

Create your local environment configuration file from the template:

```
Copy-Item .env.example .env

```

Ensure your `.env` file matches your local MySQL configuration:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bukluran_db

```

*(Leave `DB_PASSWORD=` blank if your MySQL `root` account has no password).*

### Step 4: Ensure MySQL Service is Running

Make sure your MySQL database server is running:

```
net start mysql

```

*(If using XAMPP, open the XAMPP Control Panel and start the MySQL module).*

### Step 5: Import Database Tables and Catalog Data

Import the database schema and menu items into MySQL:

```
Get-Content schema.sql | C:\mysql\bin\mysql.exe -u root

```

*Note: If your MySQL CLI is installed in a different directory or is already added to your system `PATH`, you can simply run:*

```
Get-Content schema.sql | mysql -u root

```

### Step 6: Seed the Admin Account

Run this Node one-liner to generate the properly hashed password into the `admins` table:

```
node -e "const bcrypt = require('bcrypt'); const pool = require('./db'); bcrypt.hash('bukluran2026', 10).then(hash => pool.query('REPLACE INTO admins (id, username, email, password_hash) VALUES (1, \'admin\', \'admin@buklurancafe.com\', ?)', [hash])).then(() => { console.log('Admin account created successfully.'); process.exit(0); }).catch(err => { console.error(err); process.exit(1); });"

```

### Step 7: Launch the Server

Start the application:

```
npm start

```

Or directly:

```
node server.js

```

The terminal will confirm:

```
Server listening on port 3000

```

## 3. Web Pages and Access URLs

Once the server is running, open your web browser:

| **Page** | **URL** | **Description / Access** | 
| **Home** | `http://localhost:3000/index.html` | Landing page | 
| **Full Menu** | `http://localhost:3000/menu.html` | Interactive catalog with ordering drawer | 
| **Admin Portal** | `http://localhost:3000/admin.html` | Live order queue and catalog management | 

### Default Admin Credentials

* **Username:** `admin`

* **Email:** `admin@buklurancafe.com`

* **Password:** `bukluran2026`

## 4. Troubleshooting Common Issues

### 1. `npm : File ... cannot be loaded because running scripts is disabled`

PowerShell disables script execution by default on Windows. Run:

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

```

Then run `npm install` or `npm start` again.

### 2. `Error: Cannot find module 'express'`

The `node_modules` folder has not been installed yet. Run:

```
npm install

```

### 3. Blank Menu on `menu.html`

* Make sure `node server.js` is running.

* Ensure the database import completed without errors.

* Open your browser console (`F12` > Console) to inspect any client-side errors.

* Perform a hard refresh with `Ctrl + F5`.

### 4. Admin Login Says "Invalid credentials"

Run the one-line seeding script from **Step 6** above to guarantee the password hash is correctly stored without PowerShell shell variable interpolation.
