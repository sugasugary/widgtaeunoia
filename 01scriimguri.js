var img2data = function () {
  'use strict';
  return {
    // this.qS(foo)
    qS: function (el) {
      return document.querySelector(el);
    },
    run: function () {
      this.convert();
    },
    convert: function () {
      // vars 
      var fls = this.qS('#files'),
      output = this.qS('.output'),
      overlay = this.qS('.overlay'),
      close_overlay = this.qS('.close_overlay');

      fls.addEventListener('change', function (e) {
        var file = fls.files[0],
        txtType = /text.*/, // all text files
        imgType = /image.*/, // all image files
        fR = new FileReader(); // fileReader start

        fR.onload = function (e) {
          // if text 
          if (file.type.match(txtType)) {
            var rS = fR.result,
            // template 
            render = '<a class="" href="' + rS + '" target="blank">Preview</a><ul>' +
            '<li><b>Name: </b>  ' + file.name + '</li>' +
            '<li><b>Size: </b>  ' + file.size + '</li>' +
            '<li><b>Type: </b>  ' + file.type + '</li>' +
            '<li><b>Data url: </b></li>' +
            '</ul>' +
            '<pre class="textarea">' + rS + '</pre>';
            output.innerHTML = render;
            // if image
          } else if (file.type.match(imgType)) {
            var rS2 = fR.result,
            // template
            tmpl = 
            '<img class="thumb" src="' + rS2 + '" alt="' + file.name + '"><ul>' +
            '<li><b>Name: </b>  ' + file.name + '</li>' +
            '<li><b>Size: </b>  ' + file.size + '</li>' +
            '<li><b>Type: </b>  ' + file.type + '</li>' +
            '<li><b>Data uri: </b></li>' +
            '</ul>' +
            '<pre id="box-pre" class="textarea box-pre">' + rS2 + '</pre>';
            output.innerHTML = tmpl;
            // if not support
          } else {
            output.innerHTML = '<h1>Sorry the file is not supported!</h1>';
          }
        };

        // on loaded add events
        fR.onloadend = function (e) {
          overlay.classList.add('show'); // add class
          close_overlay.onclick = function () {
            overlay.classList.remove('show'); // remove class
            fls.value = ''; // remove files
          };
        };
        // convert to data uri
        fR.readAsDataURL(file);
      });
    } };

}();

img2data.run();
//# sourceURL=pen.js
    </script>
<script>
function copy() {
  const copyText = document.getElementById("box-pre").textContent;
  const textArea = document.createElement('textarea');
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}