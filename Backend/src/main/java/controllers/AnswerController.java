package controllers;
import dto.AnswerCreateRequest;
import dto.AnswerResponse;
import dto.AnswerUpdateRequest;
import org.springframework.http.ResponseEntity;
import  services.AnswerService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/answers")
@CrossOrigin(origins = "http://localhost:3000")
public class AnswerController {

    private final AnswerService answerService;


    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping
    public List<AnswerResponse> getAllAnswers(@RequestParam Optional<Long> questionId) {
        return answerService.getAllAnswers(questionId);
    }

    @GetMapping("/{id}")
    public AnswerResponse getAnswerById(@PathVariable Long id) {
        return answerService.getOneAnswerById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnswerResponse> updateAnswer(@PathVariable Long id, @RequestBody AnswerUpdateRequest answer) {
        return ResponseEntity.ofNullable(answerService.updateOneAnswer(id, answer));
    }


    @PostMapping
    public AnswerResponse createAnswer(@RequestBody AnswerCreateRequest answer) {
        return answerService.createOneAnswer(answer);
    }

    @DeleteMapping("/{id}")
    public void deleteOneAnswerById(@PathVariable Long id) {
        answerService.deleteOneAnswerById(id);
    }
}