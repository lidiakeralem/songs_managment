import { useState } from 'react';
import { Form } from 'react-router-dom'; // Removed useSubmit since it's not used
import { useWorkoutsContext } from '../hooks/useWorkoutsContect';


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Handle the submit action
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, artist, album, genre };

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setTitle('');
        setArtist('');
        setAlbum('');
        setGenre('');
        setError(null);
        setEmptyFields([]);
        console.log('New workout added', json);
        dispatch({ type: 'CREATE_WORKOUT', payload: json });
      }
    } catch (error) {
      setError('Failed to submit workout');
    }
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <h3>Add Music</h3>

      <label>Music Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>artist:</label>
      <input
        type="text"
        onChange={(e) => setArtist(e.target.value)}
        value={artist}
        className={emptyFields.includes('artist') ? 'error' : ''}
      />

      <label>album:</label>
      <input
        type="text"
        onChange={(e) => setAlbum(e.target.value)}
        value={album}
        className={emptyFields.includes('album') ? 'error' : ''}
      />

<label>genre:</label>
      <input
        type="text"
        onChange={(e) => setGenre(e.target.value)}
        value={genre}
        className={emptyFields.includes('genre') ? 'error' : ''}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </Form>
  );
};

export default WorkoutForm;

// import { useState, useEffect } from 'react';
// import { Form } from 'react-router-dom'; // Removed useSubmit since it's not used
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// const WorkoutForm = ({ existingSong }) => {
//   const { dispatch } = useWorkoutsContext();

//   // If editing an existing song, populate the form with its details
//   const [title, setTitle] = useState(existingSong ? existingSong.title : '');
//   const [artist, setArtist] = useState(existingSong ? existingSong.artist : '');
//   const [album, setAlbum] = useState(existingSong ? existingSong.album : '');
//   const [genre, setGenre] = useState(existingSong ? existingSong.genre : '');
//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);

//   // Handle form submission (create or update song)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const songData = { title, artist, album, genre };

//     try {
//       let response;
//       let json;

//       if (existingSong) {
//         // Update existing song
//         response = await fetch(`/api/workouts/${existingSong._id}`, {
//           method: 'PUT',
//           body: JSON.stringify(songData),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         json = await response.json();
//         if (response.ok) {
//           // Dispatch the update action to the context
//           dispatch({ type: 'UPDATE_SONG', payload: json });
//           console.log('Song updated', json);
//         }
//       } else {
//         // Create new song
//         response = await fetch('/api/workouts', {
//           method: 'POST',
//           body: JSON.stringify(songData),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         json = await response.json();
//         if (response.ok) {
//           dispatch({ type: 'CREATE_WORKOUT', payload: json });
//           console.log('New song added', json);
//         }
//       }

//       // Handle response errors
//       if (!response.ok) {
//         setError(json.error);
//         setEmptyFields(json.emptyFields);
//       } else {
//         // Clear form and error states after successful creation/update
//         setTitle('');
//         setArtist('');
//         setAlbum('');
//         setGenre('');
//         setError(null);
//         setEmptyFields([]);
//       }
//     } catch (error) {
//       setError('Failed to submit song');
//     }
//   };

//   return (
//     <Form className="create" onSubmit={handleSubmit}>
//       <h3>{existingSong ? 'Update Music' : 'Add Music'}</h3>

//       <label>Music Title:</label>
//       <input
//         type="text"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className={emptyFields.includes('title') ? 'error' : ''}
//       />

//       <label>Artist:</label>
//       <input
//         type="text"
//         onChange={(e) => setArtist(e.target.value)}
//         value={artist}
//         className={emptyFields.includes('artist') ? 'error' : ''}
//       />

//       <label>Album:</label>
//       <input
//         type="text"
//         onChange={(e) => setAlbum(e.target.value)}
//         value={album}
//         className={emptyFields.includes('album') ? 'error' : ''}
//       />

//       <label>Genre:</label>
//       <input
//         type="text"
//         onChange={(e) => setGenre(e.target.value)}
//         value={genre}
//         className={emptyFields.includes('genre') ? 'error' : ''}
//       />

//       <button type="submit">{existingSong ? 'Update Song' : 'Add Song'}</button>
//       {error && <div className="error">{error}</div>}
//     </Form>
//   );
// };

// export default WorkoutForm;