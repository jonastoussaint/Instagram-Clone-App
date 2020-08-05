import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from './firebase';
import firebase from "firebase"; 
import './ImageUpload.css';

function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgrss] = useState(0);

    const handleChange = (e) => {
        //Get the file that is selected.
        if (e.target.files[0]) { 
            setImage(e.target.files[0]);//Set that image to state
        }
    };

    const handleUpload = () => {
        //image.name is the name of the file.
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                // progress function ...
                const progress = Math.round(
                    //This gives you a number between 1 to 100 for progress
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgrss(progress);
            },
            (error) => {
                //Error function ...
                console.log(error);
                alert(error.message);
            },
            () => {
                    //Complete function...
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL() 
                        .then(url => {
                            //Post the image inside of the database
                            db.collection("posts").add({
                                /*Sorts all the post by the correct timing 
                                All recent post will come to the top
                                We used firebase serverTime it will be consistent*/
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url, 
                                username: username
                            });
                            setProgrss(0);
                            setCaption("");
                            setImage(null);
                    });
            }
        );
    };

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload