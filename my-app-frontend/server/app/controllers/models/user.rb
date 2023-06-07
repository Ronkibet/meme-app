class User < ActiveRecord::Base

    has_many :memes
  
    
    def password=(password)
      self.password_digest = BCrypt::Password.create(password)
    end
  
    
    def authenticate(password)
      BCrypt::Password.new(password_digest) == password
    end
  end