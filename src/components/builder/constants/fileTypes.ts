export type FileType = {
    id: string;
    label: string;
    format: {
        extensions: string[];
        mimeTypes: string[];
    };
};

export const fileTypes: FileType[] = [
    {
        id: 'document', 
        label: 'Document',
        format: {
            extensions: ['doc', 'docx', 'pdf', 'txt'],
            mimeTypes: [
                'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                'application/pdf', 
                'text/plain'
            ],
        }
    },
    {
        id: 'spreadsheet', 
        label: 'Spreadsheet',
        format: {
            extensions: ['xls', 'xlsx', 'csv'],
            mimeTypes: [
                'application/vnd.ms-excel', 
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                'text/csv'
            ],
        }
    },
    {
        id: 'presentation', 
        label: 'Presentation',
        format: {
            extensions: ['ppt', 'pptx'],
            mimeTypes: [
                'application/vnd.ms-powerpoint', 
                'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ],
        }
    },
    {
        id: 'pdf', 
        label: 'PDF', 
        format: {
            extensions: ['pdf'],
            mimeTypes: ['application/pdf'],
        }
    },
    {
        id: 'image', 
        label: 'Image', 
        format: {
            extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tiff'],
            mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/tiff'],
        }
    },
    {
        id: 'audio', 
        label: 'Audio', 
        format: {
            extensions: ['mp3', 'wav', 'aac'],
            mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/aac'],
        }
    },
    {
        id: 'video', 
        label: 'Video', 
        format: {
            extensions: ['mp4', 'mkv', 'mov', 'avi'],
            mimeTypes: [
                'video/mp4', 
                'video/x-matroska', 
                'video/quicktime', 
                'video/x-msvideo'
            ],
        }
    },
];
