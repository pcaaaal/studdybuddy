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

export type User = {
    id: string;
    name: string;
    subscribedGroups: string[];
};
export type Event = {
    id: string;
    title: string;
    date: string; 
    time: string;
    color: string; 
};