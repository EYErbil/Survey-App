package services;

import dto.UserAnswerTextCreateRequest;
import dto.UserAnswerTextResponse;
import Entity.Question;
import Entity.User;
import Entity.UserAnswerText;
import repos.UserAnswerTextrepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserAnswerTextService {

    private final UserAnswerTextrepo userAnswerTextRepository;
    private final Userservice userService;
    private final QuestionService questionService;

    @Autowired
    public UserAnswerTextService(UserAnswerTextrepo userAnswerTextRepository, @Lazy Userservice userService, @Lazy QuestionService questionService) {
        this.userAnswerTextRepository = userAnswerTextRepository;
        this.userService = userService;
        this.questionService = questionService;
    }

    public List<UserAnswerTextResponse> getAllUserAnswerTexts(Optional<Long> questionId) {
        List<UserAnswerText> userAnswerTexts;
        if (questionId.isPresent()) {
            userAnswerTexts = userAnswerTextRepository.findByQuestionId(questionId.get());
        } else {
            userAnswerTexts = userAnswerTextRepository.findAll();
        }
        return userAnswerTexts.stream().map(UserAnswerTextResponse::new).collect(Collectors.toList());
    }

    public UserAnswerTextResponse getUserAnswerTextById(Long id) {
        return userAnswerTextRepository.findById(id)
                .map(UserAnswerTextResponse::new)
                .orElse(null);
    }

    public UserAnswerTextResponse createUserAnswerText(UserAnswerTextCreateRequest request) {
        User user = userService.getUserById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + request.getUserId()));

        Question question = questionService.getById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found with id " + request.getQuestionId()));

        UserAnswerText userAnswerText = new UserAnswerText();
        userAnswerText.setUser(user);
        userAnswerText.setQuestion(question);
        userAnswerText.setAnswer(request.getAnswer());
        userAnswerTextRepository.save(userAnswerText);
        return new UserAnswerTextResponse(userAnswerText);
    }

    public UserAnswerTextResponse updateUserAnswerText(Long id, UserAnswerTextCreateRequest request) {
        User user = userService.getUserById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + request.getUserId()));
        Question question = questionService.getById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found with id " + request.getQuestionId()));

        return userAnswerTextRepository.findById(id)
                .map(userAnswerText -> {
                    userAnswerText.setUser(user);
                    userAnswerText.setQuestion(question);
                    userAnswerText.setAnswer(request.getAnswer());
                    UserAnswerText savedUserAnswerText = userAnswerTextRepository.save(userAnswerText);
                    return new UserAnswerTextResponse(savedUserAnswerText);
                })
                .orElseThrow(() -> new RuntimeException("UserAnswerText not found with id " + id));
    }

    public void deleteUserAnswerText(Long id) {
        userAnswerTextRepository.deleteById(id);
    }

}