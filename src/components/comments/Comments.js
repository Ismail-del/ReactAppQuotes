import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api'
import CommentsList from '../comments/CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;

  const { sendRequest, status, data:dataComments, error } = useHttp(getAllComments, true);

  useEffect(() => {
    
    sendRequest(quoteId)

  }, [quoteId, sendRequest])

  
 const addAddCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  let comments;
  if(error){
    comments = <p className="centred">This is an error here</p>
  }

  if(status === 'pending'){
    comments = <div className="centred">
      <LoadingSpinner />
    </div>
  }

  if(status === 'completed' && (dataComments || dataComments.length > 0) ){
    comments = <CommentsList comments={dataComments}/>
  }
  if(status === 'completed' && (!dataComments || dataComments.length === 0) ){
    comments = <p className="centred">No comments added</p>
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  


  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comments Comments
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddComents={addAddCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
