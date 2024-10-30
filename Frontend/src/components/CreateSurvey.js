import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextFields as TextFieldsIcon, RadioButtonChecked as RadioButtonCheckedIcon, CheckBox as CheckBoxIcon, Star as StarIcon, ArrowDropDownCircle as ArrowDropDownCircleIcon } from '@mui/icons-material';
import { Box, Typography, Button, Container, TextField, FormControl, Select, MenuItem, ListItemIcon, IconButton, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const CreateSurvey = ({ username }) => {
  const [survey, setSurvey] = useState({ title: '', description: '', questions: [] });
  const [showAlert, setShowAlert] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();



  const handleSurveyChange = (key, value) => {
    setSurvey(prevSurvey => ({ ...prevSurvey, [key]: value }));
  };

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index][key] = value;
    setSurvey(prevSurvey => ({ ...prevSurvey, questions: updatedQuestions }));
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[qIndex].answers[aIndex].answer = value;
    setSurvey(prevSurvey => ({ ...prevSurvey, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setSurvey(prevSurvey => ({
      ...prevSurvey,
      questions: [...prevSurvey.questions, { question: '', questionType: 'TEXT', answers: [] }]
    }));
  };

  const removeQuestion = (index) => {
    setSurvey(prevSurvey => ({
      ...prevSurvey,
      questions: prevSurvey.questions.filter((_, qIndex) => qIndex !== index)
    }));
  };

  const addAnswer = (qIndex) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[qIndex].answers.push({ answer: '' });
    setSurvey(prevSurvey => ({ ...prevSurvey, questions: updatedQuestions }));
  };

  const removeAnswer = (qIndex, aIndex) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[qIndex].answers = updatedQuestions[qIndex].answers.filter((_, index) => index !== aIndex);
    setSurvey(prevSurvey => ({ ...prevSurvey, questions: updatedQuestions }));
  };

  const handleSubmit = () => {
    let surveyResponse;

    axios.post('http://localhost:8080/surveys',
      { title: survey.title, description: survey.description },
      {
        params: { username },
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        surveyResponse = response;
        const savedSurveyId = surveyResponse.data.id;

        const questionPromises = survey.questions.map(question => {
          return axios.post(`http://localhost:8080/questions`,
            {  surveyId: savedSurveyId, question: question.question, questionType: question.questionType },
            { headers: { 'Authorization': `Bearer ${token}` } }
          )
            .then(questionResponse => {
              const questionId = questionResponse.data.questionID;
              const answerPromises = question.answers.map(answer => {
                return axios.post(`http://localhost:8080/answers`,
                  { answer: answer.answer, questionId: questionId },
                  { headers: { 'Authorization': `Bearer ${token}` } }
                );
              });
              return Promise.all(answerPromises);
            });
        });

        return Promise.all(questionPromises);
      })
      .then(() => {
        alert('Survey created successfully');
        navigate('/');
      })
      .catch(error => {
        alert('Error creating/updating survey');
        console.error(error);
      });
  };


  return (
    <Container>
      <Box>
        <Typography variant="h2" gutterBottom>{'Create Survey'}</Typography>
        <TextField
          label="Survey Title"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={survey.title}
          onChange={(e) => handleSurveyChange('title', e.target.value)}
        />
        <TextField
          label="Survey Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          value={survey.description}
          onChange={(e) => handleSurveyChange('description', e.target.value)}
        />
        {survey.questions.map((question, qIndex) => (
          <Box key={qIndex} sx={{ p: 2, bgcolor: 'black.100', mb: 2 }}>
            <TextField
              label={`Question ${qIndex + 1}`}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={question.questionType}
                onChange={(e) => handleQuestionChange(qIndex, 'questionType', e.target.value)}
              >
                <MenuItem value="TEXT">
                  <ListItemIcon>
                    <TextFieldsIcon />
                  </ListItemIcon>
                  Text
                </MenuItem>
                <MenuItem value="RADIO">
                  <ListItemIcon>
                    <RadioButtonCheckedIcon />
                  </ListItemIcon>
                  Radio
                </MenuItem>
                <MenuItem value="CHECKBOX">
                  <ListItemIcon>
                    <CheckBoxIcon />
                  </ListItemIcon>
                  Checkbox
                </MenuItem>
                <MenuItem value="RATING">
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  Rating
                </MenuItem>
                <MenuItem value="DROPDOWN">
                  <ListItemIcon>
                    <ArrowDropDownCircleIcon />
                  </ListItemIcon>
                  Dropdown
                </MenuItem>
              </Select>
            </FormControl>
            {question.questionType !== 'TEXT' && (
              <Box>
                {question.answers.map((answer, aIndex) => (
                  <Box key={aIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={answer.answer}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                      sx={{ mr: 2 }}
                    />
                    <IconButton onClick={() => removeAnswer(qIndex, aIndex)}><DeleteIcon /></IconButton>
                  </Box>
                ))}
                <Button startIcon={<AddIcon />} onClick={() => addAnswer(qIndex)}>Add Answer</Button>
              </Box>
            )}
            <Button startIcon={<DeleteIcon />} onClick={() => removeQuestion(qIndex)} sx={{ mt: 2 }}>Remove Question</Button>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addQuestion} sx={{ mt: 2, mb: 2 }}>Add Question</Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {'Create Survey'}
        </Button>
      </Box>
      <Box height={200} bgcolor="background" />
    </Container>
  );
};

export default CreateSurvey;
