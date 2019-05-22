# Steam News Generator



Steam News Generator, will give you news related to games you've played within the past 2 weeks, as well as games you've put a lot of hours in. It's an idea that started out with wanting to make something unique that hasn't been done already, as well as wanting to make something I'm passionate about (gaming). It returns news for you in chronological order within the given parameters that you set. It's running off a node.js server in the backend (Steam API rejects fetches called from a browser) and React in the front-end. 



### General Use



To use this, all you need to do is input your 17 digit steam ID. It's usually on your profile URL, but if it's not, then [here](https://steamidfinder.com/) is a link to find yours. After entering in your steamID, make sure it's a 17 digit one. This app won't take anything less or more than 17 digits. You can use the default options of looking for news 6 months ago for games with more than 10 hours, but feel free to change the sliders accordingly. After inputting the information, your articles related to your game should come up. If nothing comes up, that means your profile privacy is set to private, so I don't have access to that information. If a private Steam ID is entered, the user will be given an error option with a link to change their privacy. 





### Future plans



I really wanted to add a description to each news article, but the with the current state of their API, it'll require crazy regex. The problem is that the description is returned in a string of HTML code, but it's also truncated to about 300 characters. If part of that string is truncated the wrong way, it can return an incomplete part of HTML code. An incomplete sentence can be resolved with "..." but you can't fix incomplete HTML code without knowing what the rest of it is. It is certainly possible to use regex to detect HTML code near the end, and delete it, but these are just the first couple sentences of an article, not a summary. 


### Tech



```

Javascript/React, CSS, Node.js/Express. 

```

### Demo

[Live Demo](https://brandonjoe.github.io/SteamApp/)
