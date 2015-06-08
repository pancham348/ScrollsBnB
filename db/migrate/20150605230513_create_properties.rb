class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.text :description
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :type, null: false
      
      t.timestamps null: false
    end
  end
end
