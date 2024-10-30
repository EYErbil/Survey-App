package repos;

import Entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface UserAnswerrepo extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByUserId(Long userId);
    List<UserAnswer> findByAnswerId(Long surveyId);
}

