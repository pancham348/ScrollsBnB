class DelType < ActiveRecord::Migration
  def change
    remove_column :properties, :type
  end
end
