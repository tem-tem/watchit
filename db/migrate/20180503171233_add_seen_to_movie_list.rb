class AddSeenToMovieList < ActiveRecord::Migration[5.1]
  def change
    add_column :movie_lists, :seen, :boolean, default: false
  end
end
