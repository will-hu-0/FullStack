create database if not exists testdb
use testdb;
Show tables;


create table ids
	(
		Table1		varchar(30),
		ID 			int
	);
    
insert into ids values('Person', 0);
insert into ids values('Person_auths', 0);
insert into ids values('Post', 0);
insert into ids values('Group_or_Wall', 0);
insert into ids values('Comment', 0);
insert into ids values('Reply', 0);
insert into ids values('Chatbox', 0);
insert into ids values('Notification', 0);
    
create table if not exists Person
	(
		Person_ID		int auto_increment comment 'personId PK',
		First_name		varchar(50),
		Last_name		varchar(50),
		Date_of_birth		timestamp,
		Gender		numeric(2,0) NOT NULL,
		Mobile_no 	numeric(11,0) NOT NULL,
		Email		varchar(256) NOT NULL,
		Username		varchar(256) NOT NULL,
		Password		varchar(256) NOT NULL,
		Profile_picture		varchar(256),
		Address		varchar(256),
		Other_details		varchar(256),
		primary key (Person_ID)
	);
    
create table if not exists Person_auths
	(
		Auths_ID		int auto_increment comment 'authsId PK',
		Person_ID		int,
		Credential		varchar(256) NOT NULL,
		Identity_type	varchar(50) NOT NULL,
		Identifier		varchar(50) NOT NULL,
		primary key (Auths_ID),
        foreign key (Person_ID) references Person
			on delete Cascade
	);    
    
create table if not exists Post
	(
		Post_ID		int auto_increment comment 'postId PK',
		Text1		varchar(256),
		Image		varchar(256),
		Video		varchar(256),
		Link		varchar(256),
		Privacy		numeric(1,0),
		Time1		timestamp,
		primary key (Post_ID)
	);
    
create table if not exists Posted_By
	(
		Post_ID			int,
		Person_ID		int,
		primary key (Post_ID),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Post_ID) references Post
			on delete Cascade
	);
    
create table if not exists Group_or_Wall
	(
		Group_or_wall_id		int auto_increment comment 'groupOrWallIdPK',
		Name		varchar(50),
		Type		numeric(1,0),
		Group_description		varchar(256),
		Group_photo		varchar(100),
		primary key (Group_or_wall_id)
	);
    
create table if not exists Posted_on
	(
		Post_ID					int,
		Group_or_wall_id		int,	
		primary key (Post_ID),
		foreign key (Post_ID) references Post
			on delete Cascade,
		foreign key (Group_or_wall_id) references Group_or_Wall
			on delete Cascade	
	);
    
create table if not exists Follower
	(
		Person_ID		int	,
		Group_or_wall_id		int,	
		primary key (Person_ID, Group_or_wall_id),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Group_or_wall_id) references Group_or_Wall
			on delete Cascade	
	);
    
create table if not exists Admin
	(
		Person_ID		int,
		Group_or_wall_id		int,	
		primary key (Person_ID, Group_or_wall_id),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Group_or_wall_id) references Group_or_Wall
			on delete Cascade	
	);
    
create table if not exists Request
	(
		Person_ID		int,
		Group_or_wall_id		int,	
		primary key (Person_ID, Group_or_wall_id),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Group_or_wall_id) references Group_or_Wall
			on delete Cascade	
	);
    
create table if not exists Tag
	(
		Person_ID		int,
		Post_ID		int,
		primary key (Person_ID, Post_ID),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Post_ID) references Post
			on delete Cascade	
	);
    
create table if not exists Like1
	(
		Person_ID		int,
		Post_ID		int,
		primary key (Person_ID, Post_ID),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Post_ID) references Post
			on delete Cascade
	);

create table if not exists Comment
	(
		Comment_ID		int auto_increment comment 'commentId PK',
		Text1		varchar(256),
		Time1		timestamp,
		primary key (Comment_ID)
	);

create table if not exists Comment_on_by
	(
		Person_ID 	int,
		Comment_ID 	int,
		Post_ID		int,
		primary key (Comment_ID),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Comment_ID) references Comment
			on delete Cascade,
		foreign key (Post_ID) references Post
			on delete Cascade	
	);

create table if not exists Reply
	(
		Reply_ID		int auto_increment comment 'replyIdPK',
		Text1		varchar(256),
		Time1		timestamp,
		primary key (Reply_ID)
	);

create table if not exists Comment_Reply
	(
		Person_ID		int,
		Reply_ID		int,
		Comment_ID		int,
		primary key (Reply_ID),
		foreign key (Person_ID) references Person
			on delete Cascade,
		foreign key (Reply_ID) references Reply
			on delete Cascade,	
		foreign key (Comment_ID) references Comment
			on delete Cascade
	);

create table if not exists Chatbox
	(
		Chatbox_ID  int auto_increment comment 'chatBoxIdPK',
		Name  		varchar(256),
		primary key (chatbox_ID)
	);

create table if not exists Chatters 
	(
		Chatbox_ID 	int,
		Person_ID 	int,
		primary key (Chatbox_ID, Person_ID),
		foreign key (Chatbox_ID) references Chatbox
			on delete Cascade,
		foreign key (Person_ID) references Person
			on delete Cascade	
	);

create table if not exists Message 
	(
		Chatbox_ID 	int,
		Person_ID 	int,
		Time1 	timestamp,
		Message_text	varchar(256),
		primary key (Chatbox_ID , Person_ID, Time1),
		foreign key (Chatbox_ID) references Chatbox
			on delete Cascade,
		foreign key (Person_ID) references Person
			on delete Cascade	
	);

create table if not exists Notification
	(
		Notification_ID 	int auto_increment comment 'notificationId PK',
		Text1 				varchar(256),
		Seen_unseen 		numeric(1,0),
		Time1 				timestamp,
		primary key (Notification_ID)
	);

create table if not exists Notification_for
	(
		Notification_ID 	int,
		Person_ID 			int,
		primary key (Notification_ID) ,
		foreign key (Notification_ID) references Notification
			on delete Cascade,
		foreign key (Person_ID) references Person
			on delete Cascade
	);    
