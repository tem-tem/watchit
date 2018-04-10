require 'test_helper'

class ListTest < ActiveSupport::TestCase

  def setup
    @user = users(:michael)
    @list = @user.lists.build(title: "Loerm Ipsum")
  end

  test "should be valid" do
    assert @list.valid?
  end

  test "user id should be present" do
    @list.user_id = nil
    assert_not @list.valid?
  end

  test "title should be present" do
    @list.title = '   '
    assert_not @list.valid?
  end

  test "title should be less than 149 characters" do
    @list.title = 'x' * 150
    assert_not @list.valid?
  end

  test "order must be fresh first" do
    assert_equal lists(:most_recent), List.first
  end
end
