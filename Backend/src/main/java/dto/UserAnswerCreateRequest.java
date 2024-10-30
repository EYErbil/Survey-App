package dto;

import Entity.UserAnswer;
import lombok.Data;

@Data
public class UserAnswerCreateRequest
{
    private Long userId;
    private Long answerId;
    private short selected;
}