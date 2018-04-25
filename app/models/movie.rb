class Movie < ApplicationRecord
  has_many :movie_lists
  has_many :lists, through: :movie_lists

  validates :title, presence: true
  validates :link, presence: true
end
