"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Vehicle } from "@/types"
import { MOCK_VEHICLES } from "@/lib/mock-data"

// ── localStorage key ──────────────────────────────────────────────────────────
// NOTE: If MOCK_VEHICLES changes in source, clear "rd_vehicles_v1" in browser devtools.
const STORAGE_KEY = "rd_vehicles_v1"

// ── Context shape ─────────────────────────────────────────────────────────────
interface VehicleContextValue {
    vehicles: Vehicle[]
    addVehicle: (data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">) => void
    updateVehicle: (id: string, patch: Partial<Vehicle>) => void
    deleteVehicle: (id: string) => void
    markSold: (id: string) => void
}

const VehicleContext = createContext<VehicleContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────
export function VehicleProvider({ children }: { children: React.ReactNode }) {
    const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES)
    const [mounted, setMounted] = useState(false)

    // Hydrate from localStorage on mount (SSR-safe)
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setVehicles(parsed)
                }
            } catch {
                // Corrupted data — fall back to MOCK_VEHICLES
            }
        }
        setMounted(true)
    }, [])

    // Persist every change back to localStorage (after mount only)
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles))
        }
    }, [vehicles, mounted])

    const addVehicle = useCallback(
        (data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">) => {
            const now = new Date().toISOString().split("T")[0]
            const newVehicle: Vehicle = {
                ...data,
                id: `v_${Date.now()}`,
                createdAt: now,
                updatedAt: now,
            }
            setVehicles((prev) => [newVehicle, ...prev])
        },
        []
    )

    const updateVehicle = useCallback((id: string, patch: Partial<Vehicle>) => {
        setVehicles((prev) =>
            prev.map((v) =>
                v.id === id
                    ? { ...v, ...patch, updatedAt: new Date().toISOString().split("T")[0] }
                    : v
            )
        )
    }, [])

    const deleteVehicle = useCallback((id: string) => {
        setVehicles((prev) => prev.filter((v) => v.id !== id))
    }, [])

    const markSold = useCallback(
        (id: string) => {
            updateVehicle(id, { isAvailable: false })
        },
        [updateVehicle]
    )

    return (
        <VehicleContext.Provider
            value={{ vehicles, addVehicle, updateVehicle, deleteVehicle, markSold }}
        >
            {children}
        </VehicleContext.Provider>
    )
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useVehicles(): VehicleContextValue {
    const ctx = useContext(VehicleContext)
    if (!ctx) {
        throw new Error("useVehicles must be used inside <VehicleProvider>")
    }
    return ctx
}
