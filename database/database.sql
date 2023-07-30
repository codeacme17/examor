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
	file_name varchar(100) NULL COMMENT 'file name',
	document TEXT NOT NULL COMMENT 'document content',
	upload_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'record update time',
	CONSTRAINT t_document_pk PRIMARY KEY (id),
	CONSTRAINT t_document_FK FOREIGN KEY (note_id) REFERENCES t_note(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE t_question (
	id int(12) auto_increment NOT NULL COMMENT 'question id',
	content varchar(500) NOT NULL COMMENT 'question content',
	document_id int(12) NOT NULL COMMENT 'document id',
	is_pushed char(5) DEFAULT '0' NOT NULL COMMENT 'has pushed to user  0-No  1-Yes',
	is_answered_today char(1) DEFAULT '0' NOT NULL COMMENT 'has answered this quesiton at today to user  0-No  1-Yes',
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
  SET is_answered_today = '0'; 
END;
//
DELIMITER ;

CREATE TABLE t_record (
	id int(12) auto_increment NOT NULL COMMENT 'answer record id',
	question_id int(12) NOT NULL COMMENT 'question id',
	answer_time DATETIME NOT NULL COMMENT 'last answer time',
	score NUMERIC(3) DEFAULT 0 NULL COMMENT 'record answer score',
	is_answered char(5) DEFAULT '0' NOT NULL COMMENT 'has finished answer  0-No  1-Yes',
	CONSTRAINT t_record_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;




