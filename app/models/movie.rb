class Movie < ApplicationRecord
  has_many :movie_lists
  has_many :lists, through: :movie_lists
end
