import React from 'react';
import {Comment} from 'semantic-ui-react';

const CommentList = ({comment}) => {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{comment.author}</Comment.Author>
        <Comment.Text>
          <p>{comment.text}</p>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default CommentList;
