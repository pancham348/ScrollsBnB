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

require 'test_helper'

class PropertyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
