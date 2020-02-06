DROP DATABASE IF EXISTS checklist_db;
CREATE DATABASE checklist_db;
USE checklist_db;


CREATE TABLE tripEssentials
(
    id INT AUTO_INCREMENT PRIMARY KEY
    , title VARCHAR(100)
    , body VARCHAR(200)
);

CREATE TABLE skiEssentials;
(
    id INT AUTO_INCREMENT PRIMARY KEY
    , title VARCHAR(100)
    , body VARCHAR(200)
);

CREATE TABLE liquorEssentials;
(
    id INT AUTO_INCREMENT PRIMARY KEY
    , title VARCHAR(100)
    , body VARCHAR(200)
);

CREATE TABLE musicSudioEss;
(
    id INT AUTO_INCREMENT PRIMARY KEY
    , title VARCHAR(100)
    , body VARCHAR(200)
)


-- SELECT * FROM tripEssentials;
-- SELECT * FROM skiEssentials;
-- SELECT * FROM liquorEssentials;
-- SELECT * FROM musicSudioEss;

-- CREATE TABLE lists 
-- (
--     title VARCHAR(200)
--     , category VARCHAR(100)
--     -- return a string
--     , item VARCHAR(300) 
--     -- datatype.TEXT
-- )
