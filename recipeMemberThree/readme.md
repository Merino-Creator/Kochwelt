<!-- 1) JSON-Grundlagen

JSON (Text)

{
  "title": "Einkauf",
  "items": ["Milch", "Brot", "Eier"]
}

Dasselbe als JS-Objekt

const data = {
  title: "Einkauf",
  items: ["Milch", "Brot", "Eier"]
};

2) JS → JSON (speichern/versenden)
const jsObj = { a: 1, b: [2,3] };
const jsonString = JSON.stringify(jsObj);          // '{"a":1,"b":[2,3]}'
const jsonPretty = JSON.stringify(jsObj, null, 2); // schön formatiert

3) JSON → JS (nutzen/anzeigen)
<h2 id="title"></h2>
<ul id="list"></ul>

<script>
  const json = '{"title":"Einkauf","items":["Milch","Brot","Eier"]}'; // JSON-Text
  const data = JSON.parse(json); // -> normales JS-Objekt

  document.querySelector('#title').textContent = data.title;

  const ul = document.querySelector('#list');
  for (const item of data.items) {
    const li = document.createElement('li');
    li.textContent = item;       // sicher, kein HTML ausführen
    ul.appendChild(li);
  }
</script>

4) JSON aus externer Datei laden (fetch)

data.json:

{ "title": "Todos", "items": ["Code schreiben", "Kaffee"] }

HTML/JS:

<h2 id="title"></h2>
<ul id="list"></ul>

<script>
  async function load() {
    const res = await fetch('./data.json'); // gleiche Domain/Ordner
    const data = await res.json();          // automatisch parse
    document.querySelector('#title').textContent = data.title;

    const ul = document.querySelector('#list');
    ul.replaceChildren(); // leeren
    data.items.forEach(txt => {
      const li = document.createElement('li');
      li.textContent = txt;
      ul.appendChild(li);
    });
  }
  load();
</script>

5) JSON direkt in der Seite einbetten
<script type="application/json" id="seed">
{
  "title": "Projekte",
  "items": ["Website", "API", "Tests"]
}
</script>

<script>
  const raw = document.getElementById('seed').textContent;
  const data = JSON.parse(raw);
  console.log(data.title, data.items);
</script>

6) JSON in localStorage speichern/laden
const state = { loggedIn: true, theme: "dark" };
localStorage.setItem('state', JSON.stringify(state));

const saved = JSON.parse(localStorage.getItem('state') || '{}'); -->