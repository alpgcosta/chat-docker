window.onload = function() {
  var socket = io.connect("http://localhost:80");
  var DOMStrings = {
    usernameBlock: ".username_block",
    chat: ".chat",
    nameArea: ".name",
    submit: ".submit",
    textArea: ".text-area",
    messages: ".chat-messages",
    sendBtn: ".send-text"
  }

  document.querySelector(DOMStrings.submit).addEventListener("submit", function(e) {
    e.preventDefault();
    document.querySelector(DOMStrings.chat).removeAttribute("hidden");
    document.querySelector(DOMStrings.usernameBlock).setAttributeNode(document.createAttribute("hidden"));
  });

  var sendText = function() {
    var text = document.querySelector(DOMStrings.textArea).value;
    var time = new Date();
    var html = '<li class="self"><div class="msg"><span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>';
    document.querySelector(DOMStrings.textArea).value = '';
    document.querySelector(DOMStrings.messages).insertAdjacentHTML("beforeend", html);
    socket.emit("send", text);
  }

  document.querySelector(DOMStrings.textArea).addEventListener("keydown", function(e) {
    if(e.which === 13 || e.keyCode === 13) {
      sendText();
    }
  });

  document.querySelector(DOMStrings.sendBtn).addEventListener("click", sendText);
}
