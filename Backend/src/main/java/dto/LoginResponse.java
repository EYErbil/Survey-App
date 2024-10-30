package dto;

public record LoginResponse(String userName, boolean isAdmin, long userId) {
    // Optionally, you can add additional methods or constructors here
}