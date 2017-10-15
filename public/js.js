window.onload = function() {
  var variaveis = (function() {
    var socket = io.connect("http://localhost:80");
    var connected = false;
    var name = "";
    var DOMStrings = {
      usernameBlock: ".username_block",
      chat: ".chat",
      nameArea: ".name",
      submit: ".submit",
      textArea: ".text-area",
      messages: ".chat-messages",
      sendBtn: ".send-text"
    }

    return {
      getDOMStrings: function() {
        return DOMStrings;
      },
      getUsername: function() {
        return name;
      },
      getState: function() {
        return connected;
      },
      getSocket: function() {
        return socket;
      },
      setState: function(state) {
        connected = state;
      },
      setUsername: function(n) {
        name = n;
      }
    }
  })();
  AppController = (function(variaveis) {
    document.querySelector(variaveis.getDOMStrings().submit).addEventListener("submit", function(e) {
      e.preventDefault();
      document.querySelector(variaveis.getDOMStrings().chat).removeAttribute("hidden");
      document.querySelector(variaveis.getDOMStrings().usernameBlock).setAttributeNode(document.createAttribute("hidden"));

      variaveis.setUsername(document.querySelector(variaveis.getDOMStrings().nameArea).value);
      var time = new Date();

      variaveis.setState(true);
      variaveis.getSocket().emit("join", variaveis.getUsername());
    });

    var addLi = function(name, text) {
      var time = new Date();
      var html = '<li class="self"><div class="msg"><span>' + name + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>';
      document.querySelector(variaveis.getDOMStrings().messages).insertAdjacentHTML("beforeend", html);
    }

    var sendText = function() {
      var text = document.querySelector(variaveis.getDOMStrings().textArea).value;
      console.log(text);
      document.querySelector(variaveis.getDOMStrings().textArea).textContent = '';
      console.log("NOME " + variaveis.getUsername());
      addLi(variaveis.getUsername(), text);
      variaveis.getSocket().emit("send", text);
    }

    document.querySelector(variaveis.getDOMStrings().textArea).addEventListener("keydown", function(e) {
      if(e.which === 13 || e.keyCode === 13) {
        sendText();
      }
    });

    document.querySelector(variaveis.getDOMStrings().sendBtn).addEventListener("click", sendText);

    variaveis.getSocket().on("update", function(msg) {
      if(variaveis.getState()) {
        document.querySelector(variaveis.getDOMStrings().textArea).insertAdjacentHTML("beforeend", '<li class="info">' + msg + '</li>');
      }
    });

    variaveis.getSocket().on("chat", function(client, msg) {
      if(variaveis.getState()) {
          addLi(client, msg);
      }
    });
  })(variaveis);
}
