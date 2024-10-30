package dto;

import Entity.UserAnswerText;
import lombok.Data;

@Data
public class UserAnswerTextResponse {
    private Long id;
    private Long userId;
    private Long questionId;
    private String answer;

    public UserAnswerTextResponse(UserAnswerText userAnswerText) {
        this.id = userAnswerText.getId();
        this.userId = userAnswerText.getUser().getId();
        this.questionId = userAnswerText.getQuestion().getId();
        this.answer = userAnswerText.getAnswer();
    }
}
