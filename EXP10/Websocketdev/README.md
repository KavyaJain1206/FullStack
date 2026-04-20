# NexusChat — WebSocket Application Documentation

A full-stack, real-time two-way chat application built with **Spring Boot (WebSocket + STOMP)** on the backend and **React + Vite** on the frontend.

## Demo

### Demo Image 1

![NexusChat Demo 1](./image.png)

### Demo Image 2

![NexusChat Demo 2](./image2.png)

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Architecture Overview](#architecture-overview)
3. [Backend — Spring Boot](#backend--spring-boot)
   - [Dependencies](#dependencies)
   - [Message Model](#message-model)
   - [WebSocket Configuration](#websocket-configuration)
   - [Chat Controller](#chat-controller)
   - [How to Run the Backend](#how-to-run-the-backend)
4. [Frontend — React + Vite](#frontend--react--vite)
   - [Dependencies](#frontend-dependencies)
   - [App.jsx — WebSocket Integration](#appjsx--websocket-integration)
   - [UI Design](#ui-design)
   - [How to Run the Frontend](#how-to-run-the-frontend)
5. [How They Connect](#how-they-connect)
6. [Running Both Together](#running-both-together)
7. [Troubleshooting](#troubleshooting)

---

## Project Structure

```
Websocketdev/
│
├── Websocketdev/                          ← Spring Boot Backend
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/aml3A/Websocketdev/
│       │   ├── WebsocketdevApplication.java   ← Spring Boot entry point
│       │   ├── Message.java                   ← Data model (sender + content)
│       │   ├── config/
│       │   │   └── WebSocketConfig.java        ← STOMP/WebSocket setup
│       │   └── controller/
│       │       └── ChatController.java          ← Message handler
│       └── resources/
│           └── application.properties
│
├── frontend/                              ← React + Vite Frontend
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── main.jsx                       ← React entry point
│       ├── App.jsx                        ← Main chat component
│       └── App.css                        ← Premium glassmorphism styles
│
└── README.md                              ← This file
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER (React)                         │
│                                                                 │
│  User A ──► SockJS/STOMP Client ──► /app/chat  (sends)         │
│  User A ◄── SockJS/STOMP Client ◄── /topic/messages (receives) │
└─────────────────────────────┬───────────────────────────────────┘
                              │  HTTP Upgrade → WebSocket
                              │  (SockJS fallback supported)
┌─────────────────────────────▼───────────────────────────────────┐
│                   Spring Boot Backend (:8080)                    │
│                                                                 │
│   /ws  ──► STOMP Message Broker                                 │
│                  │                                              │
│                  ├── /app/chat ──► ChatController.sendMessage() │
│                  │                      │                       │
│                  └── /topic/messages ◄──┘  (broadcasts to all) │
└─────────────────────────────────────────────────────────────────┘
```

### Message Flow (Step by Step)

1. The React client connects to `http://localhost:8080/ws` via **SockJS**.
2. SockJS negotiates a **WebSocket** connection (or falls back to long-polling if needed).
3. The STOMP protocol is layered on top of the WebSocket.
4. On connect, the client **subscribes** to `/topic/messages` to receive all broadcast messages.
5. When a user types and sends a message, the client **publishes** a JSON payload to `/app/chat`.
6. Spring's `@MessageMapping("/chat")` method receives it and uses `@SendTo("/topic/messages")` to broadcast the same message to **every connected subscriber**.
7. All clients (including the sender) receive the message and render it in real time.

---

## Backend — Spring Boot

### Dependencies

Defined in `pom.xml`:

| Dependency                      | Purpose                          |
| ------------------------------- | -------------------------------- |
| `spring-boot-starter-web`       | HTTP server, REST support        |
| `spring-boot-starter-websocket` | WebSocket + STOMP message broker |
| `spring-boot-devtools`          | Hot reload during development    |
| `spring-boot-starter-test`      | Unit testing support             |

> **Spring Boot Version**: `3.2.5` (Java 21)

---

### Message Model

**File**: `src/main/java/com/aml3A/Websocketdev/Message.java`

```java
public class Message {
    private String sender;   // Username of the sender
    private String content;  // Text content of the message

    // No-arg constructor required for JSON deserialization
    // Getters and setters...
}
```

The `Message` POJO is serialized/deserialized automatically by Spring's Jackson integration. When a client sends `{"sender":"Alice","content":"Hello!"}`, Spring converts it into a `Message` object.

---

### WebSocket Configuration

**File**: `src/main/java/com/aml3A/Websocketdev/config/WebSocketConfig.java`

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");       // ① Broker destination prefix
        config.setApplicationDestinationPrefixes("/app"); // ② Client-to-server prefix
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")                // ③ WebSocket handshake endpoint
                .setAllowedOriginPatterns("http://localhost:5173", "http://localhost:*")
                .withSockJS();                     // ④ SockJS fallback
    }
}
```

| #   | What it does                                                                  |
| --- | ----------------------------------------------------------------------------- |
| ①   | `/topic/*` destinations are handled by the in-memory message broker (pub/sub) |
| ②   | Messages sent to `/app/*` are routed to `@MessageMapping` methods             |
| ③   | Clients connect via WebSocket handshake at `ws://localhost:8080/ws`           |
| ④   | Enables SockJS fallback for environments where raw WebSockets are blocked     |

**CORS**: `setAllowedOriginPatterns("http://localhost:5173")` ensures the React Vite dev server (port 5173) can connect.

---

### Chat Controller

**File**: `src/main/java/com/aml3A/Websocketdev/controller/ChatController.java`

```java
@Controller
public class ChatController {

    @MessageMapping("/chat")           // Listens at /app/chat
    @SendTo("/topic/messages")         // Broadcasts result to /topic/messages
    public Message sendMessage(Message message) {
        System.out.println("[WS] " + message.getSender() + " : " + message.getContent());
        return message;
    }
}
```

- `@MessageMapping("/chat")`: Intercepts messages sent to `/app/chat`.
- `@SendTo("/topic/messages")`: The return value is automatically serialized to JSON and broadcast to all subscribers of `/topic/messages`.
- No manual WebSocket session management is required — Spring handles it all.

---

### How to Run the Backend

**Prerequisites**: Java 21+, Maven installed

```bash
# Navigate to the backend directory
cd Websocketdev/Websocketdev

# Build and run
./mvnw spring-boot:run
# or on Windows:
mvnw.cmd spring-boot:run
```

The server will start on **`http://localhost:8080`**.

You should see in the console:

```
Tomcat started on port 8080 (http)
Started WebsocketdevApplication in X.XXX seconds
```

---

## Frontend — React + Vite

### Frontend Dependencies

| Package              | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `react`, `react-dom` | UI library                                        |
| `vite`               | Lightning-fast build tool and dev server          |
| `@stomp/stompjs`     | STOMP protocol client for WebSocket messaging     |
| `sockjs-client`      | SockJS client for WebSocket with fallback support |

---

### App.jsx — WebSocket Integration

The main component manages the full lifecycle:

#### 1. Connecting via STOMP over SockJS

```js
const client = new Client({
  webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
  reconnectDelay: 5000,
  onConnect: () => {
    // Subscribe to incoming messages
    client.subscribe("/topic/messages", (frame) => {
      const msg = JSON.parse(frame.body);
      setMessages((prev) => [...prev, msg]);
    });
  },
});
client.activate();
```

#### 2. Sending a Message

```js
clientRef.current.publish({
  destination: "/app/chat",
  body: JSON.stringify({ sender: username, content: input }),
});
```

#### 3. Auto-reconnect

The `reconnectDelay: 5000` option tells the STOMP client to automatically retry the connection every 5 seconds if it drops.

#### 4. Cleanup on Unmount

```js
useEffect(() => {
  return () => clientRef.current?.deactivate();
}, []);
```

---

### UI Design

The UI uses a **glassmorphism dark-mode** aesthetic:

| Feature             | Implementation                                           |
| ------------------- | -------------------------------------------------------- |
| Dark background     | `#0d0f1a` with purple/pink radial gradients              |
| Glassmorphism cards | `backdrop-filter: blur(24px)` + semi-transparent borders |
| Gradient accents    | `#7c6ff7` → `#a78bfa` (purple) and `#f06292` (pink)      |
| Own messages        | Purple gradient bubble aligned to the right              |
| Others' messages    | Semi-transparent bubble aligned to the left              |
| System messages     | Amber-tinted centered pill                               |
| Animations          | Fade + slide-up on new messages                          |
| Responsive          | Mobile-friendly, full-screen on small devices            |
| Live status         | Animated pulsing green dot when connected                |
| Typography          | Google Fonts — Inter                                     |

---

### How to Run the Frontend

**Prerequisites**: Node.js 18+ and npm

```bash
# Navigate to the frontend directory
cd Websocketdev/frontend

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

The app will be available at **`http://localhost:5173`**.

---

## How They Connect

| Frontend Action | Destination                       | Backend Handler                          |
| --------------- | --------------------------------- | ---------------------------------------- |
| Connect         | `ws://localhost:8080/ws` (SockJS) | `WebSocketConfig.registerStompEndpoints` |
| Subscribe       | `/topic/messages`                 | In-memory STOMP broker                   |
| Send message    | `/app/chat`                       | `ChatController.sendMessage()`           |
| Receive message | `/topic/messages` (broadcast)     | All subscribed clients                   |

---

## Running Both Together

Open **two terminal windows**:

**Terminal 1 — Backend**

```bash
cd Websocketdev/Websocketdev
mvnw.cmd spring-boot:run
```

**Terminal 2 — Frontend**

```bash
cd Websocketdev/frontend
npm run dev
```

Then open **`http://localhost:5173`** in your browser (or two tabs to simulate two users chatting).

---

## Troubleshooting

| Problem                                | Solution                                                                                             |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Connection refused` on frontend       | Make sure the Spring Boot backend is running on port 8080                                            |
| CORS error in browser console          | Verify `setAllowedOriginPatterns` in `WebSocketConfig.java` includes `http://localhost:5173`         |
| Messages not appearing                 | Check browser DevTools Network tab for WebSocket frames; ensure subscription is to `/topic/messages` |
| `SockJS is not a constructor`          | Make sure `sockjs-client` is installed: `npm install sockjs-client`                                  |
| Backend fails to compile               | Ensure Java 21 is installed and `JAVA_HOME` is set correctly                                         |
| `spring-boot-starter-parent` not found | Ensure you are using Spring Boot `3.2.5` (not `4.0.5` which does not exist)                          |
