-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeConnectClientId" TEXT,
ADD COLUMN     "stripePublishableKey" TEXT,
ADD COLUMN     "stripeSecretKey" TEXT;
