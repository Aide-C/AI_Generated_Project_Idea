import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [parameters, setParameters] = useState({
    language: '',
    tech: '',
    topic: '',
    info: ''
  });
  //const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setParameters({ ...parameters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parameters.language.trim() === '' || parameters.tech.trim() === '' || parameters.topic.trim() === '' || parameters.info.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    navigate('/results', {state: {parameters} });
  };

  const handleLogout = async () => {
    try{
      const res = await axios.get('http://localhost:3001/logout');
      navigate('/login', {state: {parameters} });
    }catch(err){
      console.error('Logout Error', err);
    }
  } 

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">

          <h2>Project Details</h2>

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label><strong>Programming Language</strong></label>
              <input 
                type='text'
                placeholder ="Enter Langauge (EX. C++)"
                autoComplete="off"
                name="language"
                value={parameters.language}
                className="form-control rounded-0"
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label><strong>Technology</strong></label>
              <input 
                type='text'
                placeholder='Enter technology (EX. Docker)'
                autoComplete='off'
                name='tech'
                value={parameters.tech}
                className='form-control rounded-0'
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label><strong>Topic</strong></label>
              <input 
                type='text'
                placeholder='Enter topic (EX. AI)'
                autoComplete='off'
                name='topic'
                value={parameters.topic}
                className='form-control rounded-0'
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label><strong>Additional Info</strong></label>
              <input 
                type='text'
                placeholder='Enter info (EX. Game-based)'
                autoComplete='off'
                name='info'
                value={parameters.info}
                className='form-control rounded-0'
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-0">Find</button>
          </form>
        </div>

        <button className=' mt-5 btn btn-danger w-25 rounded ' onClick={handleLogout}>Log Out</button>
        
      </div>
    </div>
  );
}

export default Chat;
