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
//= require masonry.pkgd.min

var hanging_movie_id = 0;
var list_id_param = 0;
var open_modal;
var follow_mouse;
var currentMousePos = { x: -1, y: -1 };
var shifted = false;
var shifted_id = false;
var shifted_list = false;
var shifted_list_id = false;
var movie_input = false;

$(document).ready(function(){
  var keys = [];
  var query_bg = $("#humongous-input-holder");
  var query_input = $("#search-query");
  var tmdbAPI = "https://api.themoviedb.org/3/search/multi";
  var cache = {};

  $.FlashMessage = function(key, message){
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
      autoFocus: true,
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
              $.CreateMovie(ui.item, list_id_param);
            }
          }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
              var postersrc = "https://image.tmdb.org/t/p/w154/" + item.poster;
              var poster = "<div class='col-4' style='height:100%;'> <img class='autocomplete-poster' src='" + postersrc + "' /> </div>";

              var title = "<div class='autocomplete-title'>" + item.label + "</div>";
              var text_info = "<div class='col-8' style='padding: 0 3vw;'>" + title + "</div>";

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

  $.CreateMovie = function(movie, list){
    var data = {
      title: movie.label,
      show: movie.show,
      tmdb_id: movie.id,
      poster_path: movie.poster
    };
    // create or find movie
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

  $.HideModal = function(el){
    el.animate({
      opacity: 0
    }, 100, function(){
      el.hide();
    });
    $("body").css({
      overflow: "auto"
    });
  }

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      if (query_bg.is(":hidden")){
        $.HideModal(open_modal);
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

  $.fn.shiftback = function(){
    this.animate({
      left: 0
    }, 200);
    this.removeClass( "is-shifted" );
    this.parent().removeClass( "border-left" );
    shifted_id = false;
  };

  $.fn.shiftbacklist = function(){
    $(this).find(".list-buttons").animate({
      top: "-40px"
    }, 200);

    $(this).find(".list-head").animate({
      top: 0
    }, 200);
    shifted_list_id = false;
    this.removeClass( "is-shifted" );
  }

  $(document).click(function(event){
    if ((shifted) && (!$("#movie-list-" + $(event.target).attr("id")).hasClass( "is-shifted" ))) {
      shifted.shiftback();
      shifted = false;
    }

    if ((shifted_list) && (!$("#list-" + $(event.target).attr("id")).hasClass( "is-shifted" ))){
      shifted_list.shiftbacklist();
      shifted_list = false;
    }
  });

  $(document).on('click', '.movie-in-list-delete', function(event){

    if ( $(event.target).attr("id") == shifted_id ) {
      shifted.shiftback();
    } else {
      if (shifted){
        shifted.shiftback();
      }
      shifted_id = $(event.target).attr("id");
      shifted = $("#movie-list-" + shifted_id);
      shifted.addClass( "is-shifted" );
      shifted.parent().addClass( "border-left" );
      shifted.animate({
        left: "-100px"
      }, 320);
    }
  });

  $.CloseMovieInput = function() {
    if (movie_input) {
      movie_input.html("");
      movie_input = false;
      $('.grid').masonry();

    }
  }

  $(document).on('click', '#cancel-movie-list-create', function(event){
    $.CloseMovieInput();
  });

  $(document).on('click', '#close-movie-details', function(event){
    $.HideModal(open_modal);
  });

  $(document).on('click', '.list-title', function(event){
    if (shifted_list_id == $(event.target).attr("id")){
      shifted_list.shiftbacklist();
    } else {
      if (shifted_list){
        shifted_list.shiftbacklist();
      }
      shifted_list_id = $(event.target).attr("id");
      shifted_list = $("#list-" + shifted_list_id);

      shifted_list.addClass( "is-shifted" );
      $(shifted_list).find(".list-buttons").animate({
        top: 0
      }, 320);

      $(shifted_list).find(".list-head").animate({
        top: "40px"
      }, 320);
    }

  });

});
