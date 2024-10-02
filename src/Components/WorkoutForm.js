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