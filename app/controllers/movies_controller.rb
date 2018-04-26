class MoviesController < ApplicationController
  respond_to :js

  def index
    @movies = Movie.all
  end

  def show
    @movie = Movie.find(params[:id])
    respond_with( @movie )
  end

  def create
    @movie = Movie.create_with(movie_params).find_or_create_by(tmdb_id: movie_params[:tmdb_id])
    flash.now[:danger] = @movie.errors.full_messages if not @movie.save
    respond_to do |format|
      format.js{ render action: "show", id: @movie.id }
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
