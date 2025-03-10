package repos;

import Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Questionrepo extends JpaRepository<Question, Long>
{
    List<Question> findBySurveyId(Long surveyId);
}
