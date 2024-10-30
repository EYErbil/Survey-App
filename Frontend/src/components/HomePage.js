import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/surveys')
      .then(response => {
        const fetchedSurveys = response.data;
        console.log(fetchedSurveys); // Debugging: Log the response data
        if (Array.isArray(fetchedSurveys)) {
          setSurveys(fetchedSurveys);
        } else {
          setSurveys([]);
        }
      })
      .catch(error => console.error('Error fetching surveys:', error));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Survey Application
      </Typography>
      <Typography variant="body1">
        Select a survey to participate in.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {surveys.map((survey) => (
          <Grid item xs={12} sm={6} md={4} key={survey.surveyID}>
            <Card>
              <CardActionArea component={Link} to={`/survey/${survey.id}`}>
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

export default HomePage;

