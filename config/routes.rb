Rails.application.routes.draw do

  default_url_options :host => "localhost:3000"

  root 'users#show'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users do
    resources :lists
  end
  resources :lists
  resources :lists do
    resources :movies
  end
  resources :movie_lists
  resources :movies
  
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [ :new, :create, :edit, :update]
end
