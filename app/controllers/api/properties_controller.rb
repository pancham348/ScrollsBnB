class Api::PropertiesController < ApplicationController
  
  def index
    @properties = Property.in_bounds(property_params[:bounds])
    #@properties = Property.all
    render json: @properties.to_json(include: :photos)

  end

  def create
    @property = Property.new(property_params)
    @property.photos << Photo.new(photo_params)
    if @property.save
      render json: @property
    else
      render json: "error"
    end
  end

  def show
    @property = Property.find(params[:id])
    render json: @property.to_json(include: :photos)
  end

  private
  def property_params
    params.permit(:id, :lat, :lng, :rooms, :description, :rooms, :bounds => [:northEast => [:lat, :lng], :southWest => [:lat, :lng]])
  end

  def photo_params
    params.permit(:photo_url)
  end
  
end
