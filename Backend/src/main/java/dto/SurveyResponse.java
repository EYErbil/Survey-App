package dto;

import Entity.Survey;
import lombok.Data;
import java.util.List;

@Data
public class SurveyResponse
{
    private String userName;
    private String title;
    private String description;
    List<QuestionResponse> questions;

    public SurveyResponse(Survey survey, List<QuestionResponse> questions)
    {
        userName = "";
        title = survey.getTitle();
        description = survey.getDescription();
        this.questions = questions;
    }
}

