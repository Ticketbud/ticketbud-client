require 'sinatra'
require 'slim'
require 'oauth2'

CONFIG = YAML.load_file("ticketbud.yml")

get '/' do
  client = OAuth2::Client.new(CONFIG['app_id'], CONFIG['secret'], site: CONFIG['site'])
  @authorize_url = client.auth_code.authorize_url(redirect_uri: CONFIG['callback_url'])
  slim :index
end

get '/auth/todo/callback' do
  client = OAuth2::Client.new(CONFIG['app_id'], CONFIG['secret'], site: CONFIG['site'])
  @access_token = client.auth_code.get_token(params[:code], redirect_uri: CONFIG['callback_url']).token
  slim :callback
end
