window.templates = window.templates || {}
window.templates["scoreboardRowEntry"] = function anonymous(locals, escapeFn, include, rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"scoreboard-list-row\">\n  <p class=\"scoreboard-list-username\"><span class=\"scoreboard-list-place\"><%= place %>. </span><%= username %></p>\n  <p class=\"scoreboard-list-score\"><%= score %></p>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"scoreboard-list-row\">\n  <p class=\"scoreboard-list-username\"><span class=\"scoreboard-list-place\">")
    ; __line = 2
    ; __append(escapeFn( place ))
    ; __append(". </span>")
    ; __append(escapeFn( username ))
    ; __append("</p>\n  <p class=\"scoreboard-list-score\">")
    ; __line = 3
    ; __append(escapeFn( score ))
    ; __append("</p>\n</div>")
    ; __line = 4
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}