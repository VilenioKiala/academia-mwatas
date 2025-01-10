/*
  Warnings:

  - You are about to drop the column `sobreOCcurso` on the `curso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `curso` DROP COLUMN `sobreOCcurso`,
    ADD COLUMN `sobreOCurso` TEXT NULL;
