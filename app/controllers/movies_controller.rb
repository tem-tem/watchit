class MoviesController < ApplicationController
  respond_to :js

  def index
    @movies = Movie.all
  end

  def show
    @movie = Movie.find(params[:id])
    respond_with( @movie )
  end

  # def new
  #   create if params[:list_id]
  #   @movie_params = movie_params
  #   @movie = Movie.new(movie_params)
  #   respond_with ( @movie )
  #
  # end

  def create
    respond_to do |format|
      format.js{
        @movie = Movie.create_with(movie_params).find_or_create_by(tmdb_id: movie_params[:tmdb_id])
        # # flash.now[:danger] = @movie.errors.full_messages if not @movie.save
        # if params[:list_id] do
        #   create_movie_list(@movie.id, params[:list_id])
        # end
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
