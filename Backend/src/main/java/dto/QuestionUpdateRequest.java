package dto;
import Entity.Question;
import Entity.QuestionType;
import lombok.AllArgsConstructor;
import  lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuestionUpdateRequest {
    private String question;
    private String questionType;

    public  QuestionUpdateRequest(Question question){
        this.question = question.getQuestion();
        this.questionType = question.getQuestionType().name();
    }
}