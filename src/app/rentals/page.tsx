import type { Metadata } from "next";
import { RentalsPageContent } from "@/components/rentals";

export const metadata: Metadata = {
    title: "Vehicle Rentals | Premium Car Hire in Accra, Ghana | Royal Dynamite",
    description:
        "Rent quality sedans, SUVs, and buses in Accra. Competitive daily and weekly rates, comprehensive insurance, and a simple pre-qualification process.",
};

export default function RentalsPage() {
    return <RentalsPageContent />;
}
