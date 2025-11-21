package in.sailesh.todoapp.controller;
import in.sailesh.todoapp.model.TodoModel;
import in.sailesh.todoapp.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")  // Allow React frontend
public class TodoController {

    private final TodoRepository todorepo;

    // 👇 LIST + SEARCH
    @GetMapping
    public List<TodoModel> getAll(@RequestParam(required = false) String search) {
        if (search == null || search.isBlank()) {
            return todorepo.findAll();
        }
        return todorepo.findByTitleContainingIgnoreCase(search);
    }

    // 👇 CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoModel create(@RequestBody TodoModel todo) {
        todo.setId(null);         // Let DB generate ID
        todo.setCompleted(false); // Default value
        return todorepo.save(todo);
    }

    // 👇 TOGGLE COMPLETE STATUS
    @PutMapping("/{id}/toggle")
    public TodoModel toggleCompleted(@PathVariable Long id) {
        TodoModel existing = todorepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
        existing.setCompleted(!existing.isCompleted());
        return todorepo.save(existing);
    }

    // 👇 DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        TodoModel existing = todorepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
        todorepo.delete(existing);
    }
}
