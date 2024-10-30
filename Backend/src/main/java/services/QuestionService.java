package services;

import dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import repos.Questionrepo;
import  Entity.Question;
import Entity.QuestionType;
import  Entity.Survey;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final Questionrepo questionRepository;
    private final Surveyservice surveyService;
    private  final AnswerService answerService;

    @Autowired
    public QuestionService(Questionrepo questionRepository, @Lazy Surveyservice surveyService, @Lazy AnswerService answerService) {
        this.questionRepository = questionRepository;
        this.surveyService = surveyService;
        this.answerService = answerService;
    }

    public List<QuestionResponse> getAllQuestions(Optional<Long> surveyId) {
        List<Question> questions;
        if (surveyId.isPresent()) {
            questions = questionRepository.findBySurveyId(surveyId.get());
        } else {
            questions = questionRepository.findAll();
        }



        return questions.stream().map(question -> {
            List<AnswerResultResponse> answers = answerService.getAllAnswersByQuestionId(Optional.of(question.getId()));
            return new QuestionResponse(question, answers);
        }).collect(Collectors.toList());
    }



    public QuestionResponse getOneQuestionById(Long questionID) {
        return questionRepository.findById(questionID)
                .map(QuestionResponse::new)
                .orElse(null);
    }

    public  Optional<Question> getById(Long questionID) {
        return questionRepository.findById(questionID);
    }

    public QuestionResponse createOneQuestion(QuestionCreateRequest request) {
        Survey survey = surveyService.getSurveyById(request.getSurveyId()).orElse(null);
        if (survey != null) {
            Question question = new Question();
            question.setSurvey(survey);
            question.setQuestion(request.getQuestion());
            question.setQuestionType(QuestionType.valueOf(request.getQuestionType()));
            Question savedQuestion = questionRepository.save(question);
            return new QuestionResponse(savedQuestion);
        } else {
            return null;
        }
    }

    public void deleteOneQuestionById(Long questionID) {
        questionRepository.deleteById(questionID);
    }

    public QuestionResponse updateOneQuestionById(Long questionID, QuestionUpdateRequest request)
    {
    Optional<Question> question = questionRepository.findById(questionID);
    if (question.isPresent()) {
        Question updatedQuestion = question.get();
        updatedQuestion.setQuestion(request.getQuestion());
        updatedQuestion.setQuestionType(QuestionType.valueOf(request.getQuestionType()));
        Question savedQuestion = questionRepository.save(updatedQuestion);
        return new QuestionResponse(savedQuestion);
    } else {
        return null;
    }
    }
}
