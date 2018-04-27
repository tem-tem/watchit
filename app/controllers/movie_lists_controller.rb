class MovieListsController < ApplicationController
  def create
    @movielist = MovieList.new(list_id: params[:list_id],
                               movie_id: params[:movie_id])
    debugger
    respond_to do |format|
      format.js{
        flash.now[:danger] = @movielist.errors.full_messages if not @movielist.save
      }
    end
  end

end
