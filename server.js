  }
            const inputFileName = `input_${timestamp}.txt`;
            if (fs.existsSync(path.join(tempDir, inputFileName))) {
                fs.unlinkSync(path.join(tempDir, inputFileName));
            }
        } catch (e) {
            console.log('Cleanup error:', e);
        }

        if (error) {
            callback({ 
                error: error.message, 
                stderr: stderr,
                executionTime 
            });
        } else {
            callback({ 
                output: stdout, 
                stderr: stderr,
                executionTime 
            });
        }
    });
}

io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
        console.log(`👤 ${username} joined room ${roomId}`);
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.COMPILE_CODE, ({ roomId, code, language, username, inputs = [], executionMode = 'no-input', startTime }) => {
        console.log(`🚀 Compiling ${language} code in room ${roomId} with ${inputs.length} inputs`);
        const actualStartTime = startTime || Date.now();
        
        compileAndRunCode(code, language, inputs, (result) => {
            io.to(roomId).emit(ACTIONS.COMPILATION_RESULT, {
                result,
                username: userSocketMap[socket.id],
                executionTime: result.executionTime,
                inputs: inputs
            });
        });
    });

    socket.on(ACTIONS.SEND_MESSAGE, ({ roomId, message, username }) => {
        socket.in(roomId).emit(ACTIONS.RECEIVE_MESSAGE, {
            message,
            username,
            timestamp: new Date().toISOString()
        });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        console.log(`👋 ${userSocketMap[socket.id]} disconnected`);
        delete userSocketMap[socket.id];
    });

    socket.on('error', (error) => {
        console.error('🔥 Socket error:', error);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('🔥 Server Error:', err);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// Enhanced 404 page with modern design
app.get('*', (req, res) => {
    res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 — Page Not Found</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: linear-gradient(135deg, #1a1a2e, #16213e, #1a1a2e);
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .background-grid {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: 1;
          }
          
          .container {
            max-width: 800px;
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            position: relative;
            z-index: 2;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            overflow: hidden;
          }
          
          .glowing-border {
            position: absolute;
            inset: 0;
            border: 2px solid transparent;
            border-radius: 24px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4) border-box;
            -webkit-mask: 
              linear-gradient(#fff 0 0) padding-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            animation: borderGlow 4s linear infinite;
          }
          
          @keyframes borderGlow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .error-code {
            font-size: 120px;
            font-weight: 800;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
            line-height: 1;
            position: relative;
          }
          
          .error-code::after {
            content: '404';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            color: rgba(59, 130, 246, 0.1);
            z-index: -1;
            transform: translateY(4px);
          }
          
          h1 {
            font-size: 32px;
            margin-bottom: 16px;
            color: #fff;
          }
          
          p {
            color: #94a3b8;
            margin-bottom: 32px;
            font-size: 18px;
            line-height: 1.6;
          }
          
          .btn-home {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          
          .btn-home::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: 0.5s;
          }
          
          .btn-home:hover::before {
            left: 100%;
          }
          
          .btn-home:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
          }
          
          .illustration {
            max-width: 400px;
            margin: 0 auto 40px;
          }
          
          .illustration img {
            width: 100%;
            height: auto;
            border-radius: 16px;
          }
          
          .floating-elements {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
          }
          
          .floating-element {
            position: absolute;
            font-size: 24px;
            opacity: 0.3;
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          
          @media (max-width: 640px) {
            .container { padding: 24px; }
            .error-code { font-size: 80px; }
            h1 { font-size: 24px; }
            p { font-size: 16px; }
            .btn-home { width: 100%; justify-content: center; }
          }
        </style>
      </head>
      <body>
        <div class="background-grid"></div>
        <div class="floating-elements">
          <div class="floating-element" style="top: 10%; left: 10%">⚛️</div>
          <div class="floating-element" style="top: 20%; right: 15%">💻</div>
          <div class="floating-element" style="bottom: 15%; left: 20%">🚀</div>
          <div class="floating-element" style="bottom: 25%; right: 10%">⚡</div>
        </div>
        <div class="container">
          <div class="glowing-border"></div>
          <div class="illustration">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Coding Illustration" />
          </div>
          <div class="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for seems to have wandered off into the digital void. Let's get you back to familiar territory.</p>
          <a href="/" class="btn-home">
            <span>← Return to Homepage</span>
          </a>
        </div>
      </body>
      </html>
    `);
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});