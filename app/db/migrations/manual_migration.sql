-- Подключаемся к базе данных
CREATE DATABASE IF NOT EXISTS db_hustlebustle;
USE db_hustlebustle;

-- Создаем таблицу tasks
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Создаем индекс для ускорения поиска
CREATE INDEX idx_tasks_title ON tasks(title);
