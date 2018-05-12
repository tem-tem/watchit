class MoviesController < ApplicationController
  respond_to :js
  #
  # def index
  #   @movies = Movie.all
  # end

  def show
    respond_to do |format|
      format.js{
        @movie = Movie.find(params[:id])
      }
    end
  end

  def create
    respond_to do |format|
      format.js{
        @movie = Movie.create_with(movie_params).find_or_create_by(tmdb_id: movie_params[:tmdb_id])
      }
    end
  end

  private
    def movie_params
      params.require(:movie).permit(:title,
                                    :tmdb_id,
                                    :show,
                                    :poster_path)
    end
end
