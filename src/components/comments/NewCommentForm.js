import { useRef, useEffect } from 'react';


import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {

  const commentTextRef = useRef();
  

  const { sendRequest, status, error } = useHttp(addComment, true);
  
  const { onAddComents, quoteId } = props;



  
  useEffect(() => {
    if (status === 'completed' && !error){
      onAddComents();
    }
        // if (status === 'completed'){
        //     console.log("completed")
        // }
  }, [status, error, onAddComents])

  const submitFormHandler = (event) => {
    event.preventDefault();
    // const requestData = {
    
    const requestData = {
      commentData:{
        text:commentTextRef.current.value
      },
      quoteId:quoteId
    }
      
    // const commentData = {
    //     quoteId:quoteId,
    //     text: 
    //   }
    //   quoteId:quoteId,
    // }

    
    // optional: Could validate here

    sendRequest(requestData);

    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
