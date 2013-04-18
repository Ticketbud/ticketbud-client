require 'sinatra'
require 'slim'
require 'oauth2'

CONFIG = YAML.load_file("ticketbud.yml")
# This should never make it into production code! This makes it easier to prototype this client with
# a self-signed ssl
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

set :base_domain, CONFIG['base_domain']

get '/' do
  client = OAuth2::Client.new(CONFIG['app_id'], CONFIG['secret'], site: CONFIG['site'])
  @authorize_url = client.auth_code.authorize_url(redirect_uri: CONFIG['callback_url'])
  slim :index, locals: {callback_url: CONFIG['callback_url'], secret: CONFIG['secret'], app_id: CONFIG['app_id']}
end

get '/auth/todo/callback' do
  client = OAuth2::Client.new(CONFIG['app_id'], CONFIG['secret'], site: CONFIG['site'])
  @access_token = client.auth_code.get_token(params[:code], redirect_uri: CONFIG['callback_url']).token
  slim :callback
end
