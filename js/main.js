$(document).on('ready', function(){
var searchImages = function(tags){  //create function that accepts tags input
  var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON(flickrAPI, {  //create json object for tags input
    tags: tags,
    tagmode: "any",
    format: "json"
  })
  .done(function(data){ //create done function

    $("#images").empty();   //make #images empty so each can have a new item
      $.each( data.items, function( i, item){   //create function that applies new itmes to each #images
        var newListItem = $('<li class="col-lg-3 col-md-4 col-sm-6 col-xs-12 new-li">')   //create new li and append multiple variables to each li
        var newPic = $("<img/>").attr("src", item.media.m).appendTo(newListItem);
        var newTitle = $('<p class="image-title">').text(item.title).appendTo(newListItem);
        var author = $('<p class="author">').html(item.author).appendTo(newListItem);
        var linkTo = $('<a>').attr('href', item.link).text("View on Flickr").appendTo(newListItem);

        var newButton = $('<br><br><button class="btn btn-new">enlarge</button>').attr({    //create a button that triggers modal
          'data-title': item.title,
          'data-toggle': 'modal',
          'data-target': '#infoModal',
          'data-imgsrc': item.media.m,
          'type': 'button',
          'data-description': item.description,
          'data-date_taken': item.date_taken
        }).appendTo(newListItem);   //append to the new list items
          newListItem.appendTo("#images");    //append the new li to #images

      if( i === 15 ){   //stops at 16 images
        return false;
      }
    });
  });
};


    $('button.search').on('click', function(event){   //create function that triggers an event when a search button is clicked
      event.preventDefault();
      var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
      searchImages(searchTextInput.value);
      $('.back-top').show();  //show back to top link at bottom of page
    });


    $('#infoModal').on('show.bs.modal', function (event){   //create variables for modal content using newButton json data
      var button = $(event.relatedTarget);
      var title = button.data('title');
      var imgSrc = button.data('imgSrc');
      var imageDescription = button.data('description');
      var timeTaken = button.data('date_taken');

      var modal = $(this);
      modal.find('.modal-title').html(title); //find .modal-title and replace innerhtml
      var modalBody = modal.find('.modal-body');
      modalBody.empty();  //allows for new image for each modal by emptying each time
      var modalDescription = $('<p class="image-description">').html(imageDescription).appendTo(modalBody);
      var modalTime = modal.find('.modal-time');
      modalTime.empty();  //emptys modal-time so each individual time is displayed
      var modalTimeTaken = $('<p class="date-taken-modal">').html("Taken: " + timeTaken).appendTo('.modal-time');
    });
});
