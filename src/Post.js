import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

//Pass in the prop.
function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    //alt={username}
                    alt="JTigg"
                    src="/static/images/avatar/1.jpg"
                />
                {/*Curly Bracket allow you to put Javascript code here */}
                <h3>{username}</h3>
            </div>
            
           
            {/*Header -> Avatar + username*/}
            
            <img className="post__image"
            src={imageUrl}
            alt=""
            />
            
            {/*Image*/}
            {/*Username + Captions*/}
    <h4 className="post__text"><strong>{username}</strong>{caption}</h4>    
        </div>
    )
}
export default Post 