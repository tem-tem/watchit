class MoviesController < ApplicationController
  def index
    @movies = Movie.all
  end

  def new
    @movie = Movie.new
    # debugger
    # @movielist = MovieList.new()
    # @list = Lists.find(params[:list_id])
    # @movie = @list.movies.build
  end

  def create
    # @movielist = MovieList.new(list_id: params[:list_id])
    # @list = List.new(params[:list_id])
    # @movie = @list.movie.build(movie_params)

    respond_to do |format|
      if @movie.save
        flash.now[:success] = "Movie has been added!"
        format.js
      else
        flash[:danger] = @movie.errors.full_messages
        render :new
      end
    end
  end

  private
    def movie_params
      params.require(:movie).permit(:title,
                                    :poster,
                                    :show)
    end

    def movielist_params
      params.require(:movielist).permit(:list_id)
    end
end
