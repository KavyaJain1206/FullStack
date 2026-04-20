package com.aml3A.Websocketdev.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.aml3A.Websocketdev.Message;

@Controller
public class ChatController {

    @MessageMapping("/chat")        // Client sends to /app/chat
    @SendTo("/topic/messages")      // Broadcast to all subscribers of /topic/messages
    public Message sendMessage(Message message) {
        System.out.println("[WS] " + message.getSender() + " : " + message.getContent());
        return message;
    }
}
