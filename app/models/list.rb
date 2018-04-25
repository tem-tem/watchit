class List < ApplicationRecord
  belongs_to :user
  has_many :movie_lists
  has_many :movies, through: :movie_lists
  default_scope { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 149 },
                    uniqueness: {
                      scope: :user,
                      case_sensetive: false}
end
