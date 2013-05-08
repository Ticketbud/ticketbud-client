Ticketbud API Client Example
============================

This is a quick example client to get you started using the Ticketbud API. It is by no means exhaustive, and by no means the
only way to do it.

Getting Started
---------------
The ticketbud api uses Oauth2. So you will need to create your ticketbud application, authorize your callback, and maintain your own access_token.

1. Create your account on [ticketbud](https://ticketbud.com/users/sign_up)
2. Follow the instructions in the [API docs](https://api.ticketbud.com)
3. git clone git@github.com:Ticketbud/ticketbud-client.git
4. cp ticketbud.yml.example ticketbud.yml
5. Edit ticketbud.yml to your needs.
6. bundle install
7. bundle exec shotgun tb_client.rb

You will now have a local client server running on port 9393.

Go to http://localhost:9393

![Screenshot](https://s3.amazonaws.com/ticketbud/random/Screen+Shot+2013-05-08+at+9.58.18+AM.png "Screenshot of simple client")

You will be directed to ticketbud to Authorize the Client:

![Screenshot](https://s3.amazonaws.com/ticketbud/random/Screen+Shot+2013-04-17+at+11.53.18+AM.png "Screenshot of authorization")

Accept the Authorization and you will be redirected to your callback url:

![Screenshot](https://s3.amazonaws.com/ticketbud/random/Screen+Shot+2013-05-08+at+9.58.41+AM.png "Screenshot of callback")

You can view your events:

![Screenshot](https://s3.amazonaws.com/ticketbud/random/Screen+Shot+2013-05-08+at+10.01.33+AM.png "Screenshot of events")

Now you have an idea of the ticketbud API interaction. In a real world application you wouldn't expose your access_token, and you would most likely be performing this flow
in an automated way.

Happy Hacking!