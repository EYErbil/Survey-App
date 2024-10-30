package controllers;


import dto.UserAnswerTextCreateRequest;
import dto.UserAnswerTextResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.UserAnswerTextService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user-answer-texts")
public class UserAnswerTextController {

    private final UserAnswerTextService userAnswerTextService;

    @Autowired
    public UserAnswerTextController(UserAnswerTextService userAnswerTextService) {
        this.userAnswerTextService = userAnswerTextService;
    }

    @GetMapping
    public List<UserAnswerTextResponse> getAllUserAnswerTexts(@RequestParam Optional<Long> questionId) {
        return userAnswerTextService.getAllUserAnswerTexts(questionId);
    }

    @GetMapping("/{id}")
    public UserAnswerTextResponse getUserAnswerTextById(@PathVariable Long id) {
        return userAnswerTextService.getUserAnswerTextById(id);
    }

    @PostMapping
    public UserAnswerTextResponse createUserAnswerText(@RequestBody UserAnswerTextCreateRequest request) {
        return userAnswerTextService.createUserAnswerText(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAnswerTextResponse> updateUserAnswerText(@PathVariable Long id, @RequestBody UserAnswerTextCreateRequest request) {
        try {
            UserAnswerTextResponse response = userAnswerTextService.updateUserAnswerText(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public void  deleteUserAnswerText(@PathVariable Long id)
    {
         userAnswerTextService.deleteUserAnswerText(id);
    }
}