class MovieList < ApplicationRecord
  belongs_to :movie
  belongs_to :list
  validates :movie, uniqueness: {
                      scope: :list,
                      case_sensetive: false,
                      message: 'is already in this list.'}
  default_scope { order("created_at DESC") }

  def seen?
    self.seen ? "movie-list-seen" : ""
  end

end
