package in.sailesh.todoapp.repository;

import in.sailesh.todoapp.model.TodoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<TodoModel, Long> {
    List<TodoModel> findByTitleContainingIgnoreCase(String search);
}
