class AddRooms < ActiveRecord::Migration
  def change
    add_column :properties, :rooms, :integer, default: 3
  end
end
