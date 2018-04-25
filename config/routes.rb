Rails.application.routes.draw do

  default_url_options :host => "localhost:3000"
  root 'static_pages#index'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :lists
  resources :users do
    resources :lists
  end

  resources :movies
  resources :lists do
    resources :movies
  end
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [ :new, :create, :edit, :update]
end
