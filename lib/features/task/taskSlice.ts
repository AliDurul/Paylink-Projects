import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAllTasks } from "./taskAPI";
import { Task } from "@/types/types";

export interface TaskSliceState {
    tasks: Task[];
    status: "idle" | "loading" | "failed";
    error: null | string;
    task: null | Task;
}

const initialState: TaskSliceState = {
    tasks: [],
    status: "idle",
    error: null,
    task: null
};

export const taskSlice = createAppSlice({
    name: 'task',
    initialState,
    reducers: (create) => ({
        updateTaskState: create.reducer((state, action: PayloadAction<Task | null>) => {
            state.status = 'idle';
            state.task = action.payload;
        }),
        updateTasks: create.reducer((state, action: PayloadAction<Task[]>) => {
            state.status = 'idle';
            state.tasks = action.payload;
        }),
        fetchAllTasksAsync: create.asyncThunk(
            async () => {
                try {
                    const response = await getAllTasks();
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    return response;
                } catch (error) {
                    throw new Error("Data fetch failed: " + (error as Error).message);
                }
            },
            {
                pending: (state) => { state.status = "loading"; },
                fulfilled: (state, action) => { state.status = "idle"; state.tasks = action.payload; },
                rejected: (state, action) => { state.status = "failed"; state.error = action.error.message || null; },
            },
        ),
    }),
    selectors: {
        selectTasks: (task) => task.tasks,
        selectTaskStatus: (task) => task.status,
        selectTask: (task) => task.task,
    }
});

export const { fetchAllTasksAsync, updateTaskState, updateTasks } = taskSlice.actions;

export const { selectTasks, selectTaskStatus, selectTask } = taskSlice.selectors