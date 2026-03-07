"use server"
// ──────────────────────────────────────────────
// SERVER-SIDE SUPABASE QUERIES (Read Operations)
// ──────────────────────────────────────────────

import { createClient } from "@/utils/supabase/server"
import { getPublicSupabaseClient } from "@/utils/supabase/public"
import type {
    DbVehicle,
    EnquiryWithVehicle,
    RentalAppWithVehicle,
} from "@/types/database"

// ── VEHICLES ─────────────────────────────────

/** Get all vehicles (optionally filtered by category).
 *  Public callers (dealership/rentals) pass a category — those results are
 *  further restricted to status="available" so sold/reserved/rented vehicles
 *  never appear on public-facing pages.  Admin callers omit category to get
 *  the full inventory regardless of status.
 */
export async function getVehicles(category?: "sale" | "rental"): Promise<DbVehicle[]> {
    // Public queries (with category) use the anonymous client so pages
    // can be statically rendered / ISR cached.  Admin (no category) uses
    // the cookie-aware server client for RLS-gated data.
    const supabase = category
        ? getPublicSupabaseClient()
        : await createClient()

    let query = supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false })

    if (category) {
        query = query.eq("category", category).eq("status", "available")
    }

    const { data, error } = await query
    if (error) {
        // Suppress harmless AbortErrors from Next.js HMR / navigation
        if (error.message?.includes("aborted") || (error as unknown as { code?: number }).code === 20) {
            return []
        }
        console.error("getVehicles error:", error.message)
        return []
    }
    return data ?? []
}

/** Get sale vehicles only */
export async function getSaleVehicles(): Promise<DbVehicle[]> {
    return getVehicles("sale")
}

/** Get rental vehicles only */
export async function getRentalVehicles(): Promise<DbVehicle[]> {
    return getVehicles("rental")
}

/** Get a single vehicle by ID (public — uses anonymous client) */
export async function getVehicleById(id: string): Promise<DbVehicle | null> {
    const supabase = getPublicSupabaseClient()
    const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        if (error.message?.includes("aborted")) return null
        console.error("getVehicleById error:", error.message)
        return null
    }
    return data
}

/** Get featured vehicles (public — uses anonymous client) */
export async function getFeaturedVehicles(): Promise<DbVehicle[]> {
    const supabase = getPublicSupabaseClient()
    const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("featured", true)
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(6)

    if (error) {
        if (error.message?.includes("aborted")) return []
        console.error("getFeaturedVehicles error:", error.message)
        return []
    }
    return data ?? []
}

// ── ENQUIRIES ────────────────────────────────

/** Get all enquiries with optional vehicle info (admin) */
export async function getEnquiries(): Promise<EnquiryWithVehicle[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("enquiries")
        .select(`
      *,
      vehicles (make, model, year, images)
    `)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("getEnquiries error:", error.message)
        return []
    }
    return (data ?? []) as EnquiryWithVehicle[]
}

// ── RENTAL APPLICATIONS ──────────────────────

/** Get all rental applications with vehicle info (admin) */
export async function getRentalApplications(): Promise<RentalAppWithVehicle[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("rental_applications")
        .select(`
      *,
      vehicles (make, model, year, images, daily_rate)
    `)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("getRentalApplications error:", error.message)
        return []
    }
    return (data ?? []) as RentalAppWithVehicle[]
}

// ── DASHBOARD STATS ──────────────────────────

export interface DashboardStats {
    totalVehicles: number;
    saleVehicles: number;
    rentalVehicles: number;
    totalEnquiries: number;
    newEnquiries: number;
    totalApplications: number;
    pendingApplications: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient()

    // Optimization: Ask Postgres to count exact groupings without returning data payload.
    const [
        totalVehiclesRes, saleVehiclesRes, rentalVehiclesRes,
        totalEnquiriesRes, newEnquiriesRes,
        totalApplicationsRes, pendingApplicationsRes
    ] = await Promise.all([
        supabase.from("vehicles").select("*", { count: "exact", head: true }),
        supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("category", "sale"),
        supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("category", "rental"),
        supabase.from("enquiries").select("*", { count: "exact", head: true }),
        supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("rental_applications").select("*", { count: "exact", head: true }),
        supabase.from("rental_applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    ])

    return {
        totalVehicles: totalVehiclesRes.count ?? 0,
        saleVehicles: saleVehiclesRes.count ?? 0,
        rentalVehicles: rentalVehiclesRes.count ?? 0,
        totalEnquiries: totalEnquiriesRes.count ?? 0,
        newEnquiries: newEnquiriesRes.count ?? 0,
        totalApplications: totalApplicationsRes.count ?? 0,
        pendingApplications: pendingApplicationsRes.count ?? 0,
    }
}

// ── USER PROFILE ─────────────────────────────
export async function getAdminProfile() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        return null;
    }

    return {
        id: user.id,
        email: user.email ?? "",
        phone: user.phone ?? "+233 000 000 000",
        name: user.user_metadata?.full_name ?? "Administrator",
        role: "Administrator",
        last_sign_in_at: user.last_sign_in_at
    }
}
