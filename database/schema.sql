set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "sneakers" (
	"productId" serial NOT NULL,
	"brand" TEXT NOT NULL,
	"model" TEXT NOT NULL,
	"gender" TEXT NOT NULL,
	"sku" TEXT NOT NULL,
	"price" TEXT NOT NULL,
	"imageUrl" TEXT,
	CONSTRAINT "sneakers_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"address2" TEXT,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zipCode" TEXT NOT NULL,
	"country" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orders" (
	"orderId" serial NOT NULL,
	"userId" integer NOT NULL,
	"totalCost" integer NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "inventory" (
	"productId" integer NOT NULL,
	"size" text NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "inventory_pk" PRIMARY KEY ("productId","size")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cart" (
	"cartId" serial NOT NULL,
	"userId" integer NOT NULL,
	"totalCost" text NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cartItems" (
	"cartItemsId" serial NOT NULL,
	"cartId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"size" text NOT NULL,
	CONSTRAINT "cartItems_pk" PRIMARY KEY ("cartItemsId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orderItems" (
	"orderItemsId" serial NOT NULL,
	"orderId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"size" integer NOT NULL,
	CONSTRAINT "orderItems_pk" PRIMARY KEY ("orderItemsId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "inventory" ADD CONSTRAINT "inventory_fk0" FOREIGN KEY ("productId") REFERENCES "sneakers"("productId");

ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk1" FOREIGN KEY ("productId") REFERENCES "sneakers"("productId");

ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_fk1" FOREIGN KEY ("productId") REFERENCES "sneakers"("productId");
