class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper

  # def create_movie_list(movie_id, list_id)
  #   movielist = MovieList.new(list_id: list_id,
  #                              movie_id: movie_id)
  #   if movielist.save
  #     movielist
  #   else
  #     flash.now[:danger] = movielist.errors.full_messages
  #   end
  # end
end
