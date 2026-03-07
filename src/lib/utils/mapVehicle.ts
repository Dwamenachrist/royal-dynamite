/**
 * Convert a Supabase DbVehicle row to the UI Vehicle type
 * used by stitch layout components and other client-facing pages.
 */
import type { DbVehicle } from "@/types/database"
import type { Vehicle, VehicleCategory, VehicleStatus } from "@/types"

/** Map DB body_type to legacy VehicleCategory */
function mapCategory(dbVehicle: DbVehicle): VehicleCategory {
    const bt = dbVehicle.body_type?.toLowerCase() ?? ""
    if (bt.includes("suv")) return "suv"
    if (bt.includes("sedan")) return "sedan"
    if (bt.includes("pickup") || bt.includes("truck")) return "truck"
    if (bt.includes("van")) return "van"
    if (bt.includes("bus")) return "bus"
    if (bt.includes("coupe") || bt.includes("hatchback")) return "luxury"
    // fallback: map from DB category
    if (dbVehicle.category === "sale") return "suv"
    return "suv"
}

/** Map DB category + status to legacy VehicleStatus */
function mapStatus(dbVehicle: DbVehicle): VehicleStatus {
    return dbVehicle.category === "sale" ? "sale" : "rent"
}

export function dbVehicleToVehicle(db: DbVehicle): Vehicle {
    return {
        id: db.id,
        make: db.make,
        model: db.model,
        year: db.year,
        category: mapCategory(db),
        status: mapStatus(db),
        price: null, // No prices shown — users must enquire
        dailyRate: db.daily_rate ?? null,
        mileage: db.mileage ?? 0,
        fuelType: db.fuel_type ?? "",
        transmission: db.transmission ?? "",
        color: db.color ?? "",
        description: db.description ?? "",
        features: [],
        images: db.images ?? [],
        rating: undefined,
        tier: undefined,
        isAvailable: db.status === "available",
        createdAt: db.created_at ?? new Date().toISOString(),
        updatedAt: db.updated_at ?? new Date().toISOString(),
    }
}

export function dbVehiclesToVehicles(dbVehicles: DbVehicle[]): Vehicle[] {
    return dbVehicles.map(dbVehicleToVehicle)
}
