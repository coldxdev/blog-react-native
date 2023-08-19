import React from 'react';
import styled from 'styled-components/native';
import { Alert, Text } from 'react-native';
import { COLORS } from '@consts/theme';
import { IComment } from '@global-types/global';
import IconButton from './IconButton';
import { backIcon, deleteIcon, editIcon, tickIcon } from '@assets/icons';

interface CommentProps extends IComment {}

const Comment: React.FC<CommentProps> = ({ id, postID, text }) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const CommentBox = styled.View`
        background-color: ${COLORS.white};
        padding: 7.5px 15px;
        border-radius: 8px;
        flex-direction: row;
        justify-content: space-between;
        border: 2px ${COLORS.primary};
        border-style: ${isEditing ? 'dashed' : 'solid'};
        gap: 10px;
        margin-top: 10px;
        align-items: flex-start;
    `;

    const CommentActions = styled.View`
        flex-direction: row;
        align-items: center;  
        gap: 10px;
        flex-shrink: 0;
    `;

    const CommentText = styled.TextInput`
        color: ${COLORS.primary};
        font-size: 14px;
        flex-shrink: 1;
    `;

    const onBack = () => {
        setIsEditing(state => !state);
    };

    const onSave = () => {
        Alert.alert('Saved');
    };

    const onEdit = () => {
        setIsEditing(state => !state);
    };
    const onDelete = () => {
        Alert.alert('Delete');
    };

    const commentButtons = isEditing ? (
        <>
            <IconButton iconSrc={tickIcon} onPress={onSave} />
            <IconButton iconSrc={backIcon} onPress={onBack} />
        </>
    ) : (
        <>
            <IconButton size='26px' iconSrc={editIcon} onPress={onEdit} />
            <IconButton size='30px' iconSrc={deleteIcon} onPress={onDelete} />
        </>
    );

    return (
        <CommentBox>
            <CommentText editable={isEditing} multiline>
                {text}
            </CommentText>
            <CommentActions>{commentButtons}</CommentActions>
        </CommentBox>
    );
};

export default Comment;
