CREATE TABLE t_note (
	id int(12) auto_increment NOT NULL COMMENT 'note id',
	name varchar(100) NOT NULL COMMENT 'note name',
	CONSTRAINT t_note_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8;


CREATE TABLE t_document (
	id int(12) auto_increment NOT NULL COMMENT 'document id',
	note_id NUMERIC NOT NULL COMMENT 'note id',
	icon varchar(30) DEFAULT 'mdi-text-box-outline' NULL COMMENT 'document icon',
	file_name varchar(100) NULL COMMENT 'file name',
	document TEXT NOT NULL COMMENT 'document content',
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
	is_pushed char(1) DEFAULT '0' NOT NULL COMMENT 'has pushed to user  0-No  1-Yes',
	progress NUMERIC NOT NULL COMMENT 'accumulated score',
	gpt_answer TEXT NULL COMMENT 'gpt`s answer',
	CONSTRAINT t_question_pk PRIMARY KEY (id),
	CONSTRAINT t_question_FK FOREIGN KEY (document_id) REFERENCES t_document(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE t_record (
	id int(12) auto_increment NOT NULL COMMENT 'answer record id',
	question_id int(12) NOT NULL COMMENT 'question id',
	answer_time DATETIME NOT NULL COMMENT 'last answer time',
	score NUMERIC(3) DEFAULT 0 NULL COMMENT 'record answer score',
	is_answered char(1) DEFAULT '0' NOT NULL COMMENT 'has finished answer  0-No  1-Yes',
	CONSTRAINT t_record_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;




