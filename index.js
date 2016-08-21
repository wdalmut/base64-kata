var toBase64 = function() {
  return this.split('')
    .map((item) => item.charCodeAt())
    .reduce(function(memo, item, index) {
      (index % 3 === 0) ? memo.push([item]) : memo.slice(-1)[0].push(item);
      return memo;
    }, [])
    .map(function(item) {
      var six = [];
      six.push((item[0] & 0xFC) >> 2);
      six.push(((item[0] & 0x03) << 4) | ((item[1] & 0xF0) >> 4));
      six.push(((item[1] & 0x0F) << 2) | ((item[2] & 0xC0) >> 6));
      six.push(item[2] & 0x3F);

      if (item.length < 3) {
        for (var i=3; i>item.length-1; i--) {
          if (six[i] === 0) {
            six[i] = "=";
          }
        }
      }
      return six;
    })
    .reduce((memo, item) => memo.concat(item), [])
    .map(function(letter) {
      return (letter === "=") ? "=" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[letter];
    }).join('');
};

var fromBase64 = function() {
  return this.split('')
    .filter((letter) => letter !== '=')
    .map((letter) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(letter))
    .reduce(function(memo, item, index) {
      if (index % 4 === 0) {
        memo.push([item]);
      } else {
        memo.slice(-1)[0].push(item);
      }
      return memo;
    }, [])
    .map(function(item) {
      var eight = [];

      eight.push(((item[0] & 0x3F) << 2) | ((item[1] & 0x30) >> 4))
      eight.push(((item[1] & 0x0F) << 4) | ((item[2] & 0x3C) >> 2))
      eight.push(((item[2] & 0x03) << 6) | (item[3] & 0x3F))

      if (item.length < 4) {
        for (var i=0; i<=3-item.length; i++) {
          eight.pop();
        }
      }
      return eight;
    })
    .reduce(function(memo, item) {
      return memo.concat(item)
    }, [])
    .map((item) => String.fromCharCode(item))
    .join('')
  ;
};

exports.toBase64 = toBase64;
exports.fromBase64 = fromBase64;
