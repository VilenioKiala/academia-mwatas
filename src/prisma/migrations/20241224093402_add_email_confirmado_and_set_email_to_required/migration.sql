/*
  Warnings:

  - A unique constraint covering the columns `[emailConfirmado]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `emailConfirmado` BOOLEAN NULL DEFAULT false,
    MODIFY `email` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_emailConfirmado_key` ON `users`(`emailConfirmado`);
