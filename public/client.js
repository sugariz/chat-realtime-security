const algorithm = 'salt';

const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

var socket = io.connect('http://localhost:8000');   
socket.on('connect', function (data) {
    var name=prompt('Hay nhap ten hien thi')
    socket.emit('join',name);
    $('form').submit(function(){
        var message = $('#message').val();
        socket.emit('messages',
            {
                name:name,
                message:message,
            },
        );
        this.reset();
        return false;
   });
});
//listen thread event
socket.on('thread', function (data) {
    var encode = crypt(algorithm,data.message)
    $('#thread').append('<li class="li"> Text mã hóa-' + data.name +": " + encode  + '</li>')
    $('#thread').append('<li class="li"> Text giải mã-' + data.name +": " + decrypt(algorithm, encode)  + '</li>')
});

// 