CREATE TABLE "manufacturers" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "manufacturers_name_unique" UNIQUE("name"),
	CONSTRAINT "manufacturers_email_unique" UNIQUE("email"),
	CONSTRAINT "manufacturers_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"category" varchar(50) NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "product_categories_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE "product_specifications" (
	"label" varchar(255) NOT NULL,
	"product_id" integer
);
--> statement-breakpoint
CREATE TABLE "product_tags" (
	"product_id" integer NOT NULL,
	"product_category_id" integer NOT NULL,
	"updated_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "manufacturer_id" varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "main_image_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "product_specifications" ADD CONSTRAINT "product_specifications_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_product_category_id_product_categories_id_fk" FOREIGN KEY ("product_category_id") REFERENCES "public"."product_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;