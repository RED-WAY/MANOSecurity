CREATE DATABASE Man_OSecurity;

USE Man_OSecurity;

/* MySQL - WORKBENCH */

CREATE TABLE user (
	idUser INT PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(50),
	userEmail VARCHAR(50),
	userPassword VARBINARY(150),
	entryDate TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
	idPost INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100),
	fkUser INT,
	FOREIGN KEY (fkUser) REFERENCES user(idUser)
);

/*-----------------------------------------------------*/

/* SQL SERVER - AZURE */
CREATE TABLE user (
	idUser INT PRIMARY KEY IDENTITY(1,1),
	userName VARCHAR(50),
	userEmail VARCHAR(50),
	userPassword VARBINARY(150), /*VERIFY*/
	entryDate TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP /*VERIFY*/
);

CREATE TABLE post (
	idPost INT PRIMARY KEY IDENTITY(1,1),
	title VARCHAR(100),
	fkUser INT FOREIGN KEY REFERENCES user(idUser)
);
