package services;

import Entity.Question;
import controllers.SurveyController;
import dto.SurveyResponse;
import dto.SurveyInfoResponse;
import dto.SurveyUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import repos.Surveyrepo;
import services.Userservice;
import Entity.Survey;
import Entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Surveyservice {

    private final Surveyrepo surveyRepo;
    private final Userservice userService;
    private  QuestionService questionService;

    public Surveyservice(Surveyrepo surveyRepo, Userservice userService) {
        this.surveyRepo = surveyRepo;
        this.userService = userService;
    }

    @Autowired
    public void setQuestionService(QuestionService questionService) {
        this.questionService = questionService;
    }

    // Fetch all surveys
    public List<SurveyInfoResponse> getAllSurveys(Optional<Long> userID) {
        List<Survey> surveys;
        if (userID.isPresent()) {
            surveys = surveyRepo.findByCreatedBy_Id(userID.get());
        } else {
            surveys = surveyRepo.findAll();
        }

        return surveys.stream().map(survey -> {
            User user = userService.getUserById(survey.getCreatedBy().getId()).orElse(null);
            return new SurveyInfoResponse( survey.getId(), survey.getTitle(), survey.getDescription(), survey.getCreatedAt(), user.getUsername());
        }).collect(java.util.stream.Collectors.toList());

    }

    // Fetch a survey by its ID
    public Optional<Survey> getSurveyById(Long id) {
        return surveyRepo.findById(id);
    }

    // Create a new survey
    public Survey createSurvey(Survey survey) {
        return surveyRepo.save(survey);
    }

    // Delete a survey by its ID
    public void deleteSurveyById(Long id) {
        surveyRepo.deleteById(id);
    }

    // Fetch a user by their ID
    public User getUserById(Long userId) {
        return userService.getUserById(userId).orElse(null);
    }

    // Fetch a user by their username
    public User getUserByUsername(String username) {
        return userService.findByUserName(username).orElse(null);
    }

    public Optional<SurveyResponse> getSurveyByIdDetailed(Long id)
    {
        Optional<Survey> survey = surveyRepo.findById(id);
        if (survey.isPresent()) {
            SurveyResponse surveyResponse = new SurveyResponse( survey.get(),  questionService.getAllQuestions(Optional.of(id)) );
            String username = survey.get().getCreatedBy().getUsername();
            surveyResponse.setUserName(username);
            return Optional.of(surveyResponse);
        } else {
            return Optional.empty();
        }
    }


    public Optional<SurveyInfoResponse> updateSurvey(Long id, SurveyUpdateRequest survey)
    {
        Optional<Survey> surveyOptional = surveyRepo.findById(id);
        if (surveyOptional.isPresent()) {
            Survey surveyToUpdate = surveyOptional.get();
            surveyToUpdate.setTitle(survey.title());
            surveyToUpdate.setDescription(survey.description());
            surveyRepo.save(surveyToUpdate);
            return Optional.of(new SurveyInfoResponse(surveyToUpdate.getId(), surveyToUpdate.getTitle(), surveyToUpdate.getDescription(), surveyToUpdate.getCreatedAt(), surveyToUpdate.getCreatedBy().getUsername()));
        } else {
            return Optional.empty();
        }
    }
}

