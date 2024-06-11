document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.getElementById("chat-button");
  const chatContainer = document.getElementById("chatContainer");
  const minimizeButton = document.getElementById("minimize-button");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("conversation-group");
  const sendButton = document.getElementById("SentButton");

  if (chatButton) {
      chatButton.addEventListener("click", function () {
          if (chatContainer) {
              chatContainer.classList.add("open");
              chatButton.classList.add("clicked");
          }
      });
  }

  if (minimizeButton) {
      minimizeButton.addEventListener("click", function () {
          if (chatContainer) {
              chatContainer.classList.remove("open");
              chatButton.classList.remove("clicked");
          }
      });
  }

  function createMessage(message, isUser = true) {
      const newMessage = document.createElement("div");
      newMessage.classList.add(isUser ? "sentText" : "botText");
      newMessage.textContent = message;
      chatMessages.appendChild(newMessage);
      return newMessage;
  }

  function sendUserMessage(message) {
      fetch("/chat", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: message })
      })
      .then(response => response.json())
      .then(data => {
          const botMessage = createMessage(data.response, false);
          botMessage.scrollIntoView();
      })
      .catch(error => {
          console.error("Error:", error);
      });
  }

  chatInput.addEventListener("input", function (event) {
      if (event.target.value) {
          sendButton.classList.add("svgsent");
      } else {
          sendButton.classList.remove("svgsent");
      }
  });

  chatInput.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
          event.preventDefault();
          const message = chatInput.value;
          chatInput.value = "";
          const userMessage = createMessage(message);
          userMessage.scrollIntoView();
          sendUserMessage(message);
          sendButton.classList.add("svgsent");
      }
  });

  if (sendButton) {
      sendButton.addEventListener("click", function () {
          const message = chatInput.value;
          chatInput.value = "";
          const userMessage = createMessage(message);
          userMessage.scrollIntoView();
          sendUserMessage(message);
          sendButton.classList.add("svgsent");
      });
  }
});
