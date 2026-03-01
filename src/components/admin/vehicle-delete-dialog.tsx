"use client"

import { AlertTriangle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Vehicle } from "@/types"

interface VehicleDeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    vehicle: Vehicle | null
    onConfirm: () => void
}

export default function VehicleDeleteDialog({
    open,
    onOpenChange,
    vehicle,
    onConfirm,
}: VehicleDeleteDialogProps) {
    if (!vehicle) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="bg-[#0a192f] border border-white/10 text-white max-w-sm rounded-2xl"
            >
                <DialogHeader className="items-center text-center space-y-4 pt-2">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                        <AlertTriangle className="w-7 h-7 text-red-400" />
                    </div>
                    <div>
                        <DialogTitle className="text-lg font-extrabold uppercase text-white">
                            Delete this vehicle?
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm mt-2 leading-relaxed">
                            You are about to remove the{" "}
                            <span className="text-white font-semibold">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                            </span>{" "}
                            from your inventory. This cannot be undone.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <DialogFooter className="flex gap-3 pt-2 pb-1">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl py-5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm()
                            onOpenChange(false)
                        }}
                        className="flex-1 bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 hover:text-red-300 rounded-xl py-5 font-bold"
                        variant="outline"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
