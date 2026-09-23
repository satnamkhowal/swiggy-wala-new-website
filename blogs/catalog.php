<?php
declare(strict_types=1);

function blog_destinations(): array {
    return [
        'udaipur'=>['Udaipur','City of Lakes','City Palace, Lake Pichola and Sajjangarh'],
        'jaipur'=>['Jaipur','Pink City','Amber Fort, City Palace and local bazaars'],
        'jodhpur'=>['Jodhpur','Blue City','Mehrangarh Fort, Jaswant Thada and old-city lanes'],
        'jaisalmer'=>['Jaisalmer','Golden City','Jaisalmer Fort, havelis and desert experiences'],
        'pushkar'=>['Pushkar','Sacred Lake Town','Pushkar Lake, Brahma Temple and market lanes'],
        'mount-abu'=>['Mount Abu','Rajasthan Hill Station','Dilwara Temples, Nakki Lake and viewpoints'],
        'ajmer'=>['Ajmer','Pilgrimage City','Ajmer Sharif, Ana Sagar and nearby Pushkar'],
        'bikaner'=>['Bikaner','Desert Heritage City','Junagarh Fort, old havelis and local food'],
        'chittorgarh'=>['Chittorgarh','Fort City','Chittorgarh Fort, towers and palace ruins'],
        'kumbhalgarh'=>['Kumbhalgarh','Aravalli Fort Escape','Kumbhalgarh Fort, viewpoints and nearby villages'],
        'ranakpur'=>['Ranakpur','Temple Valley','Ranakpur Jain Temple and Aravalli countryside'],
        'alwar'=>['Alwar','Gateway to Rajasthan','Bala Quila, City Palace and nearby lakes'],
        'bharatpur'=>['Bharatpur','Birding Gateway','Keoladeo National Park and heritage sites'],
        'bundi'=>['Bundi','Stepwell City','Taragarh Fort, Bundi Palace and stepwells'],
        'kota'=>['Kota','Chambal City','riverfront sights, gardens and nearby heritage'],
        'neemrana'=>['Neemrana','Heritage Weekend Escape','fort stays and Aravalli landscapes'],
        'sawai-madhopur'=>['Sawai Madhopur','Ranthambore Gateway','Ranthambore safaris, fort and local nature'],
        'nathdwara'=>['Nathdwara','Temple Town','Shrinathji Temple, local art and nearby Eklingji'],
        'mandawa'=>['Mandawa','Shekhawati Open-Air Gallery','painted havelis and heritage lanes'],
        'osian'=>['Osian','Desert Temple Town','ancient temples, dunes and village landscapes'],
        'delhi'=>['Delhi','Capital Gateway','Old Delhi, New Delhi landmarks and Rajasthan connections'],
        'agra'=>['Agra','Taj City','Taj Mahal, Agra Fort and Rajasthan routes'],
        'rishikesh'=>['Rishikesh','Yoga Capital','Ganga ghats, ashrams and outdoor experiences'],
        'varanasi'=>['Varanasi','Ancient Spiritual City','Ganga ghats, old lanes and cultural rituals'],
        'amritsar'=>['Amritsar','Golden Temple City','Golden Temple, heritage streets and Punjabi food'],
        'shimla'=>['Shimla','Himalayan Hill City','Mall Road, viewpoints and colonial heritage'],
        'manali'=>['Manali','Mountain Holiday Town','valleys, mountain drives and local temples'],
        'goa'=>['Goa','Coastal Escape','beaches, heritage quarters and local cuisine'],
        'mumbai'=>['Mumbai','Maximum City','waterfront landmarks, markets and cultural districts'],
        'ahmedabad'=>['Ahmedabad','Heritage City','old-city walks, museums and stepwells'],
        'indore'=>['Indore','Food Capital of Madhya Pradesh','markets, palaces and regional food'],
        'khajuraho'=>['Khajuraho','Temple Heritage Town','UNESCO temples and nearby nature'],
        'orchha'=>['Orchha','Riverside Heritage Town','palaces, cenotaphs and Betwa river views'],
        'lucknow'=>['Lucknow','City of Nawabs','imambaras, heritage walks and Awadhi cuisine'],
        'haridwar'=>['Haridwar','Ganga Pilgrimage City','Har Ki Pauri, temples and nearby Rishikesh'],
        'mussoorie'=>['Mussoorie','Queen of the Hills','Mall Road, waterfalls and Himalayan viewpoints'],
        'nainital'=>['Nainital','Lake District','Naini Lake, viewpoints and Kumaon excursions'],
        'ranthambore'=>['Ranthambore','Wildlife Destination','responsible safaris, fort and nature zones'],
        'sariska'=>['Sariska','Aravalli Wildlife Escape','responsible safaris and nearby Alwar heritage'],
        'rajasthan'=>['Rajasthan','Land of Kings','forts, palaces, lakes, deserts and cultural routes']
    ];
}

function blog_topics(): array {
    return [
        'travel-guide'=>['Complete Travel Guide','travel guide','first-time planning'],
        'two-day-itinerary'=>['2-Day Itinerary','2 day itinerary','a short weekend'],
        'three-day-itinerary'=>['3-Day Itinerary','3 day itinerary','a balanced city break'],
        'four-day-itinerary'=>['4-Day Itinerary','4 day itinerary','a relaxed holiday'],
        'five-day-itinerary'=>['5-Day Itinerary','5 day itinerary','an in-depth trip'],
        'best-places-to-visit'=>['Best Places to Visit','best places to visit','essential sightseeing'],
        'best-time-to-visit'=>['Best Time to Visit','best time to visit','weather and seasons'],
        'trip-cost'=>['Trip Cost and Budget Guide','trip cost','budget planning'],
        'family-trip'=>['Family Trip Guide','family trip','a comfortable family holiday'],
        'honeymoon-guide'=>['Honeymoon Guide','honeymoon','a romantic couple trip'],
        'solo-travel-guide'=>['Solo Travel Guide','solo travel','a safer independent journey'],
        'weekend-trip'=>['Weekend Trip Plan','weekend trip','a quick escape'],
        'road-trip-guide'=>['Road Trip Guide','road trip','a practical driving route'],
        'food-guide'=>['Local Food Guide','local food','regional flavours and trusted dining'],
        'shopping-guide'=>['Shopping Guide','shopping','markets, crafts and souvenirs'],
        'hotel-area-guide'=>['Where to Stay','best areas to stay','choosing the right neighbourhood'],
        'photography-guide'=>['Photography Guide','photography spots','responsible travel photography'],
        'heritage-tour'=>['Heritage Tour Guide','heritage tour','history and architecture'],
        'luxury-trip'=>['Luxury Trip Guide','luxury trip','premium stays and private experiences'],
        'budget-trip'=>['Budget Trip Guide','budget trip','value-focused travel'],
        'monsoon-trip'=>['Monsoon Travel Guide','monsoon trip','rainy-season landscapes'],
        'winter-trip'=>['Winter Travel Guide','winter trip','cool-weather sightseeing'],
        'summer-trip'=>['Summer Travel Guide','summer trip','heat-smart planning'],
        'couple-trip'=>['Couple Trip Guide','couple trip','an unhurried getaway'],
        'tour-package-guide'=>['Tour Package Planning Guide','tour package','comparing inclusions and routes']
    ];
}

function manual_blogs(): array {
    return [
        'jaipur-sightseeing-tour-by-cab'=>[
            'slug'=>'jaipur-sightseeing-tour-by-cab',
            'destination'=>'Jaipur',
            'nickname'=>'Pink City',
            'highlights'=>'Amber Fort, Jal Mahal, Hawa Mahal, Jantar Mantar and City Palace',
            'topic'=>'Sightseeing Tour by Cab',
            'keyword'=>'Jaipur sightseeing tour by cab',
            'intent'=>'a comfortable one-day Jaipur sightseeing route by private cab',
            'image'=>'/blogs/images/jaipur-sightseeing-tour-by-cab.webp',
            'title'=>'Jaipur Sightseeing Tour by Cab: 1-Day Local Jaipur Guide | Swiggy Wala',
            'description'=>'Plan a Jaipur sightseeing tour by cab with a practical one-day route covering Amber Fort, Jal Mahal, Hawa Mahal, Jantar Mantar, City Palace and local markets.',
            'date'=>'2026-09-16',
            'intro'=>'A Jaipur sightseeing tour by cab is a practical way to connect the Pink City’s hill forts, lake viewpoints and historic centre without repeatedly changing transport. The best day is not the one with the most stops; it is the one that groups nearby attractions, starts early and leaves enough time for walking, tickets, meals and traffic. This guide gives first-time visitors a realistic private-cab route while keeping monument timings, local rules and personal interests flexible.',
            'sections'=>[
                ['Suggested Jaipur sightseeing route by cab','Start in the morning with Amber Fort because the fort area is outside the walled city and usually takes more time than a quick photo stop. After Amber, pause at Jal Mahal from the permitted roadside viewing area. Continue towards the Pink City for Hawa Mahal, Jantar Mantar and City Palace, which are close enough to combine with some walking. Finish with a market visit such as Johari Bazaar or Bapu Bazaar if energy and traffic allow. This order reduces backtracking and keeps the central heritage cluster together.'],
                ['Amber Fort: begin before the day gets busy','Amber Fort is one of Jaipur’s major heritage anchors and deserves enough time for courtyards, gateways, viewpoints and museum-style spaces rather than a rushed stop. An early departure can make the drive and entry process easier. Your driver can normally drop you near the authorised access area, but parking, shuttle arrangements and visitor rules can change. Wear comfortable footwear and carry water. If you want deeper historical context, use an authorised guide and agree on the scope and fee before starting.'],
                ['Jal Mahal and the route into the Pink City','Jal Mahal works best as a short scenic stop between Amber and central Jaipur. Visitors generally view the palace from the lakeside road rather than treating it as a long sightseeing visit. From here, continue toward the walled city. Traffic can become slow around popular heritage streets, so a good cab plan should include realistic buffers and a sensible drop-off point. For Hawa Mahal, the famous façade is best appreciated from the street area while the interior visit depends on your available time and current entry arrangements.'],
                ['Hawa Mahal, Jantar Mantar and City Palace','These central attractions form the strongest walkable heritage cluster in Jaipur. Instead of asking the cab to move a few hundred metres at a time, use one practical drop point and cover nearby monuments on foot where suitable. Jantar Mantar is valuable for travellers interested in astronomy and historic scientific instruments, while City Palace adds royal architecture, courtyards and collections. Check current ticketing and photography rules at the official counters. Keep enough time for shade and refreshments, especially in warmer months.'],
                ['Lunch, local markets and optional evening stops','Plan lunch around the Pink City or another central area instead of driving far away during peak sightseeing hours. After the main monuments, choose one market rather than trying to shop everywhere. Johari Bazaar is associated with jewellery and traditional shopping, while Bapu Bazaar is commonly visited for textiles, footwear and souvenirs. If you still have time, Albert Hall Museum, Birla Mandir or a sunset viewpoint can be considered, but avoid forcing an extra stop simply to make the itinerary look longer.'],
                ['Choosing the right cab for Jaipur sightseeing','Vehicle choice should depend on passenger count, luggage and comfort requirements. Confirm whether the quotation covers the planned local sightseeing period, fuel, parking, tolls if any, waiting time and driver allowance. Ask for the vehicle type and pickup point in writing. For families and senior travellers, easy entry, air-conditioning and planned rest breaks matter more than squeezing in an extra attraction. Seat belts should be used wherever available and unnecessary late-night driving should be avoided.'],
                ['How much time should you keep for a Jaipur city tour?','A full sightseeing day gives a better experience than trying to combine airport transfers, multiple forts, shopping and every city monument in a few hours. Actual timing depends on your hotel location, queues, traffic, weather and how long you spend at Amber Fort and City Palace. Treat online schedules as planning frameworks rather than guarantees. If you have two days, separate the northern forts from the Pink City monuments for a slower and more detailed visit.'],
                ['Booking and practical travel tips','Share your travel date, hotel or pickup area, number of travellers and priority attractions before confirming the cab. Keep digital copies of booking details and ask for a clear quotation. Attraction entry fees, operating hours, parking systems and local traffic arrangements can change, so reconfirm them close to the trip. Dress respectfully at religious places, ask before photographing people and avoid unverified shopping commissions. A transparent route and clear inclusions make the sightseeing day easier for both traveller and driver.']
            ]
        ]
    ];
}

function all_programmatic_blogs(): array {
    $rows=manual_blogs();
    foreach(blog_destinations() as $dslug=>$d){
        foreach(blog_topics() as $tslug=>$t){
            $slug=$dslug.'-'.$tslug;
            $rows[$slug]=['slug'=>$slug,'destination'=>$d[0],'nickname'=>$d[1],'highlights'=>$d[2],'topic'=>$t[0],'keyword'=>$d[0].' '.$t[1],'intent'=>$t[2],'image'=>'/blogs/images/'.$dslug.'.webp'];
        }
    }
    return $rows;
}

function get_programmatic_blog(string $slug): ?array {
    $manual=manual_blogs();
    if(isset($manual[$slug])) return $manual[$slug];
    foreach(blog_destinations() as $dslug=>$d){
        if(str_starts_with($slug,$dslug.'-')){
            $tslug=substr($slug,strlen($dslug)+1); $topics=blog_topics();
            if(!isset($topics[$tslug])) return null;
            $t=$topics[$tslug];
            return ['slug'=>$slug,'destination'=>$d[0],'nickname'=>$d[1],'highlights'=>$d[2],'topic'=>$t[0],'keyword'=>$d[0].' '.$t[1],'intent'=>$t[2],'image'=>'/blogs/images/'.$dslug.'.webp'];
        }
    }
    return null;
}
