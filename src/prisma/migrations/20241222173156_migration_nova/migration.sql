/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `avaliacao` DROP FOREIGN KEY `Avaliacao_userId_fkey`;

-- DropForeignKey
ALTER TABLE `certificado` DROP FOREIGN KEY `Certificado_userId_fkey`;

-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_userId_fkey`;

-- DropForeignKey
ALTER TABLE `matricula` DROP FOREIGN KEY `Matricula_userId_fkey`;

-- DropForeignKey
ALTER TABLE `respostacomentario` DROP FOREIGN KEY `RespostaComentario_userId_fkey`;

-- DropForeignKey
ALTER TABLE `visualizacao` DROP FOREIGN KEY `Visualizacao_userId_fkey`;

-- DropIndex
DROP INDEX `Avaliacao_userId_fkey` ON `avaliacao`;

-- DropIndex
DROP INDEX `Certificado_userId_fkey` ON `certificado`;

-- DropIndex
DROP INDEX `Comentario_userId_fkey` ON `comentario`;

-- DropIndex
DROP INDEX `Matricula_userId_fkey` ON `matricula`;

-- DropIndex
DROP INDEX `RespostaComentario_userId_fkey` ON `respostacomentario`;

-- DropIndex
DROP INDEX `Visualizacao_userId_fkey` ON `visualizacao`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(255) NULL,
    `nome` VARCHAR(30) NOT NULL,
    `sobrenome` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified` DATETIME(3) NULL,
    `nomeUsuario` VARCHAR(30) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `privilegio` VARCHAR(50) NOT NULL,
    `bloqueado` BOOLEAN NOT NULL DEFAULT false,
    `dataNascimento` DATE NULL,
    `genero` VARCHAR(191) NULL,
    `sobre` TEXT NULL,
    `numeroTelefone` INTEGER UNSIGNED NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `conviteId` VARCHAR(191) NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_nomeUsuario_key`(`nomeUsuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `accounts_provider_provider_account_id_key`(`provider`, `provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_session_token_key`(`session_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Visualizacao` ADD CONSTRAINT `Visualizacao_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacao` ADD CONSTRAINT `Avaliacao_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificado` ADD CONSTRAINT `Certificado_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespostaComentario` ADD CONSTRAINT `RespostaComentario_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
