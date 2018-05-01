class UpdateIndexOfMovies < ActiveRecord::Migration[5.1]
  def change
    remove_index :movies, :title
    add_index :movies, :title
  end
end
