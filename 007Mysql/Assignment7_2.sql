show databases;
create database if not exists testdb;
use testdb;
create table if not exists users(
	user_id INT auto_increment comment 'userId PK',
    username VARCHAR(256) NOT NULL,
    email VARCHAR(256),
    password VARCHAR(256) NOT NULL,
    Primary Key (user_id),
    UNIQUE KEY (username) USING BTREE
);

Select count(*) from relationship where (user_one_id = 1 and user_two_id = 2 and status = 1) 
OR (user_one_id = 2 and user_two_id = 1 and status = 1);

Select count(*) from relationship where (user_one_id = 1 and user_two_id = 7 and status = 1) 
OR (user_one_id = 7 and user_two_id = 1 and status = 1);

Select user_two_id from relationship where user_one_id = 1 and status = 1;

Select user_one_id from relationship where user_two_id = 1 and status = 1;

Select * from users where user_id in (
 (Select user_two_id from relationship where user_one_id = 1 and status = 1)
    UNION
    (Select user_one_id from relationship where user_two_id = 1 and status = 1)
);

Select * from users where user_id in (
 Select user_two_id from relationship where user_one_id = 1 and status = 1
)
OR user_id in (
    Select user_one_id from relationship where user_two_id = 1 and status = 1
);

-- 6
select * from relationship where user_two_id = 1 and status = 0;

-- 7
select status from relationship where user_one_id = 1 and user_two_id = 7;
