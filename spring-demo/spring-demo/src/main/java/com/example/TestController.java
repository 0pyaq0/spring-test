package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping(value = "/test")
    public UserDTO test(){
        UserDTO user = new UserDTO();
        user.setAge(20);
        user.setName("hoon");
        return user;
    }
}
