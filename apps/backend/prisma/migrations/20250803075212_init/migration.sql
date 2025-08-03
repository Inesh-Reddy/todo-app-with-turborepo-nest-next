-- DropIndex
DROP INDEX "public"."User_id_key";

-- AlterTable
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."Todo_id_key";
