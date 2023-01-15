-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('value');

-- CreateEnum
CREATE TYPE "GoalLevel" AS ENUM ('pessimist', 'realist', 'optimist');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentGoal" (
    "id" SERIAL NOT NULL,
    "type" "GoalType" NOT NULL,
    "level" "GoalLevel" NOT NULL,
    "monthlyApportValue" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "rentabilityTax" INTEGER NOT NULL,

    CONSTRAINT "InvestmentGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentGoal_type_level_key" ON "InvestmentGoal"("type", "level");
