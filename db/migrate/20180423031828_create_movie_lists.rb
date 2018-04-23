class CreateMovieLists < ActiveRecord::Migration[5.1]
  def change
    create_table :movie_lists do |t|
      t.references :movie, foreign_key: true
      t.references :list, foreign_key: true

      t.timestamps
    end
  end
end
