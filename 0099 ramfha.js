  $(document).ready(function () {
  $("#sendUrl").click(function () {
    function getId(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);

      if (match && match[2].length == 11) {
        return match[2];
      } else {
        return "error";
      }
    }
    var videoId = $("#url").val();
    var myId = getId(videoId);

    $("#videoSrc").html(myId);

    $("#myVideo").html(
      '<iframe class="video" src="//www.youtube.com/embed/' +
        myId +
        '" frameborder="0" allowfullscreen></iframe>'
    );

    $("#myVideoCode").html(
      '<textarea id="original"  class="form-control link"><iframe  class="video" src="//www.youtube.com/embed/' +
        myId +
        '" frameborder="0" allowfullscreen/></textarea>'
    );
    $("#myVideoImg").html(
      '<textarea id="original1" class="form-control link"><img border="0" height="0" src="https://i2.ytimg.com/vi/' +
        myId +
        '/0.jpg" width="0" /></textarea>'
    );
  });
});
