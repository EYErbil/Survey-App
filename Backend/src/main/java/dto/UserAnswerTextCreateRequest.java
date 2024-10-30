package dto;

import lombok.Data;

@Data
public class UserAnswerTextCreateRequest {
    private Long userId;
    private Long questionId;
    private String answer;
}
