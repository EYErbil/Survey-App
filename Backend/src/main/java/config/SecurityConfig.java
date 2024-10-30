package config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

import static Entity.Role.USER;
import static Entity.Role.ADMIN;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/auth/**")
                .permitAll()
                // Survey endpoints
                .requestMatchers(HttpMethod.GET, "/surveys/**")
                .permitAll()
                .requestMatchers("/surveys/**")
                .hasRole(ADMIN.name())
                // Answer endpoints
                .requestMatchers(HttpMethod.GET, "/answers/**")
                .hasAnyRole(USER.name(), ADMIN.name())
                .requestMatchers("/answers/**")
                .hasRole(ADMIN.name())
                // Question endpoints
                .requestMatchers(HttpMethod.GET, "/questions/**")
                .hasAnyRole(USER.name(), ADMIN.name())
                .requestMatchers("/questions/**")
                .hasRole(ADMIN.name())
                // User Answer endpoints (user role only POST)
                .requestMatchers(HttpMethod.POST, "/user-answers/**")
                .hasAnyRole(USER.name(), ADMIN.name() )
                .requestMatchers("/user-answers/**")
                .hasRole(ADMIN.name())
                // User Answer Text endpoints (user role only POST)
                .requestMatchers(HttpMethod.POST, "/user-answer-texts/**")
                .hasAnyRole(USER.name(), ADMIN.name() )
                .requestMatchers("/user-answer-texts/**")
                .hasRole(ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
