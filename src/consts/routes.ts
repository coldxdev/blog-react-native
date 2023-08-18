import { Post, Posts } from '@screens';
import { POSTS_PATH, POST_PATH } from './paths';

const routes = [
    {
        name: POSTS_PATH,
        Component: Posts,
    },
    {
        name: POST_PATH,
        Component: Post,
    },
];

export default routes;
