package services;

import Entity.UserAnswer;
import Entity.User;
import Entity.Answer;
import dto.AnswerResponse;
import org.springframework.context.annotation.Lazy;
import repos.UserAnswerrepo;
import dto.UserAnswerCreateRequest;
import dto.UserAnswerResponse;
import services.Userservice;
import services.AnswerService;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserAnswerService {


    private final UserAnswerrepo userAnswerRepository;
    private final Userservice userService;
    private final AnswerService answerService;

    public UserAnswerService(UserAnswerrepo userAnswerRepository, Userservice userService, @Lazy  AnswerService answerService) {
        this.userAnswerRepository = userAnswerRepository;
        this.userService = userService;
        this.answerService = answerService;
    }

    public List<UserAnswerResponse> getAllUserAnswers(Optional<Long> userId) {
        List<UserAnswer> userAnswers;
        if (userId.isPresent()) {
            userAnswers = userAnswerRepository.findByUserId(userId.get());
        } else {
            userAnswers = userAnswerRepository.findAll();
        }
        return userAnswers.stream().map(UserAnswerResponse::new).collect(Collectors.toList());
    }


    public UserAnswerResponse getUserAnswerById(Long id) {
        return userAnswerRepository.findById(id).map(UserAnswerResponse::new)
                .orElse(null);
    }

    public List<UserAnswer> getUserAnswerByAnswerId(Long answerId) {
        return userAnswerRepository.findByAnswerId(answerId);
    }

    public UserAnswerResponse createUserAnswer(UserAnswerCreateRequest request) {
        User user = userService.getUserById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + request.getUserId()));

        Answer answer = answerService.getById(request.getAnswerId())
                .orElseThrow(() -> new RuntimeException("Answer not found with id " + request.getAnswerId()));

        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setUser(user);
        userAnswer.setAnswer(answer);
        userAnswer.setSelected(request.getSelected());
        userAnswerRepository.save(userAnswer);
        return new UserAnswerResponse(userAnswer);
    }


    public UserAnswerResponse updateUserAnswer(Long id, UserAnswerCreateRequest request)
    {
        User user = userService.getUserById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + request.getUserId()));
        Answer answer = answerService.getById(request.getAnswerId())
                .orElseThrow(() -> new RuntimeException("Answer not found with id " + request.getAnswerId()));

        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setUser(user);
        userAnswer.setAnswer(answer);
        userAnswer.setSelected(request.getSelected());
        UserAnswer savedUserAnswer = userAnswerRepository.save(userAnswer);
        return new UserAnswerResponse(savedUserAnswer);
    }

    public void deleteUserAnswer(Long id) {
        userAnswerRepository.deleteById(id);
    }
}
