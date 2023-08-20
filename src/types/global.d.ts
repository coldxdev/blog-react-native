export interface IPost {
    id: string;
    title: string;
    body: string;
    comments: IComment[] | [];
}

export interface IComment {
    id: string;
    postId: string;
    text: string;
}
