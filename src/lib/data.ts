import { StudyGroup, User } from './types';

export const studyGroups: StudyGroup[] = [
    {
        id: '1',
        name: 'Mathe Gymi B',
        subject: 'Mathematik',
        level: 'Gymnasium',
        location: 'Bern',
        members: ['Pascal', 'Joel'],
    },
    {
        id: '2',
        name: 'Informatik SBB',
        subject: 'Informatik',
        level: 'Lehre',
        location: 'Zürich',
        members: ['Timo'],
    },
];

export const users: User[] = [
    { id: 'u1', name: 'Pascal Burri', school: 'Swisscom' },
    { id: 'u2', name: 'Joel Wüthrich', school: 'SBB' },
    { id: 'u3', name: 'Timo Balsiger', school: 'SBB' },
];
