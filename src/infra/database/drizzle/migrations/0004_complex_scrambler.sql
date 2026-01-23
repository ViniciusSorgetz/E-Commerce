ALTER TABLE "product_images" ADD COLUMN "position" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "main_image_id";