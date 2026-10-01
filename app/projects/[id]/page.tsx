"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function ProjectPage() {
    const params = useParams();
    const id = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProject() {
            try {
                const response = await fetch(`/api/projects/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to load project");
                }

                const data = await response.json();

                setProject(data);
            } catch (error) {
                console.error(error);
                setError("Could not load this project.");
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [id]);

    async function incrementRow() {
        if (!project || updating) {
            return;
        }

        setUpdating(true);
        setError("");

        try {
            const currentPhase = project.phases[project.currentPhaseIndex];

            const newRow = project.currentRow + 1;
            let newRowsSinceLastChange = project.rowsSinceLastChange + 1;

            let newChangesCompleted = project.changesCompleted;
            let newPhaseIndex = project.currentPhaseIndex;

            // Check if it's time for an increase/decrease
            if (newRowsSinceLastChange >= currentPhase.rowsPerChange) {
                newChangesCompleted += 1;
                newRowsSinceLastChange = 0;

                // Check if this phase is complete
                if (
                    newChangesCompleted >= currentPhase.targetChanges &&
                    newPhaseIndex < project.phases.length - 1
                ) {
                    newPhaseIndex += 1;
                    newChangesCompleted = 0;
                    newRowsSinceLastChange = 0;
                }
            }

            const response = await fetch(`/api/projects/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentRow: newRow,
                    currentPhaseIndex: newPhaseIndex,
                    changesCompleted: newChangesCompleted,
                    rowsSinceLastChange: newRowsSinceLastChange,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update project");
            }

            const updatedProject = await response.json();

            setProject(updatedProject);
        } catch (error) {
            console.error(error);
            setError("Could not update the row. Please try again.");
        } finally {
            setUpdating(false);
        }
    }

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-pink-50">
                <p className="text-gray-600">Loading project...</p>
            </main>
        );
    }

    if (error && !project) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-pink-50 px-5">
                <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Project not found
                    </h1>

                    <p className="mt-2 text-gray-600">{error}</p>
                </div>
            </main>
        );
    }

    if (!project) {
        return null;
    }

    const currentPhase = project.phases[project.currentPhaseIndex];

    const rowsUntilChange =
        currentPhase.rowsPerChange - project.rowsSinceLastChange;

    return (
        <main className="min-h-screen bg-pink-50 px-5 py-10">
            <div className="mx-auto max-w-2xl">
                {/* Project Name */}
                <div className="mb-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-pink-500">
                        Knitting Project
                    </p>

                    <h1 className="mt-1 text-4xl font-bold text-gray-900">
                        {project.name}
                    </h1>
                </div>

                {/* Current Phase */}
                <section className="mb-5 rounded-3xl bg-white p-6 text-center shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Current Phase
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-pink-500">
                        {currentPhase.type === "increase"
                            ? "Increase"
                            : "Decrease"}
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Every {currentPhase.rowsPerChange} rows
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-800">
                        {project.changesCompleted} /{" "}
                        {currentPhase.targetChanges}
                    </p>
                </section>

                {/* Current Row */}
                <section className="mb-5 rounded-3xl bg-white p-8 text-center shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Current Row
                    </p>

                    <p className="mt-2 text-7xl font-bold text-gray-900">
                        {project.currentRow}
                    </p>

                    <p className="mt-3 text-3xl text-gray-500">
                        {project.rowsSinceLastChange} /{" "}
                        {currentPhase.rowsPerChange} rows
                    </p>

                    <p className="mt-1 text-sm font-medium text-pink-500">
                        {rowsUntilChange === 1
                            ? `1 row until ${currentPhase.type}`
                            : `${rowsUntilChange} rows until ${currentPhase.type}`}
                    </p>
                </section>

                {/* Increment Button */}
                <button
                    type="button"
                    onClick={incrementRow}
                    disabled={updating}
                    className="w-full rounded-3xl bg-pink-500 px-6 py-6 text-2xl font-bold text-white shadow-sm transition hover:bg-pink-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {updating ? "Saving..." : "+ 1 Row"}
                </button>

                {/* Error */}
                {error && (
                    <p className="mt-4 text-center text-sm font-medium text-red-500">
                        {error}
                    </p>
                )}

                {/* Last Updated */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Last updated {new Date(project.updatedAt).toLocaleString()}
                </p>
            </div>
        </main>
    );
}
