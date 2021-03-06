# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180503171233) do

  create_table "lists", force: :cascade do |t|
    t.string "title"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_private", default: false
    t.integer "hearts"
    t.index ["user_id", "created_at"], name: "index_lists_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "movie_lists", force: :cascade do |t|
    t.integer "movie_id"
    t.integer "list_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "seen", default: false
    t.index ["list_id"], name: "index_movie_lists_on_list_id"
    t.index ["movie_id"], name: "index_movie_lists_on_movie_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "title"
    t.string "tmdb_id"
    t.boolean "show", default: false
    t.integer "hearts"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "poster_path"
    t.index ["title"], name: "index_movies_on_title"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "remember_digest"
    t.boolean "admin", default: false
    t.string "activation_digest"
    t.boolean "activated", default: false
    t.datetime "activated_at"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
  end

end
