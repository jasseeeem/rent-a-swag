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
    db.collection("posts").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = element.data();
        setPosts(arr => [...arr, data]);
      });
    })
  }

  return (
    user ?
      <div className="d-flex">
        {
          posts.map(post => (
            <>
              <div className="card mt-3 me-3">
                <img className="card-image" src={post.images[0]} alt="Product Main"></img>
                <div className="card-body">
                  <h5 className="card-title">{post.productName}</h5>
                  <div className="d-flex justify-content-between">
                    <h6>₹ {post.price} per day</h6>
                    <h6>{post.minDays} - {post.maxDays} days</h6>
                  </div>
                  <p className="card-text">{post.description.length > 25 ? post.description.substring(0, 25) + "..." : post.description}</p>
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
