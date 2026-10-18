-- Fills the home page Reviews section from public/REVIEWS.md (newest first).
-- Each card shows photos of what they ordered (rotating when there are several), the review, and name · location · date.
-- The source has no star ratings, so none are shown. A M. and Wendy S. (mostly complaints) start hidden.
-- Everything can be edited, hidden or reordered afterwards in Admin → Front Page.
-- Replaces the current review list. Run in Supabase: SQL Editor → New query → paste → Run.

insert into public.site_content (key, content)
values ('reviews', jsonb_build_object('title', 'Reviews', 'reviews', $json$[
    {
        "id": "review-nathanp",
        "name": "Nathan P.",
        "location": "Springboro, OH",
        "date": "Jun 30, 2026",
        "rating": null,
        "text": "Great little spot! Hadn't noticed it before so it didn't jump out in its strip mall location but glad I finally saw it. Really good tea - great boba. I'll be back!",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/ERKmPJxzndY9lOlrqHyZYg/o.jpg"
        ]
    },
    {
        "id": "review-temiman",
        "name": "Temima N.",
        "location": "Baltimore, MD",
        "date": "May 28, 2026",
        "rating": null,
        "text": "I've been meaning to try this place since seeing it on social media and I'm glad I did! There hasn't been too many boba places in this area when I lived here so glad to see a good one that popped up! When I heard this place was from Taiwan, I wanted to try it since I tend to enjoy other chains that have originated there. I got the jasmine with oat milk & amber (boba in brown sugar since the normal tapioca ran out) at 30% sugar and I enjoyed it! It wasn't too sweet and the tapioca was nice and chewy. I would say this place even rivals some boba places on the east coast. Plus the price is affordable. Would def go again whenever I'm visiting family.",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/0FLP2Vo47K0wCps03pR-NQ/o.jpg"
        ]
    },
    {
        "id": "review-kimberlyl",
        "name": "Kimberly L.",
        "location": "Dayton, OH",
        "date": "Feb 17, 2026",
        "rating": null,
        "text": "relaxing little shop with exceptional service. always a joy to visit and enjoy amazing bubble tea and terrific fried tofu and Korean corn dogs. incredible addition to centerville",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-gracej",
        "name": "Grace J.",
        "location": "Long Beach, CA",
        "date": "Nov 16, 2025",
        "rating": null,
        "text": "Best boba in Dayton! Located in a plaza with plenty of parking, T4 offers a robust menu with all of the classic boba drinks and toppings, as well as fried snacks like popcorn chicken. The owner was extremely kind in getting to know us and talked to us throughout our time waiting for drinks/food. It's a casual cafe with some seating that would be great to lounge in during the afternoon.",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/VQtTqnivQ_zVfTudyCfVWA/o.jpg",
            "https://s3-media0.fl.yelpcdn.com/bphoto/_ZPl-qQdN6i3fCTPrBipHg/o.jpg",
            "https://s3-media0.fl.yelpcdn.com/bphoto/ruzWxydu4x-r8-DflAy38g/o.jpg"
        ]
    },
    {
        "id": "review-shervanip",
        "name": "Shervani P.",
        "location": "Cleveland, OH",
        "date": "Sep 26, 2025",
        "rating": null,
        "text": "Recently visited for the first time and loved T4! The staff was very friendly and helpful when they learned it was our first time visiting. They have drink recommendations by the staff on the wall in case you're not sure what to order. I ordered taro milk tea with boba and my SO ordered the Osaka milk tea with cheese foam on top. Both were very good! You can adjust your sweetness and ice levels which I appreciate. The taro was a nice combination of vanilla and nutty flavors which I really liked. The cheese foam on the Osaka milk tea was perfectly salty and balanced out the sweetness of the tea. The seating area is small but had enough space for the handful of people inside with enough tables to sit at. We will definitely be back!",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/8sXMit5cnB_UfHQOjLjWlg/o.jpg"
        ]
    },
    {
        "id": "review-michelley",
        "name": "Michelle Y.",
        "location": "Houston, TX",
        "date": "Aug 4, 2025",
        "rating": null,
        "text": "Good snacks and teas. Popcorn chicken is good. Wish they gave us napkins for all our hotdog, fries and chicken tho... kiddos loved having games available that they didn't even need device time while I drink my tea!",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/OELrpY5m7nkqJdI5HqBtuA/o.jpg",
            "https://s3-media0.fl.yelpcdn.com/bphoto/75WDjiXlmy5gkyF50_xh3w/o.jpg",
            "https://s3-media0.fl.yelpcdn.com/bphoto/yDhIxFWZARqonvytP3AV1w/o.jpg",
            "https://s3-media0.fl.yelpcdn.com/bphoto/tYSw112s0_830rqdYDIt9w/o.jpg",
            "https://s3-media0.fl.yelpcdn.com/bphoto/YLLO6TnqfKeVcWVs9Q14hw/o.jpg"
        ]
    },
    {
        "id": "review-julianh",
        "name": "Julian H.",
        "location": "OH",
        "date": "Jul 31, 2025",
        "rating": null,
        "text": "same as other T4 in Cali, love to come everytime passing by Dayton, like their jasmine tea with no sugar ! light and fresh !",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-alejandrao",
        "name": "Alejandra O.",
        "location": "Northeast Pensacola, Pensacola, FL",
        "date": "Jul 4, 2025",
        "rating": null,
        "text": "I appreciate their selections of teas and how there's a lot of fresh brewed options. They're almost always incredibly busy so definitely place your order ahead of time. They get marked down because a couple of times I've received tea that tasted watered down or like the leaves weren't steeped long enough. But usually, this a very solid place and had become my go-to bubble tea place in Dayton.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-tramt",
        "name": "Tram T.",
        "location": "Sterling, VA",
        "date": "Jun 29, 2025",
        "rating": null,
        "text": "The employee is very friendly and kind. They help me fix my order perfectly and deliciously with her suggestion! Drink is tasty and flavorful. Lively ambiance.",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/4k-cLtQDgGhayU3INg2o4w/o.jpg"
        ]
    },
    {
        "id": "review-noahr",
        "name": "Noah R.",
        "location": "Centerville, OH",
        "date": "Jun 16, 2025",
        "rating": null,
        "text": "Great place to go for tea! I personally recommend ordering the Peach Green Tea drink. The staff there are very friendly, knowledgeable, and go out of their way to inform you of their menu drink favorites.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-hanl",
        "name": "Han L.",
        "location": "Dayton, OH",
        "date": "May 19, 2025",
        "rating": null,
        "text": "Large Honey Green Tea ($6.00): Nice and strong tea flavor. Good balance of sweetness and bitter tea taste. Friendly and quick service. Received my drink soon after ordering. Lots of drink options to choose from. They have a good number of board games around the shop. Great for having something to do while waiting, or overall cozy spot to hang out.",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/90CVInLGJt1k9qk8_tUimQ/o.jpg"
        ]
    },
    {
        "id": "review-emmah",
        "name": "Emma H.",
        "location": "Centerville, OH",
        "date": "Apr 21, 2025",
        "rating": null,
        "text": "My new favorite boba shop! My husband and I stopped by for the first time and felt very welcomed. The lady behind the counter offered us free samples of the daily special and helped us look through the menu. We got the taro milk tea and the cherry blossom tea. Both the tea and tapioca pearls tasted very fresh. They weren't too sweet like some other places we've gone to. Overall very positive atmosphere and great customer service! We will definitely be back",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-mariak",
        "name": "Maria K.",
        "location": "Centerville, OH",
        "date": "Apr 9, 2025",
        "rating": null,
        "text": "Very cute boba shop. Great service even when we came with a large group. Good taro, brown sugar cake, and even their peach tea was REALLY good.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-am",
        "name": "A M.",
        "location": "Centerville, OH",
        "date": "Feb 1, 2025",
        "rating": null,
        "text": "You'd think that a place that advertises boba tea so heavily would actually have boba... right? Wrong. Every single time I have ever been to this place and I start ordering, we get to the boba part and ive been told every time that they are out of boba. This part is more my fault than anything but, because I already started an order I feel pressured to finish it and pay for my regular sized (their smallest size) $8 I don't even want anymore. This place is just disappointing more than anything. Wished they had what they advertise.",
        "visible": false,
        "photos": []
    },
    {
        "id": "review-kevink",
        "name": "Kevin K.",
        "location": "Las Vegas, NV",
        "date": "Dec 23, 2024",
        "rating": null,
        "text": "I haven't tried T4 before so I was excited to know a boba shop from Taiwan make it here to Dayton. The shop was beautifully decorated, the color is bright and vibrant. They offered an array of different boba teas. It was a little bit overwhelming thought for new customers. I got the winter melon tea with boba and it was great. It was the right sweetness that I like but you have to make sure to adjust your sweetness level with the cashier. Overall, it is a good place to try specially during summer/",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-mattb",
        "name": "Matt B.",
        "location": "Dayton, OH",
        "date": "Jul 31, 2024",
        "rating": null,
        "text": "The variety and quality of offering is simply outstanding. Service is always friendly. A great locally owned business deserving of support.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-brittas",
        "name": "Britta S.",
        "location": "West Chester, OH",
        "date": "Jun 7, 2024",
        "rating": null,
        "text": "I have tried MANY milk tea/boba shops in the Dayton- Centerville region and NONE have compared to T4. Service is always fast and wonderful-- the employees are so sweet!!! There are so many great options. The tea (milk or fruit) is always top quality (strong flavor, not artificial tasting, not watered down etc) and I am able to reduce the sweetness to my liking (other places the drinks are always way too sweet). The sitting area is always clean and neat!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-myaf",
        "name": "Mya F.",
        "location": "OH",
        "date": "Nov 9, 2023",
        "rating": null,
        "text": "so cute and homey and the employees are super nice. they have less standardized american flavors (they don't have peach or stuff like that) so i have i have to switch up my order a bit.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-jp",
        "name": "J P.",
        "location": "Silver Spring, MD",
        "date": "Oct 16, 2023",
        "rating": null,
        "text": "As close as you can get to Taiwanese boba tea. You can order warm milk tea with mini boba; perfect for cold weather.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-wendys",
        "name": "Wendy S.",
        "location": "OH",
        "date": "Sep 30, 2023",
        "rating": null,
        "text": "The drinks are delicious. The workers and owner are super nice. However, they always seem to run out of boba! This is a boba tea shop so you should always have enough boba! I have come at least 4 times and the place was out of boba. Makes no sense to me. Please keep making enough boba til you close!",
        "visible": false,
        "photos": []
    },
    {
        "id": "review-ericl",
        "name": "Eric L.",
        "location": "Centerville, OH",
        "date": "Aug 22, 2023",
        "rating": null,
        "text": "They were out of boba and peach on Sunday. Otherwise, everything was still good. Wife got a mango drink that she enjoyed and I got my usual which turned out great. Service was friendly.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-victoriaf",
        "name": "Victoria F.",
        "location": "SoMa, San Francisco, CA",
        "date": "Aug 20, 2023",
        "rating": null,
        "text": "We stopped by for our first bubble tea experience! I had been wanting to try it for some time and finally decided to give it try. So happy I did. The girl working was SO nice and patient with me as I explored the large menu. I got the Taro Milk Tea and it was soooo good. Definitely will be back to support this great small business!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-ryanm",
        "name": "Ryan M.",
        "location": "Dayton, OH",
        "date": "Jul 24, 2023",
        "rating": null,
        "text": "I just tried this place for the first time today and I was extremely impressed! I really had no idea what to order but the woman working there helped me pick out the perfect drink. I got the Grapefruit Royal Tea, and it was one of the most interesting and refreshing drinks that I've ever had. I will definitely be back!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-alexisb",
        "name": "Alexis B.",
        "location": "Athens, OH",
        "date": "Jul 9, 2023",
        "rating": null,
        "text": "Very kind and helpful staff and very delicious tea. The winter melon milk tea was delish . I didn't try the food but I am sure I will in the near future. The store itself is very aesthetic and cute inside. Will definitely be coming back. So many options!!!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-jaclynf",
        "name": "Jaclyn F.",
        "location": "OH",
        "date": "Jun 24, 2023",
        "rating": null,
        "text": "This small but adorable bubble tea shop has friendly staff, great atmosphere, and quick service. Drinks are Taiwanese style so you may not find exactly the menu you're used to at a boba tea cafe, but give it a shot and find a new favorite. Some classics are just called by different names here: if you're looking for tiger milk, all for the amber pearl latte. Matcha is called Kyoto green tea. I've been able to get any questions about the menu answered by staff but usually just Google it while I'm in line. My favorites are the green tea with cream crown (tastes like fairyland ocean) and honey peach royal tea with coconut jelly. My significant other usually gets their fruit smoothies. All of it is great for a warm day or anytime. Please support this tasty place!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-caitlynr",
        "name": "Caitlyn R.",
        "location": "OH",
        "date": "May 25, 2023",
        "rating": null,
        "text": "Very good food and drink customer service is wonderful.it is very clean and well decorated.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-naomiw",
        "name": "Naomi W.",
        "location": "Seattle, WA",
        "date": "Apr 21, 2023",
        "rating": null,
        "text": "So extremely happy there's a T4 here in the Dayton area. Just visiting family from the west coast and was so shocked to find this store. Everyone knows that T4 is a Sacramento thing and all across California now. It took me back to my times when I lived in Sac. The quality and taste is always on point. I ordered the Okinawa Milk Tea (my go to milk tea since I'm from Okinawa) with boba at 50% sweetness. It tasted exactly what it's like in Sac. I also ordered the black tea with lychee jelly at 50% sweet and my parents loved it. The owner was extremely nice and let my mom try different toppings (fig jelly and lychee jelly) as my mother has never had boba or any of the tea drinks before. She was pleasantly surprised. the store is bright, friendly and super clean. I'll never go to another boba spot except to this store- everywhere else in Dayton is way too sweet even at 50% and the quality is lacking. I'll be back, T4 Dayton! Keep it up!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-dougb",
        "name": "Doug B.",
        "location": "Miamisburg, OH",
        "date": "Apr 5, 2023",
        "rating": null,
        "text": "Best tea shop in Dayton! Coco, Kristen and the other staff are super friendly and helpful. Check it out!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-saraw",
        "name": "Sara W.",
        "location": "OH",
        "date": "Apr 5, 2023",
        "rating": null,
        "text": "Definitely recommend going here, the staff is literally the sweetest and took the time to let you try the add ins and give you recommendations also they were very patient with us. They really care about their customers. The boba was delicious I got the earl gray milk tea very yummy. The interior is very cute and very clean compared to some other boba shops I've been to. Definitely will be going again, probably the best in the Dayton area.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-nicoleb",
        "name": "Nicole B.",
        "location": "Murfreesboro, TN",
        "date": "Mar 12, 2023",
        "rating": null,
        "text": "Adorable little spot, kind workers that take the time to explain the menu, and delicious treats. This is a great new business in Centerville, our kids love it!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-andyh",
        "name": "Andy H.",
        "location": "Glendale, AZ",
        "date": "Feb 23, 2023",
        "rating": null,
        "text": "Love this place! Delicious teas, incredibly friendly people, great ordering experience. Everything always tastes fresh and the ambiance is bright and fun.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-kimb",
        "name": "Kim B.",
        "location": "Baltimore, MD",
        "date": "Jan 28, 2023",
        "rating": null,
        "text": "So excited to have a Boba tea spot so close to home! It's super legit. So legit I had to ask for recommendations! The flavors are amazing, like it really tasted like how a flower smells, make that make sense!!! So good!! And the service is amazing. Everyone is so nice and very patient. It's easy to miss but be on the lookout!! And support local business!!",
        "visible": true,
        "photos": [
            "https://s3-media0.fl.yelpcdn.com/bphoto/DNB4-3YiL3xgWD-6Bc8iGA/o.jpg"
        ]
    },
    {
        "id": "review-katrinab",
        "name": "Katrina B.",
        "location": "Dayton, OH",
        "date": "Jan 7, 2023",
        "rating": null,
        "text": "Very unassuming boba shop tucked away by DQ and the game shop in centerville, I hadn't heard they were opening otherwise would have been here day 1! I am always on the lookout for boba around dayton, and there's not many options around town. Good milk tea and seems bit more authentic to Taiwanese style than some other more Americanized boba around the area. Taro milk tea was delicious and you can adjust ice and sweetness level, broad topping selection. Only small downside is that personally I prefer fresh fruit smoothies with my boba and they use syrup. Will visit again!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-josiey",
        "name": "Josie Y.",
        "location": "OH",
        "date": "Dec 30, 2022",
        "rating": null,
        "text": "Cute place with very nice and welcoming customer service! The milk tea is also so good and legit! I've had the earl grey milk tea and roasted oolong milk tea and both were perfect. The pearls are also a great consistency and sweet enough. They don't have it on their menu yet, but their fried chicken is absolutely delicious! I feel like it's hard to get legit boba near Dayton, but this T4 is definitely my new favorite and go-to. I highly recommend for all the boba lovers!",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-joshuay",
        "name": "Joshua Y.",
        "location": "San Antonio, TX",
        "date": "Dec 28, 2022",
        "rating": null,
        "text": "Just opened. Lovely boba and great service. There's one close now to where we live.",
        "visible": true,
        "photos": []
    },
    {
        "id": "review-yafangw",
        "name": "Yafang W",
        "location": "",
        "date": "Apr 2024",
        "rating": null,
        "text": "Don't hesitate to ask questions and customize your drinks.",
        "visible": true,
        "photos": []
    }
]$json$::jsonb))
on conflict (key) do update
    set content = jsonb_set(public.site_content.content, '{reviews}', excluded.content -> 'reviews');
