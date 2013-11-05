require 'rubygems'
require 'sinatra'
require 'json'
require 'omniauth'
require 'omniauth-ticketbud'

CONFIG = YAML.load_file("ticketbud.yml")

set :sessions, true

use OmniAuth::Builder do
  provider :ticketbud, CONFIG['ticketbud_client_id'], CONFIG['ticketbud_secret']
end

get '/' do
  erb "<a class='btn' href='http://localhost:9393/auth/ticketbud'>Login with Ticketbud</a><br>"
end

get '/auth/:provider/callback' do
  erb "<h1>#{params[:provider]}</h1>
         <pre>#{JSON.pretty_generate(request.env['omniauth.auth'])}</pre>"
end

get '/auth/failure' do
  erb "<h1>Authentication Failed:</h1><h3>message:<h3> <pre>#{params}</pre>"
end

get '/auth/:provider/deauthorized' do
  erb "#{params[:provider]} has deauthorized this app."
end

get '/protected' do
  throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
  erb "<pre>#{request.env['omniauth.auth'].to_json}</pre><hr>
         <a class='btn' href='/logout'>Logout</a>"
end

get '/logout' do
  session[:authenticated] = false
  redirect '/'
end
