class MoviesController < ApplicationController
  def index
    @movies = Movie.all
  end

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      flash[:success] = "Movie has been added!"
      redirect_to root_path
    else
      flash[:danger] = @movie.errors.full_messages
      render :new
    end
  end

  private
  def movie_params
    params.require(:movie).permit(:title,
                                  :poster,
                                  :show)
  end
end
