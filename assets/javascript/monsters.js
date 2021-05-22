(function () {

    ajax('GET', 'https://joxgit.github.io/DnD-Osnovna-Pravila/dnd.json', [], '', parseDndJson);

    function parseDndJson(response) {
        try {
            let div = document.getElementById('container');
            let obj = JSON.parse(response.responseText);
            let i = 0;
            let template = document.getElementById('card-template').content;

            for (let monster in obj.monsters) {

                let card = document.importNode(template, true);
                card.querySelector('.name').innerHTML = obj.monsters[monster].name;
                card.querySelector('.picture').src = obj.monsters[monster].image;
                
                card.querySelector('.ac').innerHTML = `${obj.monsters[monster].attributes[0].value} (${obj.monsters[monster].attributes[0].extra})`;
                card.querySelector('.hp').innerHTML = `${obj.monsters[monster].attributes[1].value} (${obj.monsters[monster].attributes[1].extra})`;
                card.querySelector('.speed').innerHTML = `${obj.monsters[monster].attributes[2].value} ${obj.monsters[monster].attributes[2].extra}`;
                
                card.querySelector('.str').innerHTML = obj.monsters[monster].abilities[0].modifier;
                card.querySelector('.dex').innerHTML = obj.monsters[monster].abilities[1].modifier;
                card.querySelector('.con').innerHTML = obj.monsters[monster].abilities[2].modifier;
                card.querySelector('.int').innerHTML = obj.monsters[monster].abilities[3].modifier;
                card.querySelector('.wiz').innerHTML = obj.monsters[monster].abilities[4].modifier;
                card.querySelector('.cha').innerHTML = obj.monsters[monster].abilities[5].modifier;
                
                if(i == 2 || i == 2){
                    card.querySelector('.card').classList.add('big');
                }
                
                div.appendChild(card);

                i++;
                if (i > 5) {
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    function ajax(method, url, headers, data, callback, caller) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                callback(this, caller, false);
            }
        };

        xhttp.onerror = function () {
            callback(this, caller, true);
        }
        xhttp.open(method, url, true);

        for (header of headers) {
            /*xhttp.setRequestHeader("Content-type", "application/json");*/
            xhttp.setRequestHeader(header.key, header.value);
        }

        xhttp.send(JSON.stringify(data));
    }

})();