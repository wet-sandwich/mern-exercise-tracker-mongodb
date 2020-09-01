import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Exercise(props) {

  const styleObj = {
    padding: 0,
    verticalAlign: "baseline",
  };

  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/exercises/"+props.exercise._id+"/edit"}>edit</Link> | <button type="button" className="btn btn-link" style={styleObj} onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
      </td>
    </tr>
  );
}

function ExercisesList() {

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(res => {
        setExercises(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    setExercises(prev => prev.filter(doc => doc._id !== id));
  }

  function exerciseList() {
    return exercises.map(doc => {
      return <Exercise exercise={doc} deleteExercise={deleteExercise} key={doc._id} />;
    });
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { exerciseList() }
        </tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
