package controllers;

import Entity.Question;
import dto.QuestionResponse;
import dto.QuestionCreateRequest;
import dto.QuestionUpdateRequest;
import org.springframework.http.ResponseEntity;
import services.QuestionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<QuestionResponse> getAllQuestions(@RequestParam Optional<Long> surveyId) {
        return questionService.getAllQuestions(surveyId);
    }

    @GetMapping("/{questionID}")
    public QuestionResponse getOneQuestion(@PathVariable Long questionID) {
        return questionService.getOneQuestionById(questionID);
    }

    @PutMapping("/{questionID}")
    public ResponseEntity <QuestionResponse> updateOneQuestion(@PathVariable Long questionID, @RequestBody QuestionUpdateRequest request) {
        return ResponseEntity.ofNullable(questionService.updateOneQuestionById(questionID, request)) ;
    }

    @PostMapping
    public QuestionResponse createOneQuestion(@RequestBody QuestionCreateRequest request) {
        return questionService.createOneQuestion(request);
    }

    @DeleteMapping("/{questionID}")
    public void deleteOneQuestion(@PathVariable Long questionID) {
        questionService.deleteOneQuestionById(questionID);
    }
}
