export interface TaskDetails {
    taskName: string;
    taskImage: string;
};

export module Request {
    export interface GetTasks {
    }

    export interface AddTask {
        NewTask: TaskDetails;
    }
};

export module Response {
    export interface GetTasks {
        tasks: TaskDetails[];
    }

    export interface AddTask {
    }
};
