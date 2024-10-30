// src/main/java/services/Userservice.java
package services;

import Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repos.UserRepository;
import java.util.List;
import java.util.Optional;

@Service
public class Userservice {
    @Autowired
    private UserRepository userrepository;

    public List<User> getAllUsers() {
        return userrepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userrepository.findById(id);
    }

    public Optional<User> findByUserName(String username){return userrepository.findByUserName(username);}

    public User createUser(User user) {
        return userrepository.save(user);
    }

    public void deleteUser(Long id) {
        User user1 = userrepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
        userrepository.delete(user1);
    }

    public User verifyCredentials(String username, String password) {
        Optional<User> user = userrepository.findByUserName(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        } else {
            return null;
        }
    }
}
