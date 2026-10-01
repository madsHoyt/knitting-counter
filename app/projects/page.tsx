"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Phase = {
    type: "increase" | "decrease";
    rowsPerChange: number;
    targetChanges: number;
};

type Project = {
    _id: string;
    name: string;
    currentRow: number;
    phases: Phase[];
    currentPhaseIndex: number;
    changesCompleted: number;
    rowsSinceLastChange: number;
    createdAt: string;
    updatedAt: string;
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProjects() {
            try {
                const response = await fetch("/api/projects");

                if (!response.ok) {
                    throw new Error("Failed to load projects");
                }

                const data = await response.json();

                setProjects(data);
            } catch (error) {
                console.error(error);
                setError("Could not load your projects.");
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-pink-50">
                <p className="text-gray-600">Loading projects...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-pink-50 px-5 py-10">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-pink-500">
                            Knitting Counter
                        </p>

                        <h1 className="mt-1 text-4xl font-bold text-gray-900">
                            My Projects
                        </h1>
                    </div>

                    <Link
                        href="/projects/new"
                        className="rounded-2xl bg-pink-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-pink-600"
                    >
                        + New
                    </Link>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
                        {error}
                    </div>
                )}

                {/* No Projects */}
                {projects.length === 0 && !error && (
                    <section className="rounded-3xl bg-white p-8 text-center shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            No projects yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Create your first knitting project to get started.
                        </p>

                        <Link
                            href="/projects/new"
                            className="mt-6 inline-block rounded-2xl bg-pink-500 px-6 py-4 font-bold text-white transition hover:bg-pink-600"
                        >
                            Create a Project
                        </Link>
                    </section>
                )}

                {/* Project List */}
                <div className="space-y-4">
                    {projects.map((project) => {
                        const currentPhase =
                            project.phases[project.currentPhaseIndex];

                        return (
                            <Link
                                key={project._id}
                                href={`/projects/${project._id}`}
                                className="block rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md active:scale-[0.99]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {project.name}
                                        </h2>

                                        <p className="mt-1 text-gray-500">
                                            Row {project.currentRow}
                                        </p>
                                    </div>

                                    <span className="rounded-xl bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-500">
                                        {currentPhase.type === "increase"
                                            ? "Increase"
                                            : "Decrease"}
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Progress
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {project.changesCompleted} /{" "}
                                            {currentPhase.targetChanges}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            Next change
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {currentPhase.rowsPerChange -
                                                project.rowsSinceLastChange}{" "}
                                            rows
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
