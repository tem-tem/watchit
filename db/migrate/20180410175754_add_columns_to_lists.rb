class AddColumnsToLists < ActiveRecord::Migration[5.1]
  def change
    add_column :lists, :is_private, :boolean, default: false
    add_column :lists, :hearts, :integer, defailt: 0
  end
end
