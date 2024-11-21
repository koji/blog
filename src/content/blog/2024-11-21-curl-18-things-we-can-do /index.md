---
title: 'Master the Magic of cURL: From IP Lookup to QR Codes and Beyond!'
seoTitle: 'Learn How to Use cURL for IP Lookup, QR Codes, Weather, and Crypto Rates'
slug: 'curl-ip-lookup-qr-code-weather-crypto'
description: 'Unlock the full potential of cURL! This step-by-step guide covers everything from checking your IP, generating QR codes, viewing weather reports, and tracking cryptocurrency rates with simple commands. Perfect for developers and tech enthusiasts alike!'
pubDate: '2024-11-21'
updatedDate: '2024-11-21'
tags: ["cURL", "IP Lookup", "QR Code", "Weather Report", "Cryptocurrency", "Tech Tips", "Command Line"]
coverImage: './cover.jpg'
---

Here is how to install curl on macOS/Windows/Linux
https://help.ubidots.com/en/articles/2165289-learn-how-to-install-run-curl-on-windows-macosx-linux

### get ipinfo

```zsh
$ curl ipinfo.io
{
  "ip": "xxx.xxx.xxx.xxx",
  "hostname": "cpe-xxx-xxx-xxx-xxx.xxs.sss.sss.com",
  "city": "Brooklyn",
  "region": "New York",
  "country": "US",
  "loc": "xx.aaaa,yy.bbbb",
  "org": "TTTTT Inc",
  "postal": "xxxxx",
  "timezone": "America/New_York",
  "readme": "https://ipinfo.io/missingauth"
}%

```

### generate QR code
The following is a QR code to access my personal website.
`/` you can put anything you want to show(string, number, and url).
```zsh
$ curl qrenco.de/https://github.com/koji
█████████████████████████████████
█████████████████████████████████
████ ▄▄▄▄▄ ██▀▄███  ██ ▄▄▄▄▄ ████
████ █   █ █▄▀█▄▀█▀▄██ █   █ ████
████ █▄▄▄█ ██▄▀▀ ▀▄  █ █▄▄▄█ ████
████▄▄▄▄▄▄▄█ █▄▀▄▀ ▀▄█▄▄▄▄▄▄▄████
████▄▄▄▀▄▄▄ ▄▀█▀ █▄▄   ███▄█▀████
████▄█▄ ▄ ▄██▀ ▄  ▄█▄▄▀ ▀█▄ ▄████
█████▀▄  █▄ ▀█  ██▄▄   ██ █▄ ████
████▄▀▀▄▀▄▄▄▀ █▀█▄██▀▀▀▄▀█▄ ▄████
████▄█▄▄█▄▄█ █▄▀ ▀█  ▄▄▄  █▀▀████
████ ▄▄▄▄▄ █ ▄█▄ ▀ ▄ █▄█  █ ▄████
████ █   █ █▄▀▄ ██ █ ▄▄   ▀▄▄████
████ █▄▄▄█ █   ▀█▄█▀▀▀▀█ ▀█▀▄████
████▄▄▄▄▄▄▄█▄▄██▄██▄▄▄▄▄███▄▄████
█████████████████████████████████
█████████████████████████████████
```

we can create a function with the above command. Open .bashrc or .zshrc and add the following.
```zsh
# generate qr code
gen_qr() {
  curl qrenco.de/$1
}

```

[usage]
```zsh
gen_qr https://github.com/koji
```



### get weather info
If you change after `/`, you can see the weather that you want to know.
```zsh
$ curl wttr.in/newyork
Weather report: newyork

      \   /     Clear
       .-.      +33(28) °F
    ― (   ) ―   ↗ 0 mph
       `-’      9 mi
      /   \     0.0 in
                                                       ┌─────────────┐
┌──────────────────────────────┬───────────────────────┤  Sun 21 Feb ├───────────────────────┬──────────────────────────────┐
│            Morning           │             Noon      └──────┬──────┘     Evening           │             Night            │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│     \   /     Sunny          │     \   /     Sunny          │    \  /       Partly cloudy  │               Cloudy         │
│      .-.      21(12) °F      │      .-.      30(21) °F      │  _ /"".-.     +33(28) °F     │      .--.     28(21) °F      │
│   ― (   ) ―   ↘ 9-14 mph     │   ― (   ) ―   ↘ 8-9 mph      │    \_(   ).   → 4-6 mph      │   .-(    ).   ↗ 5-8 mph      │
│      `-’      6 mi           │      `-’      6 mi           │    /(___(__)  6 mi           │  (___.__)__)  6 mi           │
│     /   \     0.0 in | 0%    │     /   \     0.0 in | 0%    │               0.0 in | 0%    │               0.0 in | 0%    │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
                                                       ┌─────────────┐
┌──────────────────────────────┬───────────────────────┤  Mon 22 Feb ├───────────────────────┬──────────────────────────────┐
│            Morning           │             Noon      └──────┬──────┘     Evening           │             Night            │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│               Overcast       │      .-.      Light sleet    │      .-.      Moderate rain  │               Overcast       │
│      .--.     32(23) °F      │     (   ).    +35(26) °F     │     (   ).    +33(28) °F     │      .--.     26 °F          │
│   .-(    ).   ↑ 11-18 mph    │    (___(__)   ↑ 11-16 mph    │    (___(__)   ↗ 10-17 mph    │   .-(    ).   ↗ 7-13 mph     │
│  (___.__)__)  3 mi           │     ‘ * ‘ *   6 mi           │   ‚‘‚‘‚‘‚‘    4 mi           │  (___.__)__)  4 mi           │
│               0.0 in | 0%    │    * ‘ * ‘    0.0 in | 29%   │   ‚’‚’‚’‚’    0.2 in | 56%   │               0.1 in | 0%    │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
                                                       ┌─────────────┐
┌──────────────────────────────┬───────────────────────┤  Tue 23 Feb ├───────────────────────┬──────────────────────────────┐
│            Morning           │             Noon      └──────┬──────┘     Evening           │             Night            │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│    \  /       Partly cloudy  │               Overcast       │     \   /     Clear          │    \  /       Partly cloudy  │
│  _ /"".-.     32(23) °F      │      .--.     +35(26) °F     │      .-.      +37(30) °F     │  _ /"".-.     +35(28) °F     │
│    \_(   ).   → 9-14 mph     │   .-(    ).   ↗ 11-15 mph    │   ― (   ) ―   ↗ 11-18 mph    │    \_(   ).   ↗ 11-19 mph    │
│    /(___(__)  6 mi           │  (___.__)__)  6 mi           │      `-’      6 mi           │    /(___(__)  6 mi           │
│               0.0 in | 0%    │               0.0 in | 0%    │     /   \     0.0 in | 0%    │               0.0 in | 0%    │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
```

we can create a function with the above command. Open .bashrc or .zshrc and add the following.
```zsh
# wttr - check weather
wttr() {
  curl wttr.in/$1
}
```

[usage]
```zsh
wttr newyork
```


### get cryptocurrency rate
The `rate.sx` shows you famous currencies' rate. If you put a specific currency, you can see the rate and a chart of the currency.
```zsh
$ curl rate.sx

# if you want to see a specific currency, you can type curl rate.sx/etc

                                                                      _
                                                             _ _ __ _| |_ ___  ____ __
                                                            | '_/ _` |  _/ -_)(_-< \ /
__................................................__________|_| \__,_|\__\___()__/_\_\_____
 '           '           '           '           '

Market Cap: $1,693,391,363,316 =
24h Vol: $141,903,885,617 =
BTC Dominance: 61.7% =
┌──────┬──────┬─────────────┬──────────────┬─────────────┬──────────────────┬──────────────┐
│ Rank │ Coin │ Price (USD) │ Change (24H) │ Change (1H) │ Market Cap (USD) │ Spark (1H)   │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 1    │ BTC  │ 55806.9     │ -1.43%       │ -0.84%      │ 1.040T           │ ▂▁▁▁▂▇▂▅▃▅▃▁ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 2    │ ETH  │ 1856.99     │ -4.33%       │ -1.30%      │ 213.128B         │ ▃▂▂▂▃▇▂▇▇▇▃▇ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 3    │ BNB  │ 275.070     │ 4.42%        │ -1.05%      │ 42.507B          │ ▃▁▁▁▅▇▁▅▅▇▁▁ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 4    │ USDT │ 0.999895    │ -0.00%       │ 0.00%       │ 34.254B          │ ▂▁▇▂▁▇▂▅▃▂▁▇ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 5    │ DOT  │ 37.5132     │ -3.17%       │ -0.78%      │ 34.148B          │ ▃▁▁▂▁▇▅▁▃▅▂▃ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 6    │ ADA  │ 1.03773     │ -5.29%       │ -1.04%      │ 32.286B          │ ▂▂▁▁▂▅▁▂▅▇▃▂ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 7    │ XRP  │ 0.526163    │ 0.60%        │ -1.01%      │ 23.890B          │ ▂▃▁▁▁▇▁▃▇▇▂▁ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 8    │ LTC  │ 217.838     │ -3.43%       │ -2.08%      │ 14.493B          │ ▁▁▁▁▁▇▂▅▅▃▅▁ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 9    │ LINK │ 32.0389     │ -5.71%       │ -1.67%      │ 13.088B          │ ▂▅▁▁▁▅▁▁▇▇▇▂ │
├──────┼──────┼─────────────┼──────────────┼─────────────┼──────────────────┼──────────────┤
│ 10   │ BCH  │ 676.781     │ -0.68%       │ -1.11%      │ 12.630B          │ ▂▁▁▁▂▅▁▅▅▇▂▁ │
└──────┴──────┴─────────────┴──────────────┴─────────────┴──────────────────┴──────────────┘
2021-02-22 04:40:23.577769 UTC

$ curl rate.sx/eth

▶ Ethereum (ETH) ▶ Sun 21 +1d -4.35%

  │                                               1970.0
  │ ⡇                   ⢠⠣⡀                        ⡖⠙⢣
  │ ⡇                  ⢀⠼ ⠑⠄⣄⡄                    ⢰⠁  ⢣
  │ ⡇                  ⡎    ⠈⢣⢣     ⡠⠔⠲⡀⣀ ⣄       ⡸    ⠑⡄
  │ ⡇                 ⢰⠁      ⠈⡆  ⢸⡀⡇  ⠇⠃⣇⠏⣆⡄⡜⢆   ⡅     ⡇
  │ ⡇                 ⢸        ⠣⡠⡜⡎⣧⠃    ⢹ ⠋⠈ ⠈⢱ ⠰⠃     ⢨
  │ ⡇⢰⡄ ⡀             ⡜            ⠋            ⠳⠁      ⠈⡆
  │ ⡿⡇⠘⠊⠸⡀ ⢰⡇        ⢀⡇                                  ⡇
  │  ⠁   ⢇⡀⡜⢇  ⢰⡇⠠⢄⠄⢇⡘                                   ⡇         ⡀
  │      ⠈⢱⠃⢸  ⢸⣇⠇  ⠘⠇                                   ⢸  ⢀    ⡀ ⣳
  │         ⢸  ⢸⠹                                        ⠘⠊⠆⢿⢠⢇ ⢰⠑⠜⢸
  │         ⢸  ⡜                                            ⠸⡎⢸ ⡜  ⠘⡄
  │          ⡇⡆⡇                                             ⠃⠘⡄⡇   ⡇⣀      ⢀
  │          ⠙⢸⠃                                               ⣇⠇   ⠈⠘⡄ ⢠⠋⡆ ⣻
  │                                                            ⣷      ⡇ ⢸ ⢱⢀⠇⢇
  │                                                            ⠋      ⢣ ⡇ ⢸⢸ ⠈⡆
  │                                                                   ⢸⡆⠃  ⠛  ⠸⡀
  │                                                                   ⠸⠁       ⡇
  │                                                                            ⢱
  │                                                                            ⢸⢀
  │                                                                            ⠨⣿
  │                                                                             ⠘⡄⡀
  │                                                                              ⡇⣷
  │                                                                              ⢳⠹⡀
  │                                                                              ⠘ ⡇
  │                                                                                ⡇
  │                                                                              1860.0
  └────────────────────────────────────────────────────────────────────────────────

begin: $1941.5 (Sun 21 04:50) // end: $1857.0 (Mon 22 04:40)
high: $1973.9 (Sun 21 19:40) // low: $1857.0 (Mon 22 04:40)
avg: $1938.5 // median: $1915.5 // change: -84.524 (-4.35%)
Use @ for interval specification: /btc@10d, /eth@4w, /xrp@January (more in /:help)
```


we can create a function with the above command. Open .bashrc or .zshrc and add the following.
```zsh
# crypto_rate
crypto_rate() {
  # Check if symbol argument is provided
  if [[ -n "$1" ]]; then
    # Use the provided symbol
    symbol="$1"
  else
    # Use default symbol (entire quote)
    symbol=""
  fi

  # Construct the URL with the symbol
  url="https://rate.sx/$symbol"

  # Execute curl command and display the output
  curl "$url"
}

```

[usage]
```zsh
crypto_rate # for top cryptocurrencies
crypto_rate btc # for btc
crypto_rate eth # for eth
```





### Watch animation on Terminal

```zsh
$ curl ascii.live/nyan

.,
                   ..   ;
                  ;'     c
                   .... ;
   .........        .,:.........................
,,,;;;;;;;;;,,,,,,,,,;;;;;;.c0KK00000O00O0000KKKo
oooxxxxxxxxxoooooooodxxxxxx.oK0kx000Ok00kxxk0O0Kk
kkk000000000kkkkkkkkO000000.o0000000O000c;;:cx00k   ';
XXXXXXXXXXXXXXXXXXXXXXXXXXX.o0000O0Ox000':ddl;;;; ;odd.
OOOkxxxxxxxkOOOOOOOOOxxxx;, o000Ok00Ox0c,ldxdddddddxdd:.
xxxdddddddddxxxxxxxxxl;;;oo o0kk00000O0.:ddo,'ddo;dl.:d,
lllcccccccccllllllll;.ol .. oK0Ok0Ox000.:kOxc:do;od,ckO;
::::;;;;;;;:::::::::;'''';; ;0K0O000000kc:odc.,'.,,.cc.
;;,.........,;;;;;;;,..... :c'..';,...cc'..',....;'..
                           ..    .    ''k:  .    ..
                                        ,

          .:
        ..   ,
       ';     o
        .. ' ,
           .
                                                          ..
                                                          ..
                                                       ;'    .c

                                                          lk
```


we can create a function with the above command.
https://gist.github.com/koji/666f60f44ae3d980dd62ebdd24436511

[usage]
```zsh
ascii_live
```


### get a page

```zsh
$ $ curl https://google.com
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="https://www.google.com/">here</A>.
</BODY></HTML>

# save as a html
$ curl -o google.html https://google.com

# get only header info
$ curl --head https://google.com
HTTP/2 301
location: https://www.google.com/
content-type: text/html; charset=UTF-8
date: Mon, 22 Feb 2021 09:26:54 GMT
expires: Wed, 24 Mar 2021 09:26:54 GMT
cache-control: public, max-age=2592000
server: gws
content-length: 220
x-xss-protection: 0
x-frame-options: SAMEORIGIN
alt-svc: h3-29=":443"; ma=2592000,h3-T051=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"
```

### get method

In this case, I used [https://openweathermap.org/](https://openweathermap.org/) with jq (I will post an article on jq soon).

```zsh
$ curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key&units=metric" | jq

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   469  100   461  100     8   2727     47 --:--:-- --:--:-- --:--:--  2775
{
  "coord": {
    "lon": -0.1257,
    "lat": 51.5085
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 8.79,
    "feels_like": 7.31,
    "temp_min": 7.78,
    "temp_max": 10,
    "pressure": 1011,
    "humidity": 87
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.03,
    "deg": 0
  },
  "clouds": {
    "all": 100
  },
  "dt": 1613974910,
  "sys": {
    "type": 1,
    "id": 1414,
    "country": "GB",
    "sunrise": 1613977229,
    "sunset": 1614014870
  },
  "timezone": 0,
  "id": 2643743,
  "name": "London",
  "cod": 200
}
```

### post method

```zsh
$ curl -d "param1=aaa&param=bbb" https://api.com
```

### post json

```zsh
$ curl -H "Content-Type: application/json" \
-d '{"key": "value"}' https://api.com

# with @ we can load a file
$ curl -H "Content-Type: application/json" \
-d @params.json https://api.com
```

### Basic auth

```zsh
$ curl -u id:password https://example.com
```

### use Bearer

```zsh
$ curl -H 'Authorization: Bearer xxxxxxxx' https://api.com
```

### generate a curl command from Google Chrome
Open DevTool > Network > right click `name` > copy > `copy as cURL` or `copy all as cURL`

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/epki7szl0zakix88xkkz.png)

```zsh
curl 'chrome-extension://jlmpjdjjbgclbocgajdjefcidcncaied/index.html' --compressed ;
curl 'chrome-extension://jlmpjdjjbgclbocgajdjefcidcncaied/css/home.94d1d1b7.css' \
  -H 'Referer: ' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36' \
  -H 'DNT: 1' \
  --compressed ;
curl 'chrome-extension://jlmpjdjjbgclbocgajdjefcidcncaied/css/standalone/standalone.723be05a.css' \
  -H 'Referer: ' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36' \
  -H 'DNT: 1' \
  --compressed ;
curl 'chrome-extension://jlmpjdjjbgclbocgajdjefcidcncaied/js/home.home.js' \
  -H 'Referer: ' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36' \
  -H 'DNT: 1' \
  --compressed ;
curl 'chrome-extension://jlmpjdjjbgclbocgajdjefcidcncaied/standalone/stand
  --compressed
```

### Send Cookie
```zsh
$ curl -b 'key=value; key2=value2;' https://test.cookie.com
$ curl --cookie 'key=value; key2=value2;' https://test.cookie.com
```

### Save Cookie
```zsh
$ curl -c cookie.txt https://test.cookie.com
```

### Send back Cookie
Send back stored cookie file, cookie.txt
```zsh
$ curl -b cookie.txt https://test.cookie.com
```

### Upload file

```zsh
$ curl -F file_name=@sample.txt https://uploader.com
```

### measure the response (benchmark)

```zsh
$ curl https://dev.to -s -o /dev/null -w "%{time_total}\n"
0.150539
```
Only one-time measurement doesn't make sense lol
The following is do the same thing 10 times and calc the average.
```zsh
$ for i in {1..10}; do curl https://dev.to -s -o /dev/null -w "%{time_total}\n";done | awk '{sum+=$1;print $1} END {print "AVG: " sum/NR}'


0.464525
0.132371
0.136095
0.137686
0.143925
0.132686
0.141533
0.122407
0.131222
0.162784
AVG: 0.170523
``` 

we can create a function with the above command.

```zsh
check_site() {
 # Print prompts using print -n and echo
  print -n "Enter the website URL: "
  echo

  # Read user input for URL
  read -r url

  # Check if URL is empty
  if [[ -z "$url" ]]; then
    echo "Error: Please enter a valid URL."
    return 1
  fi

  # Print prompt for number of checks
  print -n "Enter the number of checks to perform (average): "
  echo

  # Read user input for number of checks
  read -r num_checks

  # Check if number of checks is valid
  if [[ ! "$num_checks" =~ ^[0-9]+$ ]]; then
    echo "Error: Please enter a valid positive integer for number of checks."
    return 1
  fi

  # Check if number of checks is valid
  if [[ ! "$num_checks" =~ ^[0-9]+$ ]]; then
    echo "Error: Please enter a valid positive integer for number of checks."
    return 1
  fi

  # Initialize variables for total time and average
  total_time=0
  avg_time=0

  # Loop for the specified number of checks
  for (( i=1; i <= num_checks; i++ )); do
    # Execute curl command and capture response time
    response_time=$(curl -s -o /dev/null -w "%{time_total}\n" "$url")
    total_time=$(echo "$total_time + $response_time" | bc)

    # Print individual response time for each check (optional)
    # echo "Check $i: $response_time seconds"
  done

  # Calculate average response time
  avg_time=$(echo "scale=2; $total_time / $num_checks" | bc)

  # Display results
  echo "Average response time for $url over $num_checks checks: $avg_time seconds"
}
```

[usage]
```zsh
Enter the website URL: 
http://google.com
Enter the number of checks to perform (average): 
10
Average response time for http://google.com over 10 checks: 1.24 seconds
```
