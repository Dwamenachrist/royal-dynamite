"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase/actions";

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface ContactFormErrors {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    submit?: string;
}

export function useContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        subject: "sales", // default to 'sales'
        message: "",
    });

    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [touched, setTouched] = useState<Set<keyof ContactFormData>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isMapActive, setIsMapActive] = useState(false);

    const validateField = (field: keyof ContactFormData, value: string): string => {
        switch (field) {
            case "name":
                return value.length < 2 ? "Please enter at least 2 characters" : "";
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Please enter a valid email address";
            case "subject":
                return !value ? "Please select a service" : "";
            case "message":
                return value.length < 10 ? "Message must be at least 10 characters long" : "";
            default:
                return "";
        }
    };

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (touched.has(field)) {
            setErrors((prev) => ({ ...prev, [field]: validateField(field, value), submit: undefined }));
        }
    };

    const handleBlur = (field: keyof ContactFormData) => {
        setTouched((prev) => {
            const next = new Set(prev);
            next.add(field);
            return next;
        });
        setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
    };

    const handleServiceSelect = (value: string) => {
        handleChange("subject", value);
    };

    const validateForm = (): boolean => {
        const newErrors: ContactFormErrors = {};
        let isValid = true;
        const allTouched = new Set<keyof ContactFormData>();

        (Object.keys(formData) as Array<keyof ContactFormData>).forEach((key) => {
            allTouched.add(key);
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(allTouched);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setErrors((prev) => ({ ...prev, submit: undefined }));

        try {
            // Map ContactFormData to the format expected by submitEnquiry
            // submitEnquiry expects: { name, email, phone, service_type, message, vehicle_id }
            const payload = new FormData();
            payload.append("name", formData.name);
            payload.append("email", formData.email);
            if (formData.phone) payload.append("phone", formData.phone);
            payload.append("service_type", formData.subject);
            payload.append("message", formData.message);

            const result = await submitEnquiry(payload);

            if (result.success) {
                setIsSubmitted(true);
            } else {
                setErrors((prev) => ({ ...prev, submit: result.error || "Failed to submit enquiry" }));
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setErrors((prev) => ({ ...prev, submit: "An unexpected error occurred. Please try again." }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "sales",
            message: "",
        });
        setErrors({});
        setTouched(new Set());
        setIsSubmitted(false);
    };

    const getInputClass = (field: keyof ContactFormData) => {
        const isError = errors[field] && touched.has(field);
        const isValid = !errors[field] && touched.has(field) && formData[field].length > 0;

        return `concierge-input ${isError ? "border-red-500/50 bg-red-500/5" : isValid ? "border-green-500/50 bg-green-500/5" : ""
            }`;
    };

    return {
        formData,
        errors,
        touched,
        isSubmitting,
        isSubmitted,
        isMapActive,
        setIsMapActive,
        handleChange,
        handleBlur,
        handleServiceSelect,
        handleSubmit,
        resetForm,
        getInputClass,
    };
}
