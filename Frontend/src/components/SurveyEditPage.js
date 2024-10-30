import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SurveyEditPage = ({ userId }) => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [survey, setSurvey] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ question: '', questionType: 'TEXT' });
  const [newAnswer, setNewAnswer] = useState({ answer: '', questionId: null });

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/surveys/${surveyId}/detail`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSurvey(response.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };
    fetchSurvey();
  }, [surveyId, token]);

  if (!survey) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurvey((prevSurvey) => ({ ...prevSurvey, [name]: value }));
  };

  const handleQuestionChange = (e, questionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = survey.questions.map((q, index) =>
      index === questionIndex ? { ...q, [name]: value } : q
    );
    setSurvey((prevSurvey) => ({ ...prevSurvey, questions: updatedQuestions }));
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = survey.questions.map((q, qIndex) => {
      if (qIndex === questionIndex) {
        const updatedAnswers = q.answers.map((a, aIndex) =>
          aIndex === answerIndex ? { ...a, [name]: value } : a
        );
        return { ...q, answers: updatedAnswers };
      }
      return q;
    });
    setSurvey((prevSurvey) => ({ ...prevSurvey, questions: updatedQuestions }));
  };

  const saveSurvey = () => {
    return axios.put(`http://localhost:8080/surveys/${surveyId}`, {
      title: survey.title,
      description: survey.description
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const saveQuestionAndAnswers = () => {
    const questionPromises = survey.questions.map(question => {
      const questionPromise = axios.put(`http://localhost:8080/questions/${question.questionID}`, {
        question: question.question,
        questionType: question.questionType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const answerPromises = question.answers.map(answer =>
        axios.put(`http://localhost:8080/answers/${answer.id}`, {
          answer: answer.answer
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      return Promise.all([questionPromise, ...answerPromises]);
    });

    return Promise.all(questionPromises);
  };

  const deleteQuestion = (questionID) => {
    axios.delete(`http://localhost:8080/questions/${questionID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setSurvey((prevSurvey) => ({
      ...prevSurvey,
      questions: prevSurvey.questions.filter(q => q.questionID !== questionID)
    })))
    .catch(error => console.error('Error deleting question:', error));
  };

  const deleteAnswer = (answerID, questionIndex) => {
    axios.delete(`http://localhost:8080/answers/${answerID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      const updatedQuestions = survey.questions.map((q, qIndex) => {
        if (qIndex === questionIndex) {
          return { ...q, answers: q.answers.filter(a => a.id !== answerID) };
        }
        return q;
      });
      setSurvey((prevSurvey) => ({ ...prevSurvey, questions: updatedQuestions }));
    })
    .catch(error => console.error('Error deleting answer:', error));
  };

  const addQuestion = () => {
    axios.post(`http://localhost:8080/questions`, {
      surveyId: surveyId,
      question: newQuestion.question,
      questionType: newQuestion.questionType
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      const newQuestionData = response.data;
      setSurvey((prevSurvey) => ({
        ...prevSurvey,
        questions: [...prevSurvey.questions, { ...newQuestionData, answers: [] }]
      }));
      setNewQuestion({ question: '', questionType: 'TEXT' }); // Reset new question fields
    })
    .catch(error => console.error('Error adding question:', error));
  };

  const addAnswer = () => {
    axios.post(`http://localhost:8080/answers`, {
      answer: newAnswer.answer,
      questionId: newAnswer.questionId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      const newAnswerData = response.data;
      const updatedQuestions = survey.questions.map(q =>
        q.questionID === newAnswer.questionId ? { ...q, answers: [...q.answers, newAnswerData] } : q
      );
      setSurvey((prevSurvey) => ({ ...prevSurvey, questions: updatedQuestions }));
      setNewAnswer({ answer: '', questionId: null }); // Reset new answer field
    })
    .catch(error => console.error('Error adding answer:', error));
  };

  const handleSubmit = () => {
    saveSurvey()
      .then(saveQuestionAndAnswers)
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error submitting survey:', error));
  };

  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" gutterBottom>Edit Survey</Typography>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={survey.title}
              onChange={handleSurveyChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={survey.description}
              onChange={handleSurveyChange}
              variant="outlined"
              margin="normal"
            />
          </Box>
        </Paper>
        {survey.questions && survey.questions.map((question, questionIndex) => (
          <Paper key={question.questionID} elevation={3} style={{ padding: '16px', marginTop: '16px', position: 'relative' }}>
            <IconButton
              color="secondary"
              onClick={() => deleteQuestion(question.questionID)}
              style={{ position: 'absolute', top: '8px', right: '8px' }}
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="h6">Question {questionIndex + 1}</Typography>
            <TextField
              fullWidth
              label="Question"
              name="question"
              value={question.question}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
              variant="outlined"
              margin="normal"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <Select
                name="questionType"
                value={question.questionType}
                onChange={(e) => handleQuestionChange(e, questionIndex)}
                displayEmpty
              >
                <MenuItem value="TEXT">Text</MenuItem>
                <MenuItem value="RADIO">Radio</MenuItem>
                <MenuItem value="CHECKBOX">Checkbox</MenuItem>
                <MenuItem value="RATING">Rating</MenuItem>
                <MenuItem value="DROPDOWN">Dropdown</MenuItem>

              </Select>
            </FormControl>
            {question.questionType !== 'TEXT' && question.answers && question.answers.map((answer, answerIndex) => (
              <Box key={answer.id} mt={2} pl={2} display="flex" alignItems="center">
                <TextField
                  fullWidth
                  label="Answer"
                  name="answer"
                  value={answer.answer}
                  onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex)}
                  variant="outlined"
                  margin="normal"
                />
                <IconButton color="secondary" onClick={() => deleteAnswer(answer.id, questionIndex)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {question.questionType !== 'TEXT' && (
              <Box mt={2} pl={2}>
                <Typography variant="body1">Add New Answer</Typography>
                <Box display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    label="New Answer"
                    value={newAnswer.answer}
                    onChange={(e) => setNewAnswer({ ...newAnswer, answer: e.target.value, questionId: question.questionID })}
                    variant="outlined"
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" onClick={addAnswer}>Add Answer</Button>
                </Box>
              </Box>
            )}
          </Paper>
        ))}
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6">Add New Question</Typography>
          <TextField
            fullWidth
            label="Question"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <Select
              value={newQuestion.questionType}
              onChange={(e) => setNewQuestion({ ...newQuestion, questionType: e.target.value })}
              displayEmpty
            >
              <MenuItem value="TEXT">Text</MenuItem>
              <MenuItem value="RADIO">Radio</MenuItem>
              <MenuItem value="CHECKBOX">Checkbox</MenuItem>
              <MenuItem value="RATING">Rating</MenuItem>
              <MenuItem value="DROPDOWN">Dropdown</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={addQuestion}>Add Question</Button>
        </Paper>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
      <Box height={200} bgcolor="background" />
    </Container>
  );
};

export default SurveyEditPage;