package controllers;

import services.UserAnswerService;
import dto.UserAnswerCreateRequest;
import dto.UserAnswerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user-answers")
public class UserAnswerController {

    private final UserAnswerService userAnswerService;

    public UserAnswerController(UserAnswerService userAnswerService) {
        this.userAnswerService = userAnswerService;
    }

    @GetMapping
    public List<UserAnswerResponse> getAllUserAnswers(@RequestParam Optional<Long> userId) {
        return userAnswerService.getAllUserAnswers(userId);
    }

    @GetMapping("/{id}")
    public UserAnswerResponse getUserAnswerById(@PathVariable Long id) {
        return userAnswerService.getUserAnswerById(id);
    }

    @PostMapping
    public UserAnswerResponse createUserAnswer(@RequestBody UserAnswerCreateRequest request) {
        return userAnswerService.createUserAnswer(request);
    }

    @PutMapping("/{id}")
    public UserAnswerResponse updateUserAnswer(@PathVariable Long id, @RequestBody UserAnswerCreateRequest request) {
        return userAnswerService.updateUserAnswer(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteUserAnswer(@PathVariable Long id) {
         userAnswerService.deleteUserAnswer(id);
    }
}

