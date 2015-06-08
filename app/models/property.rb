# == Schema Information
#
# Table name: properties
#
#  id          :integer          not null, primary key
#  description :text
#  lat         :float            not null
#  lng         :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  rooms       :integer          default(3)
#

class Property < ActiveRecord::Base
  
  has_many :photos

  def self.in_bounds(bounds)

    bounds_ne_lat = bounds["northEast"]["lat"]
    bounds_sw_lat = bounds["southWest"]["lat"]
    bounds_ne_lng = bounds["northEast"]["lng"]
    bounds_sw_lng = bounds["southWest"]["lng"]
    @properties = Property.where("lat <= ? AND lat >= ? AND lng <= ? AND lng >= ?", bounds_ne_lat, bounds_sw_lat, bounds_ne_lng, bounds_sw_lng)
    return @properties
  end
  
end
