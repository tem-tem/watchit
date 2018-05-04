class ListsController < ApplicationController

  def index
    @lists = current_user.lists.all
  end

  def show
    @list = List.find(params[:id])
  end

  def new
    @list = current_user.lists.build if logged_in?
    respond_to :js
  end

  def create
    @list = current_user.lists.create(list_params)
      respond_to do |format|
        format.js {
          unless @list.save
            flash.now[:danger] = @list.errors.full_messages.to_sentence
          end
        }
      end
    # debugger
  end

  def edit
    @list = current_user.lists.find(params[:id])
  end

  def update
    @list = current_user.lists.find(params[:id])
    @list.update(list_params)
    flash[:danger] = @list.errors.full_messages.to_sentence unless @list.valid?
  end

  def destroy
    @list = current_user.lists.find(params[:id])
    flash[:danger] = 'Something went wrong' unless @list.destroy
  end

  private

    def list_params
      params.require(:list).permit(:title, :is_private)
    end

end
