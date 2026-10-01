import { NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/mongodb";
import Project from "@/backend/models/Project";

export async function GET() {
    try {
        await connectDB();

        const projects = await Project.find().sort({
            updatedAt: -1,
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to get projects" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const project = await Project.create({
            name: body.name,
            phases: body.phases,
            currentRow: 0,
            currentPhaseIndex: 0,
            changesCompleted: 0,
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 },
        );
    }
}
