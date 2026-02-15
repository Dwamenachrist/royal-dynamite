// Vehicle Types
export type VehicleStatus = "sale" | "rent";
export type VehicleCategory = "sedan" | "suv" | "truck" | "van" | "bus" | "luxury";

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    category: VehicleCategory;
    status: VehicleStatus;
    price: number | null; // null = "Contact for Price"
    dailyRate: number | null; // For rentals
    mileage: number;
    fuelType: string;
    transmission: string;
    engineSize?: string; // e.g. "2.8L"
    drivetrain?: string; // e.g. "4WD", "FWD", "RWD"
    color: string;
    description: string;
    features: string[];
    images: string[];
    vin?: string;
    rating?: number; // e.g. 4.7
    tier?: "business" | "premium" | "group"; // Rental tier
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}

// Rental Application Types
export type ApplicationStatus = "pending" | "reviewing" | "approved" | "rejected";

export interface RentalApplication {
    id: string;
    vehicleId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    idType: string;
    idReference: string;
    startDate: string;
    endDate: string;
    status: ApplicationStatus;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

// Quote Request Types
export interface QuoteRequest {
    id: string;
    serviceType: "transport" | "freight";
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    details: string;
    status: "new" | "contacted" | "closed";
    createdAt: string;
}
