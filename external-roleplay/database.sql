-- EXTERNAL ROLEPLAY Database Schema
-- GTA SAMP Roleplay Server Database

CREATE DATABASE IF NOT EXISTS external_roleplay;
USE external_roleplay;

-- Users/Players Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    character_name VARCHAR(100),
    money BIGINT DEFAULT 5000,
    bank_money BIGINT DEFAULT 0,
    level INT DEFAULT 1,
    exp INT DEFAULT 0,
    playtime INT DEFAULT 0, -- in minutes
    admin_level INT DEFAULT 0,
    vip_level INT DEFAULT 0,
    vip_expire DATETIME NULL,
    skin_id INT DEFAULT 0,
    health FLOAT DEFAULT 100.0,
    armor FLOAT DEFAULT 0.0,
    pos_x FLOAT DEFAULT 0.0,
    pos_y FLOAT DEFAULT 0.0,
    pos_z FLOAT DEFAULT 0.0,
    interior INT DEFAULT 0,
    virtual_world INT DEFAULT 0,
    job VARCHAR(50) DEFAULT 'Unemployed',
    faction VARCHAR(50) DEFAULT 'None',
    phone_number VARCHAR(20),
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_money (money),
    INDEX idx_level (level)
);

-- Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    model_id INT NOT NULL,
    vehicle_name VARCHAR(100),
    plate VARCHAR(20) UNIQUE,
    color1 INT DEFAULT 0,
    color2 INT DEFAULT 0,
    pos_x FLOAT DEFAULT 0.0,
    pos_y FLOAT DEFAULT 0.0,
    pos_z FLOAT DEFAULT 0.0,
    pos_a FLOAT DEFAULT 0.0,
    fuel FLOAT DEFAULT 100.0,
    health FLOAT DEFAULT 1000.0,
    locked BOOLEAN DEFAULT TRUE,
    price BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_owner (owner_id)
);

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NULL,
    property_name VARCHAR(100),
    property_type ENUM('house', 'business', 'warehouse') DEFAULT 'house',
    price BIGINT NOT NULL,
    pos_x FLOAT NOT NULL,
    pos_y FLOAT NOT NULL,
    pos_z FLOAT NOT NULL,
    interior INT DEFAULT 0,
    locked BOOLEAN DEFAULT TRUE,
    for_sale BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_owner (owner_id),
    INDEX idx_for_sale (for_sale)
);

-- Shop Items Table
CREATE TABLE IF NOT EXISTS shop_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    item_type ENUM('vip', 'vehicle', 'money', 'item', 'weapon') NOT NULL,
    description TEXT,
    price_idr DECIMAL(10, 2) NOT NULL,
    game_value BIGINT, -- For money packages or vehicle model ID
    duration_days INT, -- For VIP packages
    stock INT DEFAULT -1, -- -1 means unlimited
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (item_type),
    INDEX idx_active (is_active)
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    transaction_type ENUM('purchase', 'refund') DEFAULT 'purchase',
    amount_idr DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'success', 'failed', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(100) UNIQUE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES shop_items(id),
    INDEX idx_user (user_id),
    INDEX idx_status (payment_status),
    INDEX idx_created (created_at)
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_created (created_at)
);

-- Insert Sample Shop Items
INSERT INTO shop_items (item_name, item_type, description, price_idr, game_value, duration_days, is_active) VALUES
('VIP Bronze - 30 Days', 'vip', 'Akses fitur VIP Bronze selama 30 hari', 50000.00, 1, 30, TRUE),
('VIP Silver - 30 Days', 'vip', 'Akses fitur VIP Silver selama 30 hari', 100000.00, 2, 30, TRUE),
('VIP Gold - 30 Days', 'vip', 'Akses fitur VIP Gold selama 30 hari', 200000.00, 3, 30, TRUE),
('$100,000 In-Game Money', 'money', 'Dapatkan $100,000 uang in-game', 25000.00, 100000, NULL, TRUE),
('$500,000 In-Game Money', 'money', 'Dapatkan $500,000 uang in-game', 100000.00, 500000, NULL, TRUE),
('$1,000,000 In-Game Money', 'money', 'Dapatkan $1,000,000 uang in-game', 175000.00, 1000000, NULL, TRUE),
('Infernus Sports Car', 'vehicle', 'Mobil sport mewah Infernus', 150000.00, 411, NULL, TRUE),
('Bullet Super Car', 'vehicle', 'Super car Bullet tercepat', 200000.00, 541, NULL, TRUE),
('NRG-500 Motorcycle', 'vehicle', 'Motor sport NRG-500', 75000.00, 522, NULL, TRUE);

-- Insert Sample Users (for testing)
INSERT INTO users (username, password, email, character_name, money, bank_money, level, exp, playtime, admin_level, vip_level, skin_id, job, faction) VALUES
('admin', '$2a$10$rKvVLZ8L8Z8L8Z8L8Z8L8eKvVLZ8L8Z8L8Z8L8Z8L8Z8L8Z8L8Z8L8', 'admin@externalrp.com', 'Admin Master', 10000000, 50000000, 50, 99999, 5000, 5, 3, 217, 'Administrator', 'Government'),
('john_doe', '$2a$10$rKvVLZ8L8Z8L8Z8L8Z8L8eKvVLZ8L8Z8L8Z8L8Z8L8Z8L8Z8L8Z8L8', 'john@example.com', 'John Doe', 250000, 1000000, 15, 7500, 1200, 0, 2, 23, 'Mechanic', 'Civilian'),
('jane_smith', '$2a$10$rKvVLZ8L8Z8L8Z8L8Z8L8eKvVLZ8L8Z8L8Z8L8Z8L8Z8L8Z8L8Z8L8', 'jane@example.com', 'Jane Smith', 500000, 2500000, 25, 15000, 2400, 0, 3, 56, 'Police Officer', 'LSPD'),
('mike_wilson', '$2a$10$rKvVLZ8L8Z8L8Z8L8Z8L8eKvVLZ8L8Z8L8Z8L8Z8L8Z8L8Z8L8Z8L8', 'mike@example.com', 'Mike Wilson', 150000, 500000, 10, 5000, 800, 0, 1, 78, 'Taxi Driver', 'Civilian'),
('sarah_jones', '$2a$10$rKvVLZ8L8Z8L8Z8L8Z8L8eKvVLZ8L8Z8L8Z8L8Z8L8Z8L8Z8L8Z8L8', 'sarah@example.com', 'Sarah Jones', 750000, 3000000, 30, 20000, 3600, 0, 3, 141, 'Doctor', 'Medical'),
('alex_brown', '$2a$10$rKvVLZ8L8Z8L8Z8L8Z8L8eKvVLZ8L8Z8L8Z8L8Z8L8Z8L8Z8L8Z8L8', 'alex@example.com', 'Alex Brown', 100000, 250000, 8, 3500, 600, 0, 0, 134, 'Unemployed', 'None');
