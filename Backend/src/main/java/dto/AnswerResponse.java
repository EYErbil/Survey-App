package dto;

import lombok.Data;
import Entity.Answer;

@Data
public class AnswerResponse
{
    private Long id;
    private String answer;
    private Long questionId;

    public AnswerResponse(Answer answer)
    {
        id = answer.getId();
        this.answer = answer.getAnswer();
        questionId = answer.getQuestion().getId();
    }
}
