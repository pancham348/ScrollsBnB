class Api::BenchesController < ApplicationController

  def index
    @benches = Bench.in_bounds(bench_params[:bounds], bench_params[:seats])
    render json: @benches.to_json(include: :photos)

  end

  def create
    @bench = Bench.new(bench_params)
    @bench.photos << Photo.new(photo_params)
    if @bench.save
      render json: @bench
    else
      render json: "error"
    end
  end

  def show
    @bench = Bench.find(params[:id])
    render json: @bench.to_json(include: :photos)
  end

  private
  def bench_params
    params.permit(:id, :lat, :lng, :description, :seats, :bounds => [:northEast => [:lat, :lng], :southWest => [:lat, :lng]])
  end

  def photo_params
    params.permit(:photo_url)
  end

end
