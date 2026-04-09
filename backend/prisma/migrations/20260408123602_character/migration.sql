-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "character" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "onyomi" TEXT NOT NULL,
    "kunyomi" TEXT NOT NULL,
    "freq" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterToWord_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_character_key" ON "Character"("character");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");

-- CreateIndex
CREATE INDEX "_CharacterToWord_B_index" ON "_CharacterToWord"("B");

-- AddForeignKey
ALTER TABLE "_CharacterToWord" ADD CONSTRAINT "_CharacterToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToWord" ADD CONSTRAINT "_CharacterToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
