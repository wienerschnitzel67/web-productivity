CREATE DATABASE IF NOT EXISTS webtool;

USE webtool;

CREATE TABLE IF NOT EXISTS tasks (
                                     id INT NOT NULL AUTO_INCREMENT,
                                     task VARCHAR(255) NOT NULL,
                                     completed TINYINT(1) NOT NULL DEFAULT 0,
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     PRIMARY KEY (id)
);