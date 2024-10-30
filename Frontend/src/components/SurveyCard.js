import React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SurveyCard = ({ survey }) => {
  const navigate = useNavigate();

  return (
    <Paper 
      sx={{
        padding: 2,
        margin: 2,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }} 
      onClick={() => navigate(`/survey/${survey.id}`)}
    >
      <Typography variant="h6">{survey.title}</Typography>
      <Typography variant="body2" color="textSecondary">{survey.description}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="body2">Created by: {survey.createdBy}</Typography>
        <Typography variant="body2">Date: {survey.createdAt}</Typography>
      </Box>
    </Paper>
  );
};

export default SurveyCard;
