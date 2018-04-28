class MovieList < ApplicationRecord
  belongs_to :movie
  belongs_to :list
  validates :movie, uniqueness: {
                      scope: :list,
                      case_sensetive: false}
  default_scope { order("created_at DESC") }
end
