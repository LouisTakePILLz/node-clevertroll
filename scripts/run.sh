#!/bin/env sh

#export API_CLEVERBOT_USER="API USER HERE"
#export API_CLEVERBOT_TOKEN="API TOKEN HERE"

npm start -- \
--email $(zenity --entry --title "E-mail address" --text "E-mail address:") \
--password $(zenity --password --title "Password" --text "Password:")
