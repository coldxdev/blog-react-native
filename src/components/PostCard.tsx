import React from 'react';
import {
    backIcon,
    commentsIcon,
    deleteIcon,
    editIcon,
    linkIcon,
    tickIcon,
} from '@assets/icons';
import StyledIcon from '@components/StyledIcon';
import { COLORS, FONT } from '@consts/theme';
import { IPost } from '@global-types/global';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    View,
    ViewProps,
} from 'react-native';
import IconButton from './IconButton';
import { POST_PATH } from '@consts/paths';
import { useNavigation } from '@react-navigation/native';

interface PostCardProps extends Omit<IPost, 'comments'>, Omit<ViewProps, 'id'> {
    commentsCount?: number;
    onDeletePost: (id: string) => void;
    onSavePost: (id: string, title: string, body: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
    body,
    id,
    title,
    commentsCount,
    onDeletePost,
    onSavePost,
    style,
    ...restProps
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [titleInput, setTitleInput] = React.useState(title);
    const [bodyInput, setBodyInput] = React.useState(body);

    const styles = StyleSheet.create({
        box: {
            padding: 15,
            borderRadius: 10,
            backgroundColor: COLORS.white,
        },
        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 15,
        },
        title: {
            fontFamily: FONT.SEMIBOLD,
            fontSize: 18,
            lineHeight: 22,
            marginBottom: 15,
            color: isEditing ? COLORS.blue : COLORS.primary,
            flexShrink: 1,
        },
        text: {
            fontFamily: FONT.REGULAR,
            fontSize: 16,
            lineHeight: 20,
            marginBottom: 20,
            color: isEditing ? COLORS.blue : COLORS.primary,
        },
        bottom: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
        },
        comments: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        commentsText: {
            fontSize: 14,
            fontFamily: FONT.SEMIBOLD,
            marginLeft: 10,
        },
        actions: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
        },
    });

    const navigation = useNavigation();

    const onBack = () => {
        setIsEditing(state => !state);
    };

    const onSave = () => {
        onSavePost(id, titleInput, bodyInput);
        setIsEditing(false);
    };

    const onEdit = () => {
        setIsEditing(state => !state);
    };

    const onDelete = () => {
        onDeletePost(id);
    };

    const postButtons = isEditing ? (
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
        <View style={[styles.box, style]} {...restProps}>
            <View style={styles.top}>
                <TextInput
                    style={styles.title}
                    editable={isEditing}
                    value={titleInput}
                    onChangeText={setTitleInput}
                    spellCheck={false}
                    multiline
                />
                <IconButton
                    iconSrc={linkIcon}
                    onPress={() =>
                        navigation.navigate(POST_PATH, { postId: id })
                    }
                />
            </View>

            <TextInput
                style={styles.text}
                value={bodyInput}
                onChangeText={setBodyInput}
                editable={isEditing}
                spellCheck={false}
                multiline
            />
            <View style={styles.bottom}>
                <View style={styles.comments}>
                    <StyledIcon source={commentsIcon} />
                    <Text style={styles.commentsText}>
                        {commentsCount} comments
                    </Text>
                </View>

                <View style={styles.actions}>{postButtons}</View>
            </View>
        </View>
    );
};

export default PostCard;
