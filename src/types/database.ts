// ──────────────────────────────────────────────
// AUTO-GENERATED SUPABASE TYPES + APP HELPERS
// ──────────────────────────────────────────────

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            enquiries: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    message: string
                    name: string
                    phone: string | null
                    service_type: string
                    status: string
                    vehicle_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    message: string
                    name: string
                    phone?: string | null
                    service_type: string
                    status?: string
                    vehicle_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    message?: string
                    name?: string
                    phone?: string | null
                    service_type?: string
                    status?: string
                    vehicle_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "enquiries_vehicle_id_fkey"
                        columns: ["vehicle_id"]
                        isOneToOne: false
                        referencedRelation: "vehicles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            rental_applications: {
                Row: {
                    created_at: string | null
                    email: string
                    end_date: string
                    id: string
                    name: string
                    notes: string | null
                    phone: string
                    purpose: string | null
                    start_date: string
                    status: string
                    vehicle_id: string
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    end_date: string
                    id?: string
                    name: string
                    notes?: string | null
                    phone: string
                    purpose?: string | null
                    start_date: string
                    status?: string
                    vehicle_id: string
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    end_date?: string
                    id?: string
                    name?: string
                    notes?: string | null
                    phone?: string
                    purpose?: string | null
                    start_date?: string
                    status?: string
                    vehicle_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "rental_applications_vehicle_id_fkey"
                        columns: ["vehicle_id"]
                        isOneToOne: false
                        referencedRelation: "vehicles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            vehicles: {
                Row: {
                    body_type: string | null
                    category: string
                    color: string | null
                    created_at: string | null
                    daily_rate: number | null
                    description: string | null
                    featured: boolean | null
                    fuel_type: string | null
                    id: string
                    images: string[] | null
                    make: string
                    mileage: number | null
                    model: string
                    status: string
                    transmission: string | null
                    updated_at: string | null
                    year: number
                }
                Insert: {
                    body_type?: string | null
                    category: string
                    color?: string | null
                    created_at?: string | null
                    daily_rate?: number | null
                    description?: string | null
                    featured?: boolean | null
                    fuel_type?: string | null
                    id?: string
                    images?: string[] | null
                    make: string
                    mileage?: number | null
                    model: string
                    status?: string
                    transmission?: string | null
                    updated_at?: string | null
                    year: number
                }
                Update: {
                    body_type?: string | null
                    category?: string
                    color?: string | null
                    created_at?: string | null
                    daily_rate?: number | null
                    description?: string | null
                    featured?: boolean | null
                    fuel_type?: string | null
                    id?: string
                    images?: string[] | null
                    make?: string
                    mileage?: number | null
                    model?: string
                    status?: string
                    transmission?: string | null
                    updated_at?: string | null
                    year?: number
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            check_request: { Args: never; Returns: undefined }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

// ── Convenience aliases ──────────────────────
export type DbVehicle = Database["public"]["Tables"]["vehicles"]["Row"]
export type DbVehicleInsert = Database["public"]["Tables"]["vehicles"]["Insert"]
export type DbVehicleUpdate = Database["public"]["Tables"]["vehicles"]["Update"]

export type DbEnquiry = Database["public"]["Tables"]["enquiries"]["Row"]
export type DbEnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"]
export type DbEnquiryUpdate = Database["public"]["Tables"]["enquiries"]["Update"]

export type DbRentalApp = Database["public"]["Tables"]["rental_applications"]["Row"]
export type DbRentalAppInsert = Database["public"]["Tables"]["rental_applications"]["Insert"]
export type DbRentalAppUpdate = Database["public"]["Tables"]["rental_applications"]["Update"]

// ── Enriched types for admin views ───────────
export interface EnquiryWithVehicle extends DbEnquiry {
    vehicles: Pick<DbVehicle, "make" | "model" | "year" | "images"> | null
}

export interface RentalAppWithVehicle extends DbRentalApp {
    vehicles: Pick<DbVehicle, "make" | "model" | "year" | "images" | "daily_rate"> | null
}
