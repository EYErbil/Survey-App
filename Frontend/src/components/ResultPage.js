import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, List, ListItem, ListItemText, IconButton, Tooltip, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { keyframes } from '@emotion/react';

const grow = (percentage) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${percentage}%;
  }
`;

const ResultPage = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [pagination, setPagination] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:8080/surveys/${surveyId}/detail`)
      .then(response => {
        setSurvey(response.data);
        setLoading(false);
        const initialShowResults = response.data.questions.reduce((acc, question) => {
          acc[question.questionID] = false;
          return acc;
        }, {});
        setShowResults(initialShowResults);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [surveyId]);

  const toggleResults = (questionID, questionType) => {
    setShowResults(prevState => ({
      ...prevState,
      [questionID]: !prevState[questionID]
    }));

    if (questionType === 'TEXT' && !textAnswers[questionID]) {
      axios.get(`http://localhost:8080/user-answer-texts?questionId=${questionID}`,{      headers: {
        'Authorization': `Bearer ${token}`
      }})
        .then(response => {
          setTextAnswers(prevState => ({
            ...prevState,
            [questionID]: response.data
          }));
          setPagination(prevState => ({
            ...prevState,
            [questionID]: 5
          }));
        })
        .catch(error => {
          console.error('Error loading text answers:', error);
        });
    }
  };

  const loadMore = (questionID) => {
    setPagination(prevState => ({
      ...prevState,
      [questionID]: prevState[questionID] + 5
    }));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading survey</Typography>;

  return (
    <Container>
      <Box>
        <Typography variant="h2" gutterBottom>{survey.title}</Typography>
        <Typography variant="h6" gutterBottom>Shared by: {survey.userName}</Typography>
        <Typography variant="body1" gutterBottom>{survey.description}</Typography>

        {survey.questions.map((question, index) => (
          <Box key={index} sx={{ p: 2, bgcolor: 'black.100', mb: 2, position: 'relative' }}>
            <Typography variant="body1" gutterBottom>{question.question}</Typography>
            <IconButton
              sx={{ position: 'absolute', right: 0, top: 0 }}
              onClick={() => toggleResults(question.questionID, question.questionType)}
            >
              {showResults[question.questionID] ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
            </IconButton>
            {showResults[question.questionID] && question.questionType !== 'TEXT' && (
              <List>
                {question.answers.map((answer, idx) => {
                  if (question.answerCount === 0) {
                    return (
                      <ListItem key={idx}>
                        <Tooltip title={answer.answer}>
                          <ListItemText
                            primary={answer.answer}
                            secondary={`No one selected this answer`}
                            primaryTypographyProps={{
                              sx: {
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: 'calc(100% - 16px)' // Adjust as needed
                              }
                            }}
                          />
                        </Tooltip>
                        <Box sx={{ width: '100%', mt: 1 }} />
                      </ListItem>
                    );
                  }
                  const percentage = (answer.selectedCount / question.answerCount) * 100;
                  return (
                    <ListItem key={idx}>
                      <Tooltip title={answer.answer}>
                        <ListItemText
                          primary={answer.answer}
                          secondary={`Selected by ${answer.selectedCount} people (${percentage.toFixed(2)}%)`}
                          primaryTypographyProps={{
                            sx: {
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 'calc(100% - 16px)' // Adjust as needed
                            }
                          }}
                        />
                      </Tooltip>
                      <Box sx={{ width: '100%', mt: 1, bgcolor: 'black' }}>
                        <Box
                          sx={{
                            width: `${percentage}%`,
                            bgcolor: 'primary.main',
                            height: 10,
                            borderRadius: 1,
                            animation: `${grow(percentage)} 2s ease-in-out`
                          }}
                        />
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            )}
            {showResults[question.questionID] && question.questionType === 'TEXT' && (
              <List>
                {(textAnswers[question.questionID] || []).slice(0, pagination[question.questionID]).map((answer, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={answer.answer} />
                  </ListItem>
                ))}
                {(textAnswers[question.questionID] || []).length > pagination[question.questionID] && (
                  <ListItem>
                    <Button onClick={() => loadMore(question.questionID)}>Show more</Button>
                  </ListItem>
                )}
              </List>
            )}
          </Box>
        ))}
        <Box height={200} bgcolor="background" />
      </Box>
    </Container>
  );
};

export default ResultPage;
