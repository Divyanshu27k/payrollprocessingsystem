package com.hrms.authservice.service;

import com.hrms.authservice.dto.AuthRequest;
import com.hrms.authservice.dto.AuthResponse;
import com.hrms.authservice.entity.Role;
import com.hrms.authservice.entity.User;
import com.hrms.authservice.repository.UserRepository;
import com.hrms.authservice.security.CustomUserDetails;
import com.hrms.authservice.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(AuthRequest request) {
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_EMPLOYEE) // Default role
                .isActive(true)
                .build();
        
        userRepository.save(user);
        
        var jwtToken = jwtUtils.generateToken(new CustomUserDetails(user));
        return AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtUtils.generateToken(new CustomUserDetails(user));
        return AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .build();
    }
}
