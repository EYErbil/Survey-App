package dto;

import Entity.UserAnswer;
import lombok.Data;

@Data
public class UserAnswerResponse
{
    private Long id;
    private Long userId;
    private Long answerId;
    private short selected;

    public UserAnswerResponse(UserAnswer userAnswer)
    {
        id = userAnswer.getId();
        userId = userAnswer.getUser().getId();
        answerId = userAnswer.getAnswer().getId();
        selected = userAnswer.getSelected();
    }
}
