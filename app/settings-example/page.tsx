"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { SettingsPage } from "@/components/settings-page";

export default function SettingsExample() {
    const handleSave = async (data: any) => {
        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Settings saved:", data);

        // Dans un vrai app :
        // const response = await fetch("/api/settings", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // });
        // if (!response.ok) throw new Error("Failed to save");
    };

    return (
        <DashboardLayout
            pageTitle="Paramètres"
            pageDescription="Configurez votre compte et vos intégrations"
            userName="Bruno Crespo"
            userEmail="bruno@example.com"
        >
            <SettingsPage onSave={handleSave} />
        </DashboardLayout>
    );
}
