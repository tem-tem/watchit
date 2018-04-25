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
    @list = List.find(params[:list_id])
    @movie = Movie.create_with(movie_params).find_or_create_by(link: movie_params[:link])
    @movielist = @list.movie_lists.build(movie: @movie)
    respond_to do |format|
      if @movie.save
        if @movielist.save
          flash.now[:success] = "Movie has been added!"
          format.js
        else
          flash.now[:danger] = @movielist.errors.full_messages
          # debugger
        end
      else
        flash.now[:danger] = @movie.errors.full_messages
      end
    end
  end

  private
    def movie_params
      params.require(:movie_data).permit(:title,
                                    :link,
                                    :show)
    end

    def movielist_params
      params.require(:movielist).permit(:list_id)
    end
end
