CREATE DATABASE pets;
USE pets;

CREATE TABLE owner(
	owner_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(70) NOT NULL,
    owner_description VARCHAR(200) NOT NULL,
    phone_number VARCHAR (20) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
    owner_img VARCHAR(100),
    owner_is_deleted BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE pet(
	pet_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    owner_id INT UNSIGNED NOT NULL,
    pet_name VARCHAR(70) NOT NULL,
    pet_description VARCHAR(200) NOT NULL,
    adoption_year YEAR NOT NULL,
    species VARCHAR(50) NOT NULL,
    pet_img VARCHAR(100),
    pet_is_deleted BOOLEAN NOT NULL DEFAULT 0,
		CONSTRAINT fk_id_owner FOREIGN KEY (owner_id)
		REFERENCES owner(owner_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM owner;

SELECT * FROM pet;

ALTER TABLE pet ADD COLUMN pet_is_deleted BOOLEAN NOT NULL DEFAULT 0;