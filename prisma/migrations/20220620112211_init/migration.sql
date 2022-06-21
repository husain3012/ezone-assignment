-- CreateTable
CREATE TABLE "Hotel" (
    "id" STRING NOT NULL,
    "area" STRING NOT NULL,
    "city" STRING NOT NULL,
    "country" STRING NOT NULL,
    "hotel_overview" STRING NOT NULL,
    "hotel_star_rating" STRING NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "mmt_tripadvisor_count" STRING NOT NULL,
    "pageurl" STRING NOT NULL,
    "property_address" STRING NOT NULL,
    "property_name" STRING NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_id_key" ON "Hotel"("id");
