-- CreateTable
CREATE TABLE "EmailVerificationLinks" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EmailVerificationLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationLinks_email_key" ON "EmailVerificationLinks"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationLinks_userId_key" ON "EmailVerificationLinks"("userId");

-- AddForeignKey
ALTER TABLE "EmailVerificationLinks" ADD CONSTRAINT "EmailVerificationLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
