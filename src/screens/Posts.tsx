import React, { useEffect, useState } from 'react';
import Layout from '@components/Layout';
import PostCard from '@components/PostCard';
import StyledButton from '@components/StyledButton';
import {
    FlatList,
    StyleSheet,
    TextInput,
} from 'react-native';
import { COLORS } from '@consts/theme';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Loading } from '@components/Loader';
import { LOADING_STATE } from '@consts/index';
import {
    createPost,
    deletePost,
    editPost,
    fetchPosts,
} from '@redux/slices/posts';

const Posts: React.FC = () => {
    const [inputTitle, setInputTitle] = React.useState('');
    const [inputText, setInputText] = React.useState('');
    const { isLoading, posts } = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const onDeletePost = (postId: string) => {
        dispatch(deletePost(postId));
    };

    const onAddPost = () => {
        if (!inputText || !inputTitle) return;
        dispatch(createPost(inputTitle, inputText));
        setInputText('');
        setInputTitle('');
    };

    const onSavePost = (postId: string, title: string, text: string) => {
        dispatch(editPost(postId, title, text));
    };

    if (isLoading === LOADING_STATE.PENDING) {
        return <Loading />;
    }

    return (
        <Layout>
            <TextInput
                style={styles.input}
                placeholder='Title'
                value={inputTitle}
                onChangeText={setInputTitle}
            />
            <TextInput
                style={styles.input}
                placeholder='Text'
                value={inputText}
                onChangeText={setInputText}
            />
            <StyledButton onPress={onAddPost} style={{ marginBottom: 20 }}>
                Add post
            </StyledButton>

            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <PostCard
                        id={item.id}
                        title={item.title}
                        body={item.body}
                        onDeletePost={onDeletePost}
                        onSavePost={onSavePost}
                        commentsCount={item.comments?.length ?? 0}
                        style={{
                            marginTop: 10,
                        }}
                    />
                )}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 15,
    },
});

export default Posts;
