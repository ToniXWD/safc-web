export interface Comment {
    id: string;
    object: string;
    comment_type: string;
    date: string;
    source_cate: string;
    supervisor: string;
    description: string;
}

export interface ApiQuery {
    school_cate?: string;
    university?: string;
    department?: string;
    supervisor?: string;
}
