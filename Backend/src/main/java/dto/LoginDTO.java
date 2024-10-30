// src/main/java/dto/LoginDTO.java
package dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String username;
    private String password;
    private String email;


    public String getUserName() {
        return username;
    }
}

