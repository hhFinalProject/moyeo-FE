import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getEditingMeeting } from '../services/api';
import { PostButtonStyle } from '../styles/PostButtonStyle';
import { Meeting } from '../types/AppTypes';
import PostButton from './common/PostButton';

export default function ButtonContent({ currMeeting }: { currMeeting: Meeting }) {
  const { master, attend, secret, id } = currMeeting;

  const { refetch } = useQuery({
    queryKey: ['editingMeeting'],
    queryFn: () => getEditingMeeting(id),
    enabled: false,
  });

  const handleClickEdit = () => {
    refetch();
  };

  return (
    <>
      {master ? (
        <Link to={`/post/${id}`}>
          <PostButtonStyle type="button" onClick={() => handleClickEdit()}>
            수정
          </PostButtonStyle>
        </Link>
      ) : attend ? (
        <PostButton name={'취소'} currMeeting={currMeeting} />
      ) : secret ? (
        <PostButton name={'참여'} currMeeting={currMeeting} />
      ) : (
        <PostButton name={'참여'} currMeeting={currMeeting} />
      )}
    </>
  );
}
