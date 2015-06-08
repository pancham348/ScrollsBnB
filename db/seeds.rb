# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
properties = Property.create([
  {description: "App Academy", lat: 37.781056, lng: -122.411455 },
  {description: "Academy of Sciences", lat: 37.769731, lng: -122.466144},
  {description: "Golden Gate Bridge", lat: 37.810537, lng: -122.477063}])