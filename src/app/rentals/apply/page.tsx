"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function RentalApplicationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <CardHeader>
                        <div className="mx-auto mb-4 rounded-full bg-green-100 p-3 w-fit dark:bg-green-900">
                            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle>Application Submitted!</CardTitle>
                        <CardDescription className="text-base">
                            Thank you for your rental application. Our team will review your
                            information and contact you within 24-48 hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/rentals">Back to Rentals</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container max-w-2xl px-4 md:px-6">
                <Button variant="ghost" className="mb-6" asChild>
                    <Link href="/rentals">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Rentals
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Rental Pre-Qualification</CardTitle>
                        <CardDescription className="text-base">
                            Complete this form to start your rental application. All fields are required
                            for verification purposes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Personal Information</h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" required placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" required placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" required placeholder="+233 XX XXX XXXX" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" required placeholder="john@example.com" />
                                </div>
                            </div>

                            {/* ID Verification */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">ID Verification</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="idType">ID Type</Label>
                                    <Select required>
                                        <SelectTrigger id="idType">
                                            <SelectValue placeholder="Select ID type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ghana-card">Ghana Card</SelectItem>
                                            <SelectItem value="passport">Passport</SelectItem>
                                            <SelectItem value="drivers-license">Driver's License</SelectItem>
                                            <SelectItem value="voters-id">Voter's ID</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="idNumber">ID Number</Label>
                                    <Input id="idNumber" required placeholder="Enter your ID number" />
                                </div>
                            </div>

                            {/* Rental Details */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Rental Details</h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate">Pickup Date</Label>
                                        <Input id="startDate" type="date" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">Return Date</Label>
                                        <Input id="endDate" type="date" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="vehiclePreference">Vehicle Preference (Optional)</Label>
                                    <Select>
                                        <SelectTrigger id="vehiclePreference">
                                            <SelectValue placeholder="Select vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">Any Available</SelectItem>
                                            <SelectItem value="sedan">Sedan</SelectItem>
                                            <SelectItem value="suv">SUV</SelectItem>
                                            <SelectItem value="van">Van (12+ seats)</SelectItem>
                                            <SelectItem value="bus">Bus (30+ seats)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                                <p>
                                    By submitting this form, you agree to our{" "}
                                    <Link href="/terms" className="underline hover:text-foreground">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="underline hover:text-foreground">
                                        Privacy Policy
                                    </Link>
                                    . Your information will only be used for rental verification purposes.
                                </p>
                            </div>

                            {/* Submit */}
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Application"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
