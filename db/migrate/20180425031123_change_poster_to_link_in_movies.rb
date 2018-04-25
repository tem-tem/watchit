class ChangePosterToLinkInMovies < ActiveRecord::Migration[5.1]
  def change
    rename_column :movies, :poster, :link
  end
end
