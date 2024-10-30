package services;

import  Entity.Answer;
import Entity.Question;
import dto.*;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import repos.Answerrepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnswerService {

    private final Answerrepo answerRepository;
    private final QuestionService questionService;
    private final UserAnswerService userAnswerService;

    public AnswerService(Answerrepo answerRepo, @Lazy  QuestionService questionService, UserAnswerService userAnswerService, UserAnswerTextService userAnswerTextService) {
        this.answerRepository = answerRepo;
        this.questionService = questionService;
        this.userAnswerService = userAnswerService;
    }

    public List<AnswerResponse> getAllAnswers(Optional<Long> questionId) {
        List<Answer> answers;
        if (questionId.isPresent()) {
            answers = answerRepository.findByQuestionId(questionId.get());

        } else {
            answers = answerRepository.findAll();
        }


        return answers.stream().map(answer -> new AnswerResponse(answer )).collect(Collectors.toList());
    }


    public List<AnswerResultResponse> getAllAnswersByQuestionId(Optional<Long> questionId)
    {
        List<Answer> answers;
        List<Integer> selectedCount = new ArrayList<>();
        if (questionId.isPresent()) {
            answers = answerRepository.findByQuestionId(questionId.get());

        } else {
            answers = answerRepository.findAll();
        }

        answers.forEach( answer -> {
            selectedCount.add( userAnswerService.getUserAnswerByAnswerId(answer.getId()).size()) ;
        });

        return answers.stream().map(answer -> new AnswerResultResponse(answer.getId(),answer.getAnswer(), answer.getQuestion().getId(), selectedCount.removeFirst() )).collect(Collectors.toList());
    }



    public AnswerResponse getOneAnswerById(Long answerId) {
        return answerRepository.findById(answerId)
                .map(AnswerResponse::new)
                .orElse(null);
    }

    public  Optional<Answer> getById(Long questionID) {
        return answerRepository.findById(questionID);
    }

    public AnswerResponse createOneAnswer(AnswerCreateRequest request) {
        Optional<Question> questionOpt = questionService.getById(request.getQuestionId());
        if (questionOpt.isPresent()) {
            Question question = questionOpt.get();
            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setAnswer(request.getAnswer());
            Answer savedAnswer = answerRepository.save(answer);
            return new AnswerResponse(savedAnswer);
        } else {
            return null;
        }
    }

    public AnswerResponse updateOneAnswer(Long answerId, AnswerUpdateRequest newAnswer) {
        Optional<Answer> answerOpt = answerRepository.findById(answerId);
        if (answerOpt.isPresent()) {
            Answer answer = answerOpt.get();
            answer.setAnswer(newAnswer.answer());
            Answer savedAnswer = answerRepository.save(answer);
            return new AnswerResponse(savedAnswer);
        } else {
            return null;
        }
    }

    @Transactional
    public void deleteAnswersByQuestionId(Long questionId) {
        answerRepository.deleteByQuestionId(questionId);
    }


    public void deleteOneAnswerById(Long answerId) {
        answerRepository.deleteById(answerId);
    }
}