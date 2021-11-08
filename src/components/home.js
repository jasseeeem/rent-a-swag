import React, { useEffect, useState } from 'react';

import { firestore } from '../services/Firebase.js'

import '../App.css';

const Home = ({ user }) => {

  const [posts, setPosts] = useState([]);

  window.addEventListener('load', async () => {
    Fetchdata();
  });


  const Fetchdata = async () => {
    const db = firestore;
    db.collection("posts").orderBy('modifiedAt', 'desc').limit(25).get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = element.data();
        setPosts(arr => [...arr, data]);
      });
    })
  }

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
  }

  return (
    user ?
      <div className="d-flex align-content-start flex-wrap">
        {
          posts.map(post => (
            <>
              <div className="card mt-3 me-3">
                <img className="card-image" src={post.images[0]} alt="Product Main"></img>
                <div className="card-body">
                  <h5 className="card-title">{post.productName}</h5>
                  <div className="d-flex justify-content-between">
                    <small className="pe-3">By {post.username}</small>
                    <small>{timeSince(post.modifiedAt)} ago</small>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <h6>₹ {post.price} per day</h6>
                    <h6>{post.minDays} - {post.maxDays} days</h6>
                  </div>
                  <p className="card-text">{post.description.length > 38 ? post.description.substring(0, 35) + "..." : post.description}</p>
                </div>
              </div>
            </>
          ))
        }
      </div>
      :
      <div>
        <p>User doesnt exist</p>
      </div>
  )
}

export default Home;
