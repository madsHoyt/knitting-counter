"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Phase = {
    type: "increase" | "decrease";
    rowsPerChange: number;
    targetChanges: number;
};

export default function NewProjectPage() {
    const [name, setName] = useState("");
    const router = useRouter();

    const [phases, setPhases] = useState<Phase[]>([
        {
            type: "increase",
            rowsPerChange: 8,
            targetChanges: 1,
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function updatePhase(
        index: number,
        field: keyof Phase,
        value: string | number,
    ) {
        setPhases((currentPhases) =>
            currentPhases.map((phase, i) =>
                i === index
                    ? {
                          ...phase,
                          [field]: value,
                      }
                    : phase,
            ),
        );
    }

    function addPhase() {
        setPhases((currentPhases) => [
            ...currentPhases,
            {
                type: "increase",
                rowsPerChange: 8,
                targetChanges: 1,
            },
        ]);
    }

    function removePhase(index: number) {
        setPhases((currentPhases) =>
            currentPhases.filter((_, i) => i !== index),
        );
    }

    async function createProject() {
        setError("");

        if (!name.trim()) {
            setError("Please enter a project name.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    phases,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            const project = await response.json();

            router.push(`/projects/${project._id}`);
        } catch (error) {
            console.error(error);
            setError("Something went wrong creating the project.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-pink-50 px-5 py-10">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-pink-500">
                        Knitting Counter
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        Create a New Project
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Set up your knitting pattern and let the counter keep
                        track of your rows and changes.
                    </p>
                </div>

                {/* Project Name */}
                <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
                    <label
                        htmlFor="project-name"
                        className="mb-2 block text-lg font-semibold text-gray-900"
                    >
                        Project Name
                    </label>

                    <input
                        id="project-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Pink Sweater"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-lg outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    />
                </section>

                {/* Pattern Phases */}
                <section className="rounded-3xl bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Pattern Phases
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add each section of your pattern below.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {phases.map((phase, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-pink-100 bg-pink-50/60 p-5"
                            >
                                {/* Phase Header */}
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Phase {index + 1}
                                    </h3>

                                    {phases.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removePhase(index)}
                                            className="rounded-xl px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-white hover:text-red-500"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                {/* Increase / Decrease */}
                                <div className="mb-5">
                                    <label
                                        htmlFor={`type-${index}`}
                                        className="mb-2 block text-sm font-medium text-gray-600"
                                    >
                                        What are you doing?
                                    </label>

                                    <select
                                        id={`type-${index}`}
                                        value={phase.type}
                                        onChange={(event) =>
                                            updatePhase(
                                                index,
                                                "type",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-base font-medium outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                                    >
                                        <option value="increase">
                                            Increasing
                                        </option>
                                        <option value="decrease">
                                            Decreasing
                                        </option>
                                    </select>
                                </div>

                                {/* Pattern Instructions */}
                                <div className="rounded-2xl bg-white p-4">
                                    <p className="text-lg font-medium leading-10 text-gray-800">
                                        {phase.type === "increase"
                                            ? "Increase"
                                            : "Decrease"}{" "}
                                        every
                                        <input
                                            id={`rows-${index}`}
                                            type="number"
                                            min="1"
                                            value={phase.rowsPerChange}
                                            onChange={(event) =>
                                                updatePhase(
                                                    index,
                                                    "rowsPerChange",
                                                    Number(event.target.value),
                                                )
                                            }
                                            className="mx-2 inline-block w-20 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-center text-lg font-semibold outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                                        />
                                        rows for a total of
                                        <input
                                            id={`changes-${index}`}
                                            type="number"
                                            min="1"
                                            value={phase.targetChanges}
                                            onChange={(event) =>
                                                updatePhase(
                                                    index,
                                                    "targetChanges",
                                                    Number(event.target.value),
                                                )
                                            }
                                            className="mx-2 inline-block w-20 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-center text-lg font-semibold outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                                        />
                                        times.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Phase */}
                    <button
                        type="button"
                        onClick={addPhase}
                        className="mt-5 w-full rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50 px-4 py-4 font-semibold text-pink-600 transition hover:border-pink-300 hover:bg-pink-100"
                    >
                        + Add Another Phase
                    </button>
                </section>

                {/* Error */}
                {error && (
                    <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                {/* Create Button */}
                <button
                    type="button"
                    onClick={createProject}
                    disabled={loading}
                    className="mt-6 w-full rounded-2xl bg-pink-500 px-6 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </div>
        </main>
    );
}
