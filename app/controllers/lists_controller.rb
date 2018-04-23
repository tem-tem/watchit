class ListsController < ApplicationController

  def index
    @lists = current_user.lists.all
  end

  def show
    @list = List.find(params[:id])
  end

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

  def edit
    @list = current_user.lists.find(params[:id])
  end

  def update
    @list = current_user.lists.find(params[:id])
    @list.update(list_params)
    if @list.valid?
      flash[:success] = "List #{@list.title} has been updated!"
      redirect_to user_lists_path(current_user)
    else
      flash[:danger] = @list.errors.full_messages
      render :edit
    end
  end

  def destroy
    @list = current_user.lists.find(params[:id])
    if @list
      flash[:success] = "List #{@list.title} has been deleted"
      @list.destroy
      redirect_to user_lists_path(current_user)
    else
      flash[:danger] = 'Something went wrong'
    end
  end

  private

    def list_params
      params.require(:list).permit(:title, :is_private)
    end

end
