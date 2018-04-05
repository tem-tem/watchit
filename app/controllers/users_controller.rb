class UsersController < ApplicationController

  def show
   @user = User.find(params[:id])
   # классная штука. Тормозит все нахер, и можно внимательно потыкать
   #debugger
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = 'Welcome Home'
      redirect_to root_path
    else
      render 'new'
    end
  end


  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end
end
