import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  //Create a state to post, state is how you set variables in react
  const [posts, setPosts] = useState([]); //This is a hook 
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);


  //useEffects runs a piece of code based on a condition.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
          //User has logged in... 
          console.log(authUser);
          setUser(authUser);
      } 
      else {
        //User has logged out...
        setUser(null);
      }

    })

    return () => {
    //Perform some cleanup actions before
    unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    //If you leave this blank it will run once. when the page loads
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => { 
      setPosts(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        post: doc.data()
      })));
    })/*onSnapshot  Every sing time the database updates 
    this will fire*/  
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({ 
      displayName: username
    })
  })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);

  }

  /*Header Container*/
  /*This name convention is call BEM */
  return (
    <div className="app">   
    
      <Modal
        open={open}
        /*Inline function to close 
        this closes the modal when you click outside of it*/
        onClose={() =>  setOpen(false)} 
      >
       
        <div style={modalStyle} className={classes.paper}>

        <form className="app__signup">
        <center>
            <img
              className="app__headerImage"  
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
        </center>
            <Input
              placeholder ="Username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
             <Input
              placeholder ="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             />
            <Input
              placeholder ="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
        </form>
          
        </div>
      </Modal>
      
      <Modal
        open={openSignIn}
        /*Inline function to close 
        this closes the modal when you click outside of it*/
        onClose={() =>  setOpenSignIn(false)} 
      >
       
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
              <img
                className="app__headerImage"  
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
          </center>
             <Input
              placeholder ="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             />
            <Input
              placeholder ="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
        </form>
          
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {/*Log in and Sign out */}

        {user ? (<Button onClick ={() => auth.signOut()}>Log out</Button>
        ): 
        ( 
          <div className="app__loginContainer" >
            <Button onClick ={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick ={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
        
      </div>

      
     
      <h1> Hello World Program Mega Supper ahdsuivfabdsipvudsfbvidsfb🦾</h1>
      
      {
        //map is a ESX function
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      {user?.displayName ? (
       <ImageUpload username={user.displayName}/>
      ): (
      <h3>Sorry You need to login to upload</h3>
      )}
      
    </div>
  );
}

export default App;
