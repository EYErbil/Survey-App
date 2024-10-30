package repos;

import Entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Surveyrepo extends JpaRepository<Survey, Long> {
    List<Survey> findByCreatedBy_Id(Long aLong);
}

