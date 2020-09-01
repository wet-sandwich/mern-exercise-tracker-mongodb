import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(users[0]);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:5000/users')
    .then(res => {
      if (res.data.length > 0) {
        setUsers(res.data.map(user => user.username));
        setUsername(res.data[0].username);
      }
    });
  }, []);

  function onSubmit(event) {
    event.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:
          </label>
          <select required className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}>
            {
              users.map(user => {
                return (<option key={user} value={user}>{user}</option>);
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description:
          </label>
          <input type="text" required className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Duration:
          </label>
          <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Date:
          </label>
          <div>
            <DatePicker selected={date} value={date} onChange={(date) => setDate(date)}/>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary"  />
        </div>
      </form>
    </div>);
}

export default CreateExercise;
