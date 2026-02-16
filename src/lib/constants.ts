// Site Configuration
export const SITE_CONFIG = {
    name: "Royal Dynamite Limited",
    tagline: "Premium Vehicles. Trusted Service.",
    description:
        "Ghana's trusted destination for vehicle sales, rentals, transport services, and freight forwarding since 2015.",
    address: "Adenta - Bulldog, Accra, Ghana",
    phone: "+233 30 274 5678",
    whatsapp: "+233244000000",
    email: "info@royaldynamite.com",
    businessHours: "Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM",
    yearEstablished: 2015,
    partners: [
        "Yakman Group of Companies",
        "Kwarteng and Co Consult",
        "Double C Enterprise",
        "Askraf International Company Ltd",
        "Agye Nyame Company",
    ],
};

// Navigation Links
export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Auto Dealership", href: "/dealership" },
    { label: "Rentals", href: "/rentals" },
    { label: "Transport", href: "/transport" },
    { label: "Freight", href: "/freight" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
];

// Vehicle Categories for Filtering
export const VEHICLE_CATEGORIES = [
    { value: "all", label: "All Categories" },
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "truck", label: "Truck" },
    { value: "van", label: "Van" },
    { value: "bus", label: "Bus" },
    { value: "luxury", label: "Luxury" },
];

// WhatsApp Link Generator
export function generateWhatsAppLink(
    message: string,
    phone: string = SITE_CONFIG.whatsapp
): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodedMessage}`;
}

// Format Currency (Ghana Cedis)
export function formatCurrency(amount: number | null): string {
    if (amount === null) return "Contact for Price";
    return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        minimumFractionDigits: 0,
    }).format(amount);
}
