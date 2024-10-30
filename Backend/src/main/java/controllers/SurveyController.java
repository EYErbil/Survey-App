package controllers;

import dto.SurveyInfoResponse;
import dto.SurveyUpdateRequest;
import org.springframework.http.ResponseEntity;
import services.Surveyservice;
import Entity.Survey;
import Entity.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import dto.SurveyResponse;

@RestController
@RequestMapping("/surveys")
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyController {

    private final Surveyservice surveyService;

    public SurveyController(Surveyservice surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping
    public List<SurveyInfoResponse> getAllSurvey(@RequestParam Optional<Long> userId)
    {
        return surveyService.getAllSurveys(userId);
    }

    @GetMapping("/{id}")
    public Optional<Survey> getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id);
    }

    @GetMapping("/{id}/detail")
    public  Optional<SurveyResponse> getSurveyByIdDetailed( @PathVariable Long id)
    {
        return surveyService.getSurveyByIdDetailed(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SurveyInfoResponse> updateSurvey(@PathVariable Long id, @RequestBody SurveyUpdateRequest survey) {
        return ResponseEntity.of(surveyService.updateSurvey(id, survey));
    }


    @PostMapping
    public Survey createSurvey(@RequestBody Survey survey, @RequestParam String username) {
        System.out.println("Creating survey with username: " + username);
        // Get the user by username
        User user = surveyService.getUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        survey.setCreatedBy(user);
        survey.setCreatedAt(LocalDateTime.now());
        return surveyService.createSurvey(survey);
    }

    @DeleteMapping("/{id}")
    public void deleteSurveyById(@PathVariable Long id) {
        surveyService.deleteSurveyById(id);
    }
}

