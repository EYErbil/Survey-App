package controllers;

import dto.LoginDTO;
import dto.LoginResponse;
import Entity.User;
import services.Userservice;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    private final Userservice userservice;



    public UserController(Userservice userservice) {
        this.userservice = userservice;
    }

    // Fetch all users
    @GetMapping(produces = "application/json")
    public List<User> getAllUsers() {
        return userservice.getAllUsers();
    }

    // Fetch a user by their ID
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        Optional<User> user = userservice.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new user
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User newUser = userservice.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (DataIntegrityViolationException e) {
            // Handle the case when the username or email already exists
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Username or email already exists.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: An unexpected error occurred.");
        }
    }

    // Delete a user by their ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userservice.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Login a user
    //TODO: change isAdmin to role
    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        System.out.println("Login attempt with username: " + loginDTO.getUserName());
        User user = userservice.verifyCredentials(loginDTO.getUserName(), loginDTO.getPassword());
        if (user != null) {
            System.out.println("Login successful for username: " + loginDTO.getUserName());
            return ResponseEntity.ok(new LoginResponse(user.getUsername(), true, user.getId()));
        } else {
            System.out.println("Invalid username or password for username: " + loginDTO.getUserName());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
