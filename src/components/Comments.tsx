import React, { useState } from 'react';
import { COLORS, FONT } from '@consts/theme';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Comment from './Comment';
import StyledButton from './StyledButton';
import { IComment } from '@global-types/global';

interface CommentsProps {
    items: IComment[];
    onAddComment: (text: string) => void;
    onDeleteComment: (postId: string, commentId: string) => void;
    onSaveComment: (postId: string, commentId: string, text: string) => void;
}

const Comments: React.FC<CommentsProps> = ({
    items,
    onAddComment,
    onDeleteComment,
    onSaveComment,
}) => {
    const [textInput, setTextInput] = useState('');

    const onSend = () => {
        if (!textInput) return;
        onAddComment(textInput);
        setTextInput('');
    };

    return (
        <View>
            <Text style={styles.title}>{items?.length ?? 0} comments</Text>
            <TextInput
                value={textInput}
                onChangeText={setTextInput}
                style={styles.input}
                placeholder='Write new comment...'
            />
            <StyledButton
                onPress={onSend}
                style={{
                    marginBottom: 15,
                }}
            >
                SEND
            </StyledButton>

            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <Comment
                        onDeleteComment={onDeleteComment}
                        onSaveComment={onSaveComment}
                        text={item.text}
                        id={item.id}
                        postId={item.postId}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: FONT.SEMIBOLD,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: COLORS.gray,
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 15,
    },
});

export default Comments;
