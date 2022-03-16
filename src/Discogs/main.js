// This project is just an attempt to make a simple UI
// to navigate the Discogs.com database more easily.
// More functionality will be added and soon this project
// will be ported over to GitHub and continued there.
//
// Stuff to remember/fix
// - go back and fix using opacity to hide/show elements
// - variable/css class naming, standardize ui element
//   names
// - fix responsiveness on sm screen
// - Discogs pagination issues

const discogsAPI = "https://api.discogs.com";
const token = "eneTroyZTJqkInHoaoQsaDRyOHMQXqQHzeeylAgr";
const pipe = '<span class="app__form__pipe">&#160;|&#160;</span>';
const countryList = [{"country":"US"},{"country":"UK"},{"country":"Germany"},{"country":"France"},{"country":"Italy"},{"country":"Japan"},{"country":"Canada"},{"country":"Europe"},{"country":"Netherlands"},{"country":"Spain"},{"country":"Unknown"},{"country":"Russia"},{"country":"Australia"},{"country":"Sweden"},{"country":"Belgium"},{"country":"Brazil"},{"country":"Greece"},{"country":"Jamaica"},{"country":"Poland"},{"country":"Finland"},{"country":"Switzerland"},{"country":"USSR"},{"country":"Denmark"},{"country":"UK & Europe"},{"country":"Portugal"},{"country":"Norway"},{"country":"Mexico"},{"country":"Austria"},{"country":"Argentina"},{"country":"Yugoslavia"},{"country":"New Zealand"},{"country":"Hungary"},{"country":"Ukraine"},{"country":"South Africa"},{"country":"Czechoslovakia"},{"country":"Czech Republic"},{"country":"USA & Canada"},{"country":"Turkey"},{"country":"Venezuela"},{"country":"Colombia"},{"country":"Ireland"},{"country":"Romania"},{"country":"Indonesia"},{"country":"India"},{"country":"Israel"},{"country":"Chile"},{"country":"Scandinavia"},{"country":"Peru"},{"country":"Bulgaria"},{"country":"Taiwan"},{"country":"South Korea"},{"country":"Croatia"},{"country":"Democratic Republic (GDR)"},{"country":"Malaysia"},{"country":"Thailand"},{"country":"Lithuania"},{"country":"UK"},{"country":"Serbia"},{"country":"Germany"},{"country":"China"},{"country":"Hong Kong"},{"country":"Philippines"},{"country":"Slovakia"},{"country":"Singapore"},{"country":"Ecuador"},{"country":"Australia & New Zealand"},{"country":"Australasia"},{"country":"Iceland"},{"country":"Uruguay"},{"country":"Nigeria"},{"country":"Benelux"},{"country":"Egypt"},{"country":"UK & Ireland"},{"country":"Estonia"},{"country":"Slovenia"},{"country":"UK & US"},{"country":"USA & Europe"},{"country":"Lebanon"},{"country":"USA"},{"country":"Panama"},{"country":"Cuba"},{"country":"Belarus"},{"country":"Latvia"},{"country":"Puerto Rico"},{"country":"Kenya"},{"country":"Middle East"},{"country":"USA"},{"country":"Luxembourg"},{"country":"Bolivia"},{"country":"Macedonia"},{"country":"Trinidad & Tobago"},{"country":"Bosnia & Herzegovina"},{"country":"Costa Rica"},{"country":"Saudi Arabia"},{"country":"Barbados"},{"country":"Iran"},{"country":"France & Benelux"},{"country":"Ghana"},{"country":"Singapore"},{"country":"Guatemala"},{"country":"North America (inc Mexico)"},{"country":"Czech Republic & Slovakia"},{"country":"Morocco"},{"country":"Pakistan"},{"country":"Reunion"},{"country":"Ivory Coast"},{"country":"Serbia and Montenegro"},{"country":"Madagascar"},{"country":"Zimbabwe"},{"country":"Angola"},{"country":"Georgia"},{"country":"Germany & Switzerland"},{"country":"El Salvador"},{"country":"Zaire"},{"country":"Asia"},{"country":"Algeria"},{"country":"Dominican Republic"},{"country":"Mauritius"},{"country":"Cyprus"},{"country":"Tunisia"},{"country":"Malta"},{"country":"United Arab Emirates"},{"country":"Mozambique"},{"country":"UK & France"},{"country":"Guadeloupe"},{"country":"Paraguay"},{"country":"Rhodesia"},{"country":"Ethiopia"},{"country":"UK"},{"country":"South East Asia"},{"country":"Congo"},{"country":"Senegal"},{"country":"Bahamas"},{"country":"Haiti"},{"country":"Kazakhstan"},{"country":"Syria"},{"country":"Suriname"},{"country":"Nicaragua"},{"country":"Cameroon"},{"country":"Moldova"},{"country":"Liechtenstein"},{"country":"Vietnam"},{"country":"Netherlands Antilles"},{"country":"Kuwait"},{"country":"South America"},{"country":"Zambia"},{"country":"Benin"},{"country":"Martinique"},{"country":"Faroe Islands"},{"country":"Albania"},{"country":"Azerbaijan"},{"country":"Dahomey"},{"country":"Guinea"},{"country":"South Vietnam"},{"country":"Sudan"},{"country":"Andorra"},{"country":"Kosovo"},{"country":"Virgin Islands"},{"country":"Mongolia"},{"country":"Bermuda"},{"country":"Sri Lanka"},{"country":"Congo"},{"country":"Iraq"},{"country":"Libya"},{"country":"Central America"},{"country":"Greenland"},{"country":"Nepal"},{"country":"Cape Verde"},{"country":"Seychelles"},{"country":"Armenia"},{"country":"Guyana"},{"country":"North Korea"},{"country":"French Polynesia"},{"country":"Bangladesh"},{"country":"Mali"},{"country":"Honduras"},{"country":"Curaçao"},{"country":"Gulf Cooperation Council"},{"country":"Bahrain"},{"country":"Cambodia"},{"country":"Tanzania"},{"country":"Montenegro"},{"country":"Uganda"},{"country":"West Bank"},{"country":"Southern Rhodesia"},{"country":"Jordan"},{"country":"Yemen"},{"country":"East Timor"},{"country":"Gabon"},{"country":"Dutch East Indies"},{"country":"Burma"},{"country":"Togo"},{"country":"Upper Volta"},{"country":"Dominica"},{"country":"Papua New Guinea"},{"country":"Uzbekistan"},{"country":"Monaco"},{"country":"Laos"},{"country":"Afghanistan"},{"country":"UK"},{"country":"Cayman Islands"},{"country":"New Caledonia"},{"country":"Antigua & Barbuda"},{"country":"Kyrgyzstan"},{"country":"Belize"},{"country":"French Guiana"},{"country":"Aruba"},{"country":"Austria-Hungary"},{"country":"Africa"},{"country":"Burkina Faso"},{"country":"Eritrea"},{"country":"Fiji"},{"country":"Brunei"},{"country":"Saint Kitts and Nevis"},{"country":"Sierra Leone"},{"country":"Man"},{"country":"Qatar"},{"country":"Namibia"},{"country":"Guam"},{"country":"Jersey"},{"country":"Botswana"},{"country":"Grenada"},{"country":"Protectorate of Bohemia and Moravia"},{"country":"Liberia"},{"country":"Antigua & Barbuda"},{"country":"Central African Republic"},{"country":"Macau"},{"country":"Bhutan"},{"country":"Palau"},{"country":"San Marino"},{"country":"Lesotho"},{"country":"Guernsey"},{"country":"Korea (pre-1945)"},{"country":"Saint Lucia"},{"country":"Comoros"},{"country":"Guinea-Bissau"},{"country":"Maldives"},{"country":"Ottoman Empire"},{"country":"Malawi"},{"country":"Sint Maarten"},{"country":"Niger"},{"country":"Saint Vincent and the Grenadines"},{"country":"Somalia"},{"country":"Tajikistan"},{"country":"South Pacific"},{"country":"Abkhazia"},{"country":"Cook Islands"},{"country":"Sao Tome and Principe"},{"country":"Anguilla"},{"country":"Mauritania"},{"country":"Rwanda"},{"country":"Turkmenistan"},{"country":"Bohemia"},{"country":"Gibraltar"},{"country":"Samoa"},{"country":"Gambia"},{"country":"Vatican City"},{"country":"Oman"},{"country":"Indochina"},{"country":"Northern Mariana Islands"},{"country":"Swaziland"},{"country":"Turks and Caicos Islands"},{"country":"Vanuatu"},{"country":"Djibouti"},{"country":"Mayotte"},{"country":"Montserrat"},{"country":"Solomon Islands"},{"country":"British Virgin Islands"},{"country":"Falkland Islands"},{"country":"Gaza Strip"},{"country":"Marshall Islands"},{"country":"Tonga"},{"country":"Chad"},{"country":"Equatorial Guinea"},{"country":"Pitcairn Islands"},{"country":"Southern Sudan"}];

class API {
  constructor(url) {
    this.url = url;
  }
  searchArtist(artist, title, year, country) {
    let str = discogsAPI + "/database/search?release_title=";
    str += title + "&artist=" + artist + "&year=" + year + "&country=" + country + "&type=release&token=" + token;
    str = encodeURI(str);
    let call = fetch(str).then(resp => resp.json()).then(data => {
      return this.discogsYearSort(data.results);
    });
    return call;
  }
  getRelease(id) {
    let str = discogsAPI + "/releases/" + id + "?USD&token=" + token; // hardcode us dollars for now
    let call = fetch(str).then(resp => resp.json()).then(data => {
      //console.log(data);
      return data;
    });
    return call;
  }
  discogsYearSort(arr) {
    return arr.sort((a, b) => {
      let ay = typeof a.year === "undefined" ? "9999" : a.year;
      let by = typeof b.year === "undefined" ? "9999" : b.year;
      return Number(ay) - Number(by);
    });
  }
}
class Record {
  constructor(item) {
    this.artist = item.artists_sort;
    this.title = item.title;
    this.label = item.labels[0].name;
    this.catno = item.labels[0].catno;
    this.year = item.year || "No year";
    this.images = item.images;
    this.notes = item.notes;
  }
}
class AppFormUI { // todo: pass all these elements in array
  constructor() {
    this.artistNameInput = document.getElementById("artistName");
    this.releaseTitleInput = document.getElementById("releaseTitle");
    this.releaseYearInput = document.getElementById("releaseYear");
    this.releaseCountryInput = document.getElementById("releaseCountry");
    this.countryDropdown = new Dropdown(this.releaseCountryInput);
    this.releaseInfo = document.getElementById("releaseInfo");
    this.releaseInfoText = document.getElementById("releaseInfoText");
    this.artistNameSubmit = document.getElementById("artistNameSubmit");
    this.selectRelease = new Dropdown(document.getElementById("selectRelease"));
    this.gallery = new Gallery();
    this.promptText = document.getElementById("prompt");
    this.prompts = ["Fill out as many fields as possible and click the search button to retrieve all applicable releases.", "Select a release from the dropdown to display more info."];
  }
  showPrompt(ind) {
    this.promptText.innerHTML = this.prompts[ind];
  }
  clearFields(){
    
  }
}
class Dropdown {
  constructor(el) {
    this.element = el;
  }
  buildDropdown(data) {
    let options = "";
    data.forEach(item => {
      options += "<option>" + item.country + "</option>";
    });
    this.element.innerHTML = options;
  }
  buildReleasesDropdown(data, callback) {
    this.element.style.opacity = 1;
    let options = '<option value="">Select a release</option>';
    data.forEach(function(record) {
      //change record param name
      if (record.format.indexOf("Vinyl") !== -1) {
        //vinyl only for now
        let dem = "&#160;&#160;|&#160;&#160;";
        let str = record.title + dem + record.label[0] + dem + record.catno + dem + record.year + dem + record.country;
        options += '<option value="' + record.id + '">' + str + "</option>"; //discogs pagination makes this hard
      }
    });
    this.element.innerHTML = options;
    this.element.addEventListener("change", callback);
  }
}
class Gallery {
  constructor() {
    this.counter = 0;
    this.max = 0;
    this.recordImage = document.getElementById("recordImage");
    this.recordImageNext = document.getElementById("galleryNext");
    this.recordImagePrev = document.getElementById("galleryPrev");
    this.galleryCounter = document.getElementById("galleryCounter");
    this.record = {};
    this.first = true;
  }
  init(record) {
    this.record = record;
    this.max = record.images.length - 1;
    this.counter = 0;
    this.show(0);
    if (this.first) {
      this.recordImageNext.addEventListener("click", this.movegal.bind(this));
      this.recordImagePrev.addEventListener("click", this.movegal.bind(this));
    }
    this.first = false;
  }
  movegal(e) {
    let a = e.target.id == "galleryNext" ? 1 : -1;
    this.counter += a;
    this.counter = this.counter < 0 ? this.max : this.counter;
    this.counter = this.counter > this.max ? 0 : this.counter;
    this.show(this.counter);
    //console.log('move');
  }
  show(imageno) {
    this.recordImage.src = this.record.images[imageno].resource_url;
    this.galleryCounter.innerHTML = this.counter + 1 + " of " + (this.max + 1);
  }
}
class App {
  constructor() {
    this.API = new API();
    this.formUI = new AppFormUI();
  }
  init() {
    this.formUI.countryDropdown.buildDropdown(countryList);
    this.formUI.artistNameSubmit.addEventListener("click", this.releaseSearch.bind(this));
  }
  releasePreview(event) {
    let d = this.API.getRelease(event.target.value);
    d.then(data => {
      let record = new Record(data);
      //console.log(record);
      this.previewDisplay(record);
    });
  }
  previewDisplay(record) {
    this.formUI.releaseInfo.style.opacity = 1;
    let dt = "<h5>" + record.artist + pipe + record.title + "</h5>";
    let dl = "<p><strong>" + record.label + " " + record.catno + "<br>" + record.year + "</strong></p>";
    let dn = "<p>" + record.notes + "</p>";
    this.formUI.releaseInfoText.innerHTML = dt + dl + dn;
    this.formUI.gallery.init(record);
  }
  releaseSearch() {
    this.formUI.releaseInfo.style.opacity = 0;
    let a = this.formUI.artistNameInput.value;
    let t = this.formUI.releaseTitleInput.value;
    let y = this.formUI.releaseYearInput.value;
    let c = this.formUI.releaseCountryInput.value;
    let d = this.API.searchArtist(a, t, y, c);
    //console.log(this.data);
    d.then(data => {
      this.formUI.selectRelease.buildReleasesDropdown(data, this.releasePreview.bind(this));
      this.formUI.showPrompt(1);
    });
  }
}
var app = new App();
app.init(); 