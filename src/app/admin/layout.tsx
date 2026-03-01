import AdminShell from "@/components/admin/admin-shell"
import { VehicleProvider } from "@/contexts/vehicle-context"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
    title: "Admin | Royal Dynamite",
    robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminShell>
            <VehicleProvider>
                {children}
                {/* Second Toaster needed — root layout Toaster is below the fixed z-[9999] overlay */}
                <Toaster position="bottom-right" />
            </VehicleProvider>
        </AdminShell>
    )
}
