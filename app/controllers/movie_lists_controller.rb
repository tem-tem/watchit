class MovieListsController < ApplicationController
  def create
    @movielist = MovieList.new(movielist_params)
    respond_to do |format|
      if @movielist.save
        flash.now[:success] = "Movie has been added!"
        format.js
      else
        flash.now[:danger] = @movielist.errors.full_messages
      end
    end
  end

  def movielist_params
    params.require[:movie_list].permit(:movie_id, :list_id)
  end
end
