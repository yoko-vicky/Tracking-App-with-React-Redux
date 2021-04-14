import React from 'react';
import TrackForm from '../components/TrackForm';

const AddTrack = () => (
  <div className="add-track">
    <h1 className="heading">Add Track</h1>
    <div className="content">
      <p>Welcome back let&apos;s add your track for today!</p>
      <TrackForm />
    </div>
  </div>
);

export default AddTrack;
