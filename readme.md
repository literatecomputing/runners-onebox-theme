# Runner's Oneboxes!

Make pretty oneboxes for Garmin and Strava URLs.

Garmin takes URLs like `https://connect.garmin.com/modern/activity/1234` or `https://connect.garmin.com/modern/activity/1234?share_unique_id=5` and changes them into an `<iframe>` (that you could copy from the Garmin share site and paste in yourself). Finding and pasting the iframe is more than most people can muster. With this theme component people can just paste in the URL from their browser or phone.

Strava takes urls like `https://www.strava.com/activities/1234` and converts them into an embed like 
```
<div class="strava-embed-placeholder" data-embed-type="activity" data-embed-id="1234"></div><script src="https://strava-embeds.com/embed.js"></script>
```
which can be copied by clicking the share icon. Discourse will not allow an arbitrary `<div>` or `<script>` elements to be inserted, so pasting that in would do nothing. With this theme component, you can just paste in the URL from your browser.


## Add these settings in order for the theme component to work

`content security policy script src` needs `https://strava-embeds.com/embed.js` in order for Strava's script to be allowed.

`allowed iframes` needs `https://connect.garmin.com` in order for the `<iframe>` to be allowed.

## TODO

If you get a share link from the strava app, you'll get something like `https://strava.app.link/A09cutdulzb`, which isn't easily converted into something that I can configure out how to make pretty.

Move this to github. Right now, it's just directly loaded into the database.
