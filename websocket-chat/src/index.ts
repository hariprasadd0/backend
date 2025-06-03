import { WebSocketServer, WebSocket } from 'ws';

interface Client {
  ws: WebSocket;
  username: string;
  id: string;
}

interface Message {
  type: 'join' | 'leave' | 'message' | 'userCount';
  username?: string;
  message?: string;
  count?: number;
  timestamp?: string;
}

class ChatServer {
  private wss: WebSocketServer;
  private clients: Map<string, Client> = new Map();
  private port = 8080;

  constructor() {
    this.wss = new WebSocketServer({ port: this.port });
    this.setupServer();
  }

  private setupServer(): void {
    console.log(`WebSocket server running on ws://localhost:${this.port}`);
    
    this.wss.on('connection', (ws: WebSocket) => {
      const clientId = this.generateId();
      
      ws.on('message', (data: Buffer) => {
        try {
          const message: Message = JSON.parse(data.toString());
          this.handleMessage(ws, clientId, message);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      ws.on('close', () => {
        this.handleDisconnect(clientId);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
  }

  private handleMessage(ws: WebSocket, clientId: string, message: Message): void {
    switch (message.type) {
      case 'join':
        this.handleJoin(ws, clientId, message.username!);
        break;
      case 'message':
        this.handleChatMessage(clientId, message.message!);
        break;
    }
  }

  private handleJoin(ws: WebSocket, clientId: string, username: string): void {
    const client: Client = {
      ws,
      username,
      id: clientId
    };
    
    this.clients.set(clientId, client);
    
    // Notify all clients about new user
    this.broadcast({
      type: 'join',
      username,
      timestamp: new Date().toISOString()
    });
    
    // Send updated user count
    this.broadcastUserCount();
    
    console.log(`${username} joined the chat`);
  }

  private handleChatMessage(clientId: string, message: string): void {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    this.broadcast({
      type: 'message',
      username: client.username,
      message,
      timestamp: new Date().toISOString()
    });
  }

  private handleDisconnect(clientId: string): void {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    this.clients.delete(clientId);
    
    // Notify all clients about user leaving
    this.broadcast({
      type: 'leave',
      username: client.username,
      timestamp: new Date().toISOString()
    });
    
    // Send updated user count
    this.broadcastUserCount();
    
    console.log(`${client.username} left the chat`);
  }

  private broadcast(message: Message): void {
    const messageStr = JSON.stringify(message);
    
    this.clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(messageStr);
      }
    });
  }

  private broadcastUserCount(): void {
    this.broadcast({
      type: 'userCount',
      count: this.clients.size
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

// Start the server
new ChatServer();