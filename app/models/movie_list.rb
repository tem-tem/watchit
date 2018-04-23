class MovieList < ApplicationRecord
  belongs_to :movie
  belongs_to :list
end
