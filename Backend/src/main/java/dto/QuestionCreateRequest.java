package dto;

import lombok.Data;
import  Entity.QuestionType;

@Data
public class QuestionCreateRequest {
    private Long surveyId;
    private String question;
    private  String questionType;
}
