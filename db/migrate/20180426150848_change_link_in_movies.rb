class ChangeLinkInMovies < ActiveRecord::Migration[5.1]
  def change
    rename_column :movies, :link, :tmdb_id
  end
end
