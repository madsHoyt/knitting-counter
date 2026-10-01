import mongoose, { Schema, Document } from "mongoose";

export interface IPhase {
    type: "increase" | "decrease";
    rowsPerChange: number;
    targetChanges: number;
}

export interface IProject extends Document {
    name: string;
    currentRow: number;
    phases: IPhase[];
    currentPhaseIndex: number;
    changesCompleted: number;
    rowsSinceLastChange: number;
}

const PhaseSchema = new Schema<IPhase>(
    {
        type: {
            type: String,
            enum: ["increase", "decrease"],
            required: true,
        },

        rowsPerChange: {
            type: Number,
            required: true,
            min: 1,
        },

        targetChanges: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false },
);

const ProjectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        currentRow: {
            type: Number,
            default: 0,
            min: 0,
        },

        phases: {
            type: [PhaseSchema],
            required: true,
            validate: {
                validator: (phases: IPhase[]) => phases.length > 0,
                message: "A project must have at least one phase.",
            },
        },

        currentPhaseIndex: {
            type: Number,
            default: 0,
            min: 0,
        },

        changesCompleted: {
            type: Number,
            default: 0,
            min: 0,
        },

        rowsSinceLastChange: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    },
);

const Project =
    mongoose.models.Project ||
    mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
