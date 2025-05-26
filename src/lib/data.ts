import { StudyGroup, User } from './types';

export const studyGroups: StudyGroup[] = [
    {
        id: 'math',
        name: 'Mathematical Insights Circle',
        description: 'Problem-solving and theory sessions.',
        audience: 'Undergraduates and enthusiasts.',
        schedule: [
            { weekday: 1, time: '12:30', color: 'bg-orange-100' },
            { weekday: 4, time: '09:45', color: 'bg-gray-200' },
            { weekday: 5, time: '08:45', color: 'bg-orange-100' },
        ],
    },
    {
        id: 'bio',
        name: 'Life Sciences Roundtable',
        description: 'Biology and discussion sessions.',
        audience: 'Health and life science students.',
        schedule: [
            { weekday: 4, time: '13:45', color: 'bg-green-100' },
        ],
    },
    {
        id: 'chem',
        name: 'Chem Collective',
        description: 'Chemistry demos and problems.',
        audience: 'Chem majors and curious minds.',
        schedule: [
            { weekday: 0, time: '14:30', color: 'bg-yellow-100' },
        ],
    },
];

export const currentUser: User = {
    id: 'u1',
    name: 'John Doe',
    subscribedGroups: ['math', 'bio'],
};


export const users = [
    {
        id: 'u1',
        name: 'Pascal Burri',
        school: 'Swisscom',
    },
    {
        id: 'u2',
        name: 'Joel Wüthrich',
        school: 'SBB',
    },
    {
        id: 'u3',
        name: 'Timo Balsiger',
        school: 'SBB',
    },
];
