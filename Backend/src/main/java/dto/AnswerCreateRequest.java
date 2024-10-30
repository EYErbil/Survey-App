package dto;

import lombok.Data;
import Entity.Answer;

@Data
public class AnswerCreateRequest
{
    private String answer;
    private Long questionId;
}
