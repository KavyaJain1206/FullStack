package com.aml3A.Websocketdev;

public class Message {
    private String sender;
    private String content;
    private String type;      // "text" or "voice"
    private String audioData; // base64-encoded audio (for voice messages)

    public Message() {}

    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.type = "text";
    }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getAudioData() { return audioData; }
    public void setAudioData(String audioData) { this.audioData = audioData; }
}