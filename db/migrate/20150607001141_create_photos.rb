class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :url, null:false
      t.integer :property_id, null:false
      
      t.timestamps null: false
    end
    add_index(:photos, :property_id)
  end
end
