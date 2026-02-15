import { Vehicle, RentalApplication, QuoteRequest, VehicleStatus } from "@/types";

// ──────────────────────────────────────────────
// PREMIUM IMAGE CURATION HELPER
// ──────────────────────────────────────────────

// A curated pool of high-quality, stable Unsplash photo IDs fit for a premium brand.
// We use IDs instead of search queries to guarantee stability and quality.
const PREMIUM_IMAGE_POOL: Record<string, string[]> = {
    suv: [
        "photo-1592198084033-aade902d1aae", // White Prado/Land Cruiser vibe
        "photo-1609521263047-f8f205293f24", // Large Nissan Patrol vibe
    ],
    luxury: [
        "photo-1619767886558-efdc259cde1a", // Dark moody Mercedes
        "photo-1563720223185-11003d516935", // Premium BMW/Benz sedan aesthetic
        "photo-1616422285623-13ff0162193c", // High-end luxury interior/exterior
    ],
    truck: [
        "photo-1551830820-330a71b99659", // Rugged Hilux/Ranger vibe
        "photo-1559416523-140ddc3d238c", // Grey off-road truck
    ],
    sedan: [
        "photo-1606103920295-9a091573f160", // Sleek modern Toyota sedan
        "photo-1621007947382-bb3c3994e3fb", // Camry style
        "photo-1503376780353-7e6692767b70", // Hyundai Elantra style
        "photo-1494976388531-d1058494cdd8", // Generic premium sedan
    ],
    van: [
        // All previous van IDs were broken — falls back to sedan pool
    ],
    bus: [
        "photo-1544620347-c4fd4a3d5957", // Coaster bus vibe
    ]
};

/**
 * Helper to generate a premium, working Unsplash URL based on category.
 * Uses the vehicle ID to consistently pick the same image from the pool.
 */
function getPremiumCarImage(category: string, id: string): string {
    let pool = PREMIUM_IMAGE_POOL[category.toLowerCase()];
    // Fallback to sedan pool if category missing or empty
    if (!pool || pool.length === 0) pool = PREMIUM_IMAGE_POOL.sedan;
    // Use the numeric part of the ID to pick an index, ensuring consistency
    const index = parseInt(id.replace(/\D/g, '') || "1") % pool.length;
    const photoId = pool[index];
    // Standard Unsplash URL parameters for good performance and quality
    return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80`;
}


// ──────────────────────────────────────────────
// VEHICLES — Replace with Supabase in production
// ──────────────────────────────────────────────

export const MOCK_VEHICLES: Vehicle[] = [
    // ─── FOR SALE ──────────────────────────────
    {
        id: "1",
        make: "Toyota",
        model: "Land Cruiser Prado",
        year: 2022,
        category: "suv",
        status: "sale",
        price: 450000,
        dailyRate: null,
        mileage: 25000,
        fuelType: "Diesel",
        transmission: "Automatic",
        engineSize: "2.8L",
        drivetrain: "4WD",
        color: "Pearl White",
        description: "The ultimate luxury SUV for Ghanaian roads. Leather interior, sunroof, and advanced 4WD.",
        features: ["Leather Seats", "Sunroof", "4WD", "Navigation", "Rear Camera"],
        images: [getPremiumCarImage("suv", "1")],
        vin: "JTMHY31J704123456",
        rating: 4.8,
        isAvailable: true,
        createdAt: "2025-01-15",
        updatedAt: "2025-01-15",
    },
    {
        id: "2",
        make: "Mercedes-Benz",
        model: "E-Class",
        year: 2023,
        category: "luxury",
        status: "sale",
        price: 680000,
        dailyRate: null,
        mileage: 8000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "2.0L",
        drivetrain: "RWD",
        color: "Obsidian Black",
        description: "Executive sedan with premium AMG Line features. The pinnacle of German engineering.",
        features: ["AMG Line", "Burmester Sound", "Ambient Lighting", "360 Camera"],
        images: [getPremiumCarImage("luxury", "2")],
        vin: "WDD2130421A987654",
        rating: 4.9,
        isAvailable: true,
        createdAt: "2025-01-10",
        updatedAt: "2025-01-10",
    },
    {
        id: "4",
        make: "Toyota",
        model: "Hilux",
        year: 2023,
        category: "truck",
        status: "sale",
        price: 320000,
        dailyRate: null,
        mileage: 12000,
        fuelType: "Diesel",
        transmission: "Automatic",
        engineSize: "2.8L",
        drivetrain: "4WD",
        color: "Gray Metallic",
        description: "Rugged pickup truck ideal for business or adventure. Built for tough terrain.",
        features: ["4WD", "Tonneau Cover", "Tow Bar", "Roof Rails"],
        images: [getPremiumCarImage("truck", "4")],
        vin: "MR0FR22GX00345678",
        rating: 4.6,
        isAvailable: true,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01",
    },
    {
        id: "14",
        make: "Toyota",
        model: "Corolla",
        year: 2024,
        category: "sedan",
        status: "sale",
        price: 230000,
        dailyRate: null,
        mileage: 3500,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "1.8L",
        drivetrain: "FWD",
        color: "Celestite Gray",
        description: "Brand-new Corolla with Toyota Safety Sense. Best-in-class fuel economy and reliability.",
        features: ["Toyota Safety Sense", "CarPlay", "LED Lights", "Keyless Entry"],
        images: [getPremiumCarImage("sedan", "14")],
        vin: "JTDS4RCE5LJ012345",
        rating: 4.7,
        isAvailable: true,
        createdAt: "2025-02-10",
        updatedAt: "2025-02-10",
    },
    {
        id: "15",
        make: "Hyundai",
        model: "Tucson",
        year: 2023,
        category: "suv",
        status: "sale",
        price: 380000,
        dailyRate: null,
        mileage: 18000,
        fuelType: "Diesel",
        transmission: "Automatic",
        engineSize: "2.0L",
        drivetrain: "AWD",
        color: "Amazon Gray",
        description: "Modern compact SUV with panoramic roof and smart tech. Excellent for city and highway.",
        features: ["Panoramic Roof", "Blind Spot Monitor", "Smart Key", "Heated Seats"],
        images: [getPremiumCarImage("suv", "15")],
        vin: "KMHJ3814LNU567890",
        rating: 4.6,
        isAvailable: true,
        createdAt: "2025-01-22",
        updatedAt: "2025-01-22",
    },
    {
        id: "16",
        make: "Toyota",
        model: "RAV4",
        year: 2023,
        category: "suv",
        status: "sale",
        price: 360000,
        dailyRate: null,
        mileage: 15000,
        fuelType: "Hybrid",
        transmission: "Automatic",
        engineSize: "2.5L",
        drivetrain: "AWD",
        color: "Blueprint",
        description: "Fuel-efficient hybrid AWD SUV. Perfect for eco-conscious families. Toyota reliability.",
        features: ["Hybrid", "AWD", "Toyota Safety Sense", "Wireless Charging", "JBL Audio"],
        images: [getPremiumCarImage("suv", "16")],
        vin: "JTMA1RFV5ND234567",
        rating: 4.8,
        isAvailable: true,
        createdAt: "2025-02-08",
        updatedAt: "2025-02-08",
    },
    {
        id: "17",
        make: "Nissan",
        model: "Patrol",
        year: 2022,
        category: "suv",
        status: "sale",
        price: 520000,
        dailyRate: null,
        mileage: 32000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "4.0L",
        drivetrain: "4WD",
        color: "White Pearl",
        description: "Full-size luxury SUV with commanding presence. V6 power and premium comfort.",
        features: ["V6", "Leather", "BOSE Audio", "Rear Entertainment", "Cooled Seats"],
        images: [getPremiumCarImage("suv", "17")],
        vin: "JN1TBNY62Z0123456",
        rating: 4.5,
        isAvailable: true,
        createdAt: "2025-01-12",
        updatedAt: "2025-01-12",
    },
    {
        id: "18",
        make: "Honda",
        model: "CR-V",
        year: 2023,
        category: "suv",
        status: "sale",
        price: 340000,
        dailyRate: null,
        mileage: 10000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "1.5L",
        drivetrain: "AWD",
        color: "Crystal Black",
        description: "Practical family SUV with Honda VTEC turbo engine. Spacious and fuel-efficient.",
        features: ["Honda Sensing", "Turbo", "Wireless CarPlay", "Power Tailgate"],
        images: [getPremiumCarImage("suv", "18")],
        vin: "5J6RW2H85PL012345",
        rating: 4.7,
        isAvailable: true,
        createdAt: "2025-02-12",
        updatedAt: "2025-02-12",
    },
    {
        id: "19",
        make: "Toyota",
        model: "Camry",
        year: 2024,
        category: "sedan",
        status: "sale",
        price: 290000,
        dailyRate: null,
        mileage: 5000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "2.5L",
        drivetrain: "FWD",
        color: "Midnight Black",
        description: "All-new 2024 Camry with bold styling and premium features. Best-selling sedan worldwide.",
        features: ["Dynamic Force Engine", "Toyota Safety Sense 3.0", "12.3\" Display", "Wireless Charging"],
        images: [getPremiumCarImage("sedan", "19")],
        vin: "4T1G11AK5RU123456",
        rating: 4.8,
        isAvailable: true,
        createdAt: "2025-02-15",
        updatedAt: "2025-02-15",
    },

    // ─── FOR RENT ──────────────────────────────
    {
        id: "3",
        make: "Toyota",
        model: "Camry",
        year: 2021,
        category: "sedan",
        status: "rent",
        price: null,
        dailyRate: 350,
        mileage: 45000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "2.5L",
        drivetrain: "FWD",
        color: "Silver",
        description: "Fuel-efficient sedan perfect for daily rentals. Well-maintained and comfortable.",
        features: ["Bluetooth", "Apple CarPlay", "Lane Assist", "Keyless Entry"],
        images: [getPremiumCarImage("sedan", "3")],
        rating: 4.7,
        tier: "business",
        isAvailable: true,
        createdAt: "2025-01-20",
        updatedAt: "2025-01-20",
    },
    {
        id: "5",
        make: "Hyundai",
        model: "H1",
        year: 2020,
        category: "van",
        status: "rent",
        price: null,
        dailyRate: 500,
        mileage: 60000,
        fuelType: "Diesel",
        transmission: "Automatic",
        engineSize: "2.5L",
        drivetrain: "RWD",
        color: "White",
        description: "Spacious 12-seater van perfect for group transport and family trips.",
        features: ["AC", "12 Seats", "USB Ports", "Luggage Space"],
        images: [getPremiumCarImage("van", "5")],
        rating: 4.5,
        tier: "group",
        isAvailable: true,
        createdAt: "2025-01-05",
        updatedAt: "2025-01-05",
    },
    {
        id: "6",
        make: "Toyota",
        model: "Coaster",
        year: 2019,
        category: "bus",
        status: "rent",
        price: null,
        dailyRate: 800,
        mileage: 85000,
        fuelType: "Diesel",
        transmission: "Manual",
        engineSize: "4.2L",
        drivetrain: "RWD",
        color: "White/Blue",
        description: "30-seater bus ideal for company events, staff transport, and tourism.",
        features: ["AC", "PA System", "Curtains", "Luggage Compartment"],
        images: [getPremiumCarImage("bus", "6")],
        rating: 4.3,
        tier: "group",
        isAvailable: true,
        createdAt: "2025-01-08",
        updatedAt: "2025-01-08",
    },
    {
        id: "7",
        make: "Toyota",
        model: "Land Cruiser Prado",
        year: 2023,
        category: "suv",
        status: "rent",
        price: null,
        dailyRate: 830,
        mileage: 15000,
        fuelType: "Diesel",
        transmission: "Automatic",
        engineSize: "2.8L",
        drivetrain: "4WD",
        color: "Pearl White",
        description: "Premium SUV rental with full luxury package. Perfect for executive travel.",
        features: ["Leather Seats", "Sunroof", "4WD", "Navigation", "Rear Camera", "Cooled Seats"],
        images: [getPremiumCarImage("suv", "7")],
        rating: 4.7,
        tier: "premium",
        isAvailable: true,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01",
    },
    {
        id: "8",
        make: "Mercedes-Benz",
        model: "E-Class",
        year: 2023,
        category: "luxury",
        status: "rent",
        price: null,
        dailyRate: 950,
        mileage: 10000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "2.0L",
        drivetrain: "RWD",
        color: "Obsidian Black",
        description: "Executive sedan for distinguished business travel. Chauffeur service available.",
        features: ["AMG Line", "Burmester Sound", "Ambient Lighting", "360 Camera"],
        images: [getPremiumCarImage("luxury", "8")],
        rating: 4.9,
        tier: "premium",
        isAvailable: true,
        createdAt: "2025-02-05",
        updatedAt: "2025-02-05",
    },
    {
        id: "9",
        make: "Hyundai",
        model: "Tucson",
        year: 2022,
        category: "suv",
        status: "rent",
        price: null,
        dailyRate: 550,
        mileage: 30000,
        fuelType: "Diesel",
        transmission: "Automatic",
        engineSize: "2.0L",
        drivetrain: "AWD",
        color: "Amazon Gray",
        description: "Versatile compact SUV with modern tech. Ideal for city and light off-road.",
        features: ["Panoramic Roof", "Smart Key", "Apple CarPlay", "Blind Spot Monitor"],
        images: [getPremiumCarImage("suv", "9")],
        rating: 4.6,
        tier: "premium",
        isAvailable: true,
        createdAt: "2025-01-25",
        updatedAt: "2025-01-25",
    },
    {
        id: "10",
        make: "Toyota",
        model: "RAV4",
        year: 2022,
        category: "suv",
        status: "rent",
        price: null,
        dailyRate: 480,
        mileage: 35000,
        fuelType: "Hybrid",
        transmission: "Automatic",
        engineSize: "2.5L",
        drivetrain: "AWD",
        color: "Lunar Rock",
        description: "Fuel-efficient hybrid SUV with spacious interior. Great for families.",
        features: ["Hybrid", "AWD", "Toyota Safety Sense", "Wireless Charging"],
        images: [getPremiumCarImage("suv", "10")],
        rating: 4.8,
        tier: "premium",
        isAvailable: true,
        createdAt: "2025-01-18",
        updatedAt: "2025-01-18",
    },
    {
        id: "11",
        make: "Hyundai",
        model: "Elantra",
        year: 2023,
        category: "sedan",
        status: "rent",
        price: null,
        dailyRate: 300,
        mileage: 20000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "2.0L",
        drivetrain: "FWD",
        color: "Phantom Black",
        description: "Stylish sedan with sharp design and excellent fuel economy.",
        features: ["Bluetooth", "Rear Camera", "LED Headlamps", "Cruise Control"],
        images: [getPremiumCarImage("sedan", "11")],
        rating: 4.5,
        tier: "business",
        isAvailable: true,
        createdAt: "2025-02-03",
        updatedAt: "2025-02-03",
    },
    {
        id: "12",
        make: "VW",
        model: "Passat",
        year: 2021,
        category: "sedan",
        status: "rent",
        price: null,
        dailyRate: 400,
        mileage: 40000,
        fuelType: "Diesel",
        transmission: "Automatic",
        engineSize: "2.0L",
        drivetrain: "FWD",
        color: "Reflex Silver",
        description: "German-engineered comfort with premium interior. Smooth highway cruiser.",
        features: ["Digital Cockpit", "ACC", "Heated Seats", "CarPlay"],
        images: [getPremiumCarImage("sedan", "12")],
        rating: 4.4,
        tier: "business",
        isAvailable: true,
        createdAt: "2025-01-28",
        updatedAt: "2025-01-28",
    },
    {
        id: "13",
        make: "Ford",
        model: "Explorer",
        year: 2022,
        category: "suv",
        status: "rent",
        price: null,
        dailyRate: 750,
        mileage: 22000,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "3.0L",
        drivetrain: "4WD",
        color: "Iconic Silver",
        description: "Full-size SUV with third-row seating. Power and presence.",
        features: ["3rd Row", "SYNC 4", "B&O Audio", "Co-Pilot360"],
        images: [getPremiumCarImage("suv", "13")],
        rating: 4.6,
        tier: "premium",
        isAvailable: true,
        createdAt: "2025-02-07",
        updatedAt: "2025-02-07",
    },
];

// ──────────────────────────────────────────────
// MOCK RENTAL APPLICATIONS
// ──────────────────────────────────────────────

export const MOCK_APPLICATIONS: RentalApplication[] = [
    {
        id: "app-1",
        vehicleId: "3",
        customerName: "Kwame Asante",
        customerPhone: "+233244111222",
        customerEmail: "kwame.asante@email.com",
        idType: "Ghana Card",
        idReference: "GHA-123456789-0",
        startDate: "2025-03-01",
        endDate: "2025-03-07",
        status: "approved",
        notes: "Corporate client, verified references.",
        createdAt: "2025-02-20",
        updatedAt: "2025-02-22",
    },
    {
        id: "app-2",
        vehicleId: "7",
        customerName: "Ama Serwaa",
        customerPhone: "+233201333444",
        customerEmail: "ama.serwaa@email.com",
        idType: "Passport",
        idReference: "G01234567",
        startDate: "2025-03-05",
        endDate: "2025-03-12",
        status: "pending",
        createdAt: "2025-02-25",
        updatedAt: "2025-02-25",
    },
    {
        id: "app-3",
        vehicleId: "11",
        customerName: "Yaw Mensah",
        customerPhone: "+233551666777",
        customerEmail: "yaw.m@email.com",
        idType: "Voter's ID",
        idReference: "V-9876543210",
        startDate: "2025-03-10",
        endDate: "2025-03-14",
        status: "reviewing",
        notes: "First-time renter, additional reference requested.",
        createdAt: "2025-02-28",
        updatedAt: "2025-03-01",
    },
    {
        id: "app-4",
        vehicleId: "8",
        customerName: "Efua Owusu",
        customerPhone: "+233209888999",
        customerEmail: "efua.owusu@corp.com",
        idType: "Ghana Card",
        idReference: "GHA-987654321-0",
        startDate: "2025-03-15",
        endDate: "2025-03-30",
        status: "approved",
        notes: "Long-term corporate rental. Company: Owusu Enterprises.",
        createdAt: "2025-03-02",
        updatedAt: "2025-03-03",
    },
];

// ──────────────────────────────────────────────
// MOCK QUOTE REQUESTS (Transport & Freight)
// ──────────────────────────────────────────────

export const MOCK_QUOTES: QuoteRequest[] = [
    {
        id: "qt-1",
        serviceType: "transport",
        customerName: "Kofi Adjei",
        customerPhone: "+233244222333",
        customerEmail: "kofi.adjei@email.com",
        details: "Airport pickup for 4 guests arriving on Emirates EK787, 15 March 2025 at Kotoka International. Need comfortable SUV.",
        status: "new",
        createdAt: "2025-03-10",
    },
    {
        id: "qt-2",
        serviceType: "transport",
        customerName: "NGO Ghana Health",
        customerPhone: "+233302111222",
        customerEmail: "logistics@ghanango.org",
        details: "Staff shuttle service needed for 20 people, Mon-Fri for 3 months. Pickup from East Legon to Tema Industrial Area.",
        status: "contacted",
        createdAt: "2025-02-28",
    },
    {
        id: "qt-3",
        serviceType: "freight",
        customerName: "Accra Auto Parts Ltd",
        customerPhone: "+233244555666",
        customerEmail: "imports@accraparts.com",
        details: "Container shipment of auto parts from Hamburg, Germany to Tema Port. 2x 20ft containers, approx 18 tons total. Need door-to-door.",
        status: "new",
        createdAt: "2025-03-08",
    },
    {
        id: "qt-4",
        serviceType: "freight",
        customerName: "Kumasi Traders Co.",
        customerPhone: "+233201444555",
        customerEmail: "info@kumasitraders.com",
        details: "Clearing and forwarding for electronics shipment arriving Tema Port. Bill of Lading available. Need customs brokerage.",
        status: "contacted",
        createdAt: "2025-02-15",
    },
    {
        id: "qt-5",
        serviceType: "transport",
        customerName: "Grace Baptist Church",
        customerPhone: "+233244777888",
        customerEmail: "admin@gracebaptist.org",
        details: "Need 2 buses (30-seater each) for church conference in Cape Coast. 3-day trip, March 28-30. Accommodation for drivers included.",
        status: "closed",
        createdAt: "2025-02-10",
    },
];

// ──────────────────────────────────────────────
// API HELPER FUNCTIONS
// ──────────────────────────────────────────────

/** Get a single vehicle by ID */
export function getVehicleById(id: string): Vehicle | undefined {
    return MOCK_VEHICLES.find((v) => v.id === id);
}

/** Get vehicles filtered by status */
export function getVehiclesByStatus(status: VehicleStatus): Vehicle[] {
    return MOCK_VEHICLES.filter((v) => v.status === status);
}

/** Get vehicles for sale */
export function getSaleVehicles(): Vehicle[] {
    return getVehiclesByStatus("sale");
}

/** Get rental vehicles */
export function getRentalVehicles(): Vehicle[] {
    return getVehiclesByStatus("rent");
}

/** Get vehicles filtered by category */
export function getVehiclesByCategory(category: string): Vehicle[] {
    if (category === "all") return MOCK_VEHICLES;
    return MOCK_VEHICLES.filter((v) => v.category === category);
}

/** Get rental application by ID */
export function getApplicationById(id: string): RentalApplication | undefined {
    return MOCK_APPLICATIONS.find((a) => a.id === id);
}

/** Get applications for a specific vehicle */
export function getApplicationsByVehicle(vehicleId: string): RentalApplication[] {
    return MOCK_APPLICATIONS.filter((a) => a.vehicleId === vehicleId);
}

/** Get quote requests by service type */
export function getQuotesByService(serviceType: "transport" | "freight"): QuoteRequest[] {
    return MOCK_QUOTES.filter((q) => q.serviceType === serviceType);
}
