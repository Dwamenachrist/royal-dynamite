"use server"
// ──────────────────────────────────────────────
// SERVER ACTIONS — Zod-validated writes
// ──────────────────────────────────────────────

import { z } from "zod"
import { revalidatePath } from "next/cache"
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
import { createClient } from "@/utils/supabase/server"
import type {
    DbVehicleInsert,
    DbVehicleUpdate,
    DbEnquiryInsert,
    DbRentalAppInsert,
} from "@/types/database"

// ── Input Sanitiser ──────────────────────────

/** Strip HTML tags and dangerous patterns from user input */
function sanitise(input: string): string {
    return input
        .replace(/<[^>]*>/g, "")              // strip HTML tags
        .replace(/javascript:/gi, "")          // strip javascript: URIs
        .replace(/on\w+\s*=/gi, "")            // strip event handlers
        .trim()
}

// ── Zod Schemas ──────────────────────────────

const vehicleSchema = z.object({
    make: z.string().min(1, "Make is required").max(100).transform(sanitise),
    model: z.string().min(1, "Model is required").max(100).transform(sanitise),
    year: z.number().int().min(1990).max(2035),
    category: z.enum(["sale", "rental"]),
    body_type: z.enum(["SUV", "Sedan", "Pickup", "Van", "Coupe", "Hatchback", "Bus", "Truck"]).nullable().optional(),
    transmission: z.enum(["Automatic", "Manual"]).nullable().optional(),
    fuel_type: z.enum(["Petrol", "Diesel", "Hybrid", "Electric"]).nullable().optional(),
    mileage: z.number().int().min(0).default(0),
    color: z.string().max(50).transform(sanitise).optional(),
    description: z.string().max(5000).transform(sanitise).optional(),
    status: z.enum(["available", "sold", "reserved", "rented"]).default("available"),
    daily_rate: z.number().min(0).nullable().optional(),
    images: z.array(z.string().url()).default([]),
    featured: z.boolean().default(false),
})

const enquirySchema = z.object({
    name: z.string().min(2, "Name is too short").max(100).transform(sanitise),
    email: z.string().email("Invalid email address"),
    phone: z.string().max(30).transform(sanitise).optional(),
    service_type: z.enum(["sales", "rental", "transport", "freight"]),
    message: z.string().min(10, "Message is too short").max(2000).transform(sanitise),
    vehicle_id: z.string().uuid().nullable().optional(),
    status: z.enum(["new", "contacted", "closed"]).default("new"),
})

const rentalApplicationSchema = z.object({
    name: z.string().min(2).max(100).transform(sanitise),
    email: z.string().email(),
    phone: z.string().min(5).max(30).transform(sanitise),
    vehicle_id: z.string().uuid(),
    start_date: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid start date"),
    end_date: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid end date"),
    purpose: z.string().max(1000).transform(sanitise).optional(),
    status: z.enum(["pending", "reviewing", "approved", "rejected"]).default("pending"),
})

// ── Shared action result type ────────────────

interface ActionResult {
    success: boolean
    error?: string
}

// ── VEHICLE ACTIONS ──────────────────────────

export async function createVehicle(formData: FormData): Promise<ActionResult> {
    const raw = Object.fromEntries(formData)

    const parsed = vehicleSchema.safeParse({
        make: raw.make,
        model: raw.model,
        year: Number(raw.year),
        category: raw.category,
        body_type: raw.body_type || null,
        transmission: raw.transmission || null,
        fuel_type: raw.fuel_type || null,
        mileage: Number(raw.mileage) || 0,
        color: raw.color || undefined,
        description: raw.description || undefined,
        status: raw.status || "available",
        daily_rate: raw.daily_rate ? Number(raw.daily_rate) : null,
        images: raw.images ? JSON.parse(raw.images as string) : [],
        featured: raw.featured === "true",
    })

    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0]?.message ?? "Validation failed" }
    }

    const supabase = await createClient()
    const { error } = await supabase.from("vehicles").insert(parsed.data as DbVehicleInsert)

    if (error) {
        console.error("createVehicle error:", error.message)
        return { success: false, error: "Failed to add vehicle. Please try again." }
    }

    revalidatePath("/admin/inventory")
    revalidatePath("/dealership")
    revalidatePath("/rentals")
    revalidatePath("/")
    return { success: true }
}

export async function updateVehicle(id: string, formData: FormData): Promise<ActionResult> {
    const raw = Object.fromEntries(formData)

    const parsed = vehicleSchema.partial().safeParse({
        make: raw.make || undefined,
        model: raw.model || undefined,
        year: raw.year ? Number(raw.year) : undefined,
        category: raw.category || undefined,
        body_type: raw.body_type || null,
        transmission: raw.transmission || null,
        fuel_type: raw.fuel_type || null,
        mileage: raw.mileage ? Number(raw.mileage) : undefined,
        color: raw.color || undefined,
        description: raw.description || undefined,
        status: raw.status || undefined,
        daily_rate: raw.daily_rate ? Number(raw.daily_rate) : null,
        images: raw.images ? JSON.parse(raw.images as string) : undefined,
        featured: raw.featured !== undefined ? raw.featured === "true" : undefined,
    })

    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0]?.message ?? "Validation failed" }
    }

    const supabase = await createClient()
    const { error } = await supabase.from("vehicles").update(parsed.data as DbVehicleUpdate).eq("id", id)

    if (error) {
        console.error("updateVehicle error:", error.message)
        return { success: false, error: "Failed to update vehicle." }
    }

    revalidatePath("/admin/inventory")
    revalidatePath("/dealership")
    revalidatePath("/rentals")
    revalidatePath("/")
    return { success: true }
}

export async function deleteVehicle(id: string): Promise<ActionResult> {
    if (!id || typeof id !== "string") {
        return { success: false, error: "Invalid vehicle ID" }
    }

    const supabase = await createClient()
    const { error } = await supabase.from("vehicles").delete().eq("id", id)

    if (error) {
        console.error("deleteVehicle error:", error.message)
        return { success: false, error: "Failed to delete vehicle." }
    }

    revalidatePath("/admin/inventory")
    revalidatePath("/dealership")
    revalidatePath("/rentals")
    revalidatePath("/")
    return { success: true }
}

// ── ENQUIRY ACTIONS ──────────────────────────

/** Public: submit a new enquiry (contact form) */
export async function submitEnquiry(formData: FormData): Promise<ActionResult> {
    const raw = Object.fromEntries(formData)

    const parsed = enquirySchema.safeParse({
        name: raw.name,
        email: raw.email,
        phone: raw.phone || undefined,
        service_type: raw.service_type,
        message: raw.message,
        vehicle_id: raw.vehicle_id || null,
    })

    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0]?.message ?? "Validation failed" }
    }

    const supabase = await createClient()
    // DbEnquiryInsert interface expects exact matches, Zod returns exact matches. We can type it explicitly:
    const dataToInsert: DbEnquiryInsert = {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        service_type: parsed.data.service_type,
        message: parsed.data.message,
        vehicle_id: parsed.data.vehicle_id || null,
        status: parsed.data.status,
    }

    const { error } = await supabase.from("enquiries").insert(dataToInsert)

    if (error) {
        console.error("submitEnquiry error:", error.message)
        return { success: false, error: "Failed to submit enquiry. Please try again." }
    }

    return { success: true }
}

/** Admin: update enquiry status */
export async function updateEnquiryStatus(
    id: string,
    status: "new" | "contacted" | "closed"
): Promise<ActionResult> {
    if (!id || !["new", "contacted", "closed"].includes(status)) {
        return { success: false, error: "Invalid parameters" }
    }

    const supabase = await createClient()
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id)

    if (error) {
        console.error("updateEnquiryStatus error:", error.message)
        return { success: false, error: "Failed to update enquiry status." }
    }

    revalidatePath("/admin/enquiries")
    return { success: true }
}

// ── RENTAL APPLICATION ACTIONS ───────────────

/** Public: submit a rental application */
export async function submitRentalApplication(formData: FormData): Promise<ActionResult> {
    const raw = Object.fromEntries(formData)

    const parsed = rentalApplicationSchema.safeParse({
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        vehicle_id: raw.vehicle_id,
        start_date: raw.start_date,
        end_date: raw.end_date,
        purpose: raw.purpose || undefined,
    })

    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0]?.message ?? "Validation failed" }
    }

    // Validate date order
    if (new Date(parsed.data.end_date) <= new Date(parsed.data.start_date)) {
        return { success: false, error: "End date must be after start date" }
    }

    const supabase = await createClient()
    const dataToInsert: DbRentalAppInsert = {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        vehicle_id: parsed.data.vehicle_id,
        start_date: parsed.data.start_date,
        end_date: parsed.data.end_date,
        purpose: parsed.data.purpose || null,
        status: parsed.data.status,
    }

    const { error } = await supabase.from("rental_applications").insert(dataToInsert)

    if (error) {
        console.error("submitRentalApplication error:", error.message)
        return { success: false, error: "Failed to submit application. Please try again." }
    }

    return { success: true }
}

/** Admin: update rental application status */
export async function updateRentalApplicationStatus(
    id: string,
    status: "pending" | "reviewing" | "approved" | "rejected"
): Promise<ActionResult> {
    if (!id || !["pending", "reviewing", "approved", "rejected"].includes(status)) {
        return { success: false, error: "Invalid parameters" }
    }

    const supabase = await createClient()
    const { error } = await supabase.from("rental_applications").update({ status }).eq("id", id)

    if (error) {
        console.error("updateRentalAppStatus error:", error.message)
        return { success: false, error: "Failed to update application status." }
    }

    revalidatePath("/admin/rentals")
    return { success: true }
}

// ── SETTINGS ACTIONS ───────────────────────────
export async function updateAdminProfile(formData: FormData): Promise<ActionResult> {
    const raw = Object.fromEntries(formData)

    if (!raw.name?.toString().trim() || !raw.phone?.toString().trim()) {
        return { success: false, error: "Name and Phone are required." }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({
        data: {
            full_name: sanitise(raw.name as string),
            phone: sanitise(raw.phone as string)
        }
    })

    if (error) {
        console.error("updateAdminProfile error:", error.message)
        return { success: false, error: "Failed to update profile." }
    }

    revalidatePath("/admin/settings")
    return { success: true }
}

export async function updateAdminPassword(formData: FormData): Promise<ActionResult> {
    const raw = Object.fromEntries(formData)
    const newPassword = raw.new_password as string
    const confirmPassword = raw.confirm_password as string

    if (!newPassword || newPassword.length < 8) {
        return { success: false, error: "Password must be at least 8 characters long." }
    }

    if (newPassword !== confirmPassword) {
        return { success: false, error: "Passwords do not match." }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    })

    if (error) {
        console.error("updateAdminPassword error:", error.message)
        return { success: false, error: "Failed to update password." }
    }

    return { success: true }
}

// ── IMAGE UPLOAD ACTIONS ─────────────────────

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/** Validate a single upload file (type, size, extension) */
function validateImageFile(file: File): string | null {
    if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
        return "Only JPEG, PNG, and WebP images are allowed"
    }
    if (file.size > MAX_IMAGE_BYTES) {
        return "File size must be less than 5MB"
    }
    const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "")
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return `File extension "${ext}" is not allowed`
    }
    return null
}

/** Upload a single vehicle image to Supabase Storage */
export async function uploadVehicleImage(formData: FormData): Promise<{ url?: string; error?: string }> {
    const file = formData.get("file") as File | null
    if (!file) return { error: "No file provided" }

    const validationError = validateImageFile(file)
    if (validationError) return { error: validationError }

    const supabase = await createClient()

    // Auth check — only authenticated admins can upload
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { error: "Unauthorised. Please log in." }
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
    const filePath = `vehicles/${fileName}`

    const { error } = await supabase.storage
        .from("vehicle-images")
        .upload(filePath, file, { contentType: file.type, upsert: false })

    if (error) {
        console.error("uploadVehicleImage error:", error.message)
        return { error: "Failed to upload image. Please try again." }
    }

    const { data: urlData } = supabase.storage
        .from("vehicle-images")
        .getPublicUrl(filePath)

    return { url: urlData.publicUrl }
}

/** Per-file upload result — preserves order so the client knows exactly which file succeeded or failed */
export type UploadFileResult =
    | { status: "ok"; url: string }
    | { status: "error"; error: string }

/** Batch-upload multiple vehicle images in a single server action call.
 *  Creates ONE Supabase client and uploads all files in parallel.
 *  Returns results **in the same order** as the input files. */
export async function uploadVehicleImages(
    formData: FormData
): Promise<{ results: UploadFileResult[] }> {
    const files = formData.getAll("files") as File[]
    if (!files || files.length === 0) return { results: [{ status: "error", error: "No files provided" }] }

    // Validate every file before uploading any
    const validationErrors: UploadFileResult[] = []
    for (const file of files) {
        const err = validateImageFile(file)
        if (err) validationErrors.push({ status: "error", error: `${file.name}: ${err}` })
    }
    if (validationErrors.length > 0) return { results: validationErrors }

    const supabase = await createClient()

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { results: files.map(() => ({ status: "error" as const, error: "Unauthorised. Please log in." })) }
    }

    // Upload all files in parallel with a single Supabase client
    const settled = await Promise.allSettled(
        files.map(async (file) => {
            const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
            const filePath = `vehicles/${fileName}`

            const { error } = await supabase.storage
                .from("vehicle-images")
                .upload(filePath, file, { contentType: file.type, upsert: false })

            if (error) throw new Error(error.message)

            const { data: urlData } = supabase.storage
                .from("vehicle-images")
                .getPublicUrl(filePath)

            return urlData.publicUrl
        })
    )

    // Map results 1:1 preserving order
    const results: UploadFileResult[] = settled.map(r =>
        r.status === "fulfilled"
            ? { status: "ok" as const, url: r.value }
            : { status: "error" as const, error: r.reason?.message ?? "Upload failed" }
    )

    return { results }
}
