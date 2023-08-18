import React from 'react';
import {
    backIcon,
    commentsIcon,
    deleteIcon,
    editIcon,
    tickIcon,
} from '@assets/icons';
import StyledIcon from '@components/StyledIcon';
import { COLORS, FONT } from '@consts/theme';
import { IPost } from '@global-types/global';
import { Alert, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import IconButton from './IconButton';
import { POST_PATH } from '@consts/paths';
import { useNavigation } from '@react-navigation/native';

interface PostCardProps extends Omit<IPost, 'comments'>, Omit<ViewProps, 'id'> {
    commentsCount?: number;
}

const PostBox = styled.View`
    padding: 15px;
    border-radius: 10px;
    background-color: ${COLORS.white};
`;

const PostTitle = styled.Text`
    font-family: ${FONT.SEMIBOLD};
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 15px;
`;
const PostText = styled.Text`
    font-family: ${FONT.REGULAR};
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 20px;
`;

const PostBottom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;

const PostComments = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PostCommentsText = styled.Text`
    font-size: 14px;
    font-family: ${FONT.SEMIBOLD};
    margin-left: 10px;
`;

const PostActions = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 15px;
`;

const PostCard: React.FC<PostCardProps> = ({
    body,
    id,
    title,
    commentsCount,
    ...restProps
}) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const navigation = useNavigation();

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
        <PostBox {...restProps}>
            <PostTitle onPress={() => navigation.navigate(POST_PATH, { id })}>
                {title}
            </PostTitle>
            <PostText>{body}</PostText>
            <PostBottom>
                <PostComments>
                    <StyledIcon source={commentsIcon} />
                    <PostCommentsText>
                        {commentsCount} comments
                    </PostCommentsText>
                </PostComments>

                <PostActions>{postButtons}</PostActions>
            </PostBottom>
        </PostBox>
    );
};

export default PostCard;
