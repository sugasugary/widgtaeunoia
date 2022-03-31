var url = ""

    $("#button").on('click',function(){
      url = $("#url").val()

      getyoutubevideoid(url)
    })

    $("#copy").on('click',function(){
      copytoclipboard()
    })

    function getyoutubevideoid(url){
       var id = youtube_parser(url)
       $("#result").html(`<h1 class="text-center">${id}</h1>`)
       $("#copy").show()
    }

    function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
    
}

function copytoclipboard(){
  var textToCopy = $("#result").text();

var myTemporaryInputElement = document.createElement("input");
myTemporaryInputElement.type = "text";
myTemporaryInputElement.value = textToCopy;

document.body.appendChild(myTemporaryInputElement);

myTemporaryInputElement.select();
document.execCommand("Copy");

document.body.removeChild(myTemporaryInputElement);

Swal.fire(
  'Good job!',
  'URL Successfully Copied',
  'success'
)
}
