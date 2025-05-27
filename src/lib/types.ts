export type StudyGroup = {
    id: string;
    name: string;
    description: string;
    audience: string;
    schedule: {
        weekday: number;
        time: string;
        color: string;
    }[];
};

export type ScheduleEvent = {
    title: string;
    date: string;
    time: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
    avatar: string;
    subscribedGroups: string[];
    schedule?: ScheduleEvent[];
};


export type Event = {
    id: string;
    title: string;
    date: string;
    time: string;
    color: string;
};