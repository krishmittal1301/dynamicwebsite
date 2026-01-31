-- CreateTable
CREATE TABLE "venues" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "about_description" TEXT,
    "about_image_url" TEXT,
    "events_hosted" TEXT DEFAULT '0',
    "total_capacity" TEXT DEFAULT '0',
    "satisfaction_rate" TEXT DEFAULT '100%',
    "brand_year" TEXT DEFAULT '2024',
    "contact_address" TEXT,
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "opening_hours" TEXT DEFAULT 'Mon - Sun: 10 AM - 10 PM',
    "menu_dishes" JSONB DEFAULT '[]',
    "menu_drinks" JSONB DEFAULT '[]',
    "gallery_urls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "social_links" JSONB DEFAULT '{"twitter": "", "facebook": "", "linkedin": "", "instagram": ""}',
    "video_url" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "primary_color" TEXT DEFAULT '#C5A358',
    "font_family" TEXT DEFAULT 'serif',
    "bg_style" TEXT DEFAULT 'onyx',
    "border_style" TEXT DEFAULT 'sharp',
    "button_style" TEXT DEFAULT 'outline',
    "header_layout" TEXT DEFAULT 'classic',
    "logo_url" TEXT,
    "bookmyshow_link" TEXT,
    "sortmyscene_link" TEXT,
    "district_link" TEXT,
    "highape_link" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_events" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "venue_id" UUID,
    "title" TEXT NOT NULL,
    "event_type" TEXT,
    "event_date" DATE NOT NULL,
    "event_time" TEXT DEFAULT '10 PM Onwards',
    "headliner" TEXT,
    "image_url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "venue_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table_bookings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "venue_id" UUID,
    "event_id" UUID,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "guest_count" INTEGER NOT NULL,
    "table_type" TEXT NOT NULL DEFAULT 'VIP Lounge',
    "status" TEXT DEFAULT 'pending',

    CONSTRAINT "table_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "venue_id" UUID,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "event_date" DATE,
    "guest_count" INTEGER,
    "event_type" TEXT,
    "message" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "venues_slug_key" ON "venues"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "venue_events" ADD CONSTRAINT "venue_events_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_bookings" ADD CONSTRAINT "table_bookings_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_bookings" ADD CONSTRAINT "table_bookings_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "venue_events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;
