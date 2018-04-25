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

$(document).ready(function(){
  var query_bg = $("#humongous-input-holder");
  var query_input = $("#search-query");
  var modal_box = $("#modal-box");
  var movie_titles = [];
  var tmdbAPI = "https://api.themoviedb.org/3/search/multi";
  var request = {
      api_key: "018f051c7c89b548ff708f984dfbf56f",
      query: query_input.val() };
  var cache = {};

  function show_query(value){
    query_input.val(value);
    query_bg.show(100, function(){
      query_input.focus();
    });
  }
  function close_query(){
    query_bg.hide(50, function(){
      query_input.val("");
    });
  }

  function show_modal(movie){
    modal_box.show(100);

    $.ajax({
      // url: "/movies/new",
      // type: 'GET'
    });
    src = "https://image.tmdb.org/t/p/w780" + movie.poster;
    $("#movie-poster").html("<img src="+src+" />")
    $("#modal-title").html(movie.label);
    $("#movie-title-field").val(movie.label);
    if (movie.show){
      $("#show-check").prop('checked', true);
    } else {
      $("#show-check").prop('checked', false);
    }
    $("#movie-id").val(movie.id);
  }

  function close_modal(){
    modal_box.hide(50);
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
                movie_titles.push({label: movie.original_title,
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
        console.log(ui.item.show, ui.item.poster);
        close_query();
        show_modal(ui.item);

        // if (ui.item.show){
        //   $("#show").prop('checked', true);
        // } else {
        //   $("#show").prop('checked', false);
        // }
        // $("#poster").val(ui.item.poster);
        // src = "https://image.tmdb.org/t/p/w185" + ui.item.poster;
        // $("#movie-image").html("<img src="+src+" />")
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
        close_modal();
      } else {
        close_query();
      }

    } else if ((query_bg.is(":hidden")) && (e.key.length == 1)) {
      show_query(e.key);
      call_autocomplete();

      }
    });
});
