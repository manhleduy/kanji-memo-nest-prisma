/*
  Warnings:

  - You are about to drop the `_CharacterToWord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CharacterToWord" DROP CONSTRAINT "_CharacterToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToWord" DROP CONSTRAINT "_CharacterToWord_B_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "words" TEXT[];

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "characters" TEXT[];

-- DropTable
DROP TABLE "_CharacterToWord";
