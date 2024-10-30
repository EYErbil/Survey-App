package dto;

import Entity.Question;
import Entity.QuestionType;
import lombok.Data;
import dto.AnswerResponse;
import java.util.List;


@Data
public class QuestionResponse {
    private Long questionID;
    private String question;
    private Long surveyId;
    private QuestionType questionType;
    private int answerCount;
    private List<AnswerResultResponse> answers;

    public QuestionResponse(Question entity) {
        this.questionID = entity.getId();
        this.question = entity.getQuestion();
        this.surveyId = entity.getSurvey().getId();
        this.questionType = entity.getQuestionType();
        this.answers = null;
    }

    public QuestionResponse(Question entity, List<AnswerResultResponse> answers) {
        this.questionID = entity.getId();
        this.question = entity.getQuestion();
        this.surveyId = entity.getSurvey().getId();
        this.questionType = entity.getQuestionType();
        this.answers = answers;
        answers.forEach(answer -> {
            this.answerCount += answer.selectedCount();
        });


    }
}