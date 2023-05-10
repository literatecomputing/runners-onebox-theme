import { withPluginApi } from "discourse/lib/plugin-api";
export default {
  name: "initialize-garmin-onebox",
  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.decorateCookedElement(this.createGarminOnebox, {
        id: "garmin-onebox",
      });
      // api.decorateChatMessage?.(this.createGarminOnebox, {
      //   id: "garmin-onebox",
      // });
    });
  },

  createGarminOnebox(element) {
    const oneboxes = element.querySelectorAll(
      // ".onebox.githubpullrequest, .onebox.githubissue"
      ".onebox"
    );
    oneboxes.forEach((onebox) => {
      const link = onebox.querySelector(".source a");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      const garmin = href.match(
        /https:\/\/connect\.garmin\.com\/modern\/activity\/(\d*)\??.*/
      );
      const strava = href.match(
        /https:\/\/www\.strava\.com\/activities\/(\d*)\??.*/
      );
      if (!garmin && !strava) {
        return;
      }
      if (garmin) {
        const x = onebox.querySelector("article");
        x.classList.add("garmin-onebox");
        const p = onebox.querySelector("p");
        p.innerHTML = `<iframe src='https://connect.garmin.com/modern/activity/embed/${garmin[1]}' width='465' height='500'></iframe>`;

        let activityId = garmin[1];
        const iframeSrc = `https://connect.garmin.com/modern/activity/embed/${activityId}`;
        // const imageSrc = `https://img.shields.io/github/${linkType}/detail/state/${garmin[1]}/${garmin[2]}/${garmin[4]}?label=&style=flat-square`;
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", iframeSrc);
        iframe.classList.add("garmin-onebox-indicator");

        const info = onebox[0];
        if (info) {
          info.appendChild(iframe);
        }
      }
      if (strava) {
        const x = onebox.querySelector("article");
        const p = x.querySelector("p");
        let div = document.createElement("div");
        div.classList.add("strava-embed-placeholder");
        div.setAttribute("data-embed-type", "activity");
        div.setAttribute("data-embed-id", "8956604329");
        // div.innerHTML;
        p.parentNode.insertBefore(div, p.nextSibling);
        let script = document.createElement("script");
        script.setAttribute("src", "https://strava-embeds.com/embed.js");
        div.parentNode.insertBefore(script, div.nextSibling);
      }
    });
  },
};
