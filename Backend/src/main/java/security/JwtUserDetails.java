package security;

import Entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class JwtUserDetails implements UserDetails{


        private Long id;
        private String username;
        private String password;
        private Collection<? extends GrantedAuthority> authorities;
        private String email;

        private JwtUserDetails(Long id, String username, String password, String email , Collection<? extends GrantedAuthority> authorities) {
            this.password = password;
            this.id = id;
            this.username = username;
            this.email = email;
            this.authorities = authorities;
        }

        public static JwtUserDetails create(User user)
        {
            List<GrantedAuthority> authoritiesList = new ArrayList<>();
            authoritiesList.add(new SimpleGrantedAuthority(user.getRole().name()));
            return new JwtUserDetails(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), authoritiesList);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorities;
        }

        @Override
        public String getPassword() {
            return password;
        }

        @Override
        public String getUsername() {
            return username;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
}
