import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Play,
    CheckCircle2,
    Clock,
    BookOpen,
    TrendingUp,
} from "lucide-react";

interface Course {
    id: string;
    title: string;
    thumbnail: string;
    instructor: string;
    progress: number;
    totalModules: number;
    completedModules: number;
    totalDuration: string;
    lastAccessed?: Date;
    isCompleted: boolean;
}

interface StudentSpaceProps {
    courses: Course[];
    studentName?: string;
    className?: string;
}

export function StudentSpace({
    courses,
    studentName = "Élève",
    className,
}: StudentSpaceProps) {
    const completedCount = courses.filter((c) => c.isCompleted).length;
    const inProgressCount = courses.filter(
        (c) => !c.isCompleted && c.progress > 0
    ).length;
    const totalCourses = courses.length;

    return (
        <div className={cn("mx-auto max-w-7xl", className)}>
            {/* Header */}
            <div className="mb-10">
                <h1 className="mb-2 text-[32px] font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    Bonjour {studentName} 👋
                </h1>
                <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                    Continuez votre apprentissage où vous vous êtes arrêté
                </p>
            </div>

            {/* Stats Overview */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <BookOpen className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
                                Total formations
                            </p>
                            <p className="text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                {totalCourses}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                            <TrendingUp className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
                                En cours
                            </p>
                            <p className="text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                {inProgressCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
                                Terminées
                            </p>
                            <p className="text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                {completedCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div>
                <h2 className="mb-5 text-[20px] font-semibold text-neutral-900 dark:text-neutral-50">
                    Mes formations
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <article
                            key={course.id}
                            className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:shadow-lg hover:shadow-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:shadow-neutral-900/20"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl dark:bg-neutral-950/95">
                                        <Play
                                            className="ml-1 h-6 w-6 text-indigo-600 dark:text-indigo-400"
                                            fill="currentColor"
                                            strokeWidth={0}
                                        />
                                    </div>
                                </div>

                                {/* Completion Badge */}
                                {course.isCompleted && (
                                    <div className="absolute right-3 top-3">
                                        <Badge className="bg-emerald-500 text-white shadow-sm hover:bg-emerald-600">
                                            <CheckCircle2 className="mr-1 h-3 w-3" strokeWidth={2.5} />
                                            Terminé
                                        </Badge>
                                    </div>
                                )}

                                {/* Duration */}
                                <div className="absolute bottom-3 left-3">
                                    <div className="flex items-center gap-1.5 rounded-full bg-neutral-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                                        <Clock className="h-3 w-3" strokeWidth={2} />
                                        {course.totalDuration}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="mb-1.5 line-clamp-2 text-[16px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    {course.title}
                                </h3>
                                <p className="mb-4 text-[13px] text-neutral-500 dark:text-neutral-400">
                                    {course.instructor}
                                </p>

                                {/* Progress Section */}
                                <div className="mb-4 space-y-2">
                                    <div className="flex items-center justify-between text-[12px]">
                                        <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                            {course.completedModules}/{course.totalModules} modules
                                        </span>
                                        <span
                                            className={cn(
                                                "font-semibold",
                                                course.isCompleted
                                                    ? "text-emerald-600 dark:text-emerald-400"
                                                    : "text-indigo-600 dark:text-indigo-400"
                                            )}
                                        >
                                            {course.progress}%
                                        </span>
                                    </div>
                                    <div
                                        className={cn(
                                            "overflow-hidden rounded-full",
                                            course.isCompleted
                                                ? "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-600"
                                                : "[&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-violet-500"
                                        )}
                                    >
                                        <Progress
                                            value={course.progress}
                                            className="h-2 bg-neutral-100 dark:bg-neutral-800"
                                        />
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Button
                                    asChild
                                    className={cn(
                                        "h-10 w-full font-medium",
                                        course.isCompleted
                                            ? "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
                                            : course.progress > 0
                                                ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                                : "bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
                                    )}
                                >
                                    <Link href={`/learn/${course.id}`}>
                                        {course.isCompleted ? (
                                            <>
                                                <CheckCircle2 className="mr-2 h-4 w-4" strokeWidth={2} />
                                                Revoir
                                            </>
                                        ) : course.progress > 0 ? (
                                            <>
                                                <Play className="mr-2 h-4 w-4" strokeWidth={2} />
                                                Continuer
                                            </>
                                        ) : (
                                            <>
                                                <Play className="mr-2 h-4 w-4" strokeWidth={2} />
                                                Commencer
                                            </>
                                        )}
                                    </Link>
                                </Button>
                            </div>

                            {/* Motivational glow effect on hover */}
                            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:opacity-0" />
                        </article>
                    ))}
                </div>
            </div>

            {/* Empty state */}
            {courses.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-20 dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <BookOpen className="h-8 w-8 text-neutral-400" strokeWidth={2} />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold text-neutral-900 dark:text-neutral-50">
                        Aucune formation
                    </h3>
                    <p className="mt-1 text-[14px] text-neutral-500 dark:text-neutral-400">
                        Vous n'avez pas encore de formations
                    </p>
                </div>
            )}
        </div>
    );
}
