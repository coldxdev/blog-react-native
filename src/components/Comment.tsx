import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '@consts/theme';
import { IComment } from '@global-types/global';
import IconButton from './IconButton';
import { backIcon, deleteIcon, editIcon, tickIcon } from '@assets/icons';

interface CommentProps extends IComment {
    onDeleteComment: (postId: string, commentId: string) => void;
    onSaveComment: (postId: string, commentId: string, text: string) => void;
}

const Comment: React.FC<CommentProps> = ({
    id,
    postId,
    text,
    onDeleteComment,
    onSaveComment,
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [textInput, setTextInput] = React.useState(text);

    const styles = StyleSheet.create({
        box: {
            backgroundColor: COLORS.white,
            paddingVertical: 7.5,
            paddingHorizontal: 15,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderStyle: isEditing ? 'dashed' : 'solid',
            gap: 10,
            marginTop: 10,
            alignItems: 'flex-start',
        },
        actions: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
        },
        text: {
            color: COLORS.primary,
            fontSize: 14,
            flexShrink: 1,
        },
    });

    const onBack = () => {
        setIsEditing(state => !state);
    };

    const onSave = () => {
        onSaveComment(postId, id, textInput);
        setIsEditing(false);
    };

    const onEdit = () => {
        setIsEditing(state => !state);
    };
    const onDelete = () => {
        onDeleteComment(postId, id);
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
        <View style={styles.box}>
            <TextInput
                style={styles.text}
                value={textInput}
                onChangeText={setTextInput}
                editable={isEditing}
                multiline
            />
            <View style={styles.actions}>{commentButtons}</View>
        </View>
    );
};

export default Comment;
