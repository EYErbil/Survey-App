import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, ListItemIcon, List, ListItem, ListItemText, ListItemSecondaryAction, Container, Paper } from '@mui/material';
import { TextFields as TextFieldsIcon, RadioButtonChecked as RadioButtonCheckedIcon, CheckBox as CheckBoxIcon, Star as StarIcon, ArrowDropDownCircle as ArrowDropDownCircleIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddQuestion = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [options, setOptions] = useState(['']); // Initialize with one empty option
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleAddQuestion = () => {
    if (!questionText || !questionType || (['RADIO', 'CHECKBOX', 'DROPDOWN'].includes(questionType) && options.some(option => option === ''))) {
      alert('Please fill out all fields before adding the question.');
      return;
    }

    const newQuestion = {
      questionText,
      questionType,
      options: options.filter(option => option !== '') // Filter out any empty options
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setQuestionType('');
    setOptions(['']); // Reset options to initial state
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuestions = async () => {
    try {
      for (const question of questions) {
        const response = await axios.post(`http://localhost:8080/questions`, {
          surveyId,
          question: question.questionText,
          questionType: question.questionType
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (['RADIO', 'CHECKBOX', 'DROPDOWN'].includes(question.questionType)) {
          const questionID = response.data.questionID; 
          const optionRequests = question.options.map(answer => ({
            answer: answer,
            questionId: questionID
          }));

          await Promise.all(optionRequests.map(optionRequest =>
            axios.post('http://localhost:8080/answers', optionRequest, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
          ));
        }
      }
      console.log('All questions added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding questions:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ overflowY: 'auto' }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, }}>
        <Box sx={{ mb: 2 }} >
          <TextField
            label="Question Text"
            fullWidth
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="question-type-label">Question Type</InputLabel>
          <Select
            labelId="question-type-label"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            required
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
        {['RADIO', 'CHECKBOX', 'DROPDOWN','RATING'].includes(questionType) && (
          <List sx={{ mb: 2 }}>
            {options.map((option, index) => (
              <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemoveOption(index)}>
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <Button startIcon={<AddIcon />} onClick={handleAddOption}>
              Add Option
            </Button>
          </List>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
          sx={{ mb: 2 }}
        >
          Add Question
        </Button>
        <List sx={{ mb: 2 }}>
          {questions.map((q, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={q.questionText}
                secondary={`Type: ${q.questionType} Options: ${q.options.join(', ')}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemoveQuestion(index)}>
                  <RemoveIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={handleSubmitQuestions}>
          Submit All Questions
        </Button>
      </Paper>
      <Box height={200} bgcolor="background" />

    </Container>

  );
};

export default AddQuestion;

