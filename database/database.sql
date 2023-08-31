CREATE TABLE t_note (
	id int(12) auto_increment NOT NULL COMMENT 'note id',
	name varchar(100) NOT NULL COMMENT 'note name',
	icon varchar(30) DEFAULT 'mdi-text-box-outline' NULL COMMENT 'document icon',
	upload_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'record update time',
	CONSTRAINT t_note_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8;

CREATE TABLE t_file (
	id int(12) auto_increment NOT NULL COMMENT 'file id',
	note_id int(12) NOT NULL COMMENT 'note id',
	file_name varchar(100) NULL COMMENT 'file name',
	is_uploading varchar(5) DEFAULT "1" NULL COMMENT 'is the file uploading 0-No  1-Yes',
	upload_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'record update time',
	CONSTRAINT t_file_pk PRIMARY KEY (id),
	CONSTRAINT t_file_FK FOREIGN KEY (note_id) REFERENCES t_note(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE t_document (
	id int(12) auto_increment NOT NULL COMMENT 'document id',
	note_id int(12) NOT NULL COMMENT 'note id',
	file_id int(12) NOT NULL COMMENT 'file id',
	file_name varchar(100) NULL COMMENT 'file name',
	document TEXT NOT NULL COMMENT 'document content',
	upload_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'record update time',
	CONSTRAINT t_document_pk PRIMARY KEY (id),
	CONSTRAINT t_document_FK FOREIGN KEY (file_id) REFERENCES t_file(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE t_question (
	id int(12) auto_increment NOT NULL COMMENT 'question id',
	content varchar(500) NOT NULL COMMENT 'question content',
	document_id int(12) NOT NULL COMMENT 'document id',
	designated_role char(20) NOT NULL COMMENT 'role when generating this question',
	push_date DATE DEFAULT NULL COMMENT 'date the question needs to be asked',
	is_pushed_today char(1) DEFAULT '0' NOT NULL COMMENT 'has pushed this quesiton at today to user  0-No  1-Yes',
	is_answered_today char(1) DEFAULT '0' NOT NULL COMMENT 'user has answered this quesiton at today 0-No  1-Yes',
	progress NUMERIC DEFAULT 0 NOT NULL COMMENT 'accumulated score',
	last_answer TEXT NULL COMMENT 'record the last time answer',
	upload_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'record update time',
	CONSTRAINT t_question_pk PRIMARY KEY (id),
	CONSTRAINT t_question_FK FOREIGN KEY (document_id) REFERENCES t_document(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

DELIMITER //
CREATE EVENT update_is_answered_today_event
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:00')
DO
BEGIN
  UPDATE t_question
  SET is_pushed_today = '0', 
			is_answered_today = '0'; 
END;
//
DELIMITER ;

CREATE TABLE t_profile (
	id int(12) auto_increment NOT NULL COMMENT 'profile id',
	questionAmount int(12) DEFAULT 7 NOT NULL COMMENT 'how many questions need push to user',
	currentRole char(20) DEFAULT "examniner" NOT NULL COMMENT 'the role',
	currentModel char(20) DEFAULT "OpenAI" NOT NULL COMMENT 'the model',
	openaiKey varchar(100) DEFAULT "" COMMENT 'openai key',
	openaiOrganization char(50) DEFAULT "" COMMENT 'openai organization',
	openaiProxy varchar(100) DEFAULT "" COMMENT 'the proxy url of openai',
	azureKey varchar(100) DEFAULT "" COMMENT 'azure key',
	openaiBase varchar(100) DEFAULT "" COMMENT 'openai api base',
	azureBase varchar(100) DEFAULT "" COMMENT 'openai api base for azure',
	openaiVersion varchar(100) DEFAULT "" COMMENT 'openai version',
	deploymentName varchar(100) DEFAULT "" COMMENT 'deployment name',
	notionKey char(50) DEFAULT "" COMMENT '',
	CONSTRAINT t_profile_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;




