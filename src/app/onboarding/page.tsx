"use client"; //

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; //
import { saveVenue } from "./action"; // Import our new action

import {
  Plus,
  Trash2,
  Camera,
  Image as ImageIcon,
  Globe,
  Award,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Utensils,
  GlassWater,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  CheckCircle,
  Ticket,
  Quote,
} from "lucide-react";

interface Props {
  initialData?: any;
  isEditing?: boolean;
}

export default function OnboardingForm({ initialData, isEditing }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    about_description: "",
    total_capacity: "",
    satisfaction_rate: "98%",
    events_hosted: "500+",
    brand_year: "2026",
    contact_phone: "",
    contact_email: "",
    contact_address: "",
    opening_hours: "10 PM - 3 AM",
    instagram: "",
    facebook: "",
    twitter: "",
    video_url: "",
    latitude: "",
    longitude: "",
    primary_color: "#C5A358",
    font_family: "serif",
    bg_style: "onyx",
    border_style: "sharp",
    button_style: "outline",
    header_layout: "classic",
    logo_url: "",
    bookmyshow_link: "",
    sortmyscene_link: "",
    district_link: "",
    highape_link: "",
  });

  const [aboutImage, setAboutImage] = useState<File | null>(null);
  const [dishes, setDishes] = useState([
    {
      name: "",
      price: "",
      description: "",
      image: null as File | null,
      image_url: "",
    },
  ]);
  const [drinks, setDrinks] = useState([
    {
      name: "",
      price: "",
      description: "",
      image: null as File | null,
      image_url: "",
    },
  ]);
  const [galleryItems, setGalleryItems] = useState([
    { file: null as File | null, url: "" },
  ]);
  const inputClasses =
    "w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A358] transition-colors font-light text-sm";
  const labelClasses =
    "flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-[#C5A358] mb-1";
  const sectionTitle =
    "font-serif text-3xl italic border-b border-[#C5A358]/20 pb-3 mb-12 text-white flex items-center gap-4";

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const uploadAsset = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Upload failed");

    return data.url; // This will be something like "/uploads/profiles/123.jpg"
  };

  useEffect(() => {
    if (initialData) {
      // Pre-fill text fields
      setFormData({
        name: initialData.name || "",
        tagline: initialData.tagline || "",
        about_description: initialData.about_description || "",
        total_capacity: initialData.total_capacity || "",
        satisfaction_rate: initialData.satisfaction_rate || "98%",
        events_hosted: initialData.events_hosted || "500+",
        brand_year: initialData.brand_year || "2026",
        contact_phone: initialData.contact_phone || "",
        contact_email: initialData.contact_email || "",
        contact_address: initialData.contact_address || "",
        opening_hours: initialData.opening_hours || "",
        instagram: initialData.social_links?.instagram || "",
        facebook: initialData.social_links?.facebook || "",
        twitter: initialData.social_links?.twitter || "",
        video_url: initialData.video_url || "",
        latitude: initialData.latitude || "",
        longitude: initialData.longitude || "",
        primary_color: initialData.primary_color || "",
        font_family: initialData.font_family || "",
        bg_style: initialData.bg_style || "",
        border_style: initialData.border_style || "",
        button_style: initialData.button_style || "",
        header_layout: initialData.header_layout || "",
        logo_url: initialData.logo_url || "",
        bookmyshow_link: initialData.bookmyshow_link || "",
        sortmyscene_link: initialData.sortmyscene_link || "",
        district_link: initialData.district_link || "",
        highape_link: initialData.highape_link || "",
      });

      // Pre-fill JSONB arrays
      if (initialData.menu_dishes) setDishes(initialData.menu_dishes);
      if (initialData.menu_drinks) setDrinks(initialData.menu_drinks);

      // Pre-fill Gallery URLs
      if (initialData.gallery_urls) {
        setGalleryItems(
          initialData.gallery_urls.map((url: string) => ({ file: null, url })),
        );
      }
    }
  }, [initialData]);


  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const aboutImageUrl = aboutImage
        ? await uploadAsset(aboutImage, "profiles")
        : initialData?.about_image_url || "";
      const logoUrl = logoFile
        ? await uploadAsset(logoFile, "logos")
        : initialData?.logo_url || "";

      let finalVideoUrl = formData.video_url;
      if (videoFile) {
        finalVideoUrl = await uploadAsset(videoFile, "videos");
      }

      const menu_dishes = await Promise.all(
        dishes.map(async (d) => ({
          name: d.name,
          price: d.price,
          description: d.description,
          image_url: d.image
            ? await uploadAsset(d.image, "dishes")
            : d.image_url,
        })),
      );

      const menu_drinks = await Promise.all(
        drinks.map(async (d) => ({
          name: d.name,
          price: d.price,
          description: d.description,
          image_url: d.image
            ? await uploadAsset(d.image, "drinks")
            : d.image_url,
        })),
      );

      const gallery_urls = await Promise.all(
        galleryItems.map(async (item) =>
          item.file ? await uploadAsset(item.file, "gallery") : item.url,
        ),
      ).then((res) => res.filter(Boolean));

      const slug = formData.name.toLowerCase().replace(/\s+/g, "-");

      // --- CRITICAL FIX: Destructure social handles out of the payload ---
      const {
        instagram,
        facebook,
        twitter,
        instagram_handle,
        facebook_handle,
        twitter_handle,
        ...restOfData
      } = formData;


// 5. Build the Final Payload
      const payload = {
        ...restOfData,
        slug,
        about_image_url: aboutImageUrl,
        logo_url: logoUrl,
        video_url: finalVideoUrl,
        menu_dishes,
        menu_drinks,
        gallery_urls,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        social_links: {
          instagram: formData.instagram || formData.instagram_handle,
          facebook: formData.facebook || formData.facebook_handle,
          twitter: formData.twitter || formData.twitter_handle,
        },
      };

      // 6. CALL SERVER ACTION (PRISMA)
      // This replaces the entire supabase.from("venues").upsert() block
      const result = await saveVenue(payload);

      if (result.success) {
        // Next.js fast navigation
        router.push(`/${slug}`);
      } else {
        throw new Error(result.error);
      }
      
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 md:p-24 text-[#F4F4F4] font-sans">
      <form onSubmit={handleLaunch} className="max-w-6xl mx-auto space-y-32">
        <header className="text-center">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter text-white">
            {isEditing ? "Refine" : "Establish"}{" "}
            <span className="italic font-light text-[#C5A358]">Venue</span>
          </h1>
        </header>

        {/* IDENTITY SECTION */}
        <section>
          <h2 className={sectionTitle}>
            <Globe size={24} className="text-[#C5A358]" /> Core Identity
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <label className={labelClasses}>Venue Name</label>
                <input
                  required
                  value={formData.name}
                  className={inputClasses}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label className={labelClasses}>Brand Logo</label>
                <div className="border border-dashed border-white/10 p-6 text-center group hover:border-[#C5A358]/40 transition-all relative h-32 flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  />
                  {logoFile || formData.logo_url ? (
                    <img
                      src={
                        logoFile
                          ? URL.createObjectURL(logoFile)
                          : formData.logo_url
                      }
                      className="h-full object-contain mx-auto p-2"
                    />
                  ) : (
                    <div className="text-gray-700 flex flex-col items-center gap-2">
                      <ImageIcon size={24} />
                      <span className="text-[8px] uppercase tracking-widest">
                        Upload Brand Emblem
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className={labelClasses}>Est. Year</label>
                  <input
                    className={inputClasses}
                    value={formData.brand_year}
                    onChange={(e) =>
                      setFormData({ ...formData, brand_year: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={labelClasses}>Capacity</label>
                  <input
                    className={inputClasses}
                    value={formData.total_capacity}
                    placeholder="1200+"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        total_capacity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>
                  <Quote size={12} /> Tagline
                </label>
                <input
                  required
                  className={inputClasses}
                  value={formData.tagline}
                  placeholder="Mumbai's Premier Nightlife Sanctuary"
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <input
                  placeholder="Latitude (e.g. 19.0760)"
                  value={formData.latitude}
                  className={inputClasses}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                />
                <input
                  placeholder="Longitude (e.g. 72.8777)"
                  value={formData.longitude}
                  className={inputClasses}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <label className={labelClasses}>
                  Cinematic Showcase (Video)
                </label>
                <div className="border border-dashed border-white/10 p-10 text-center relative group hover:border-[#C5A358]/40 transition-all">
                  <input
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  />
                  {videoFile ? (
                    <div className="text-xs text-[#C5A358] animate-pulse">
                      {videoFile.name} ready for upload
                    </div>
                  ) : formData.video_url ? (
                    <div className="text-xs text-gray-500">
                      Video currently established
                    </div>
                  ) : (
                    <div className="text-gray-700 flex flex-col items-center gap-2">
                      <Camera size={24} />
                      <span className="text-[10px] uppercase tracking-widest">
                        Upload Motion Venue
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* NEW FIELDS: Satisfaction Rate & Events Hosted */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className={labelClasses}>
                    <CheckCircle size={12} /> Satisfaction Rate
                  </label>
                  <input
                    className={inputClasses}
                    value={formData.satisfaction_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        satisfaction_rate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    <Ticket size={12} /> Events Hosted
                  </label>
                  <input
                    className={inputClasses}
                    value={formData.events_hosted}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events_hosted: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <label className={labelClasses}>Heritage Description</label>
              <textarea
                className={`${inputClasses} h-32 resize-none`}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about_description: e.target.value,
                  })
                }
              />
              <div className="border border-dashed border-white/10 p-6 text-center group hover:border-[#C5A358]/40 transition-all relative">
                <input
                  type="file"
                  // value={formData.}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setAboutImage(e.target.files?.[0] || null)}
                />
                {aboutImage ? (
                  <img
                    src={URL.createObjectURL(aboutImage)}
                    className="h-20 mx-auto object-contain"
                  />
                ) : (
                  <Camera className="mx-auto text-gray-700" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CULINARY SECTION (DISHES) */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <h2 className={sectionTitle}>
              <Utensils size={24} className="text-[#C5A358]" /> Culinary
              Selection
            </h2>
            <button
              type="button"
              onClick={() =>
                setDishes([
                  ...dishes,
                  { name: "", price: "", description: "", image: null },
                ])
              }
              className="text-[#C5A358] text-[10px] tracking-[0.4em] uppercase"
            >
              + Add Dish
            </button>
          </div>
          <div className="grid gap-8">
            {dishes.map((dish, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-10 bg-white/[0.02] p-8 border border-white/5 relative items-center"
              >
                <div className="w-32 h-32 bg-black border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                  {dish.image || dish.image_url ? (
                    <img
                      src={
                        dish.image instanceof File
                          ? URL.createObjectURL(dish.image)
                          : dish.image_url
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="text-gray-800" />
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const d = [...dishes];
                      d[i].image = e.target.files?.[0] || null;
                      setDishes(d);
                    }}
                  />
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-6 w-full">
                  <input
                    placeholder="Dish Name"
                    value={dish.name}
                    className={inputClasses}
                    onChange={(e) => {
                      const d = [...dishes];
                      d[i].name = e.target.value;
                      setDishes(d);
                    }}
                  />
                  <input
                    placeholder="Price"
                    className={inputClasses}
                    value={dish.price}
                    onChange={(e) => {
                      const d = [...dishes];
                      d[i].price = e.target.value;
                      setDishes(d);
                    }}
                  />
                  <input
                    placeholder="Description"
                    className={`${inputClasses} md:col-span-2`}
                    value={dish.description}
                    onChange={(e) => {
                      const d = [...dishes];
                      d[i].description = e.target.value;
                      setDishes(d);
                    }}
                  />
                </div>
                {dishes.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDishes(dishes.filter((_, idx) => idx !== i))
                    }
                    className="text-red-900 absolute top-4 right-4"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* MIXOLOGY SECTION (DRINKS) */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <h2 className={sectionTitle}>
              <GlassWater size={24} className="text-[#C5A358]" /> Spirits &
              Mixology
            </h2>
            <button
              type="button"
              onClick={() =>
                setDrinks([
                  ...drinks,
                  { name: "", price: "", description: "", image: null },
                ])
              }
              className="text-[#C5A358] text-[10px] tracking-[0.4em] uppercase"
            >
              + Add Drink
            </button>
          </div>
          <div className="grid gap-8">
            {drinks.map((drink, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-10 bg-white/[0.02] p-8 border border-white/5 relative items-center"
              >
                <div className="w-32 h-32 bg-black border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                  {drink.image || drink.image_url ? (
                    <img
                      src={
                        drink.image instanceof File
                          ? URL.createObjectURL(drink.image)
                          : drink.image_url
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="text-gray-800" />
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const d = [...drinks];
                      d[i].image = e.target.files?.[0] || null;
                      setDrinks(d);
                    }}
                  />
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-6 w-full">
                  <input
                    placeholder="Drink Name"
                    value={drink.name}
                    className={inputClasses}
                    onChange={(e) => {
                      const d = [...drinks];
                      d[i].name = e.target.value;
                      setDrinks(d);
                    }}
                  />
                  <input
                    placeholder="Price"
                    className={inputClasses}
                    value={drink.price}
                    onChange={(e) => {
                      const d = [...drinks];
                      d[i].price = e.target.value;
                      setDrinks(d);
                    }}
                  />
                  <input
                    placeholder="Description"
                    className={`${inputClasses} md:col-span-2`}
                    value={drink.description}
                    onChange={(e) => {
                      const d = [...drinks];
                      d[i].description = e.target.value;
                      setDrinks(d);
                    }}
                  />
                </div>
                {drinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDrinks(drinks.filter((_, idx) => idx !== i))
                    }
                    className="text-red-900 absolute top-4 right-4"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* VISUAL GALLERY */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <h2 className={sectionTitle}>
              <ImageIcon size={24} className="text-[#C5A358]" /> Visual Gallery
            </h2>
            <button
              type="button"
              onClick={() => setGalleryItems([...galleryItems, { file: null }])}
              className="text-[#C5A358] text-[10px] tracking-[0.4em] uppercase"
            >
              + Add Photo
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="aspect-square bg-white/[0.02] border border-white/5 flex items-center justify-center relative group overflow-hidden"
              >
                {item.file || item.url ? (
                  <img
                    src={item.file ? URL.createObjectURL(item.file) : item.url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-800" size={32} />
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const g = [...galleryItems];
                    g[i].file = e.target.files?.[0] || null;
                    setGalleryItems(g);
                  }}
                />
                {galleryItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setGalleryItems(
                        galleryItems.filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1 text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className={sectionTitle}>
            <MapPin size={24} className="text-[#C5A358]" /> Concierge
          </h2>
          <div className="space-y-8">
            <div>
              <label className={labelClasses}>
                <Clock size={12} /> Opening Hours
              </label>
              <input
                placeholder="e.g. Mon-Fri: 10AM-7PM, Sat-Sun: 11AM-8PM"
                className={inputClasses}
                value={formData.opening_hours}
                onChange={(e) =>
                  setFormData({ ...formData, opening_hours: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClasses}>
                <MapPin size={12} /> Address
              </label>
              <input
                placeholder="123 Luxury Boulevard, Mumbai"
                className={inputClasses}
                value={formData.contact_address}
                onChange={(e) =>
                  setFormData({ ...formData, contact_address: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className={labelClasses}>
                  <Phone size={12} /> Phone
                </label>
                <input
                  placeholder="+91 98765 43210"
                  className={inputClasses}
                  value={formData.contact_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <Mail size={12} /> Email
                </label>
                <input
                  placeholder="events@epitome.in"
                  className={inputClasses}
                  value={formData.contact_email}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </section>


        <section className="space-y-12">
          <h2 className={sectionTitle}>
            <Award size={24} className="text-[#C5A358]" /> Aesthetics & Branding
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Primary Color Selection */}
            <div>
              <label className={labelClasses}>Accent Color</label>
              <div className="flex gap-4 mt-2">
                {["#C5A358", "#007AFF", "#B87333", "#2D5A27"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-10 h-10 border-2 ${formData.primary_color === color ? "border-white" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      setFormData({ ...formData, primary_color: color })
                    }
                  />
                ))}
              </div>
            </div>

            {/* Font Style */}
            <div>
              <label className={labelClasses}>Typography</label>
              <select
                className={inputClasses}
                value={formData.font_family}
                onChange={(e) =>
                  setFormData({ ...formData, font_family: e.target.value })
                }
              >
                <option value="font-serif" className="bg-black">
                  Heritage (Serif)
                </option>
                <option value="font-sans" className="bg-black">
                  Modern (Sans)
                </option>
                <option value="font-mono" className="bg-black">
                  Underground (Mono)
                </option>
              </select>
            </div>

            {/* Border Style */}
            <div>
              <label className={labelClasses}>Edge Style</label>
              <select
                className={inputClasses}
                value={formData.border_style}
                onChange={(e) =>
                  setFormData({ ...formData, border_style: e.target.value })
                }
              >
                <option value="0px" className="bg-black">
                  Sharp (Architectural)
                </option>
                <option value="8px" className="bg-black">
                  Refined (Soft Edge)
                </option>
                <option value="24px" className="bg-black">
                  Liquid (Rounded)
                </option>
              </select>
            </div>

            {/* Background Atmosphere */}
            <div>
              <label className={labelClasses}>Background Style</label>
              <select
                className={inputClasses}
                value={formData.bg_style}
                onChange={(e) =>
                  setFormData({ ...formData, bg_style: e.target.value })
                }
              >
                <option value="bg-[#0A0A0A]" className="bg-black">
                  Onyx (Pitch Black)
                </option>
                <option value="bg-[#0D1117]" className="bg-black">
                  Deep Navy (Midnight)
                </option>
                <option value="bg-[#0B100B]" className="bg-black">
                  Forest Shade (Organic Dark)
                </option>
              </select>
            </div>

            {/* Button Aesthetic */}
            <div>
              <label className={labelClasses}>Action Button Style</label>
              <select
                className={inputClasses}
                value={formData.button_style}
                onChange={(e) =>
                  setFormData({ ...formData, button_style: e.target.value })
                }
              >
                <option value="outline" className="bg-black">
                  Minimal Outline
                </option>
                <option value="solid" className="bg-black">
                  Solid Bold
                </option>
                <option value="glass" className="bg-black">
                  Frosted Glass
                </option>
              </select>
            </div>

            {/* Navigation Layout */}
            <div>
              <label className={labelClasses}>Header Navigation</label>
              <select
                className={inputClasses}
                value={formData.header_layout}
                onChange={(e) =>
                  setFormData({ ...formData, header_layout: e.target.value })
                }
              >
                <option value="classic" className="bg-black">
                  Classic Split
                </option>
                <option value="minimal" className="bg-black">
                  Minimalist Corner
                </option>
                <option value="centered" className="bg-black">
                  Architectural Centered
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* TICKETING GATEWAYS SECTION */}
        <section>
          <h2 className={sectionTitle}>
            <Ticket size={24} className="text-[#C5A358]" /> Ticketing Gateways
          </h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-8 -mt-8">
            Leave blank to hide the gateway from your venue page
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <label className={labelClasses}>BookMyShow URL</label>
              <input
                placeholder="https://in.bookmyshow.com/..."
                className={inputClasses}
                value={formData.bookmyshow_link}
                onChange={(e) =>
                  setFormData({ ...formData, bookmyshow_link: e.target.value })
                }
              />
            </div>

            <div>
              <label className={labelClasses}>SortMyScene URL</label>
              <input
                placeholder="https://sortmyscene.com/..."
                className={inputClasses}
                value={formData.sortmyscene_link}
                onChange={(e) =>
                  setFormData({ ...formData, sortmyscene_link: e.target.value })
                }
              />
            </div>

            <div>
              <label className={labelClasses}>District URL</label>
              <input
                placeholder="https://district.in/..."
                className={inputClasses}
                value={formData.district_link}
                onChange={(e) =>
                  setFormData({ ...formData, district_link: e.target.value })
                }
              />
            </div>

            <div>
              <label className={labelClasses}>HighApe URL</label>
              <input
                placeholder="https://highape.com/..."
                className={inputClasses}
                value={formData.highape_link}
                onChange={(e) =>
                  setFormData({ ...formData, highape_link: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className={sectionTitle}>
            <Award size={24} className="text-[#C5A358]" /> Social Archive
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Instagram size={20} className="text-[#C5A358] opacity-50" />
              <input
                placeholder="Instagram Profile URL"
                className={inputClasses}
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram_handle: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <Facebook size={20} className="text-[#C5A358] opacity-50" />
              <input
                placeholder="Facebook Page URL"
                className={inputClasses}
                value={formData.facebook}
                onChange={(e) =>
                  setFormData({ ...formData, facebook_handle: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <Twitter size={20} className="text-[#C5A358] opacity-50" />
              <input
                placeholder="Twitter Handle URL"
                value={formData.twitter}
                className={inputClasses}
                onChange={(e) =>
                  setFormData({ ...formData, twitter_handle: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <div className="text-center pt-24 border-t border-white/5">
          <button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden border border-[#C5A358] px-32 py-8 text-[#C5A358] text-[11px] font-bold uppercase tracking-[0.6em] transition-all hover:bg-[#C5A358] hover:text-black"
          >
            <div className="absolute inset-0 bg-[#C5A358] translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative z-10 font-serif">
              {loading ? "Establishing Venue..." : "Launch Grand Website"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
