import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, TextField, Button} from '@mui/material';
import { useParams ,useNavigate} from 'react-router-dom';

function SurveyDetailPage() {
    const { surveyId } = useParams();
    const [survey, setSurvey] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/surveys/${surveyId}/detail`)
            .then(response => {
                setSurvey(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [surveyId]);

    const handleChange = (questionID, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionID]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requests = Object.keys(answers).map(questionID => {
                return axios.post('http://localhost:8080/answers', {
                     answers
                });
            });
            await Promise.all(requests);
            navigate('/');
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading questions</p>;

    return (
        <Container>
            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h2" gutterBottom>
                    {survey.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Shared by: {survey.userName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {survey.description}
                </Typography>
                {survey.questions.map((question) => (
                    
                    <Box key={question.questionID} sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            {question.question}
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Your answer"
                            onChange= {handleChange}
                        />
                    </Box>
            ))
                
                }
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default SurveyDetailPage;