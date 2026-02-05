import { StudentSpace } from "@/components/student-space";

export default function StudentExample() {
    const courses = [
        {
            id: "1",
            title: "Maîtriser Next.js 15 en 30 jours",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
            instructor: "Bruno Crespo",
            progress: 67,
            totalModules: 42,
            completedModules: 28,
            totalDuration: "12h 45min",
            lastAccessed: new Date("2025-02-03"),
            isCompleted: false,
        },
        {
            id: "2",
            title: "TypeScript Avancé : Patterns & Best Practices",
            thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop",
            instructor: "Sophie Martin",
            progress: 100,
            totalModules: 24,
            completedModules: 24,
            totalDuration: "8h 20min",
            lastAccessed: new Date("2025-02-01"),
            isCompleted: true,
        },
        {
            id: "3",
            title: "Design System Professionnel avec Tailwind",
            thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
            instructor: "Lucas Dubois",
            progress: 34,
            totalModules: 18,
            completedModules: 6,
            totalDuration: "6h 15min",
            lastAccessed: new Date("2025-01-28"),
            isCompleted: false,
        },
        {
            id: "4",
            title: "React Performance : Optimisation Avancée",
            thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
            instructor: "Marie Leroux",
            progress: 0,
            totalModules: 32,
            completedModules: 0,
            totalDuration: "10h 30min",
            isCompleted: false,
        },
        {
            id: "5",
            title: "Node.js & Express : API REST Professionnelle",
            thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
            instructor: "Thomas Bernard",
            progress: 100,
            totalModules: 28,
            completedModules: 28,
            totalDuration: "9h 45min",
            lastAccessed: new Date("2025-01-15"),
            isCompleted: true,
        },
        {
            id: "6",
            title: "Prisma & Database Design : Du SQL au ORM",
            thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=450&fit=crop",
            instructor: "Emma Rousseau",
            progress: 45,
            totalModules: 22,
            completedModules: 10,
            totalDuration: "7h 50min",
            lastAccessed: new Date("2025-02-02"),
            isCompleted: false,
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 py-12 dark:bg-neutral-900">
            <StudentSpace courses={courses} studentName="Bruno" />
        </div>
    );
}
