import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './styles.css';

function Results(){
    const location = useLocation();
    const [response, setResponse] = useState('');
    const [link, setLink] = useState();
    const [repoParam, setRepoParam] = useState({
        repoName: '',
        token:'',
        content: response
    });
    const navigate = useNavigate();

    useEffect(() =>{
        if (location.state){
            const{parameters} = location.state;
            handleSubmit(parameters);
        }
    }, [location]);

    const handleSubmit = async(parameters) => {
        try {
            const res = await axios.post('http://localhost:3001/chat', parameters);
            setResponse(res.data.response);
        } catch (err) {
            console.error('Chat error:', err);
        }
    };

    const handleChange = (e) => {
        setRepoParam({ ...repoParam, [e.target.name]: e.target.value });
    };

    const handleRepo = async(e) => {
        e.preventDefault();

        if (repoParam.repoName.trim() === '' || repoParam.token.trim() === ''){
            alert('Please fill in all fields');
            return;
        }

        try{
            const res = await axios.post('http://localhost:3001/results', repoParam);
            setLink(res.data.link);
        }catch(err){
            console.error('Repo error:', err);
        }
    };

    const prev = () =>{
        navigate('/chat');
    }

    return(
        <div>
             <h1 className='header'>Generated Response & Repositoraty creation:</h1>
             <div className='d-flex flex-column justify-content-center align-items-center m-3'>
                <div className='bg-white p-3 w-100 rounded'>
                {response && (
                    <div>
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                )}
                </div>

                <div className='d-flex justify-content-center align-items-center'>

                    <div className='bg-white m-3 p-3 rounded'>
                        <h2>Create GitHub Repositoray</h2>

                        <form onSubmit={handleRepo}>
                            <div className='mb-3'>
                                <label><strong>Repositoray Name</strong></label>
                                <input 
                                    type='text'
                                    placeholder='Enter Name'
                                    autoComplete='off'
                                    name='repoName'
                                    value={repoParam.repoName}
                                    className='form-control rounded-0'
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <label><strong>GitHub Token</strong></label>
                                <input
                                    type='text'
                                    placeholder='Enter Personal Access Token'
                                    autoComplete='off'
                                    name='token'
                                    value={repoParam.token}
                                    className='form-control rounded-0'
                                    onChange={handleChange}
                                />
                            </div>
                            <button type='submit' className='btn btn-success w-100 rounded-0 mt-2'>Create</button>
                        </form>
                    </div>

                    <div className='d-flex align-items-center flex-column'>
                        <div className='bg-white m-3 p-3 rounded'>
                            <h2>Repositoray link</h2>
                                <div>
                                    {link && (<p>Successfully Created: <a href={link} target='_blank'>{link}</a></p>)}
                                </div>
                        </div>
                        <button className='btn btn-info w-75 rounded ' onClick={prev}>Generate New Project</button>
                    </div>

                </div>



             </div>
        </div>
    );
}

export default Results;