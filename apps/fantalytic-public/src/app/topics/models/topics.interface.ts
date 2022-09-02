export interface Topic {
    title: string;
    description: string;
    imageUrl?: string;
    link: string;
    publishedDate: string;
}

export interface TopicsState {
    topics: Topic[] | undefined;
}