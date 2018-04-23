class Movie < ApplicationRecord
  has_many :lists, through: :movie_lists
  has_many :movie_lists
  
  validates :title, presence: true
  validates :show, presence: true
  validates :poster, presence: true
end