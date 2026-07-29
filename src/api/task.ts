import { getMock } from "./client";

export const listTasks = () => getMock((data) => data.tasks);
