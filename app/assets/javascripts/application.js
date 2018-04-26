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
var glob_movie_id = "";
var open_modal;

$(document).ready(function(){
  var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );
  var query_bg = $("#humongous-input-holder");
  var query_input = $("#search-query");
  var movie_titles = [];
  var tmdbAPI = "https://api.themoviedb.org/3/search/multi";
  var request = {
      api_key: "018f051c7c89b548ff708f984dfbf56f",
      query: query_input.val() };
  var cache = {};


  function show_query(value){
    query_input.val(value);
    query_bg.show(10, function(){
      query_input.focus();
    });
  }

  function close_query(){
    query_bg.hide(50, function(){
      query_input.val("");
    });
  }

  function show_movie_modal(movie){
    var data = {
      title: movie.label,
      show: movie.show,
      tmdb_id: movie.id,
      poster_path: movie.poster
    };
    console.log(data)
    // create or find movie
    $.ajax({
      url: "/movies",
      type: 'POST',
      headers:{'X-CSRF-Token': token},
      data: {movie: data}
    });
  }

  $.CloseModal = function(el){
    el.hide(100, 'easeOutExpo');
  }

  function call_autocomplete(){
    query_input.autocomplete({
      delay: 500,
      minLength: 2,
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
        close_query();
        show_movie_modal(ui.item);
      }
    });
  }

  $(".add-movie-button").click(function(){
      show_query();
      call_autocomplete();
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      if (query_bg.is(":hidden")){
        $.CloseModal(open_modal);
      } else {
        close_query();
      }

    } else if ((query_bg.is(":hidden")) && (e.key.length == 1)) {
      show_query(e.key);
      call_autocomplete();

      }
  });

});
