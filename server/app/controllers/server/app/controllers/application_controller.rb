class ApplicationController < Sinatra::Base
    set :default_content_type, 'application/json'
    enable :sessions
  # register a user
  post '/users' do
    user = User.new(
      username: params[:username],
      email: params[:email],
      password: params[:password]
    )
    if user.save
      session[:user_id] = user.id
      { message: 'User registered successfully' }.to_json
    else
      halt 403, { errors: user.errors.full_messages }.to_json
    end
  end
  # login user
  post '/login' do
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      {
          message: 'User logged in successfully', 
          userId: user.id,
          username: user.username
      }.to_json
    else
      halt 403, { error: 'Invalid username or password' }.to_json
    end
  end
  # fetch memes
  get '/memes' do
    memes = Meme.includes(:user).order(created_at: :desc)
    memes = memes.as_json(include: { user: { only: :username } })
    { memes: memes }.to_json
  end
  
  
  # fetch logged in user's memes 
  get '/my_memes/:id' do
    user = User.find_by(id: params[:id])
    if user
      memes = user.memes.order(created_at: :desc)
      memes = memes.as_json(include: { user: { only: :username } })
      { memes: memes }.to_json
    else
      halt 404, { error: 'User not found' }.to_json
    end
  end
  # post a meme
  post '/users/:user_id/memes' do
    user = User.find_by(id: params[:user_id])
    if user
      meme = user.memes.create(title: params[:title], message: params[:message])
      if meme.valid?
        meme.to_json(include: { user: { only: :username } })
      else
        halt 422, { error: 'Meme could not be created' }.to_json
      end
    else
      halt 404, { error: 'User not found' }.to_json
    end
  end
  # edit meme
  patch '/users/:id/memes/:meme_id' do
    user = User.find_by(id: params[:user_id])
    if user
      meme = user.memes.find_by(id: params[:meme_id])
      if meme
        if meme.update(title: params[:title], message: params[:message])
          meme.to_json(include: { user: { only: :username } })
        else
          halt 422, { error: 'Meme could not be updated' }.to_json
        end
      else
        halt 404, { error: 'Meme not found' }.to_json
      end
    else
      halt 404, { error: 'User not found' }.to_json
    end
  end
    # delete meme from database
  delete '/memes/:id/users/:user_id' do
    meme = Meme.find_by(id: params[:id], user_id: params[:user_id])
    if meme
      meme.destroy
      { message: 'Meme deleted' }.to_json
    else
      halt 404, { error: 'Meme not found' }.to_json
    end
  end
  post '/logout' do
    session.clear
    { message: 'User logged out successfully' }.to_json
  end
  end



