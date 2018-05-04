class MovieListsController < ApplicationController

  def update
    ml = MovieList.find(params[:id])
    ml.seen = !ml.seen

    @movielist = MovieList.find(params[:id])
    @movielist.update(list_id: ml.list_id, movie_id: ml.movie_id, seen: ml.seen)
  end

  def create
    @movielist = MovieList.create(list_id: params[:id],
                               movie_id: params[:movie_id])
    respond_to do |format|
      format.js{
        unless @movielist.save
          flash.now[:danger] = @movielist.errors.full_messages.to_sentence
        end
      }
    end
  end

  def destroy
    @movielist = MovieList.find(params[:id])
    @movielist.destroy
  end

end
