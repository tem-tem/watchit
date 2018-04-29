// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require jquery-ui
//= require turbolinks
//= require_tree .
//= require popper
//= require bootstrap-sprockets

var hanging_movie_id = 0;
var list_id_param = 0;
var open_modal;
var follow_mouse;
var currentMousePos = { x: -1, y: -1 };

$(document).ready(function(){
  var keys = [];
  var query_bg = $("#humongous-input-holder");
  var query_input = $("#search-query");
  var tmdbAPI = "https://api.themoviedb.org/3/search/multi";
  var cache = {};

  $.FlashMessage = function(key, message){
    console.log(key, message);
    var color = "class=text-"+key;
    var div = "<div " + color + " style='white-space:nowrap; overflow:hidden;'>" + message + "</div>";
    $("#flash-message").html(div);
    $("#flash-message").fadeIn(40).effect("shake").delay(4000).fadeOut(300);
  }

  $.ShowInput = function(value){
    query_input.val(value);
    query_bg.show(10, function(){
      query_input.focus();
    });
    query_input.autocomplete({
      delay: 500,
      minLength: 3,
      source: function( request, response ) {
        var query = query_input.val();
        if ( query in cache ) {
          response( cache[ query ] );
          return;
        }

        $.get( tmdbAPI, {
          api_key: "018f051c7c89b548ff708f984dfbf56f",
          query: query_input.val() } )
          .done(function(data){
            movie_titles = [];
            $.each(data.results.slice(0, 5), function(key, movie){
              if (movie.media_type == "movie") {
                movie_titles.push({label: movie.title,
                  show: false,
                  id: movie.id,
                  poster: movie.poster_path });
                } else if (movie.media_type == "tv") {
                  movie_titles.push({label: movie.name,
                    show: true,
                    id: movie.id,
                    poster: movie.poster_path});
                  }
                });
                cache[ query ] = movie_titles;
                response( movie_titles );
              });
            },

            select: function(event, ui){
              $.CloseInput();
              $.ShowMovie(ui.item, list_id_param);
            }
          }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
              var postersrc = "https://image.tmdb.org/t/p/w342/" + item.poster;
              var poster = "<div class='col-4' style='height:100%;'> <img class='autocomplete-poster' src='" + postersrc + "' /> </div>";

              var title = "<div class='autocomplete-title'>" + item.label + "</div>";
              var text_info = "<div class='col-8'>" + title + "</div>";

              var full_info = "<div class='autocomplete-item-with-poster'> <div class='row border-bottom' style='height:100%'>" + text_info + poster + "</div></div>";

              return $( "<li class=''></li>" )
                  .data( "item.autocomplete", item )
                  .append(full_info)
                  .appendTo( ul );

          };
  }

  $.CloseInput = function(){
    query_bg.hide(50, function(){
      query_input.val("");
    });
  }

  $.ShowMovie = function(movie, list){
    var data = {
      title: movie.label,
      show: movie.show,
      tmdb_id: movie.id,
      poster_path: movie.poster
    };
    // shows movie
    $.ajax({
      url: "/movies",
      type: 'POST',
      headers: { 'X-CSRF-Token': Rails.csrfToken() },
      data: {movie: data,
             list_id: list}
    });
  }

  $.CloseModal = function(el){
    el.animate({
      position: "absolute",
      width: "10px",
      height: "10px",
      left: currentMousePos.x,
      top: currentMousePos.y,
      opacity: 0
    }, 320, function() {

      el.hide();
    });

    hanging_movie_id = 0;
    list_id_param = 0;
  }

  $.DropModal = function(el){
    el.animate({
      position: "absolute",
      top: "150vh"
    }, 400, 'easeOutExpo', function() {
      el.hide();
    });

    hanging_movie_id = 0;
    list_id_param = 0;
  }

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      if (query_bg.is(":hidden")){
        $.DropModal(open_modal);
      } else {
        $.CloseInput();
        list_id_param = 0;
      }
    }
    // } else if ((query_bg.is(":hidden")) && (e.key.length == 1)) {
    //   $.ShowInput(e.key);
    //   }
  });

  $(document).on('mousemove', function(event){
    currentMousePos.x = event.screenX;
    currentMousePos.y = event.screenY;
    if (follow_mouse) {

      follow_mouse.css({
        left:  currentMousePos.x,
        top:   currentMousePos.y
      });
    }
  });

});


// $(function() {
//
//   $( "#name" ).autocomplete({
//
//     source: function( request, response ) {
//
//      $.ajax({
//
//        url: "http://yourhostpath/getdata",
//
//        dataType: "json",
//
//        data: {
//
//            term: request.term
//
//        },
//
//        success: function( data ) {
//
//            response( $.map( data.results, function( result ) {
//
//                return {
//
//                    label: result.id + " - " + result.label,
//
//                    value: result.id,
//
//                    imgsrc: result.image
//
//                }
//
//            }));
//
//        }
//
//    });
//
//     }
//
//   }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
//
//       return $( "<li></li>" )
//
//           .data( "item.autocomplete", item )
//
//           .append( "<a>" + "<img style='width:25px;height:25px' src='" + item.imgsrc + "' /> " + item.label+ "</a>" )
//
//           .appendTo( ul );
//
//   };
//
// });
