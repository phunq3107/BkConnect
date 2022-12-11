package com.bk.bkconnect.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class PolicyCheck {
    public static boolean tutorEnrollPost(UUID postId) {
        return true;
    }
}
