class ListsController < ApplicationController

  def new
    @list = current_user.lists.build if logged_in?
  end

  def create
    @list = current_user.lists.build(list_params)
    if @list.save
      flash[:success] = "List created!"
      redirect_to root_path
    else
      flash[:danger] = @list.errors.full_messages
      render :new
    end
  end

  private

    def list_params
      params.require(:list).permit(:title, :is_private)
    end

end
