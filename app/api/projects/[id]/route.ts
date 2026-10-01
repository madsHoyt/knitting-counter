import { NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/mongodb";
import Project from "@/backend/models/Project";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
    try {
        await connectDB();

        const { id } = await context.params;

        const project = await Project.findById(id);

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to get project" },
            { status: 500 },
        );
    }
}

export async function PATCH(request: Request, context: RouteContext) {
    try {
        await connectDB();

        const { id } = await context.params;
        const body = await request.json();

        const project = await Project.findByIdAndUpdate(
            id,
            {
                currentRow: body.currentRow,
                currentPhaseIndex: body.currentPhaseIndex,
                changesCompleted: body.changesCompleted,
                rowsSinceLastChange: body.rowsSinceLastChange,
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 },
        );
    }
}
