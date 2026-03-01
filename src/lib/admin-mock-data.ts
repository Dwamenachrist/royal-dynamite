// ──────────────────────────────────────────────
// ADMIN MOCK DATA — Replace with Supabase in production
// ──────────────────────────────────────────────

export interface AdminEnquiry {
    id: string
    vehicleId: string
    vehicleName: string
    vehicleImage: string
    customerName: string
    customerPhone: string
    customerEmail: string
    message: string
    status: "new" | "contacted" | "closed"
    createdAt: string
}

export const MOCK_ENQUIRIES: AdminEnquiry[] = [
    {
        id: "enq-001",
        vehicleId: "1",
        vehicleName: "2022 Toyota Land Cruiser Prado",
        vehicleImage: "https://pictures-ghana.jijistatic.net/57818001_MzAwLTQwMC00N2IyN2ExNjY3.webp",
        customerName: "Kwame Asante",
        customerPhone: "+233 24 400 5678",
        customerEmail: "kwame.asante@gmail.com",
        message: "I'm interested in the 2022 Toyota Land Cruiser Prado. Please send me more details.",
        status: "new",
        createdAt: "2026-02-28T09:15:00Z",
    },
    {
        id: "enq-002",
        vehicleId: "2",
        vehicleName: "2023 Mercedes-Benz E-Class",
        vehicleImage: "https://pictures-ghana.jijistatic.net/57437417_MzAwLTIyNS05ZjAzZDdkOWM0.webp",
        customerName: "Abena Mensah",
        customerPhone: "+233 20 711 2345",
        customerEmail: "abena.m@outlook.com",
        message: "Hi, I'd like to know more about the Mercedes E-Class. Is it still available?",
        status: "new",
        createdAt: "2026-02-27T14:30:00Z",
    },
    {
        id: "enq-003",
        vehicleId: "17",
        vehicleName: "2022 Nissan Patrol",
        vehicleImage: "",
        customerName: "Emmanuel Boateng",
        customerPhone: "+233 55 234 7890",
        customerEmail: "eboateng@yahoo.com",
        message: "Interested in the Nissan Patrol. What is the final selling price?",
        status: "contacted",
        createdAt: "2026-02-26T11:00:00Z",
    },
    {
        id: "enq-004",
        vehicleId: "4",
        vehicleName: "2023 Toyota Hilux",
        vehicleImage: "https://pictures-ghana.jijistatic.net/57300276_MzAwLTIzNC1iY2Q3NDlhY2Qy.webp",
        customerName: "Akosua Frimpong",
        customerPhone: "+233 26 455 9012",
        customerEmail: "akosua.f@gmail.com",
        message: "Please I want information about the Toyota Hilux. When can I come for a test drive?",
        status: "new",
        createdAt: "2026-02-26T08:45:00Z",
    },
    {
        id: "enq-005",
        vehicleId: "15",
        vehicleName: "2023 Hyundai Tucson",
        vehicleImage: "https://pictures-ghana.jijistatic.net/56316923_MzAwLTI2OS01M2EzMDM4MDEx.webp",
        customerName: "Kofi Amoah",
        customerPhone: "+233 24 312 6789",
        customerEmail: "k.amoah@gmail.com",
        message: "Good day. I need details on the Tucson — are financing options available?",
        status: "contacted",
        createdAt: "2026-02-25T16:20:00Z",
    },
    {
        id: "enq-006",
        vehicleId: "16",
        vehicleName: "2023 Toyota RAV4 Hybrid",
        vehicleImage: "",
        customerName: "Yaa Darko",
        customerPhone: "+233 50 123 4567",
        customerEmail: "yaa.darko@company.com",
        message: "Corporate enquiry for the RAV4 Hybrid. We are interested in a fleet purchase for our company.",
        status: "new",
        createdAt: "2026-02-25T10:00:00Z",
    },
    {
        id: "enq-007",
        vehicleId: "19",
        vehicleName: "2024 Toyota Camry",
        vehicleImage: "",
        customerName: "Isaac Owusu",
        customerPhone: "+233 27 890 3456",
        customerEmail: "i.owusu@gmail.com",
        message: "I want to buy the 2024 Camry. Please call me back as soon as possible.",
        status: "closed",
        createdAt: "2026-02-24T13:30:00Z",
    },
]

export interface AdminRentalApp {
    id: string
    vehicleId: string
    vehicleName: string
    vehicleImage: string
    customerName: string
    customerPhone: string
    startDate: string
    endDate: string
    totalDays: number
    dailyRate: number
    status: "pending" | "reviewing" | "approved" | "rejected"
    createdAt: string
}

export const MOCK_RENTAL_APPS: AdminRentalApp[] = [
    {
        id: "rent-001",
        vehicleId: "7",
        vehicleName: "2023 Toyota Land Cruiser Prado",
        vehicleImage: "https://pictures-ghana.jijistatic.net/57609637_MzAwLTMzMC1hYTBkM2JmZGIx.webp",
        customerName: "Corporate Solutions Ltd",
        customerPhone: "+233 30 274 5678",
        startDate: "2026-03-05",
        endDate: "2026-03-10",
        totalDays: 5,
        dailyRate: 830,
        status: "reviewing",
        createdAt: "2026-02-27T10:00:00Z",
    },
    {
        id: "rent-002",
        vehicleId: "5",
        vehicleName: "2020 Hyundai H1",
        vehicleImage: "https://pictures-ghana.jijistatic.net/57264568_MzAwLTQzMi1hMTllMjEyMzM2.webp",
        customerName: "Grace Asiedu",
        customerPhone: "+233 24 567 8901",
        startDate: "2026-03-01",
        endDate: "2026-03-03",
        totalDays: 2,
        dailyRate: 500,
        status: "approved",
        createdAt: "2026-02-26T15:30:00Z",
    },
    {
        id: "rent-003",
        vehicleId: "8",
        vehicleName: "2023 Mercedes-Benz E-Class",
        vehicleImage: "",
        customerName: "Daniel Oppong",
        customerPhone: "+233 55 678 9012",
        startDate: "2026-03-08",
        endDate: "2026-03-09",
        totalDays: 1,
        dailyRate: 950,
        status: "pending",
        createdAt: "2026-02-28T08:00:00Z",
    },
    {
        id: "rent-004",
        vehicleId: "6",
        vehicleName: "2019 Toyota Coaster Bus",
        vehicleImage: "https://pictures-ghana.jijistatic.net/57264568_MzAwLTQzMi1hMTllMjEyMzM2.webp",
        customerName: "First Church of God",
        customerPhone: "+233 24 890 1234",
        startDate: "2026-03-15",
        endDate: "2026-03-16",
        totalDays: 1,
        dailyRate: 800,
        status: "pending",
        createdAt: "2026-02-28T11:45:00Z",
    },
    {
        id: "rent-005",
        vehicleId: "3",
        vehicleName: "2021 Toyota Camry",
        vehicleImage: "https://pictures-ghana.jijistatic.net/56677993_MzAwLTIyNS0xNWEyNGIwZDY1.webp",
        customerName: "Sarah Mensah",
        customerPhone: "+233 27 123 4567",
        startDate: "2026-02-20",
        endDate: "2026-02-25",
        totalDays: 5,
        dailyRate: 350,
        status: "rejected",
        createdAt: "2026-02-19T09:00:00Z",
    },
]

// Chart data
export const ENQUIRIES_TREND = [
    { week: "Feb W1", count: 3 },
    { week: "Feb W2", count: 5 },
    { week: "Feb W3", count: 4 },
    { week: "Feb W4", count: 7 },
]

export const INVENTORY_BY_CATEGORY = [
    { category: "SUV", count: 8 },
    { category: "Sedan", count: 5 },
    { category: "Luxury", count: 2 },
    { category: "Truck", count: 1 },
    { category: "Van", count: 1 },
    { category: "Bus", count: 1 },
]
