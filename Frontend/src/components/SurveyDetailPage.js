import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Container, TextField, FormControl, FormControlLabel, Radio, RadioGroup, Checkbox, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const SurveyDetailPage = ({ userId }) => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showAlert, setShowAlert] = useState(true);
  const token = localStorage.getItem('token');
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

  const handleChange = (questionId, value, questionType) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: { value, questionType }
    }));
  };

  const handleSubmit = () => {
    const promises = Object.keys(answers).map(questionId => {
      const { value, questionType } = answers[questionId];
      if (questionType === 'TEXT') {
        return axios.post('http://localhost:8080/user-answer-texts', {
          userId,
          questionId,
          answer: value
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        const selectedAnswers = Array.isArray(value) ? value : [value];
        return selectedAnswers.map(answerId => (
          axios.post('http://localhost:8080/user-answers', {
            userId,
            answerId,
            selected: 1
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ));
      }
    });

    Promise.all(promises.flat())
      .then(() => {
        alert('Survey submitted successfully');
        navigate('/');
      })
      .catch(error => {
        alert('Error submitting survey');
        console.error(error);
      });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading survey</Typography>;

  return (
    <Container>
      {!userId && showAlert && (<Alert severity="warning" onClose={() => setShowAlert(false)}>
        To answer the surveys, please log in.</Alert>)}
      <Box>
        <Typography variant="h2" gutterBottom>{survey.title}</Typography>
        <Typography variant="h6" gutterBottom>Shared by: {survey.userName}</Typography>
        <Typography variant="body1" gutterBottom>{survey.description}</Typography>
        {survey.questions.map((question, index) => (
          <Box key={index} sx={{ p: 2, bgcolor: 'black.100', mb: 2 }}>
            <Typography variant="body1" gutterBottom>{question.question}</Typography>
            {question.questionType === 'TEXT' && (
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Your answer"
                sx={{ mt: 2 }}
                onChange={(e) => handleChange(question.questionID, e.target.value, 'TEXT')}
              />
            )}
            {question.questionType === 'RADIO' && (
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <RadioGroup onChange={(e) => handleChange(question.questionID, e.target.value, 'RADIO')}>
                  {question.answers.map((answer, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={answer.id}
                      control={<Radio />}
                      label={answer.answer}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            {question.questionType === 'RATING' && (
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <RadioGroup onChange={(e) => handleChange(question.questionID, e.target.value, 'RADIO')}>
                  {question.answers.map((answer, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={answer.id}
                      control={<Radio />}
                      label={answer.answer}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            
            {question.questionType === 'CHECKBOX' && (
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                {question.answers.map((answer, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          const newValues = answers[question.questionID]?.value || [];
                          if (e.target.checked) {
                            newValues.push(answer.id);
                          } else {
                            const index = newValues.indexOf(answer.id);
                            if (index > -1) {
                              newValues.splice(index, 1);
                            }
                          }
                          handleChange(question.questionID, newValues, 'CHECKBOX');
                        }}
                      />
                    }
                    label={answer.answer}
                  />
                ))}
              </FormControl>
            )}
            {question.questionType === 'DROPDOWN' && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Select
                  value={answers[question.questionID]?.value || ''}
                  onChange={(e) => handleChange(question.questionID, e.target.value, 'DROPDOWN')}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select an option</MenuItem>
                  {question.answers.map((answer, idx) => (
                    <MenuItem key={idx} value={answer.id}>{answer.answer}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        ))}
        {userId && (<Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit Survey
        </Button>)}
      </Box>
      <Box height={200} bgcolor="background" />
    </Container>
  );
};

export default SurveyDetailPage;
