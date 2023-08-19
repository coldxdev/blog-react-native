import Layout from '@components/Layout';
import PostCard from '@components/PostCard';
import StyledButton from '@components/StyledButton';
import { mockupPosts } from '../mockup';
import React from 'react';
import { FlatList } from 'react-native';

const Posts: React.FC = () => {
    return (
        <Layout>
            <StyledButton style={{ marginTop: 20, marginBottom: 20 }}>
                Add post
            </StyledButton>

            <FlatList
                data={mockupPosts}
                renderItem={({ item }) => (
                    <PostCard
                        id={item.id}
                        title={item.title}
                        body={item.body}
                        commentsCount={item.comments.length ?? 0}
                        style={{
                            marginTop: 10,
                        }}
                    />
                )}
            />
        </Layout>
    );
};

export default Posts;
