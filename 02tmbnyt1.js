var realImage = document.getElementById('thumbnailpreview');
        var loadingImage = document.getElementById('loadingImage');
        loadingImage.style.display = 'inline';
        realImage.style.display = 'none';

        // Create new image
        var imgPreloader = new Image();
        // define onload (= image loaded)
        imgPreloader.onload = function () {
            realImage.src = imgPreloader.src;
            realImage.style.display = 'inline';
            loadingImage.style.display = 'none';
        };
        // set image source
        imgPreloader.src = 'images/placeholder.jpg';