-- CreateTable
CREATE TABLE "all_languages" (
    "id" SERIAL NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,

    CONSTRAINT "all_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllLanguagesData" (
    "name" TEXT NOT NULL,
    "language_id" INTEGER NOT NULL,
    "target_language_id" TEXT NOT NULL,

    CONSTRAINT "AllLanguagesData_pkey" PRIMARY KEY ("language_id","target_language_id")
);

-- CreateTable
CREATE TABLE "A" (
    "aId" TEXT NOT NULL,
    "b" INTEGER NOT NULL,

    CONSTRAINT "A_pkey" PRIMARY KEY ("aId")
);

-- CreateIndex
CREATE UNIQUE INDEX "all_languages_id_iso2_key" ON "all_languages"("id", "iso2");

-- AddForeignKey
ALTER TABLE "AllLanguagesData" ADD CONSTRAINT "AllLanguagesData_language_id_target_language_id_fkey" FOREIGN KEY ("language_id", "target_language_id") REFERENCES "all_languages"("id", "iso2") ON DELETE RESTRICT ON UPDATE CASCADE;
