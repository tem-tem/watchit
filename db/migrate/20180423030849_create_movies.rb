class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :poster
      t.boolean :show, default: false
      t.integer :hearts

      t.timestamps
    end

    add_index :movies, :title, unique: true
  end
end
