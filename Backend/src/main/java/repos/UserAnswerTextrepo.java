package repos;

import Entity.UserAnswerText;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAnswerTextrepo extends JpaRepository<UserAnswerText, Long> {
    List<UserAnswerText> findByUserId(Long userId);
    List<UserAnswerText> findByQuestionId(Long questionId);
}