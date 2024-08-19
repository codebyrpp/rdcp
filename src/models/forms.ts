export interface Form{
    id: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    isPrivate?: boolean,
    isPublished?: boolean,
    multipleResponses?: boolean,
}

// dummy data
export const forms_data: Form[] = [
    {
        id: '1',
        name: 'Form 1',
        description: 'This is the description for form 1',
        createdAt: '2021-09-01',
        updatedAt: '2021-09-01',
        isPrivate: true,
        isPublished: true,
        multipleResponses: true,
    },
    {
        id: '2',
        name: 'Form 2',
        description: 'This is the description for form 2',
        createdAt: '2021-09-01',
        updatedAt: '2021-09-01',
        isPrivate: true,
        isPublished: false,
        multipleResponses: false,
    },
    {
        id: '3',
        name: 'Form 3',
        description: 'This is the description for form 3',
        createdAt: '2021-09-01',
        updatedAt: '2021-09-01',
        isPrivate: false,
        isPublished: true,
        multipleResponses: false,
    },
    {
        id: '4',
        name: 'Form 4',
        description: 'This is the description for form 4',
        createdAt: '2021-09-01',
        updatedAt: '2021-09-01',
        isPrivate: false,
        isPublished: false,
        multipleResponses: true,
    },
]    