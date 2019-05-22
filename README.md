# Steam News Generator



Steam News Generator, will give you news related to games you've played within the past 2 weeks, as well as games you've put a lot of hours in. It's an idea that started out with wanting to make something unique that hasn't been done already, as well as wanting to make something I'm passionate about (gaming). It returns news for you in chronological order within the given parameters that you set. It's running off a node.js server in the backend (Steam API rejects fetches called from a browser) and React in the front-end. 



### General Use



To use this, all you need to do is input your 17 digit steam ID. It's usually on your profile URL, but if it's not, then [here](https://steamidfinder.com/) is a link to find yours. After entering in your steamID, make sure it's a 17 digit one. This app won't take anything less or more than 17 digits. You can use the default options of looking for news 6 months ago for games with more than 10 hours, but feel free to change the sliders accordingly. After inputting the information, your articles related to your game should come up. If nothing comes up, that means your profile privacy is set to private, so I don't have access to that information. If a private Steam ID is entered, the user will be given an error option with a link to change their privacy. 



### Steam API



I think this deserves its own section. This is probably one of the worst API's I've worked with, and it's sad because I love Steam. I expected more from a multi-billion dollar company. A lot of the games don't have game titles, so I couldn't put an associated game related to it. The description is returned in HTML code and truncates X amount of characters off of it. So you can put use this to put in HTML code, but what happens if it truncates half of HTML image link? It wouldn't render and throw an error. I do like how I have basically unlimited requests for a free API. 



### Future plans



I really wanted to add images, related game, and description to each news article, but in the future, the only feasible option of these 3 are to add the related game. The problem is that I would need to access the information from my own database that has all the correct game title names (steam's titles are incomplete). I would also like to incorporate entering in steam URLs and using regex to parse the steam ID out of it. The problem is that some steam URLs have custom names to them, and that would throw everything off. 



### Tech



```

Javascript/React, CSS, Node.js/Express. 

```

### Demo

[Live Demo](https://brandonjoe.github.io/SteamApp/)
