import React from 'react';
import { auth } from '../services/Firebase.js';

const Profile = () => {
    return (
        <div>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    );
};

export default Profile;