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
    email: 'email',
    avatar: 'https://imgs.search.brave.com/jjfs28J0to4gGyakVW9E-rYyWqZZWH9UWrrspVi-FBg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vOVJyaEZ1/UUs3WlI1aEZQYnhK/U0ZZaEVvVWd5SHMy/UzdhSmRNdW4teHpx/TS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzkwL2J5/NWpiMjB2YVdRdk5E/YzQvTkRnMk5qRXhM/MlJsTDJadi9kRzh2/Ym1Gb1lYVm1ibUZv/L2JXVXRaR1Z5TFdk/bGJXbHovWTJoMExY/SmhjM05sTFdGbS9a/bVV0ZW5kcGMyTm9a/VzR0L2MyTm9hVzF3/WVc1elpXNHQvWjJG/MGRIVnVaeTExYm1R/dC9ZbTl1YjJKdkxX/d2xRek1sL1FUUmph/R1ZzYmk1cWNHY18v/Y3owMk1USjROakV5/Sm5jOS9NQ1pyUFRJ/d0ptTTlVRXRwL04z/aElibU5XTFRaU2N6/VjQvVTAxcFZGcHZS/MHBPZDBsRy9NaTFJ/TlhCc1UzcG5kVzFo/L1RFUk1aejA.jpeg',
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
