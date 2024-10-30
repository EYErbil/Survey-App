package dto;

import java.time.LocalDateTime;

public record SurveyInfoResponse(Long id, String title, String description, LocalDateTime createdAt, String createdBy)
{
    public SurveyInfoResponse
    {
        if (title == null || title.isBlank())
        {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
        if (description == null || description.isBlank())
        {
            throw new IllegalArgumentException("Description cannot be null or empty");
        }
        if (createdBy == null || createdBy.isBlank())
        {
            throw new IllegalArgumentException("CreatedBy cannot be null or empty");
        }
    }

}
