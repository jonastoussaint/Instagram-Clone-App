import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { Button, Input } from '@material-ui/core';
import firebase from 'firebase';
 
//Pass in the prop.
function Post({ postId, user, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() =>{
        let unsubscribe;
        if (postId) {
            unsubscribe = db
            .collection("posts")//go into collections
            .doc(postId)//go into doc
            .collection("comments")//look at comments and get a snapshot listeniner for that
            . orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
    unsubscribe();
    };
}, [postId]);

const postComment = (event) => {
     event.preventDefault();
     //Go to  post then posId then go to comments and add it there.
     db.collection("posts").doc(postId).collection("comments").add({
         text: comment,
         username: user.displayName,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
     });
     setComment('');
}  
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    //alt={username}
                    alt='JTigg'
                    src="/static/images/avatar/1.jpg"
                />
                {/*Curly Bracket allow you to put Javascript code here */}
                <h3>{username}</h3>
            </div>
            { /*Header -> Avatar + username*/}
            
            <img className="post__image"
            src={imageUrl}
            alt=""
            />
            
            {/*Image*/}
            {/*Username + Captions*/}
    <h4 className="post__text"><strong>{username}</strong>{caption}</h4>   
        
            <div className="post__comments" > 
                {
                    comments.map((comment) => (
                        <p>
                            <strong> {comment.username}</strong>
                            {comment.text}
                        </p>
                ))}    
            </div>
    
    {user && (
        <form className="post__commentBox">
            <input
                className="post__input" 
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                className="post__button"
                disabled={!comment}
                type="submit"
                onClick={postComment}>
                Post    
            </button>
        </form>
    )}
                    
    </div>
    )
}
export default Post 