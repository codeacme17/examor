-- CreateTable
CREATE TABLE `TNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(30) NOT NULL DEFAULT 'mdi-text-box-outline',
    `uploadDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noteId` INTEGER NOT NULL,
    `fileName` VARCHAR(100) NULL,
    `isUploading` VARCHAR(5) NOT NULL DEFAULT '1',
    `questionCount` INTEGER NOT NULL DEFAULT 0,
    `uploadDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `TFile_noteId_idx`(`noteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noteId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,
    `fileName` VARCHAR(100) NULL,
    `document` TEXT NOT NULL,
    `uploadDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `tNoteId` INTEGER NULL,

    INDEX `TDocument_tNoteId_idx`(`tNoteId`),
    INDEX `TDocument_fileId_idx`(`fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(1000) NOT NULL,
    `documentId` INTEGER NOT NULL,
    `questionType` CHAR(20) NULL,
    `designatedRole` CHAR(20) NOT NULL,
    `pushDate` DATE NULL,
    `isPushedToday` CHAR(1) NOT NULL DEFAULT '0',
    `isAnsweredToday` CHAR(1) NOT NULL DEFAULT '0',
    `progress` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `lastAnswer` TEXT NULL,
    `uploadDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `TQuestion_documentId_idx`(`documentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionAmount` INTEGER NOT NULL DEFAULT 13,
    `currentRole` CHAR(20) NOT NULL DEFAULT 'examiner',
    `currentModel` CHAR(20) NOT NULL DEFAULT 'OpenAI',
    `openaiKey` VARCHAR(100) NOT NULL DEFAULT '',
    `openaiOrganization` CHAR(50) NOT NULL DEFAULT '',
    `openaiModel` CHAR(40) NOT NULL DEFAULT 'gpt-3.5-turbo',
    `openaiProxy` VARCHAR(100) NOT NULL DEFAULT '',
    `azureKey` VARCHAR(100) NOT NULL DEFAULT '',
    `openaiBase` VARCHAR(100) NOT NULL DEFAULT 'https://api.openai.com',
    `azureBase` VARCHAR(100) NOT NULL DEFAULT '',
    `openaiVersion` VARCHAR(100) NOT NULL DEFAULT '',
    `deploymentName` VARCHAR(100) NOT NULL DEFAULT '',
    `anthropicKey` VARCHAR(100) NOT NULL DEFAULT '',
    `anthropicVersion` VARCHAR(100) NOT NULL DEFAULT '',
    `anthropicModel` CHAR(40) NOT NULL DEFAULT '',
    `notionKey` CHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
