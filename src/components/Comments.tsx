import { COLORS, FONT } from '@consts/theme';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Comment from './Comment';
import StyledButton from './StyledButton';

const Comments = () => {
    const CommentsTitle = styled.Text`
        font-size: 18px;
        font-family: ${FONT.SEMIBOLD};
        margin-bottom: 15px;
    `;

    const CommentsInput = styled.TextInput`
        border: 1px solid ${COLORS.gray};
        padding: 15px;
        border-radius: 8px;
        font-size: 16px;
        margin-bottom: 15px;
    `;


    return (
        <View>
            <CommentsTitle>0 comments</CommentsTitle>
            <CommentsInput placeholder='Write new comment...' />
            <StyledButton
                style={{
                    marginBottom: 15,
                }}
            >
                SEND
            </StyledButton>
            
            <Comment
                text={
                    'Great Inspirational designs, illustrations, and graphic !'
                }
            />
            <Comment
                text={
                    'Inspirational designs, illustrations, and graphic elements from the world’s best designers. Want more inspiration? Browse our search results.'
                }
            />
            <Comment
                text={
                    'Great Inspirational designs, illustrations, and graphic !'
                }
            />
        </View>
    );
};

export default Comments;
