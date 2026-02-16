import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface SpecsTabsProps {
    className?: string
    vehicle: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function SpecsTabs({ className, vehicle }: SpecsTabsProps) {
    return (
        <div className={cn("mt-8", className)}>
            <Tabs defaultValue="overview" className="w-full">
                <div className="border-b border-white/10">
                    <TabsList className="bg-transparent p-0 h-auto">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#edbc1d] data-[state=active]:text-[#edbc1d] rounded-none px-1 pb-4 pt-2 text-gray-400 hover:text-gray-200"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="features"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#edbc1d] data-[state=active]:text-[#edbc1d] rounded-none px-1 pb-4 pt-2 text-gray-400 hover:text-gray-200"
                        >
                            Features
                        </TabsTrigger>
                        <TabsTrigger
                            value="performance"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#edbc1d] data-[state=active]:text-[#edbc1d] rounded-none px-1 pb-4 pt-2 text-gray-400 hover:text-gray-200"
                        >
                            Performance
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#edbc1d] data-[state=active]:text-[#edbc1d] rounded-none px-1 pb-4 pt-2 text-gray-400 hover:text-gray-200"
                        >
                            History
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="py-6 space-y-6">
                    <TabsContent value="overview" className="animate-fade-in">
                        <div className="prose prose-invert max-w-none text-gray-300 font-light">
                            <p>{vehicle.description}</p>
                            <p className="mt-4">
                                Under the hood lies a formidable {vehicle.engineSize} engine delivering effortless power,
                                while the interior is a sanctuary of technology and comfort.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <SpecItem label="Exterior Color" value={vehicle.color} />
                            <SpecItem label="Interior Trim" value="Perlino Leather" />
                            <SpecItem label="Drive Type" value={vehicle.drivetrain} />
                            <SpecItem label="VIN" value={vehicle.vin} />
                        </div>
                    </TabsContent>

                    <TabsContent value="features" className="animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                            {vehicle.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-[#edbc1d] rounded-full" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="performance" className="animate-fade-in">
                        <div className="text-gray-400 italic">Performance specs available on request.</div>
                    </TabsContent>

                    <TabsContent value="history" className="animate-fade-in">
                        <div className="text-gray-400 italic">Full service history available.</div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

function SpecItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-white/5 border border-white/5 p-4 rounded-lg flex justify-between items-center hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-sm">{label}</span>
            <span className="text-white font-medium">{value}</span>
        </div>
    )
}
