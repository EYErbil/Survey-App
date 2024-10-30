import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, AppBar, Toolbar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const UserSurveys = ({ userId, username }) => {
  const [surveys, setSurveys] = useState([]);
  const [viewMode, setViewMode] = useState('result');

  useEffect(() => {
    axios.get(`http://localhost:8080/surveys?userId=${userId}`)
      .then(response => {
        const fetchedSurveys = response.data;
        if (Array.isArray(fetchedSurveys)) {
          setSurveys(fetchedSurveys);
        } else {
          setSurveys([]);
        }
      })
      .catch(error => console.error('Error fetching surveys:', error));
  }, [userId]);

  return (
    <Box sx={{ p: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome {username ? `back, ${username}!` : 'to the Survey Application'}
          </Typography>
          <Button color="inherit" onClick={() => setViewMode('result')}>
            View Results
          </Button>
          <Button color="inherit" onClick={() => setViewMode('edit')}>
            Edit Surveys
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        Welcome {username ? `back, ${username}!` : 'to the Survey Application'}
      </Typography>
      <Typography variant="body1">
        Select a survey to see results.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {surveys.map((survey) => (
          <Grid item xs={12} sm={6} md={4} key={survey.surveyID}>
            <Card>
              <CardActionArea component={Link} to={`/${viewMode}-survey/${survey.id}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/logo_survey.png"
                  alt="Survey Logo"
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h6">{survey.title}</Typography>
                  <Typography variant="body2">{survey.description}</Typography>
                  <Typography variant="caption">Created by: {survey.createdBy}</Typography>
                  <Typography variant="caption" sx={{ ml: 2 }}>Date: {survey.createdAt ? new Date(survey.createdAt).toLocaleDateString() : 'Unknown'}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box height={200} bgcolor="background" />
    </Box>

  );
};

export default UserSurveys;