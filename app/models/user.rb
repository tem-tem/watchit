class User < ApplicationRecord
  before_save {self.name = name.downcase}
  before_save {self.email = email.downcase}

  validates :name, presence: true,
                   uniqueness: {case_sensetive: false},
                   length: {minimum: 5, maximum: 255}

   VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
   validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }


end
