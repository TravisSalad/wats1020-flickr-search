$(document).on('ready', function(){
var searchImages = function(tags){
  var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON(flickrAPI, {
    tags: tags,
    tagmode: "any",
    format: "json"
  })
  .done(function(data){

    $("#images").empty();
      $.each( data.items, function( i, item){
        var newListItem = $('<li class="col-lg-3 col-md-4 col-sm-6 col-xs-12 new-li">')
        var newPic = $("<img/>").attr("src", item.media.m).appendTo(newListItem);
        var newTitle = $('<p class="image-title">').text(item.title).appendTo(newListItem);
        var author = $('<p class="author">').html(item.author).appendTo(newListItem);
        var linkTo = $('<a>').attr('href', item.link).text("View on Flickr").appendTo(newListItem);

        var newButton = $('<br><br><button class="btn btn-new">enlarge</button>').attr({
          'data-title': item.title,
          'data-toggle': 'modal',
          'data-target': '#infoModal',
          'data-imgsrc': item.media.m,
          'type': 'button',
          'data-description': item.description,
          'data-date_taken': item.date_taken
        }).appendTo(newListItem);
          newListItem.appendTo("#images");

      if( i === 15 ){
        return false;
      }
    });
  });
};


    $('button.search').on('click', function(event){
      event.preventDefault();
      var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
      searchImages(searchTextInput.value);
      $('.back-top').show();
    });


    $('#infoModal').on('show.bs.modal', function (event){
      var button = $(event.relatedTarget);
      var title = button.data('title');
      var imgSrc = button.data('imgSrc');
      var imageDescription = button.data('description');
      var timeTaken = button.data('date_taken');

      var modal = $(this);
      modal.find('.modal-title').html(title);
      var modalBody = modal.find('.modal-body');
      modalBody.empty();
      var modalDescription = $('<p class="image-description">').html(imageDescription).appendTo(modalBody);
      var modalTime = modal.find('.modal-time');
      modalTime.empty();
      var modalTimeTaken = $('<p class="date-taken-modal">').html("Taken: " + timeTaken).appendTo('.modal-time');
    });
});
