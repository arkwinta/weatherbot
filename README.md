# weatherbot

#The various attempts at creating a better weatherbot

My initial response in building this bot was to use API.ai, which admittedly felt like cheating, but would yield the best bot. 
They use natural language processing as well as having one-click integration with Slack and other messaging platforms. 
They also even have a weather integration to help simplify building weatherbots, but unfortunately I would have needed to pay 
enterprise rates if I was to try to "share" or publish the bot. So, I started from scratch.

The first attempt was to use Slack's Real-Time Messaging which included setting up webhooks to receive an open stream of data
so the bot can respond without needing to be "triggered". I ran into an issue trying to run the program, citing some inheritance
error that I could not track down and fix. So, onto the next method.

The next attempt was using the event-based messaging system, waiting for some sort of event like a message_received or the
entering/leaving of a channel to trigger the bot to respond. I wanted to use the serverless framework to help deploy code to 
AWS as well as provide different URLs that would correlate to different functions. These functions included an authorization
for Slack, installation (of the Slack app/bot), and then handling events. Authenticating with Slack went flawlessly, allowing
me to POST messages in Slack, but I still needed to RECEIVE messages from Slack, and this ended up being a tragic disaster.
For some reason, when trying to verify owning an endpoint, a POST request is sent to that endpoint with a "challenge" parameter
and you're supposed to respond with the same "challenge". Though I could respond with the challenge, there was a difference
in my token and the token Slack was sending, leading to a myriad of 500 errors. I did everything I could and yet the 500 errors
continued. 

After trying to troubleshoot for a couple of days, I decided I again would need to try a different method to finally submit the
project. I settled on using AWS lambda to develop a slash function. It feels less like a "real" bot, but finally does 
respond with the right weather for a given location (provided no spaces) with very rudimentary NLP (just a handful of synonyms).

A project I didn't think would be that difficult proved to be pretty tricky for me. There's some other things that should still
be added to this bot (error handling on URLs, some extra parameters to request windspeed, etc, and hopefully RTM/EBM) but for 
a first draft I think it's alright. Let me know what you think.

~ austin
